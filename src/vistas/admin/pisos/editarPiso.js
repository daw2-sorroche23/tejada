
import { Piso } from '../../../bd/piso'

export default {
  template: `
  <div class="container mt-5">
    <div class="row">
    <h1 class="text-center p-2 w-100">Registro</h1>
    <div class="col-12 col-md-4 offset-md-4">
      <div id="errores"></div>
      <form id="form_registro" class="p-3" novalidate>
        <label class="mt-3 form-label" for="nombre">Cocina: </label>
        <select name="select" id="cocina">
        <option value="1" selected>True</option>
        <option value="0" >False</option>
        </select>

        <label class="mt-3 form-label" for="apellidos" >Salon: </label>
        <select name="select" id="salon">
        <option value="1" selected>True</option>
        <option value="0" >False</option>
        </select>

        <label class="mt-3 form-label" for="apellidos" >Terraza: </label>
        <select name="select" id="terraza">
        <option value="1" selected>True</option>
        <option value="0">False</option>
        </select>
        
        <label class="mt-3 form-label" for="apellidos" >Wifi: </label>
        <select name="select" id="wifi">
        <option value="1" selected>True</option>
        <option value="0">False</option>
        </select>

        <label class="mt-3 form-label" for="telefono">Aseos: </label>
        <input 
          id="aseos"
          type="number" 
          class="form-control" 
          value="" 
          placeholder = "1" required 
          />
        <div class="invalid-feedback">Este campo no es correcto</div>

        <label class="mt-3 form-label" for="telefono">Sexo: </label>
        <input 
          id="sexo"
          type="text" 
          class="form-control" 
          value="" 
          placeholder = "1" required 
          />
        <div class="invalid-feedback">Este campo no es correcto</div>
        

        <button type="submit" class="mt-5 btn btn-success w-100">
            Enviar
        </button>
      </form>
    </div>
    
   
</div>
    `,
  script: async(id) => {

    const piso = await Piso.getAllById(id)


    const selectCocina = document.getElementById('cocina')

    if(piso.cocina==0){
      selectCocina.innerHTML= `
      <option value="1" >True</option>
      <option value="0" selected>False</option>
      `
    }else{
      selectCocina.innerHTML= `
      <option value="1" selected>True</option>
      <option value="0" >False</option>
      `      
    }

    const selectSalon = document.getElementById('salon')

    if(piso.salon==0){
      selectSalon.innerHTML= `
      <option value="1" >True</option>
      <option value="0" selected>False</option>
      `
    }else{
      selectSalon.innerHTML= `
      <option value="1" selected>True</option>
      <option value="0" >False</option>
      `      
    }

    const selectTerraza= document.getElementById('terraza')

    if(piso.terraza==0){
      selectTerraza.innerHTML= `
      <option value="1" >True</option>
      <option value="0" selected>False</option>
      `
    }else{
      selectTerraza.innerHTML= `
      <option value="1" selected>True</option>
      <option value="0" >False</option>
      `      
    }

    const selectWifi= document.getElementById('wifi')

    if(piso.wifi==0){
      selectWifi.innerHTML= `
      <option value="1" >True</option>
      <option value="0" selected>False</option>
      `
    }else{
      selectWifi.innerHTML= `
      <option value="1" selected>True</option>
      <option value="0" >False</option>
      `      
    }

    const aseosInput = document.querySelector('#aseos')

    aseosInput.value = piso.aseos

    const sexoInput = document.querySelector('#sexo')

    sexoInput.value = piso.sexo
    

    document.querySelector('#form_registro').addEventListener('submit', async function (e) {
      e.preventDefault()
      try {
        // Obtener el elemento <select> por su id
        const cocina = selectCocina.value
        const salon = selectSalon.value
        const terraza = selectTerraza.value
        const wifi = selectWifi.value
        const aseos = aseosInput.value
        const sexo = sexoInput.value

        const piso = await Piso.update(cocina, salon, terraza, wifi, aseos, sexo, id)
        console.log(piso)

        if (piso.length > 10) {
          alert('Piso actualizado con éxito')
          window.location.href = '/#/pisoAdmin'
        } else {
          const errorContainer = document.querySelector('#errores')
          let errorHTML = ''
          for (const error of piso) {
            errorHTML += `<p>${error}</p>`
          }
          errorContainer.innerHTML = errorHTML
        }

        // Cargamos la página login
      } catch (error) {
        console.log(error)
        alert('Error al crear usuario')
      }
    })
  }
}
