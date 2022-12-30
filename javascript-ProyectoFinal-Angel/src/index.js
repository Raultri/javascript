import { mostrarProductos } from "./App.js";
import { obtenerProductos } from "./obtenerProductos.js";
import { obtenerCarritoStorage } from "./storage.js";
import { pintarCarrito } from "./accionesCarrito.js";
import { actualizarTotalesCarrito } from "./actualizarCarrito.js";

document.addEventListener("DOMContentLoaded", async () => {

  const productos = await obtenerProductos();
  mostrarProductos(productos);
  
  if (localStorage.getItem("carrito")) {
    const carrito = obtenerCarritoStorage();
    pintarCarrito(carrito);
    actualizarTotalesCarrito(carrito);
  }
});
