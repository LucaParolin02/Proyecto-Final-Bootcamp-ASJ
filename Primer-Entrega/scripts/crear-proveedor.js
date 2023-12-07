let añadir = document.getElementById("boton");

añadir.addEventListener("click", () => {
    let codigo = document.getElementById("codigo").value;
    let razon = document.getElementById("razon").value;
    let rubro = document.getElementById("rubro").value;
    let email = document.getElementById("email").value;
    let direccion = document.getElementById("direccion").value;

    if (codigo != "" && razon != "" && rubro != "" && email != "" && direccion != "") {

        const proveedor = {
            codigo: codigo,
            razon: razon,
            rubro: rubro,
            email: email,
            direccion: direccion
        };

        let proveedores = JSON.parse(localStorage.getItem("proveedores")) || [];  //parseo  o creo la lista de proveedores en caso de que no exista
        proveedores.push(proveedor); // añado el proveedor
        localStorage.setItem("proveedores", JSON.stringify(proveedores));

        alert("Se añadió el proveedor con éxito");

        window.location.href = ("proveedores.html");
    } else {
        alert("Por favor, complete todos los campos antes de añadir el proveedor.");
    }
});