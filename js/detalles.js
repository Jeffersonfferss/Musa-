import { obtenerObras } from "./storage.js";



const contenedor = document.getElementById("detalle");

if (!contenedor) {
  console.error("No existe #detalle");
} else {

  const obras = obtenerObras();
  const id = localStorage.getItem("obraSeleccionada");

  const obra = obras.find(o => String(o.id) === String(id));

  if (!obra) {
    contenedor.innerHTML = "<p>Obra no encontrada</p>";
  } else {

    contenedor.innerHTML = `
      <div class="detalle-card">

        <div class="detalle-img">
          <img src="${obra.imagen || ''}" alt="${obra.titulo}">
        </div>

        <div class="detalle-info">

          <h2>${obra.titulo}</h2>

          <div class="bloque">
            <p><strong>Autor:</strong> ${obra.autor || "-"}</p>
            <p><strong>Técnica:</strong> ${obra.tecnica || "-"}</p>
            <p><strong>Museo:</strong> ${obra.museo || "-"}</p>
            <p><strong>Medidas:</strong> ${obra.medidas || "-"}</p>
            <p><strong>Estado:</strong> ${obra.estado || "-"}</p>
            <p><strong>Riesgo:</strong> ${obra.riesgo || "-"}</p>
            
          </div>

          ${
            obra.descripcion
              ? `
          <div class="bloque">
            <h3>Descripción</h3>
            <p>${obra.descripcion}</p>
          </div>`
              : ""
          }

        </div>
      </div>
    `;
  }
}

const btnVolver = document.getElementById("btn-volver");

if (btnVolver) {
  btnVolver.addEventListener("click", () => {

    const volverA = localStorage.getItem("volverA");

    if (volverA) {
      window.location.href = volverA;
    } else {
      window.history.back();
    }

  });
}