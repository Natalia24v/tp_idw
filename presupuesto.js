document.addEventListener("DOMContentLoaded", () => {
  const salon = JSON.parse(sessionStorage.getItem("salonSeleccionado"));
  const infoSalonDiv = document.getElementById("infoSalon");
  const form = document.getElementById("formPresupuesto");
  const resumen = document.getElementById("resumen");
  const detalle = document.getElementById("detalle");
  const totalSpan = document.getElementById("total");

  if (!salon) {
    infoSalonDiv.innerHTML = "<p class='text-danger'>No hay ningún salón seleccionado. Volvé al catálogo para elegir uno.</p>";
    form.style.display = "none";
    return;
  }

  infoSalonDiv.innerHTML = `
    <div class="alert alert-info">
      <h4>Salón seleccionado: ${salon.nombre}</h4>
      <p>Precio base: $${salon.precio.toFixed(2)}</p>
    </div>
  `;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombreCliente = document.getElementById("nombreCliente").value.trim();
    const fecha = document.getElementById("fecha").value;
    if (!nombreCliente) {
      alert("Por favor, ingresá apellido y nombre.");
      return;
    }
    if (!fecha) {
      alert("Por favor, seleccioná una fecha válida.");
      return;
    }

    const serviciosCheckboxes = [...document.querySelectorAll('input[type="checkbox"]:checked')];
    const servicios = serviciosCheckboxes.map(c => c.value);
    const costoServicios = serviciosCheckboxes.reduce((acc, c) => acc + Number(c.dataset.precio), 0);

    const total = salon.precio + costoServicios;

    const id = Date.now();

    const presupuesto = {
      id,
      nombreCliente,
      fecha,
      temática: "Infantil",
      servicios,
      total,
      salon: {
        nombre: salon.nombre,
        precio: salon.precio
      }
    };

    const presupuestosGuardados = JSON.parse(localStorage.getItem("presupuestos")) || [];
    presupuestosGuardados.push(presupuesto);
    localStorage.setItem("presupuestos", JSON.stringify(presupuestosGuardados));

    detalle.innerHTML = `
      <p><strong>Cliente:</strong> ${nombreCliente}</p>
      <p><strong>Salón elegido:</strong> ${salon.nombre}</p>
      <p><strong>Fecha:</strong> ${fecha}</p>
      <p><strong>Servicios extra:</strong> ${servicios.length > 0 ? servicios.join(", ") : "Ninguno"}</p>
    `;
    totalSpan.textContent = total.toFixed(2);
    resumen.style.display = "block";

  });
});
