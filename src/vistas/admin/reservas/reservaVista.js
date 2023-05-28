import { Reserva } from '../../../bd/reserva.js'
import { User } from '../../../bd/user.js'
import Swal from 'sweetalert2'

export default {
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
    const tbody = document.querySelector('#reserva')

    const reservas = await Reserva.getAll()
    let tabla = ''
    for (const reserva of reservas) {
      const cliente = await User.getAllById(reserva.cfCliente)

      tabla += `
      <tr id="${reserva.id}">
      <td>${reserva.id}</td>
      <td>${reserva.fecha_entrada}</td>
      <td>${reserva.fecha_salida}</td>
      <td>${cliente.nombre}</td>
      <td>${reserva.cfHabitacion}</td>
      <td><button class="btn main-btn-crud-eliminate eliminarReserva" data-id="${cliente.id}" data-idt="${reserva.id}" title="Eliminar"><i class="bi bi-trash3 eliminarReserva"></i>
      </i>
      </button></td>`
    }

    tbody.innerHTML = tabla

    const main = document.querySelector('main')

    main.addEventListener('click', async (e) => {
      if (e.target.classList.contains('eliminarReserva')) {

          const seguro = await Swal.fire({
            icon: 'question',
            title: '¿Está seguro que desea borrar la habitacion?',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'Cancelar'
          });
          
          if (seguro.isConfirmed) {
            const id = e.target.dataset.id
            const idt = e.target.dataset.idt

            const errores = await Reserva.delete(id)
            if (!errores) {
              console.log(errores);
            }
            Swal.fire({
              icon: 'info',
              title: 'Se ha eliminado correctamente'
            });
            const trId = document.getElementById(idt);
            trId.remove();
          
          }
      }
    })
  }
}
