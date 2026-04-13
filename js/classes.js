
export class Museo {
  constructor(nombre) {
    this.nombre = nombre;
    this.obras = [];
  }

  agregarObra(obra) {
    this.obras.push(obra);
  }
}



export class Obra {
  constructor(titulo, autor, tecnica) {

    this.id = "local_" + Date.now();

    this.titulo = titulo;
    this.autor = autor;
    this.tecnica = tecnica;

    this.descripcion = "";
    this.estado = "";
    this.riesgo = "";
    this.medidas = "";

    this.danos = [];

    this.conservacion = {
      soporte: [],
      tecnica: [],
      superficie: [],
      marco: []
    };

    this.imagen = null;
    this.museo = "";
  }
}