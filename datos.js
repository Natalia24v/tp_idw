// data.js
export const inicializarSalones = () => {
  if (!localStorage.getItem("salones")) {
    const salones = [
      {
        id: 1,
        nombre: "Salón 1",
        descripcion: "Espacio ideal para fiestas pequeñas y reuniones íntimas.",
        imagen: "assets/img/salon1.jpg"
      },
      {
        id: 2,
        nombre: "Salón 2",
        descripcion: "Decoración temática y zona de juegos para los más chicos.",
        imagen: "assets/img/salon2.jpg"
      },
      {
        id: 3,
        nombre: "Salón 3",
        descripcion: "Gran capacidad y servicios adicionales incluidos.",
        imagen: "assets/img/salon3.jpg"
      },
      {
        id: 4,
        nombre: "Salón 4",
        descripcion: "Espacio versátil para cualquier tipo de evento familiar.",
        imagen: "assets/img/salon4.jpg"
      }
    ];
    localStorage.setItem("salones", JSON.stringify(salones));
  }
};
