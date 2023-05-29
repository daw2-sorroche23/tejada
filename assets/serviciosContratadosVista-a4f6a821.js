import { S as Servicio } from "./servicio-81d28895.js";
import { S as Swal } from "./main-16f4a148.js";
import { U as User } from "./user-15d5319e.js";
class ServicioContratado {
  // crear registro (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async getAll() {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://api-production-3aa5.up.railway.app/serviciocontratado", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async getAllById(id) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://api-production-3aa5.up.railway.app/servicio/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  static async create(nombreC, precioC, descriptionC) {
    try {
      const token = localStorage.getItem("token");
      const url = "https://api-production-3aa5.up.railway.app/servicio";
      const data = {
        nombre: nombreC,
        precio: precioC,
        description: descriptionC
      };
      console.log(data);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      console.log(response);
      if (response.ok) {
        const responseData = await response.json();
        return responseData;
      } else {
        console.error("Error en la solicitud:", response.status);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      return error;
    }
  }
  static async delete(id) {
    try {
      const url = `https://api-production-3aa5.up.railway.app/servicio/${id}`;
      const token = localStorage.getItem("token");
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.ok) {
        console.log("El recurso se eliminó correctamente");
      } else {
        console.error("Error en la solicitud:", response);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      return error;
    }
  }
  static async update(camaC, escritorioC, armarioC, precioC, cfPisoC, id) {
    try {
      const url = `https://api-production-3aa5.up.railway.app/habitacion/${id}`;
      const token = localStorage.getItem("token");
      const data = {
        cama: parseInt(camaC),
        escritorio: parseInt(escritorioC),
        armario: parseInt(armarioC),
        precio: parseInt(precioC),
        cfPiso: cfPisoC,
        Authorization: `Bearer ${token}`
      };
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        const responseData = await response.json();
        return responseData;
      } else {
        console.error("Error en la solicitud:", response.status);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      return error;
    }
  }
}
const serviciosContratadosVista = {
  template: `
  <div class="crud-intro">
  <section class="crud-card">
      <h1>Panel de control</h1>
      <h2 class="mt-5">Servicios Contratados</h2>
      <table class="table mt-4">
          <thead>
              <tr>
                  <th>Codigo</th>
                  <th>Tiempo Inicio</th>
                  <th>Tiempo Final</th>
                  <th>Cliente</th>
                  <th>Servicio</th>
                  <th>Precio Total</th>
                  <th>Estado</th>
              </tr>
          </thead>
          <tbody id="servicios">

          </tbody>
      </table>
  </section>
</div>
  `,
  script: async () => {
    const tbody = document.querySelector("#servicios");
    const servicios = await ServicioContratado.getAll();
    if (servicios.mensaje) {
      console.log(servicios.mensaje);
    }
    let tabla = "";
    for (const servicio of servicios) {
      const nombreCliente = await User.getAllById(servicio.cfCliente);
      const nombreServicio = await Servicio.getAllById(servicio.cfServicio);
      tabla += `
      <tr id="${servicio.id}">
      <td>${servicio.id}</td>
      <td>${servicio.tiempoInicio}</td>
      <td>${servicio.tiempoFinal}</td>
      <td>${nombreCliente.nombre}</td>
      <td>${nombreServicio.nombre}</td>
      <td>${servicio.precioTotal}</td>
      <td>${servicio.estado}</td>`;
    }
    tbody.innerHTML = tabla;
    const main = document.querySelector("main");
    main.addEventListener("click", async (e) => {
      if (e.target.classList.contains("eliminar")) {
        const seguro = await Swal.fire({
          icon: "question",
          title: "¿Está seguro que desea borrar el servicio?",
          showCancelButton: true,
          confirmButtonText: "Sí",
          cancelButtonText: "Cancelar"
        });
        if (seguro.isConfirmed) {
          const id = e.target.dataset.id;
          const errores = await Servicio.delete(id);
          if (!errores) {
            console.log(errores);
          }
          Swal.fire({
            icon: "info",
            title: "Se ha eliminado correctamente"
          });
          const trId = document.getElementById(id);
          trId.remove();
        }
      }
      if (e.target.classList.contains("crear")) {
        window.location = "/tejada/#/crearServicio";
      }
      if (e.target.classList.contains("editar")) {
        const id = e.target.dataset.id;
        window.location = `/tejada/#/editarServicio/${id}`;
      }
    });
  }
};
export {
  serviciosContratadosVista as default
};
