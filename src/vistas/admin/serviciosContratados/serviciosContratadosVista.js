import { Servicio } from '../../../bd/servicio'
import Swal from 'sweetalert2'
import { ServicioContratado } from '../../../bd/serviciosContratados'
import { User } from '../../../bd/user'

export default {
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
    const tbody = document.querySelector('#servicios')

    const servicios = await ServicioContratado.getAll()
    if(servicios.mensaje){
      console.log(servicios.mensaje)
    }

    let tabla = ''
    for (const servicio of servicios) {
      const nombreCliente = await User.getAllById(servicio.cfCliente)
      const nombreServicio = await Servicio.getAllById(servicio.cfServicio)
      tabla += `
      <tr id="${servicio.id}">
      <td>${servicio.id}</td>
      <td>${servicio.tiempoInicio}</td>
      <td>${servicio.tiempoFinal}</td>
      <td>${nombreCliente.nombre}</td>
      <td>${nombreServicio.nombre}</td>
      <td>${servicio.precioTotal}</td>
      <td>${servicio.estado}</td>`
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
          const id = e.target.dataset.id;
          const errores = await Servicio.delete(id);
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
        window.location = '/#/crearServicio'
      }
      if (e.target.classList.contains('editar')) {
        const id = e.target.dataset.id;
        window.location = `/#/editarServicio/${id}`
      }
    })
  }
}
