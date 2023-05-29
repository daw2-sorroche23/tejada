import { H as Habitacion } from "./habitacion-03cb0866.js";
import { S as Swal } from "./main-0561e979.js";
const crearhabitacion = {
  template: `
  <div class="intro-singUp">
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
                                      <label class="mt-3 form-label" for="nombre">Cama: </label>
                                      <select class="text-center" name="select" id="cama">
                                          <option value="1" selected>True</option>
                                          <option value="0" >False</option>
                                      </select>
                                  </div>
                                  <div class="form-item">
                                      <label class="mt-3 form-label" for="apellidos" >Escritorio: </label>
                                      <select class="text-center" name="select" id="escritorio">
                                          <option value="1" selected>True</option>
                                          <option value="0" >False</option>
                                      </select>
                                  </div>
                                  <div class="form-item">
                                      <label class="mt-3 form-label" for="apellidos" >Armario: </label>
                                      <select class="text-center" name="select" id="armario">
                                          <option value="1" selected>True</option>
                                          <option value="0">False</option>        
                                      </select>
                                  </div>
                                  <div class="form-item">
                                      <label class="mt-3 form-label" for="telefono">Precio: </label>
                                      <input 
                                      id="precioH"
                                      type="number" 
                                      class="form-control" 
                                      value="" 
                                      placeholder = "1" required 
                                      />
                                      <div class="invalid-feedback">Este campo no es correcto</div>
                                  </div>
                                  <div class="form-item">
                                      <label class="mt-3 form-label" for="telefono">Piso: </label>
                                      <input 
                                        id="pisoH"
                                        type="text" 
                                        class="form-control" 
                                        value="" 
                                        placeholder = "1" required 
                                        />
                                      <div class="invalid-feedback">Este campo no es correcto</div>
                                  </div>
                                  <button type="submit">Crear</button>
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
        const selectCama = document.getElementById("cama").value;
        const selectEscritorio = document.getElementById("escritorio").value;
        const selectArmario = document.getElementById("armario").value;
        const precio = document.querySelector("#precioH").value;
        const piso = document.querySelector("#pisoH").value;
        const habitacion = await Habitacion.create(selectCama, selectEscritorio, selectArmario, precio, piso);
        if (habitacion.length > 10) {
          Swal.fire({
            icon: "info",
            title: "Se ha creado correctamente"
          });
          window.location.href = "/tejada/#/habitaciones";
        } else {
          let errorHTML = "";
          for (const error of habitacion) {
            errorHTML += `${error}
`;
          }
          Swal.fire({
            icon: "error",
            title: "Error en crear la habitacion",
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
  crearhabitacion as default
};
