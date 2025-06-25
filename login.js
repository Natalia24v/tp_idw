document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const mensaje = document.getElementById("mensaje");

    try {
        const res = await fetch("https://dummyjson.com/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        if (!res.ok) throw new Error("Usuario o contraseña incorrectos");

        const data = await res.json();
        sessionStorage.setItem("accessToken", data.token);
        location.href = "admin.html";
    } catch (err) {
        mensaje.textContent = err.message;
    }
});
