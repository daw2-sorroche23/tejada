import { U as User } from "./user-15d5319e.js";
import { S as Swal } from "./main-ab34b803.js";
const usuariosVista = {
  template: `
  <div class="crud-intro">
  <section class="crud-card">
      <h1>Panel de control</h1>
      <h2 class="mt-5">Usuarios</h2>
      <table class="table mt-4">
          <thead>
              <tr>
                  <th>Codigo</th>
                  <th>Nombre</th>
                  <th>Primer Apellido</th>
                  <th>Segundo Apellido</th>
                  <th>Email</th>
                  <th>Telefono</th>
                  <th>Avatar</th>
                  <th>Eliminar</th>
              </tr>
          </thead>
          <tbody id="usuarios">

          </tbody>
      </table>
  </section>
</div>
  
  `,
  script: async () => {
    const tbody = document.querySelector("#usuarios");
    const usuarios = await User.getAll();
    if (usuarios.mensaje) {
      console.log(usuarios.mensaje);
    }
    let tabla = "";
    for (const usuario of usuarios) {
      tabla += `
      <tr id="${usuario.id}">
      <td>${usuario.id}</td>
      <td>${usuario.nombre}</td>
      <td>${usuario.primerApellido}</td>
      <td>${usuario.segundoApellido}</td>
      <td>${usuario.email}</td>
      <td>${usuario.telefono}</td>
      <td>${usuario.avatar}</td>
      <td><button class="btn main-btn-crud-eliminate eliminar" data-id="${usuario.id}" title="Eliminar"><i class="eliminar bi bi-trash3"></i>
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
          const errores = await User.delete(id);
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
    });
  }
};
export {
  usuariosVista as default
};
