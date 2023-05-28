
import { Imagen } from '../../../bd/imagen'

export default {
  template: `
  <div class="container mt-5">
    <div class="row">
    <h1 class="text-center p-2 w-100">Registro</h1>
    <div class="col-12 col-md-4 offset-md-4">
      <div id="errores"></div>
      <form id="uploadForm">
      <input type="file" id="fileInput" name="imagen">
      <button type="submit">Enviar</button>
    </form>
    </div>
    
   
</div>
    `,
  script: (id) => {
    const uploadForm = document.getElementById('uploadForm')
    const fileInput = document.getElementById('fileInput')

    uploadForm.addEventListener('submit', async (event) => {
      event.preventDefault()

      const file = fileInput.files[0]
      if (file) {
        const formData = new FormData()
        formData.append('imagen', file)

        const imagen = await Imagen.create(id, formData)
        console.log(imagen)
      } else {
        console.error('No se seleccionó ninguna imagen')
      }
    })
  }
}
