import { Museo } from "./classes.js";

const museo = new Museo("MUSA");

                           // Test
console.log("App cargada", museo);

                            //Formulario
document.getElementById("form-obra").addEventListener("submit", (e) => {
    e.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const autor = document.getElementById("autor").value;

    console.log("Nueva obra:", titulo, autor);
});