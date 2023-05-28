
import { Piso } from "../../../bd/piso"
import Swal from 'sweetalert2'

export default {
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
    const tbody = document.querySelector('#pisos')

    const pisos = await Piso.getAll()

    const token = localStorage.getItem('token')

    if(token===null){
      alert("No tienes permisos")
    }

    let tabla = ''
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
      <td><button class="btn btn-info editar" data-id="${piso.id}" title="Editar"><i class="bi bi-pencil editar"></i>
      </button></td>
      <td><button class="btn btn-danger eliminar" data-id="${piso.id}" title="Eliminar"><i class="bi bi-trash3 eliminar"></i>
      </i>
      </button></td>`
    }

    tbody.innerHTML = tabla

    const main = document.querySelector('main')

    main.addEventListener('click', async (e) => {
      if (e.target.classList.contains('eliminar')) {

        const seguro = await Swal.fire({
          icon: 'question',
          title: '¿Está seguro que desea borrar el servicio?',
          showCancelButton: true,
          confirmButtonText: 'Sí',
          cancelButtonText: 'Cancelar'
        });
        
        if (seguro.isConfirmed) {
          const id = e.target.dataset.id
          const errores = await Piso.delete(id)
          if (!errores) {
            console.log(errores);
          }
          Swal.fire({
            icon: 'info',
            title: 'Se ha eliminado correctamente'
          });
          const trId = document.getElementById(id);
          trId.remove();
        }
        
      }
      if (e.target.classList.contains('crear')) {
        window.location = '/#/crearPiso'
      }
      if (e.target.classList.contains('editar')) {
        const id = e.target.dataset.id
        window.location = `/#/editarPiso/${id}`
      }
    })
  }
}
