document.getElementById('task-registration-form').addEventListener('submit',btnSubmit);


function btnSubmit(event){
    event.preventDefault()//Detiene el envio del formulario

    //Capturamos los Campos del formulario
    //Datos Cliente
    const clientName = document.getElementById('client-name').value;
    const clientePhone = document.getElementById('client-phone').value;
    const clienteEmail = document.getElementById('client-email').value;
    //Datos del equipo
    const equipmentType = document.getElementById('equipment-type').value;
    const equipmentMarca = document.getElementById('equipment-marca').value;
    const equipmentModelo = document.getElementById('equipment-modelo').value;
    const equipmentAnio = document.getElementById('equipment-anio').value;
    const equipmentSerie = document.getElementById('equipment-serie').value;
    const equipmentDescription = document.getElementById('problem-description').value;
    const equipmentPriority = document.getElementById('priority').value;

    //Creamos el Objeto

    const nuevaTarea ={
        
        id: Date.now(),
        fechaIngreso: new Date().toLocaleDateString(),

        //Datos Cliente
        cliente: clientName,
        telefono: clientePhone,
        email: clienteEmail,

        //Datos Equipo
        tipoEquipo: equipmentType,
        marca: equipmentMarca,
        modelo:equipmentModelo,
        anio: equipmentAnio,
        serie: equipmentSerie,
        descripcion: equipmentDescription,
        prioridad:equipmentPriority,
        
        //Valor por defecto
        status: 'pendiente'
    }

    console.log("Tarea Creada: " ,nuevaTarea);
    
    showToast(" Registro con éxito ", "success")
    // showToast(" Error al registrar ", "error")

    //Rinicio de formulario
    document.getElementById("task-registration-form").reset();

}

function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  toast.textContent = message;

  // Cambiar color según tipo
  toast.style.backgroundColor = type === "success" ? "green" : "red";

  // Mostrar
  toast.classList.add("show");

  // Ocultar después de 3 segundos
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

