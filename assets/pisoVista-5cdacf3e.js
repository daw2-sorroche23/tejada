import { S as Swal } from "./main-16f4a148.js";
class Piso {
  // crear registro (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async getAll() {
    try {
      const response = await fetch("https://api-production-3aa5.up.railway.app/piso");
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  static async getAllById(id) {
    try {
      const response = await fetch(`https://api-production-3aa5.up.railway.app/piso/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  static async create(cocinaC, salonC, terrazaC, wifiC, aseosC, sexoC) {
    try {
      const token = localStorage.getItem("token");
      const url = "https://api-production-3aa5.up.railway.app/piso";
      const data = {
        cocina: !isNaN(parseInt(cocinaC)) ? parseInt(cocinaC) : "",
        salon: !isNaN(parseInt(salonC)) ? parseInt(salonC) : "",
        terraza: !isNaN(parseInt(terrazaC)) ? parseInt(terrazaC) : "",
        wifi: !isNaN(parseInt(wifiC)) ? parseInt(wifiC) : "",
        aseos: aseosC,
        sexo: sexoC
      };
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
      const url = `https://api-production-3aa5.up.railway.app/piso/${id}`;
      const response = await fetch(url, {
        method: "DELETE",
        Authorization: `Bearer ${token}`
      });
      if (response.ok) {
        console.log("El recurso se eliminó correctamente");
        console.log(response);
      } else {
        console.error("Error en la solicitud:", response);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      return error;
    }
  }
  static async update(cocinaC, salonC, terrazaC, wifiC, aseosC, sexoC, id) {
    try {
      const token = localStorage.getItem("token");
      const url = `https://api-production-3aa5.up.railway.app/piso/${id}`;
      const data = {
        cocina: parseInt(cocinaC),
        salon: parseInt(salonC),
        terraza: parseInt(terrazaC),
        wifi: parseInt(wifiC),
        aseos: aseosC,
        sexo: sexoC
      };
      const response = await fetch(url, {
        method: "PUT",
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
}
const pisoVista = {
  template: `
  <div class="crud-intro">
  <section class="crud-card">
      <h1>Panel de control</h1>
      <h2 class="mt-5">Habitaciones</h2>
      <button class="main-btn-crud crear"  title="Crear piso">Añadir</button>
      <table class="table mt-4">
          <thead>
              <tr>
                  <th>Codigo</th>
                  <th>Cocina</th>
                  <th>Salon</th>
                  <th>Terraza</th>
                  <th>Wifi</th>
                  <th>Aseos</th>
                  <th>Sexo</th>
                  <th>Editar</th>
                  <th>Eliminar</th>
              </tr>
          </thead>
          <tbody id="pisos">

          </tbody>
      </table>
  </section>
</div>
  
  `,
  script: async () => {
    const tbody = document.querySelector("#pisos");
    const pisos = await Piso.getAll();
    const token = localStorage.getItem("token");
    if (token === null) {
      alert("No tienes permisos");
    }
    let tabla = "";
    for (const piso of pisos) {
      tabla += `
      <tr id="${piso.id}">
      <td>${piso.id}</td>
      <td>${piso.cocina}</td>
      <td>${piso.salon}</td>
      <td>${piso.terraza}</td>
      <td>${piso.wifi}</td>
      <td>${piso.aseos}</td>
      <td>${piso.sexo}</td>
      <td><button class="btn main-btn-crud-edit editar" data-id="${piso.id}" title="Editar"><i class="bi bi-pencil editar"></i>
      </button></td>
      <td><button class="btn main-btn-crud-eliminate eliminar" data-id="${piso.id}" title="Eliminar"><i class="bi bi-trash3 eliminar"></i>
      </i>
      </button></td>`;
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
          const errores = await Piso.delete(id);
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
        window.location = "/tejada/#/crearPiso";
      }
      if (e.target.classList.contains("editar")) {
        const id = e.target.dataset.id;
        window.location = `/tejada/#/editarPiso/${id}`;
      }
    });
  }
};
export {
  pisoVista as default
};
