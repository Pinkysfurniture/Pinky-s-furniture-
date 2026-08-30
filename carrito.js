/* =====================================
   CARRITO
===================================== */

let carrito =
    JSON.parse(
        localStorage.getItem("carritoPinky")
    ) || [];



/* =====================================
   GUARDAR
===================================== */

function guardarCarrito() {

    localStorage.setItem(
        "carritoPinky",
        JSON.stringify(carrito)
    );

}


/* =====================================
   FORMATEAR PRECIO
===================================== */

function precio(numero) {

    return numero.toLocaleString("es-CL");

}


/* =====================================
   AGREGAR
===================================== */

function agregarAlCarrito(id) {

    const producto =
        productos.find(
            p => p.id === id
        );


    if (!producto) return;


    const existente =
        carrito.find(
            p => p.id === id
        );


    if (existente) {

        existente.cantidad++;

    } else {

        carrito.push({

            id: producto.id,
            nombre: producto.nombre,
            codigo: producto.codigo,
            precio: producto.precio,
            cantidad: 1

        });

    }


    guardarCarrito();

    actualizarCarrito();

    abrirCarrito();

}


/* =====================================
   CAMBIAR CANTIDAD
===================================== */

function cambiarCantidad(id, cambio) {

    const producto =
        carrito.find(
            p => p.id === id
        );


    if (!producto) return;


    producto.cantidad += cambio;


    if (producto.cantidad <= 0) {

        carrito =
            carrito.filter(
                p => p.id !== id
            );

    }


    guardarCarrito();

    actualizarCarrito();

}


/* =====================================
   ELIMINAR
===================================== */

function eliminarDelCarrito(id) {

    carrito =
        carrito.filter(
            p => p.id !== id
        );


    guardarCarrito();

    actualizarCarrito();

}


/* =====================================
   ACTUALIZAR CARRITO
===================================== */

function actualizarCarrito() {

    const contenido =
        document.getElementById(
            "carritoContenido"
        );


    const contador =
        document.getElementById(
            "contadorCarrito"
        );


    const totalElemento =
        document.getElementById(
            "carritoTotal"
        );


    if (!contenido) return;


    contenido.innerHTML = "";


    let total = 0;

    let cantidadTotal = 0;


    if (carrito.length === 0) {

        contenido.innerHTML = `

            <div class="carrito-vacio">

                <p>
                    Tu carrito está vacío.
                </p>

                <span>
                    Agrega productos para comenzar.
                </span>

            </div>

        `;

    }


    carrito.forEach(producto => {

        const subtotal =
            producto.precio *
            producto.cantidad;


        total += subtotal;

        cantidadTotal += producto.cantidad;


        const item =
            document.createElement("div");


        item.className =
            "item-carrito";


        item.innerHTML = `

            <h3>
                ${producto.nombre}
            </h3>

            <small>
                Código: ${producto.codigo}
            </small>

            <strong>
                $${precio(subtotal)}
            </strong>


            <div class="controles">

                <button
                    onclick="cambiarCantidad(${producto.id}, -1)"
                >
                    −
                </button>


                <span>
                    ${producto.cantidad}
                </span>


                <button
                    onclick="cambiarCantidad(${producto.id}, 1)"
                >
                    +
                </button>


                <button
                    class="eliminar"
                    onclick="eliminarDelCarrito(${producto.id})"
                >
                    Eliminar
                </button>

            </div>

        `;


        contenido.appendChild(item);

    });


    if (contador) {

        contador.textContent =
            cantidadTotal;

    }


    if (totalElemento) {

        totalElemento.textContent =
            "$" + precio(total);

    }

}


/* =====================================
   ABRIR
===================================== */

function abrirCarrito() {

    const panel =
        document.getElementById(
            "carritoPanel"
        );


    if (panel) {

        panel.classList.add("abierto");

    }

}


/* =====================================
   CERRAR
===================================== */

function cerrarCarrito() {

    const panel =
        document.getElementById(
            "carritoPanel"
        );


    if (panel) {

        panel.classList.remove("abierto");

    }

}


/* =====================================
   FORMULARIO
===================================== */

function abrirFormulario() {

    if (carrito.length === 0) {

        alert(
            "Agrega al menos un producto al carrito."
        );

        return;

    }


    const modal =
        document.getElementById(
            "modalFormulario"
        );


    if (modal) {

        modal.classList.add("activo");

    }

}


function cerrarFormulario() {

    const modal =
        document.getElementById(
            "modalFormulario"
        );


    if (modal) {

        modal.classList.remove("activo");

    }

}


/* =====================================
   ENVIAR PEDIDO
===================================== */

function enviarPedidoWhatsApp() {

    const nombre =
        document
        .getElementById("nombreCliente")
        .value.trim();


    const telefono =
        document
        .getElementById("telefonoCliente")
        .value.trim();


    const correo =
        document
        .getElementById("correoCliente")
        .value.trim();


    const direccion =
        document
        .getElementById("direccionCliente")
        .value.trim();


    const comuna =
        document
        .getElementById("comunaCliente")
        .value.trim();


    const observaciones =
        document
        .getElementById("observacionesCliente")
        .value.trim();


    if (
        !nombre ||
        !telefono ||
        !direccion ||
        !comuna
    ) {

        alert(
            "Completa los campos obligatorios."
        );

        return;

    }


    let total = 0;


    let mensaje =
        "PEDIDO PINKY'S FURNITURE\n\n";


    carrito.forEach(producto => {

        const subtotal =
            producto.precio *
            producto.cantidad;


        total += subtotal;


        mensaje +=
            `${producto.nombre}\n`;

        mensaje +=
            `Código: ${producto.codigo}\n`;

        mensaje +=
            `Cantidad: ${producto.cantidad}\n`;

        mensaje +=
            `Precio: $${precio(producto.precio)}\n`;

        mensaje +=
            `Subtotal: $${precio(subtotal)}\n\n`;

    });


    mensaje +=
        `TOTAL: $${precio(total)}\n\n`;


    mensaje +=
        `DATOS DEL CLIENTE\n`;

    mensaje +=
        `Nombre: ${nombre}\n`;

    mensaje +=
        `Teléfono: ${telefono}\n`;

    mensaje +=
        `Correo: ${correo || "No indicado"}\n`;

    mensaje +=
        `Dirección: ${direccion}\n`;

    mensaje +=
        `Comuna: ${comuna}\n`;

    mensaje +=
        `Observaciones: ${observaciones || "Ninguna"}`;


    const url =
        "https://wa.me/56921655008?text=" +
        encodeURIComponent(mensaje);


    window.open(
        url,
        "_blank"
    );

}


/* =====================================
   MOSTRAR PRODUCTOS
===================================== */

function mostrarProductosEnContenedor(
    lista,
    contenedor
) {

    if (!contenedor) return;


    contenedor.innerHTML = "";


    if (lista.length === 0) {

        contenedor.innerHTML = `

            <div class="sin-productos">

                <h3>
                    No encontramos productos
                </h3>

                <p>
                    Intenta con otra búsqueda.
                </p>

            </div>

        `;

        return;

    }


    lista.forEach(producto => {

        const tarjeta =
            document.createElement("article");


        tarjeta.className =
            "producto";


        tarjeta.innerHTML = `

            <div class="imagen-producto">

                <img
                    src="${producto.imagen}"
                    alt="${producto.nombre}"
                    onerror="this.style.display='none'; this.parentElement.classList.add('sin-imagen')"
                >

                <span>
                    Imagen del producto
                </span>

            </div>


            <div class="producto-info">

                <div class="codigo">
                    Código ${producto.codigo}
                </div>


                <h3>
                    ${producto.nombre}
                </h3>


                <p class="medidas">
                    Medidas:
                    ${producto.medidas}
                </p>


                <div class="precio-producto">

                    $${precio(producto.precio)}

                </div>


                <button
                    class="boton-comprar"
                    onclick="agregarAlCarrito(${producto.id})"
                >

                    🛒 Comprar

                </button>

            </div>

        `;


        contenedor.appendChild(tarjeta);

    });

}


/* =====================================
   INICIAR
===================================== */

document.addEventListener(
    "DOMContentLoaded",
    actualizarCarrito
);
