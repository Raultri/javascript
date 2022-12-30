import { obtenerProductos } from "./obtenerProductos.js";
import { mostrarProductos } from "./App.js";

const inputSearch = document.getElementById("buscarProducto");

inputSearch.addEventListener("input", (e) => {
  buscarProducto(productos, e.target.value);
});

const productos = await obtenerProductos();
const buscarProducto = async (productos, productoNombre) => {
  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(productoNombre.toLowerCase())
  );

  mostrarProductos(productosFiltrados);
  console.log(productosFiltrados);
};

export { buscarProducto };
