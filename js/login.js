import { obtenerUsuarios, guardarUsuario } from "./storage.js";

document.addEventListener("DOMContentLoaded", () => {


  const form = document.getElementById("login-form");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value.toLowerCase().trim();
      const password = document.getElementById("password").value;

      const usuarios = obtenerUsuarios();

      console.log("Usuarios:", usuarios); // 🔥 debug

      const usuario = usuarios.find(
        u => u.email === email && u.password === password
      );

      if (usuario) {
        guardarUsuario(usuario);
        window.location.href = "../app.html";
      } else {
        alert("Credenciales incorrectas");
      }
    });
  }

  const btnVolver = document.getElementById("btn-volver");

  if (btnVolver) {
    btnVolver.addEventListener("click", () => {
      window.history.back();
    });
  }

});