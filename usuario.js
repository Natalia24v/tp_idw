if (!sessionStorage.getItem("accessToken")) {
  alert("Acceso denegado. Iniciá sesión primero.");
  location.href = "login.html";
}

fetch("https://dummyjson.com/users")
  .then(res => res.json())
  .then(data => {
    const contenedor = document.getElementById("usuarios");

    data.users.forEach(user => {
      contenedor.innerHTML += `
        <div class="col-md-4">
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <h5 class="card-title">${user.firstName} ${user.lastName}</h5>
              <p class="card-text"><strong>Email:</strong> ${user.email}</p>
              <p class="card-text"><strong>Username:</strong> ${user.username}</p>
            </div>
          </div>
        </div>
      `;
    });
  })
  .catch(error => {
    document.getElementById("usuarios").innerHTML = "<p class='text-danger'>No se pudieron cargar los usuarios.</p>";
    console.error(error);
  });
