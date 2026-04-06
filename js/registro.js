import { guardarUsuario, obtenerUsuarios, guardarUsuarios } from "./storage.js";
document.addEventListener("DOMContentLoaded", () => {


  const form = document.getElementById("registro-form");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nombre = document.getElementById("nombre").value;
      const email = document.getElementById("email").value.toLowerCase().trim();
      const password = document.getElementById("password").value;

      const usuario = { nombre, email, password };

      const usuarios = obtenerUsuarios();

      const existe = usuarios.find(u => u.email === email);

      if (existe) {
        alert("Este correo ya está registrado");
        return;
      }

      usuarios.push(usuario);
      guardarUsuarios(usuarios);
      guardarUsuario(usuario);
      window.location.href = "../app.html";
    });
  }


  const btnVolver = document.getElementById("btn-volver");

  if (btnVolver) {
    btnVolver.addEventListener("click", () => {
      window.history.back();
    });
  }

});