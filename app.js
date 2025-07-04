import { inicializarSalones } from './datos.js';

// Bloquear acceso si no estan logueados

if (!sessionStorage.getItem("accessToken")) {
  alert("Iniciar sesión para acceder a administración.");
  location.href = "login.html";
}


// Función para inicializar LocalStorage si no existe
function initializeLocalStorage() {
    if (!localStorage.getItem('salones')) {
        localStorage.setItem('salones', JSON.stringify(inicializarSalones));
        console.log("LocalStorage de salones inicializado.");
    }
}

document.addEventListener('DOMContentLoaded', () => {
  inicializarSalones(); 
  initializeLocalStorage();
});



/*/ Obtener todos los salones del LocalStorage
function obtenerSalones() {
    const salonesJSON = localStorage.getItem('salones');
    return salonesJSON ? JSON.parse(salonesJSON) : [];
}

// Guardar los salones en LocalStorage
function guardarSalones(salones) {
    localStorage.setItem('salones', JSON.stringify(salones));
}

// Generar un ID único simple
function generarIdUnico() {
    return Date.now().toString(36) + Math.random().toString(36);
}

// CRUD - Crear
function addSalon(nuevoSalon) {
    const salones = obtenerSalones();
    generarIdUnico; // Asignar un ID único
    nuevoSalon.id = generarIdUnico();
    salones.push(nuevoSalon);
    guardarSalones(salones);
}

// CRUD - Read 
function obtenerSalonId(id) {
    const salones = obtenerSalones();
    return salones.find(salon => salon.id === id);
}

// CRUD - Update
function modificarSalon(updatedSalon) {
    let salones = obtenerSalones();
    const index = salones.findIndex(salon => salon.id === updatedSalon.id);
    if (index !== -1) {
        salones[index] = updatedSalon;
        guardarSalones(salones);
        return true;
    }
    return false; // Salón no encontrado
}

// CRUD - Delete
function borrarSalon(id) {
    let salones = obtenerSalones();
    const initialLength = salones.length;
    salones = salones.filter(salon => salon.id !== id);
    guardarSalones(salones);
    return salones.length < initialLength; // True si se eliminó, false si no se encontró
}*/

/* Función para mensaje de alerta */
const mensaje = document.getElementById("mensaje");



const form = document.getElementById("formSalon");
    const tablaBody = document.querySelector("#tablaSalones tbody");

    const obtenerSalones = () => JSON.parse(localStorage.getItem("salones")) || [];
    const guardarSalones = (salones) => localStorage.setItem("salones", JSON.stringify(salones));

    const renderTabla = () => {
      const salones = obtenerSalones();
      tablaBody.innerHTML = "";
      salones.forEach(salon => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
          <td><img src="${salon.imagen}" width="100" alt="Imagen"></td>
          <td>${salon.nombre}</td>
          <td>${salon.descripcion}</td>
          <td>
            <button class="btn btn-sm btn-btn-outline-dark" onclick="editarSalon('${salon.id}')">Editar</button>
            <button class="btn btn-sm btn-dark" onclick="eliminarSalon('${salon.id}')">Eliminar</button>
          </td>
        `;
        tablaBody.appendChild(fila);
      });
    };

    window.editarSalon = (id) => {
      const salon = obtenerSalones().find(s => String(s.id) === String(id));
      document.getElementById("salonId").value = salon.id;
      document.getElementById("nombre").value = salon.nombre;
      document.getElementById("descripcion").value = salon.descripcion;
      document.getElementById("imagen").value = salon.imagen;
    };

    window.eliminarSalon = (id) => {
      const salones = obtenerSalones().filter(s => String(s.id) !== String(id));
      guardarSalones(salones);
      renderTabla();
    };

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = document.getElementById("salonId").value;
      const nombre = document.getElementById("nombre").value;
      const descripcion = document.getElementById("descripcion").value;
      const imagen = document.getElementById("imagen").value;

      let salones = obtenerSalones();

      if (id) {
        // Editar
        salones = salones.map(salon => String(salon.id) ===String(id) ? { id: salon.id, nombre, descripcion, imagen } : salon);
      } else {
        // Crear
        const nuevoSalon = { id: Date.now(), nombre, descripcion, imagen };
        salones.push(nuevoSalon);
      }

      guardarSalones(salones);
      if (mensaje) {
        mensaje.innerHTML = `
          <div class="alert alert-success" role="alert">
            Salón ${id ? 'editado' : 'creado'} correctamente.
          </div>
        `;
        setTimeout(() => mensaje.innerHTML = "", 3000);
      }
      form.reset();
      renderTabla();
    });

    renderTabla();

