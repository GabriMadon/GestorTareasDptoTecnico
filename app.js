document
  .getElementById("task-registration-form")
  .addEventListener("submit", btnSubmit);

let currentView = "registration";

// Funcio Formulario
function btnSubmit(event) {
  event.preventDefault(); //Detiene el envio del formulario

  //Capturamos los Campos del formulario
  //Datos Cliente
  const clientName = document.getElementById("client-name").value;
  const clientPhone = document.getElementById("client-phone").value;
  const clientEmail = document.getElementById("client-email").value;
  //Datos del equipo
  const equipmentType = document.getElementById("equipment-type").value;
  const equipmentMarca = document.getElementById("equipment-marca").value;
  const equipmentModelo = document.getElementById("equipment-modelo").value;
  // const equipmentAnio = document.getElementById('equipment-anio').value;
  const equipmentSerie = document.getElementById("equipment-serie").value;
  const equipmentDescription = document.getElementById(
    "problem-description"
  ).value;
  const equipmentPriority = document.getElementById("priority").value;

  //Capturamos la informacion en un Objeto

  const nuevaTarea = {
    id: Date.now(),
    fechaIngreso: new Date().toLocaleDateString(),

    //Datos Cliente
    clienteN: clientName,
    telefono: clientPhone,
    email: clientEmail,

    //Datos Equipo
    tipoEquipo: equipmentType,
    marca: equipmentMarca,
    modelo: equipmentModelo,
    serie: equipmentSerie,
    descripcion: equipmentDescription,
    prioridad: equipmentPriority,

    //Valor por defecto
    status: "Pendiente",
  };

  //Guardamos Datos en LocalStorage
  const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
  // Agregamos la nueva tarea al final del array
  tareas.push(nuevaTarea);
  // Guardamos el array actualizado en el localStorage
  localStorage.setItem("tareas", JSON.stringify(tareas));
  console.log("Tarea Creada: ", nuevaTarea);

  renderTask();

  showToast(" Registro con éxito ", "success");
  // showToast(" Error al registrar ", "error")

  //Rinicio de formulario
  document.getElementById("task-registration-form").reset();
}

//Funcion showToast
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
  }, 2000);
}

//Funcion View Registro-Lista SPA

function showView(viewName) {
  //id del DOM en variables
  const registrationView = document.getElementById("registration-view");
  const listView = document.getElementById("list-view");
  const toggleBtn = document.getElementById("toggle-view-btn");
  const titleText = document.getElementById("title-text");

  if (viewName === "registration") {
    registrationView.style.display = "block";
    listView.style.display = "none";
    toggleBtn.textContent = "Ver Lista de Equipos";
    titleText.textContent = "Registrar Equipo";
    currentView = "registration";
    console.log("Vista Registro");
  } else if (viewName === "list") {
    registrationView.style.display = "none";
    listView.style.display = "block";
    toggleBtn.textContent = "Ver Formulario";
    titleText.textContent = "Equipos Registrados";
    currentView = "list";
    console.log("Vista Lista");
  }

  console.log("btn toggle en funcionamiento");
}

//evento btn toggle
function toggleView() {
  const nextView = currentView === "registration" ? "list" : "registration";
  showView(nextView);
  renderTask(); // repinta las tareas
}

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggle-view-btn");

  if (toggleBtn) {
    toggleBtn.addEventListener("click", toggleView);
  }

  showView("registration");
  renderTask();
});

//Funcion para renderizar 0 agregar tarea a la tabla

function renderTask() {
  const container = document.getElementById("task-container");
  const empyMessage = document.getElementById("emptyMessage");

  const tareas = JSON.parse(localStorage.getItem("tareas")) || [];

  container.innerHTML = ""; //Limpia el contenedor

  if (tareas.length === 0) {
    empyMessage.style.display = "block";
    return;
  } else {
    empyMessage.style.display = "none";
  }
  //Bucle para crear las tarjetas
  tareas.forEach((tarea) => {
    const card = document.createElement("div");
    card.className = "task-card";
    //Encabezado de la tarjeta
    const header = document.createElement("div");
    header.className = "task-card-header";
    header.innerHTML = `<div> <h3>${tarea.clienteN}</h3>
    <span>${tarea.fechaIngreso}</span></div>`;
    card.appendChild(header);

    //Btn Editar
    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.textContent = "Editar";

    header.appendChild(editBtn);

    //Modal Editar (simplificado)
    editBtn.addEventListener("click", () => {
      //creamos el Modal
      const modalEdit = document.createElement("dialog");
      modalEdit.className = "modal-edit";
      //cremaos un form del modal
      const formModal = document.createElement("form");
      formModal.className = "form-modal-edit";
      formModal.innerHTML = `
        <h2>Editar Tarea</h2>
        <label>Cliente Nombre:</label>
        <input type="text"  name="clienteN" />
        <label>Teléfono:</label>
        <input type="text"  name="telefono" />
        <label>Email: </label>
        <input type="text"  name="email"/>
        <label>Equipo Tipo:</label>
        <input type="text"  name="tipoEquipo" />
        <label>Marca:</label>
        <input type="text"  name="marca" />
        <label>Modelo:</label>  
        <input type="text"  name="modelo" />
        <label>Serie:</label>
        <input type="text"  name="serie" />
        <label>Descripción:</label>
        <textarea name="descripcion"></textarea>

        `;
      //agregamos el form al modal
      modalEdit.appendChild(formModal);
      document.body.appendChild(modalEdit);

      formModal.querySelector('[name="clienteN"]').value = tarea.clienteN;
      formModal.querySelector('[name="telefono"]').value = tarea.telefono;
      formModal.querySelector('[name="email"]').value = tarea.email;
      formModal.querySelector('[name="tipoEquipo"]').value = tarea.tipoEquipo;
      formModal.querySelector('[name="marca"]').value = tarea.marca;
      formModal.querySelector('[name="modelo"]').value = tarea.modelo;
      formModal.querySelector('[name="serie"]').value = tarea.serie;
      formModal.querySelector('[name="descripcion"]').value = tarea.descripcion;

      //Fucionalidad de guardar modal

      //btn guardar formulario Modal
      const saveBtn = document.createElement("button");

      saveBtn.className = "save-btn";
      saveBtn.textContent = "Guardar";
      //Evento btn guardar
      saveBtn.addEventListener("click", (event) => {
        event.preventDefault();

        const tareaActualizada = {
          ...tarea,
          clienteN: formModal.querySelector('[name="clienteN"]').value,
          telefono: formModal.querySelector('[name="telefono"]').value,
          email: formModal.querySelector('[name="email"]').value,
          tipoEquipo: formModal.querySelector('[name="tipoEquipo"]').value,
          marca: formModal.querySelector('[name="marca"]').value,
          modelo: formModal.querySelector('[name="modelo"]').value,
          serie: formModal.querySelector('[name="serie"]').value,
          descripcion: formModal.querySelector('[name="descripcion"]').value,
        };

        const tareaAct = JSON.parse(localStorage.getItem("tareas")) || [];
        console.log("Tarea Actualizada: ", tareaActualizada);
        const index = tareaAct.findIndex((t) => t.id === tarea.id);
        if (index !== -1) {
          tareaAct[index] = tareaActualizada;
          localStorage.setItem("tareas", JSON.stringify(tareaAct));
          showToast(" Tarea actualizada con éxito ", "success");
        }
        modalEdit.close();
        renderTask();
      });

      //funcionalida cancelar modal
      const btnCancelar = document.createElement("button");
      btnCancelar.innerText = "Cancelar";
      btnCancelar.className = "cancelar-btn";

      btnCancelar.addEventListener("click", (e) => {
        e.preventDefault();
        modalEdit.close();
      });

      //Contenedor Btns modal
      const contenedorBtns = document.createElement("div");
      contenedorBtns.className = "contenedor-btns";
      formModal.appendChild(contenedorBtns);
      contenedorBtns.appendChild(saveBtn);
      contenedorBtns.appendChild(btnCancelar);

      //Mostrar el modal

      modalEdit.showModal();
      // alert("Funcionalidad de edición en desarrollo.");
    });

    //Body
    const body = document.createElement("div");
    body.className = "task-card-body";
    body.innerHTML = `
      <hr>
      <p><strong>Telefono:</strong> ${tarea.telefono} </p>
      <p><strong>Correo Electronico:</strong> ${tarea.email}</p>
      <p><strong>Equipo:</strong> ${tarea.tipoEquipo}</p>
      <p><strong>Marca:</strong> ${tarea.marca}</p>
      <p><strong>Modelo:</strong> ${tarea.modelo}</p>
      <p><strong>Serie:</strong> ${tarea.serie}</p>
      <p><strong>Descripción del problema:</strong> ${tarea.descripcion}</p>
      <hr>
      `;
    card.appendChild(body);

    // Estatus

    const template = document.getElementById("template");
    const clone = template.content.cloneNode(true);
    const select = clone.querySelector(".badge-select");

    const statusValue = tarea.status.toLowerCase().replace(" ", "-");

    select.value = statusValue;
    select.classList.add(statusValue);

    select.addEventListener("change", (e) => {
      e.target.classList.remove(
        "pendiente",
        "en-proceso",
        "completada",
        "cancelada"
      );

      e.target.classList.add(e.target.value);
    });

    card.appendChild(clone);

    //Prioridad
    const badge = document.createElement("div");
    badge.innerHTML = `
      <span class="badge ${tarea.prioridad.toLowerCase()}">${
      tarea.prioridad
    }</span>`;

    card.appendChild(badge);

    container.appendChild(card);

    //Btn Eliminar tarea
    //toast
    const taskContainer = document.getElementById("task-container");

    function toastEliminar() {
      const toast = document.createElement("toast");
      toast.className = "toast-eliminar";
      toast.innerHTML = `
        <h2 class="eliminar-tarea" >"Estas seguro de eliminar la tarea"</h2>
        <button class="confirm-delete-btn" >Sí</button>
        <button class="cancel-delete-btn">No</button>
      
      `;
      taskContainer.prepend(toast);

      const confirmDeleteBtn = document.querySelector(".confirm-delete-btn");
        confirmDeleteBtn.addEventListener("click", (event) => {
        event.preventDefault();
        const deleteTarea = tareas.filter((t) => t.id !== tarea.id);
        localStorage.setItem("tareas", JSON.stringify(deleteTarea));
        showToast(" Tarea eliminada", "success")
        renderTask();


      });

      const cancelDeleteBtn = document.querySelector(".cancel-delete-btn");
      cancelDeleteBtn.addEventListener("click", (event) => {
        event.preventDefault();
        toast.remove();
      });
      
    }

    const deleteBtn = document.createElement("button");

    deleteBtn.className = "delete-btn";
    deleteBtn.innerText = "Eliminar";

    deleteBtn.addEventListener("click", (event) => {
      event.preventDefault();
      toastEliminar();
      // const deleteTarea = tareas.filter(t=>t.id !== tarea.id)
      // localStorage.setItem("tareas", JSON.stringify(deleteTarea));
      // renderTask();
      // console.log(deleteTarea)
    });

    header.appendChild(deleteBtn);
  });

  console.log("Tareas Renderizadas");
}
