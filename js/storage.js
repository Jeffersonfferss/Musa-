
export function guardarObras(obras) {
  localStorage.setItem("obras", JSON.stringify(obras));
}

export function obtenerObras() {
  try {
    return JSON.parse(localStorage.getItem("obras")) || [];
  } catch (error) {
    console.error("Error al leer obras:", error);
    return [];
  }
}


export function guardarUsuario(usuario) {
  localStorage.setItem("usuario", JSON.stringify(usuario));
}

export function obtenerUsuario() {
  try {
    return JSON.parse(localStorage.getItem("usuario"));
  } catch (error) {
    console.error("Error al leer usuario:", error);
    return null;
  }
}

export function cerrarSesion() {
  localStorage.removeItem("usuario");
}



export function obtenerUsuarios() {
  try {
    return JSON.parse(localStorage.getItem("usuarios")) || [];
  } catch (error) {
    console.error("Error al leer usuarios:", error);
    return [];
  }
}

export function guardarUsuarios(usuarios) {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}