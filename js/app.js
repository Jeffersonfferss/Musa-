import { Museo } from "./classes.js";
import { mostrarObras } from "./ui.js";
import { obtenerObrasAPI } from "./api.js";
import { guardarObras, obtenerObras } from "./storage.js";




const museo = new Museo("MUSA");
museo.obras = obtenerObras();

 //MOSTRAR MUSEO OBRASaaaaaaaaaa

mostrarObras(museo.obras);




window.verDetalle = function(id) {
  localStorage.setItem("obraSeleccionada", id);
  localStorage.setItem("volverA", window.location.href);

  const esSubcarpeta = window.location.pathname.includes("/html/");
  window.location.href = esSubcarpeta
    ? "../html/detalles.html"
    : "./html/detalles.html";
};


let cargando = false;

const btnApi = document.getElementById("btn-api");

if (btnApi) {
  btnApi.addEventListener("click", async () => {
    if (cargando) return;

    cargando = true;

    try {
      const obrasAPI = await obtenerObrasAPI();

      // 🔥 evitar duplicados por ID
      obrasAPI.forEach(obra => {
        if (!museo.obras.some(o => String(o.id) === String(obra.id))) {
          museo.obras.push(obra);
        }
      });

      guardarObras(museo.obras);
      mostrarObras(museo.obras);

    } catch (error) {
      console.error("Error cargando API:", error);
    }

    cargando = false;
  });
}




document.addEventListener("DOMContentLoaded", () => 

  const buscador = document.getElementById("buscador");

  if (buscador) {
    buscador.addEventListener("input", (e) => {
      const texto = e.target.value.toLowerCase();

      const filtradas = museo.obras.filter(obra =>
        (obra.titulo || "").toLowerCase().includes(texto) ||
        (obra.autor || "").toLowerCase().includes(texto) ||
        (obra.tecnica || "").toLowerCase().includes(texto)
      );

      mostrarObras(filtradas);
    });
  }


  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("active");
    });



  const navUser = document.getElementById("nav-user");

  if (navUser) {
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (usuario) {
      navUser.innerHTML = `
        <a href="./html/perfil.html">${usuario.nombre}</a>
        <a href="#" id="logout">Salir</a>
      `;

      document.getElementById("logout")?.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("usuario");
        window.location.href = "./index.html";
      });

    } else {
      navUser.innerHTML = `<a href="./html/login.html">Entrar</a>`;
    }
  }

});