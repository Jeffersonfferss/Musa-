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
    const tecnica = document.getElementById("tecnica-input").value;
    const descripcion = document.getElementById("descripcion").value;
    const medidas = document.getElementById("medidas").value;

    const estado = document.querySelector('input[name="estado"]:checked')?.value || null;
    const riesgo = document.querySelector('input[name="riesgo"]:checked')?.value || null;


    function getValues(category) {
      return Array.from(
        document.querySelectorAll(`input[data-category="${category}"]:checked`)
      ).map(el => el.value);
    }

    const danos = getValues("danos");
    const soporte = getValues("soporte");
    const tecnicaCheck = getValues("tecnica");
    const marco = getValues("marco");

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

    form.reset();
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


