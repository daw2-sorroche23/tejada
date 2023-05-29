import { U as User } from "./user-15d5319e.js";
import { S as Swal } from "./main-ab34b803.js";
class Reserva {
  // crear registro (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async getAll() {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://api-production-3aa5.up.railway.app/reserva", {
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
      const response = await fetch(`https://api-production-3aa5.up.railway.app/reserva/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  static async create(camaC, escritorioC, armarioC, precioC, cfPisoC) {
    try {
      const token = localStorage.getItem("token");
      const url = "https://api-production-3aa5.up.railway.app/reserva";
      const data = {
        cama: !isNaN(parseInt(camaC)) ? parseInt(camaC) : "",
        escritorio: !isNaN(parseInt(escritorioC)) ? parseInt(escritorioC) : "",
        armario: !isNaN(parseInt(armarioC)) ? parseInt(armarioC) : "",
        precio: precioC !== "" && !isNaN(parseInt(precioC)) ? parseInt(precioC) : "",
        cfPiso: cfPisoC !== "" && !isNaN(parseInt(cfPisoC)) ? parseInt(cfPisoC) : ""
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
      const token = localStorage.getItem("token");
      const url = `https://api-production-3aa5.up.railway.app/reserva/${id}`;
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
}
const reservaVista = {
  template: `
  <div class="crud-intro">
  <section class="crud-card">
      <h1>Panel de control</h1>
      <h2 class="mt-5">Habitaciones</h2>
      <button class="main-btn-crud crear"  title="Crear habitacion">Reseva</button>
      <table class="table mt-4">
          <thead>
              <tr>
                  <th>Codigo</th>
                  <th>Fecha Entreda</th>
                  <th>Fecha Salida</th>
                  <th>Cliente</th>
                  <th>Habitacion</th>
                  <th>Eliminar</th>
              </tr>
          </thead>
          
          
          <tbody id="reserva">

          </tbody>
      </table>
  </section>
</div>
  
  `,
  script: async () => {
    const tbody = document.querySelector("#reserva");
    const reservas = await Reserva.getAll();
    let tabla = "";
    for (const reserva of reservas) {
      const cliente = await User.getAllById(reserva.cfCliente);
      tabla += `
      <tr id="${reserva.id}">
      <td>${reserva.id}</td>
      <td>${reserva.fecha_entrada}</td>
      <td>${reserva.fecha_salida}</td>
      <td>${cliente.nombre}</td>
      <td>${reserva.cfHabitacion}</td>
      <td><button class="btn main-btn-crud-eliminate eliminarReserva" data-id="${cliente.id}" data-idt="${reserva.id}" title="Eliminar"><i class="bi bi-trash3 eliminarReserva"></i>
      </i>
      </button></td>`;
    }
    tbody.innerHTML = tabla;
    const main = document.querySelector("main");
    main.addEventListener("click", async (e) => {
      if (e.target.classList.contains("eliminarReserva")) {
        const seguro = await Swal.fire({
          icon: "question",
          title: "¿Está seguro que desea borrar la habitacion?",
          showCancelButton: true,
          confirmButtonText: "Sí",
          cancelButtonText: "Cancelar"
        });
        if (seguro.isConfirmed) {
          const id = e.target.dataset.id;
          const idt = e.target.dataset.idt;
          const errores = await Reserva.delete(id);
          if (!errores) {
            console.log(errores);
          }
          Swal.fire({
            icon: "info",
            title: "Se ha eliminado correctamente"
          });
          const trId = document.getElementById(idt);
          trId.remove();
        }
      }
    });
  }
};
export {
  reservaVista as default
};
