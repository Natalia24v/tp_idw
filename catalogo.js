import { inicializarSalones } from './datos.js';
inicializarSalones();

const catalogo = document.getElementById("catalogo");
const salones = JSON.parse(localStorage.getItem("salones")) || [];

salones.forEach((salon, index) => {
  catalogo.innerHTML += `
    <div class="col-md-6 col-lg-3 mb-4">
      <div class="card h-100">
        <img src="${salon.imagen}" class="card-img-top" alt="${salon.nombre}">
        <div class="card-body">
          <h5 class="card-title">${salon.nombre}</h5>
          <p class="card-text">${salon.descripcion}</p>
          <button class="btn btn-success mt-2 reservar-btn" data-index="${index}">Reservar</button>
        </div>
      </div>
    </div>
  `;
});

document.querySelectorAll(".reservar-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const index = btn.getAttribute("data-index");
    const salon = salones[index];

    sessionStorage.setItem("salonSeleccionado", JSON.stringify({
      nombre: salon.nombre,
      precio: salon.precio || 20000
    }));

    window.location.href = "presupuesto.html";
  });
});
