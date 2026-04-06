export async function obtenerObrasAPI() {
  try {
    const res = await fetch("https://api.artic.edu/api/v1/artworks?page=1&limit=10");

    const data = await res.json();

return data.data
  .filter(obra => obra.image_id)
  .map(obra => ({
    id: "api_" + obra.id, // ✅ ID REAL

    titulo: obra.title,
    autor: obra.artist_title || "Desconocido",
    tecnica: obra.medium_display || "No especificado",

    imagen: `https://www.artic.edu/iiif/2/${obra.image_id}/full/843,/0/default.jpg`,

    museo: "API externa",

    descripcion: obra.thumbnail?.alt_text || "",
    estado: "",
    riesgo: "",
    medidas: "",
    danos: [],
    conservacion: {}
  }));
  } catch (error) {
    console.error("Error API:", error);
    return [];
  }
}