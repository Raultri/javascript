import { actualizarTotalesCarrito } from "./actualizarCarrito.js";
import { obtenerProductos } from "./obtenerProductos.js";
import { obtenerCarritoStorage } from "./storage.js";

let carrito = [];

const validarProductoRepetido = async (productoId) => {
  if (localStorage.getItem("carrito")) {
    carrito = obtenerCarritoStorage();
  }

  const productoRepetido = carrito.find(
    (producto) => producto.id === productoId);

  if (productoRepetido) {
    productoRepetido.cantidad++;
    const cantidadProducto = document.getElementById(
      `cantidad${productoRepetido.id}`
    );
    cantidadProducto.innerText = `Cantidad: ${productoRepetido.cantidad}`;
    actualizarTotalesCarrito(carrito);
    Toastify({
      text: `Se agregó otro ${productoRepetido.nombre}`,
      duration: 2000,
    }).showToast();
  } else {
    agregarAlCarrito(productoId);
  }
};

const agregarAlCarrito = async (productoId) => {
  const productos = await obtenerProductos();

  const contenedor = document.getElementById("carrito-contenedor");
  const producto = productos.find((producto) => producto.id === productoId);
  carrito.push(producto);

  const div = document.createElement("div");
  div.classList.add("productoEnCarrito");
  div.innerHTML = `<p>${producto.nombre}</p>
                    <p>Precio: ${producto.precio}</p>
                    <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
                    <button id=eliminar${producto.id} class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">X</button>
                    `;
  contenedor.appendChild(div);
  actualizarTotalesCarrito(carrito);

  Toastify({
    text: `Se agregó el ${producto.nombre} al carrito`,
    duration: 2000,
  }).showToast();
};

const pintarCarrito = (carrito) => {
  const contenedor = document.getElementById("carrito-contenedor");

  contenedor.innerHTML = "";

  carrito.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("productoEnCarrito");
    div.innerHTML = `<p>${producto.nombre}</p>
                    <p>Precio: ${producto.precio}€</p>
                    <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
                    <button id=eliminar${producto.id} class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">X</button>
                    `;
    contenedor.appendChild(div);
  });
};

const eliminarProductoCarrito = (productoId) => {
  const carritoStorage = obtenerCarritoStorage();
  const carritoActualizado = carritoStorage.filter(
    (producto) => producto.id != productoId
  );

  actualizarTotalesCarrito(carritoActualizado);
  pintarCarrito(carritoActualizado);
};



const vaciarCarrito = document.getElementById("vaciar-carrito");
  vaciarCarrito.addEventListener("click", () => {
    if (carrito.length > 0) {
      // código para vaciar el carrito
      const carritoActualizado = [];
      carrito = [];
      actualizarTotalesCarrito(carritoActualizado);
      pintarCarrito(carritoActualizado);
      
      Swal.fire({
        title: "Ha vaciado su carrito",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    } else {
      // código para mostrar un mensaje de error
      Swal.fire({
        title: "El carrito ya está vacío",
        text: "No se puede vaciar un carrito que ya está vacío",
        icon: "error",
        showClass: {
          popup: "animate__animated animate__shakeX",
        },
      });
    }
  });



export {
  agregarAlCarrito,
  validarProductoRepetido,
  pintarCarrito,
  eliminarProductoCarrito,
};
