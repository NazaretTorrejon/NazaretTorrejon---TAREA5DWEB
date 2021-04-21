let contenidoTabla = document.querySelector("#contenidoTabla");
let btnBuscar = document.querySelector("#btnBuscar");
let body = document.querySelector("body");
let switchDireccion = true;

const buscarProducto = (event) => {
    event.preventDefault();

    
    if (event.target.tagName != 'A' && event.target.tagName != 'BUTTON') return;

    const urlAPI = 'https://disenoydesarrolloapi.azurewebsites.net/api/Producto';
    const textoCategoria = document.querySelector("#textoCategoria").value;
    const textoProveedor = document.querySelector("#textoProveedor").value;
    const textoProducto = document.querySelector("#textoProducto").value;
    const orderdarPor = event.target.id;

    if (switchDireccion )
        dir = 'desc'
    else
        dir = 'asc'
    
    switchDireccion = !switchDireccion;

    contenidoTabla.innerHTML = '';

    fetch(`${urlAPI}?categoria=${textoCategoria}&proveedor=${textoProveedor}&producto=${textoProducto}&ordenarPor=${orderdarPor}&direccion=${dir}`)
        .then(response => response.json())
        .then(data => llenarTabla(data));
}



const formatoDinero =(monto) => {
    return monto.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }


const llenarTabla = (productos) => {
    let contenido = '';
    productos.forEach((item, index) => {

        contenido += `<tr>
        <td>  ${index} </td>
        <td>  ${item.producto} </td>
        <td>  ${item.categoria} </td>
        <td>  ${formatoDinero(item.precio)} </td>
        <td>  ${item.proveedor}</td>
        
        <tr>
        `});

    contenidoTabla.innerHTML = contenido;
}

const eliminarProducto = (event) => {
    event.preventDefault();
    if (event.target.className == 'boton-eliminar') {
        delete autos[event.target.value];
    }
    llenarTabla();
}


btnBuscar.addEventListener('click', buscarProducto)
body.addEventListener('click', buscarProducto)


let botonEliminar = document.querySelector("body");
botonEliminar.addEventListener('click', eliminarProducto)