let carrito = [];
const NUMERO_WHATSAPP = "51939893155";

// Elementos
const botonesAgregar = document.querySelectorAll('.btn-agregar');
const contador = document.getElementById('contador');
const ventanaCarrito = document.getElementById('ventana-carrito');
const listaCarrito = document.getElementById('lista-carrito');
const precioTotal = document.getElementById('precio-total');
const abrirCarrito = document.getElementById('abrir-carrito');
const cerrarCarrito = document.getElementById('cerrar-carrito');
const vaciarCarrito = document.getElementById('vaciar-carrito');
const enviarPedido = document.getElementById('enviar-pedido');

// Agregar al carrito
botonesAgregar.forEach(boton => {
    boton.addEventListener('click', () => {
        const nombre = boton.getAttribute('data-nombre');
        const precio = parseFloat(boton.getAttribute('data-precio'));
        
        carrito.push({ nombre, precio });
        actualizarCarrito();
        
        // Feedback visual
        boton.textContent = '✓ Agregado';
        boton.style.background = 'rgba(200, 169, 81, 0.2)';
        setTimeout(() => {
            boton.textContent = 'Agregar';
            boton.style.background = '';
        }, 1500);
    });
});

// Actualizar vista
function actualizarCarrito() {
    contador.textContent = carrito.length;
    listaCarrito.innerHTML = '';
    
    let total = 0;
    
    carrito.forEach((item, indice) => {
        total += item.precio;
        const elemento = document.createElement('div');
        elemento.className = 'item-carrito';
        elemento.innerHTML = `
            <span class="nombre-item">${item.nombre}</span>
            <span class="precio-item">S/ ${item.precio.toFixed(2)}</span>
            <button class="eliminar-item" data-indice="${indice}" title="Eliminar">✕</button>
        `;
        listaCarrito.appendChild(elemento);
    });
    
    precioTotal.textContent = total.toFixed(2);
    
    // Botones eliminar
    document.querySelectorAll('.eliminar-item').forEach(boton => {
        boton.addEventListener('click', (e) => {
            const indice = parseInt(e.target.getAttribute('data-indice'));
            carrito.splice(indice, 1);
            actualizarCarrito();
        });
    });
}

// Abrir/cerrar
abrirCarrito.addEventListener('click', () => ventanaCarrito.classList.remove('cerrado'));
cerrarCarrito.addEventListener('click', () => ventanaCarrito.classList.add('cerrado'));
vaciarCarrito.addEventListener('click', () => {
    if (carrito.length > 0 && confirm('¿Vaciar todo el carrito?')) {
        carrito = [];
        actualizarCarrito();
    }
});

// Enviar pedido — TEXTO MEJORADO
enviarPedido.addEventListener('click', () => {
    if (carrito.length === 0) {
        alert('Tu carrito está vacío 🛒');
        return;
    }
    
    let mensaje = `*PEDIDO — AJParfums.pe*\n\n`;
    let total = 0;
    
    carrito.forEach(item => {
        mensaje += `• ${item.nombre} — S/ ${item.precio.toFixed(2)}\n`;
        total += item.precio;
    });
    
    mensaje += `\nTotal: S/ ${total.toFixed(2)}\n\n`;
    mensaje += `Deseo confirmar mi pedido. Quedo atento, gracias.`;
    
    const enlace = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
    window.open(enlace, '_blank');
});