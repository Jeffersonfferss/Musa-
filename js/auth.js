import { obtenerUsuario } from "./storage.js";

const usuario = obtenerUsuario();

if (!usuario) {
  window.location.href = "html/login.html";
}