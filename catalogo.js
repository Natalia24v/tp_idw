import { inicializarSalones } from './datos.js';
inicializarSalones();

const catalogo = document.getElementById("catalogo");
const salones = JSON.parse(localStorage.getItem("salones")) || [];

salones.forEach(salon => {
  catalogo.innerHTML += `
    <div class="col-md-6 col-lg-3 mb-4">
      <div class="card h-100">
        <img src="${salon.imagen}" class="card-img-top" alt="${salon.nombre}">
        <div class="card-body">
          <h5 class="card-title">${salon.nombre}</h5>
          <p class="card-text">${salon.descripcion}</p>
          <button class="btn btn-success mt-2" onclick='reservarSalon(${JSON.stringify(salon)})'>Reservar</button>
        </div>
      </div>
    </div>
  `;
});

window.reservarSalon = function(salon) {
  const reservas = JSON.parse(localStorage.getItem("reservas")) || [];

  const nuevaReserva = {
    id: Date.now(),
    salon: salon.nombre,
    imagen: salon.imagen,
    fecha: new Date().toLocaleDateString(),
    estado: "Pendiente"
  };

  reservas.push(nuevaReserva);
  localStorage.setItem("reservas", JSON.stringify(reservas));

  alert(`✅ ¡Reservaste ${salon.nombre}! Te contactaremos para coordinar los detalles.`);
};