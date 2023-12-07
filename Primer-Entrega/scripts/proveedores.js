//Agregar un proveedor
//Obtengo en una variable la tabla con ese id tablaProveedor

//crear tabla
//let tabla = document.getElementById("tablaProveedor")

//crear una row
//let row = document.createElement("tr")
//let tdNombre = document.createElement("td")
//let nombre = document.createTextNode(proveedor.nombre)

//document.createElement("td")
//document.createElement("td")
//document.createElement("td")

//agrego todos los datos a su td
//tdNombre.appendChild(nombre)

//agrego todos los td al row
//row.appendChild(tdNombre)

//agrego la row a la tabla
//tabla.appendChild(row)

//Itero sobre el array de proveedores , en cada iteraccion llamo la funcion agregor proveedor


//eliminar todo boton
//limpiar el local el storage , localstorage.setItem("proveedores", []);
//refrezco la pagina 

let tabla = document.getElementById("tablaProveedor");      //obtengo el id del body de la tabla la cual voy agregar
let proveedores = JSON.parse(localStorage.getItem("proveedores")) || [];   //obtengo los proveedores
let eliminarTodos = document.getElementById("btnEliminarTodos");     //obtengo la id

function agregarProveedor(proveedor) {  //funcion la cual agrega el proveedor

  let row = document.createElement("tr");    //creo la row
 
  let tdCodigo = document.createElement("td");      //creo los table data correspondientes
  let tdRazon = document.createElement("td");
  let tdRubro = document.createElement("td");
  let tdEmail = document.createElement("td");
  let tdDireccion = document.createElement("td");
  let tdAccion = document.createElement("td");

  tdCodigo.textContent = proveedor.codigo;       //le asigno al contenido de la td el strign guardado en el localStorage
  tdRazon.textContent = proveedor.razon;
  tdRubro.textContent = proveedor.rubro;
  tdEmail.textContent = proveedor.email;
  tdDireccion.textContent = proveedor.direccion;
  tdAccion.className = "btn btn-danger btn-sm";
  tdAccion.innerHTML = "Eliminar";
  tdAccion.addEventListener("click", function() {
    eliminarProveedor(proveedor);
    });

  row.appendChild(tdCodigo);   //denvez de utilizar el innerHTML , utilizo mejor appendChild
  row.appendChild(tdRazon);
  row.appendChild(tdRubro);
  row.appendChild(tdEmail);
  row.appendChild(tdDireccion);
  row.appendChild(tdAccion);

  tabla.appendChild(row);
}

function eliminarProveedor(proveedor){
        //deberua de eliminar la row donde esta justamente el proveedor
}

for (let i = 0; i < proveedores.length; i++) {    //agrego los proveedores uno por uno
    agregarProveedor(proveedores[i]);
  }


eliminarTodos.addEventListener("click", () => {
  localStorage.setItem("proveedores", JSON.stringify([]));
  location.reload();
});