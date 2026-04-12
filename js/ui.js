export function mostrarObras(obras) {

  const contenedor =
    document.getElementById("lista-obras") ||
    document.getElementById("mis-obras");

  if (!contenedor) return;

  contenedor.innerHTML = "";

  if (!Array.isArray(obras) || obras.length === 0) {
    contenedor.innerHTML = "<p>No hay obras</p>";
    return;
  }

  obras.forEach((obra) => {
    const div = document.createElement("div");
    div.classList.add("card");

    const imagen = obra.imagen || "https://via.placeholder.com/300";
    const titulo = obra.titulo || "Sin título";
    const autor = obra.autor || "-";

    div.innerHTML = `
      <img src="${imagen}" alt="${titulo}">
      
      <div class="card-content">
        <h3>${titulo}</h3>
        <p>${autor}</p>
        <p class="meta">${obra.museo || ""}</p>
        <button onclick="verDetalle('${obra.id}')">Ver</button>
      </div>
    `;

    contenedor.appendChild(div);
  });
}