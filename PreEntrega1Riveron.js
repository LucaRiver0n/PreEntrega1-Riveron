document.addEventListener('DOMContentLoaded', () => {
  const botonesAñadirCarrito = document.querySelectorAll('.añadir-carrito');
  const listaCarrito = document.getElementById('lista-carrito');
  const totalElement = document.getElementById('total');
  const botonComprar = document.getElementById('comprar');

  // Cargar carrito desde el localStorage
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  actualizarCarrito();

  botonesAñadirCarrito.forEach(boton => {
      boton.addEventListener('click', añadirAlCarrito);
  });

  botonComprar.addEventListener('click', comprar);

  function añadirAlCarrito(event) {
      const boton = event.target;
      const producto = boton.closest('.producto');
      const idProducto = producto.getAttribute('data-id');
      const nombreProducto = producto.getAttribute('data-nombre');
      const precioProducto = parseFloat(producto.getAttribute('data-precio'));

      const productoEnCarrito = carrito.find(item => item.id === idProducto);
      if (productoEnCarrito) {
          productoEnCarrito.cantidad++;
      } else {
          carrito.push({ id: idProducto, nombre: nombreProducto, precio: precioProducto, cantidad: 1 });
      }

      actualizarCarrito();
      guardarCarrito();
  }

  function actualizarCarrito() {
      listaCarrito.innerHTML = '';
      let total = 0;

      carrito.forEach(producto => {
          const li = document.createElement('li');
          li.textContent = `${producto.nombre} - $${producto.precio} x ${producto.cantidad}`;
          listaCarrito.appendChild(li);
          total += producto.precio * producto.cantidad;
      });

      totalElement.textContent = `Total: $${total}`;
  }

  function guardarCarrito() {
      localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  function comprar() {
      if (carrito.length === 0) {
          alert('El carrito está vacío.');
      } else {
          alert('Compra realizada con éxito.');
          carrito.length = 0; // Vaciar el carrito
          actualizarCarrito();
          guardarCarrito();
      }
  }
});





