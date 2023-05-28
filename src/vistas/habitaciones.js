
import Swal from 'sweetalert2';
import { Habitacion } from '../bd/habitacion';
import { Imagen } from '../bd/imagen';

export default {
  template: `
  <section class="habitaciones-intro">
            <div class="card">
                <img src="media/habitacionCarusel1.jpg" alt="Habitación 1">
                <div class="card-content">
                  <h2>Habitación 1</h2>
                  <p>Esta es la descripción de la Habitación 1.</p>
                </div>
                <a class="main-btn" href="#">
                    <i class="fas fa-heart"></i>
                    Añadir a Favoritos
                  </a>
              </div>
              
            
              <div class="pagination">
                <button class="page-btn active" onclick="changePage(1)">1</button>
                <button class="page-btn" onclick="changePage(2)">2</button>
                <button class="page-btn" onclick="changePage(3)">3</button>
              </div>   
        </section>
  `,
  script: async() => {
    const tbody = document.querySelector('#habitacion')

    const habitaciones = await Habitacion.getAll()

    let tabla = ''
    for (const habitacion of habitaciones) {
      const imagen = await Imagen.getbyIdHabitacion(habitacion.id)

      if (imagen) {
        tabla += `<img src="${imagen.url}" alt="${imagen.nombre}" id="${imagen.id}"></td>`
        // const imagenElement = document.getElementById(`${habitacion.id}`)
        // console.log(imagenElement)
        // imagenElement.src = imagen.url
        // imagenElement.alt = imagen.nombre // Establece el atributo 'alt' con el nombre de la imagen
      } else {
        tabla += '<td><p>No tiene imagen</p></td>'
      }

      tabla += `
      <div class="card">
      <img src="media/habitacionCarusel2.jpg" alt="Habitación 2">
      <div class="card-content">
        <h2>Habitación ${habitacion.id}</h2>
        <p>Esta habitacion contiene:</p>
      </div>
      <a class="main-btn" href="#">
          <i class="fas fa-heart"></i>
          Añadir a Favoritos
        </a>
    </div>`
    }

    tbody.innerHTML = tabla
  }

}
