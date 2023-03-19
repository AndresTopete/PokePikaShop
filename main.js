/*
Carrito de compras
Dos puntos importantes para el proyecto final:
* Boton de finalizar compra.
* Cambiar las cantidades desde el carrito. 
*/


// Creamos un array vacio para nustro carrito.
let carrito =[];

//Cargar carrito desde el LocalStorage, sabiendo si hay algo guardado o no.
if(localStorage.getItem('carrito')){
    carrito = JSON.parse(localStorage.getItem('carrito'));
}

// traemos el elemento contenedor productos
const contenedorProductos = document.getElementById('contenedorProductos');


const data = "data.json";
fetch(data)
    .then(respuesta => respuesta.json())
    .then((datos) =>{
        console.log(datos)
    })
    .catch((error) => console.log(error))

// funcion para mostrar productos

const mostrarProductos = (datos) => {
    datos.forEach(producto => {
        const card = document.createElement('div');
        card.classList.add('col-xl-3', 'col-md-6', 'col-sm-12');
        card.innerHTML =`
                        <div class= 'card'>
                            <img src='${producto.img}' class = 'card-img-top imgProductos' alt = '${producto.nombre}' >
                            <div>
                            <h5>${producto.nombre}</h5>
                            <p>${producto.tipoProducto}</p>
                            <p>$ ${producto.precio}.00</p>
                            <button class = 'btn colorBoton' id = 'boton${producto.id}'>Agregar al carrito</button>
                            </div>
                        </div>
                        `
        contenedorProductos.appendChild(card);

        // Agregar producto al carrito
        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener('click', () => {
            agregarAlCarrito(producto.id);
        })
    })
}

mostrarProductos();

// funcion para agregar al carrito.
const agregarAlCarrito = (id) => {
    const productoEnCarrito = carrito.find(producto => producto.id === id);
    if(productoEnCarrito){
        productoEnCarrito.cantidad++;
    } else {
        const producto = productos.find(producto => producto.id === id);
        carrito.push(producto);
    }

    // Se llama la funcion calcular total.
    calcularTotal();

    // Se actualiza el LocalStorage.
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

/* Mostrar carrito de compras */
// Se llama al elemento contenedor carrito y ver carrito. para poder trabajar las funciones.
const contenedorCarrito = document.getElementById('contenedorCarrito');
const verCarrito = document.getElementById('verCarrito');

// Le añadimos un evento al boton ver carrito
verCarrito.addEventListener('click', ()=>{
    mostrarCarrito();
});

const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = '';
    carrito.forEach(producto =>{
        const card = document.createElement('div');
        card.classList.add('col-xl-3', 'col-md-6', 'col-sm-12');
        card.innerHTML = `
                        <div class='card'>
                            <img src ='${producto.img}' class = 'card-img-top imgProductos' alt = '${producto.nombre}'>
                            <div>
                                <h5>${producto.nombre}</h5>
                                <p>${producto.tipoProducto}</p>
                                <p>${producto.precio}</p>
                            </div>
                            <div class = 'btn-group' role = 'group'>
                            <button class = 'btn colorBoton' id = 'menos${producto.id}'>-</button>
                            <p>${producto.cantidad}</p>
                            <button class = 'btn colorBoton' id = 'mas${producto.id}'>+</button>
                            <div>
                        </div>
                        `
        contenedorCarrito.appendChild(card);

        //Agregamos acciones a los botones de + y - .
        const menos = document.getElementById(`menos${producto.id}`);
        menos.addEventListener('click', () => {
           botonMenos(producto.id); 
        })

        const mas = document.getElementById(`mas${producto.id}`);
        mas.addEventListener('click',() => {
            botonMas(producto.id);
        });
    });
    calcularTotal();
}

// funcion para el boton menos.
const botonMenos = (id) =>{
    const producto = carrito.find(producto => producto.id === id);
    producto.cantidad > 1 ? producto.cantidad -- : eliminarDelCarrito(producto.id); 
    mostrarCarrito();

    // Actualizacoms el LocalStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// funcion para el boton mas.
const botonMas= (id) =>{
    const producto = carrito.find(producto => producto.id === id);
    producto.cantidad++;
    mostrarCarrito();

    // Actualizacoms el LocalStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// funcion para eliminar producto del carrito.
const eliminarDelCarrito = (id) => {
    const producto = carrito.find(producto => producto.id === id);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice,1);
    mostrarCarrito();

    // Actualizacoms el LocalStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Mostrar el total de la compra.
const total = document.getElementById('total');

const calcularTotal = () => {
    let totalCompra = 0;
    carrito.forEach(producto =>{
        totalCompra += producto.precio * producto.cantidad;
    })
    total.innerHTML = `Total: $${totalCompra}`;
}

// Vaciar todo el carrto.
const vaciarCarrito = document.getElementById('vaciarCarrito');

vaciarCarrito.addEventListener('click', () => {
    eliminarTodoElCarrito();
})

const eliminarTodoElCarrito = () => {
    carrito = [];
    mostrarCarrito();

    // Actualizamos el LocalStorage.
    localStorage.clear();
}


