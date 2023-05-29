import { U as User } from "./user-15d5319e.js";
import { S as Swal } from "./main-0561e979.js";
const editarPerfil = {
  template: `
  <div class="intro-login">
  <div class="container rounded  mb-5">
      <div class="row">
          <div class="col-md-6 border-right d-flex justify-content-center">
              <div class="profile-header d-flex flex-column justify-content-center align-items-center text-center p-3 py-5">
                  <img class="rounded-circle mt-5" width="280px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"><span class="font-weight-bold" id="nombreAvatar"></span><span class="text-black-50" id="emailAvatar"></span><span> </span>
              </div>
          </div>
          <div class="login-card-container col-md-6">
              <div class="login-card">
                  <div class="login-card-logo">
                      <img src="../media/logo2.jpg" alt="">
                      <a href=""><span style="font-size: 50px;" class="form-item-icon material-symbols-outlined">edit</span></a>
                  </div>
                  <div class="login-card-header">
                      <h1>Ediat Perfil</h1>
                      <form class="login-card-form" id="editarPerfil">
                          <div class="form-item">
                              <span class="form-item-icon material-symbols-outlined">account_circle</span>
                              <input type="text" placeholder="Nombre" id="nombre"  autofocus>
                          </div>
                          <div class="form-item">
                              <span class="form-item-icon material-symbols-outlined">account_circle</span>
                              <input type="text" placeholder="Apellido" id="primerApellido" >
                          </div>
                           <div class="form-item">
                              <span class="form-item-icon material-symbols-outlined">account_circle</span>
                              <input type="text" placeholder="Apellido" id="segundoApellido" >
                          </div>
                          <div class="form-item">
                              <span class="form-item-icon material-symbols-outlined">mail</span>
                              <input type="text" placeholder="Correo" id="email">
                          </div>
                          <div class="form-item">
                              <span class="form-item-icon material-symbols-outlined">phone</span>
                              <input type="text" placeholder="Telefono" id="telefono">
                          </div>
                          <div class="form-item">
                          <span class="form-item-icon material-symbols-outlined">lock</span>
                          <input type="password" placeholder="contrasenya" id="contrasenya">
                      </div>
                          <button type="submit">Actualizar</button>
                      </form>
                  </div>
              </div>
      </div>
  </div>
  </div>
  </div>
</div>
  `,
  script: async () => {
    const sesion = localStorage.getItem("id");
    const usuario = await User.getAllById(sesion);
    const emailAvatar = document.querySelector("#emailAvatar");
    emailAvatar.innerHTML = usuario.email;
    const nombreAvatar = document.querySelector("#nombreAvatar");
    nombreAvatar.innerHTML = usuario.nombre;
    const nombre = document.querySelector("#nombre");
    nombre.value = usuario.nombre;
    const primerApellido = document.querySelector("#primerApellido");
    primerApellido.value = usuario.primerApellido;
    const segundoApellido = document.querySelector("#segundoApellido");
    segundoApellido.value = usuario.segundoApellido;
    const email = document.querySelector("#email");
    email.value = usuario.email;
    const telefono = document.querySelector("#telefono");
    telefono.value = usuario.telefono;
    const contrasenya = document.querySelector("#contrasenya");
    contrasenya.value = contrasenya.telefono;
    const form = document.querySelector("#editarPerfil");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      event.stopPropagation();
      form.classList.add("was-validated");
      if (!form.checkValidity()) {
        console.log("formulario no valido");
      } else {
        try {
          const nombreU = nombre.value;
          const primerApellidoU = primerApellido.value;
          const segundoApellidoU = segundoApellido.value;
          const emailU = email.value;
          const telefonoU = telefono.value;
          const contrasenyaU = contrasenya.value;
          const usuarioLogeado = await User.update(nombreU, primerApellidoU, segundoApellidoU, emailU, contrasenyaU, telefonoU, sesion);
          console.log(usuarioLogeado);
          if (usuarioLogeado.length > 10) {
            Swal.fire({
              icon: "info",
              title: "Se ha actualizado correctamente"
            });
            window.location.href = "/tejada/#/home";
          } else {
            let errorHTML = "";
            for (const error of usuarioLogeado) {
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
          alert("No se ha podido iniciar sesión " + error);
        }
      }
    });
  }
};
export {
  editarPerfil as default
};
