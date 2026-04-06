import { guardarObras, obtenerObras } from "./storage.js";
import { Obra } from "./classes.js";



const usuario = JSON.parse(localStorage.getItem("usuario")) || { nombre: "Anonimo" };

let obras = obtenerObras();

function obtenerMisObras() {
  return obras.filter(o => o.museo === usuario.nombre);
}

function mostrarMisObras() {
  const contenedor = document.getElementById("mis-obras");
  if (!contenedor) return;

  const misObras = obtenerMisObras();

  if (misObras.length === 0) {
    contenedor.innerHTML = "<p>No tienes obras aún</p>";
    return;
  }

  contenedor.innerHTML = "";

  misObras.forEach((obra) => {
    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
      <img src="${obra.imagen || 'https://via.placeholder.com/300'}" alt="${obra.titulo || 'obra'}">
      <h3>${obra.titulo || "Sin título"}</h3>
      <p>${obra.autor || "-"}</p>

      <button onclick="verDetalle('${obra.id}')">Ver</button>
      <button onclick="eliminarObra('${obra.id}')">Eliminar</button>
    `;

    contenedor.appendChild(div);
  });
}



document.addEventListener("DOMContentLoaded", () => {
  mostrarMisObras();
});



const btn = document.getElementById("btn-publicar");
const form = document.getElementById("form-obra");

if (btn && form) {
  btn.addEventListener("click", () => {
    form.style.display = form.style.display === "none" ? "block" : "none";
  });
}



if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const autor = document.getElementById("autor").value;
    const tecnica = document.getElementById("tecnica").value;
    const descripcion = document.getElementById("descripcion").value;
    const estado = document.getElementById("estado").value;
    const riesgo = document.getElementById("riesgo").value;
    const medidas = document.getElementById("medidas").value;

    const danos = Array.from(document.querySelectorAll(".danos:checked")).map(e => e.value);
    const soporte = Array.from(document.querySelectorAll(".soporte:checked")).map(e => e.value);
    const tecnicaCheck = Array.from(document.querySelectorAll(".tecnica-check:checked")).map(e => e.value);
    const superficie = Array.from(document.querySelectorAll(".superficie:checked")).map(e => e.value);
    const marco = Array.from(document.querySelectorAll(".marco:checked")).map(e => e.value);

    const file = document.getElementById("imagen")?.files[0];

    const crearObra = (imagen) => {
      const nueva = new Obra(titulo, autor, tecnica);

      
      nueva.id = "local_" + Date.now();

      nueva.descripcion = descripcion;
      nueva.estado = estado;
      nueva.riesgo = riesgo;
      nueva.medidas = medidas;
      nueva.danos = danos;

      nueva.conservacion = {
        soporte,
        tecnica: tecnicaCheck,
        superficie,
        marco
      };

      nueva.imagen = imagen;
      nueva.museo = usuario.nombre;

      obras.push(nueva);
      guardarObras(obras);

      mostrarMisObras();
    };

    if (file) {
      const reader = new FileReader();
      reader.onload = () => crearObra(reader.result);
      reader.readAsDataURL(file);
    } else {
      crearObra(null);
    }

    e.target.reset();
  });
}


window.verDetalle = function(id) {
  localStorage.setItem("obraSeleccionada", id);
  localStorage.setItem("volverA", window.location.href);
  window.location.href = "../html/detalles.html";
};



window.eliminarObra = function(id) {
  obras = obras.filter(o => String(o.id) !== String(id));
  guardarObras(obras);
  mostrarMisObras();
};