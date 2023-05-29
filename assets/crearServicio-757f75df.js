import { S as Servicio } from "./servicio-81d28895.js";
import { S as Swal } from "./main-ab34b803.js";
const crearServicio = {
  template: `
  <div class="intro-createService">
  <div class="container-fluid login">
      <div class="row">
          <div class="col-12">
              <section>
                  <div class="login-card-container my-5">
                      <div class="login-card">
                          <div class="login-card-logo">
                              <img width="500px" src="./media/logo.svg" alt="">
                          </div>
                          <div class="login-card-header">
                              <form class="login-card-form" id="form_registro">
                                  <div class="form-item">
                                      <label class="mt-3 form-label" for="nombre">Nombre:   </label>
                                      <input 
                                        id="nombre"
                                        type="text" 
                                        class="form-control" 
                                        value="" 
                                        placeholder = "Bar" required 
                                        />
                                      <div class="invalid-feedback">Este campo no es correcto</div>
                                  </div>
                                  <div class="form-item">
                                      <label class="mt-3 form-label" for="precio">Precio: </label>
                                      <input 
                                      id="precio"
                                      type="number" 
                                      class="form-control" 
                                      value="" 
                                      placeholder = "1" required 
                                      />
                                      <div class="invalid-feedback">Este campo no es correcto</div>
                                  </div>
                                  <div class="form-item">
                                      <label class="mt-3 form-label" for="telefono">Descripcion: </label>
                                      <input 
                                      id="descripcion"
                                      type="text-box" 
                                      class="form-control" 
                                      value="" 
                                      />
                                      <div class="invalid-feedback">Este campo no es correcto</div>
                                  </div>
                                  <button type="submit">Crear Servicio</button>
                              </form>
                      </div>
                  </div>
              </section>
          </div>
      </div>
  </div>
</div>
    `,
  script: () => {
    document.querySelector("#form_registro").addEventListener("submit", async function(e) {
      e.preventDefault();
      try {
        const nombre = document.getElementById("nombre").value;
        const precio = document.getElementById("precio").value;
        const descripcion = document.getElementById("descripcion").value;
        const servicio = await Servicio.create(nombre, precio, descripcion);
        console.log(servicio);
        if (servicio.length > 10) {
          Swal.fire({
            icon: "info",
            title: "Se ha creado correctamente"
          });
          window.location.href = "/tejada/#/servicios";
        } else {
          let errorHTML = "";
          for (const error of servicio) {
            errorHTML += `${error}
`;
          }
          Swal.fire({
            icon: "error",
            title: "Error en crear el servicio",
            html: errorHTML.replace(/\n/g, "<br>")
          });
        }
      } catch (error) {
        console.log(error);
        alert("Error al crear la habitacion");
      }
    });
  }
};
export {
  crearServicio as default
};
