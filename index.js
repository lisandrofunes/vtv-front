var selectMarca = document.getElementById("marcaVehiculo");
var selectModelo = document.getElementById("modeloVehiculo");
var selectInspector = document.getElementById("inspector");
var selectEstado = document.getElementById("estado");

var url = "http://localhost:8080/"; 

//GET Marca
fetch(url+"marca/list")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        // Procesar los datos de la API y llenar el select
        data.forEach(function(item) {
            var option = document.createElement("option");
            option.value = item.id; 
            option.textContent = item.nombre;
            selectMarca.appendChild(option);
        });
    })
    .catch(function(error) {
        console.error("Error al cargar marcas: " + error);
    });

//GET Inspector
fetch(url+"inspector/list")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        // Procesar los datos de la API y llenar el select
        data.forEach(function(item) {
            var option = document.createElement("option");
            option.value = item.id; 
            option.textContent = item.nombre + " " + item.apellido;
            selectInspector.appendChild(option);
        });
    })
    .catch(function(error) {
        console.error("Error al cargar marcas: " + error);
    });

//GET Estado
fetch(url+"estado/list")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        // Procesar los datos de la API y llenar el select
        data.forEach(function(item) {
            var option = document.createElement("option");
            option.value = item.id; 
            option.textContent = item.nombre
            selectEstado.appendChild(option);
        });
    })
    .catch(function(error) {
        console.error("Error al cargar marcas: " + error);
    });

function mostrarInputMarca() {
    var inputOtraMarca = document.getElementById("otraOpcion");

    if (selectMarca.value === "otra") {
        inputOtraMarca.style.display = "block";
    } else {
        inputOtraMarca.style.display = "none";
        selectModelo.removeAttribute("disabled");
        getModelos(selectMarca.value);
    }
}

function mostrarInputModelo() {
    var inputOtraModelo = document.getElementById("otraOpcionModelo");

    if (selectModelo.value === "otra") {
        inputOtraModelo.style.display = "block";
    } else {
        inputOtraModelo.style.display = "none";
    }
}

function getModelos(marca){

    fetch(url+"modelo/listbymarca?marca="+encodeURIComponent(marca))
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        // Procesar los datos de la API y llenar el select
        data.forEach(function(item) {
            var option = document.createElement("option");
            option.value = item.id; 
            option.textContent = item.nombre;
            selectModelo.appendChild(option);
        });
    })
    .catch(function(error) {
        console.error("Error al cargar marcas: " + error);
    });
}


document.getElementById("InspeccionForm").addEventListener("submit", function (event) {
    event.preventDefault(); 
    
    // Recopilar valores del formulario
    var fecha = document.getElementById("fecha").value;
    var hora = document.getElementById("hora").value;
    var nombrePropietario = document.getElementById("nombrePropietario").value;
    var apellidoPropietario = document.getElementById("apellidoPropietario").value;
    var dniPropietario = document.getElementById("dniPropietario").value;
    var telefonoPropietario = document.getElementById("telefonoPropietario").value;
    var emailPropietario = document.getElementById("emailPropietario").value;
    var dominioVehiculo = document.getElementById("dominioVehiculo").value;
    var marcaVehiculo = document.getElementById("marcaVehiculo").value;
    var modeloVehiculo = document.getElementById("modeloVehiculo").value;
    var inspector = document.getElementById("inspector").value;
    var estado = document.getElementById("estado").value;
    var esExento = document.getElementById("opcionSi").checked;

    // Construir el objeto JavaScript que representa la estructura del JSON
    var inspeccionData = {
        fecha: fecha,
        hora: hora,
        vehiculo: {
            dominio: dominioVehiculo,
            modelo: {
                nombre: modeloVehiculo,
                marca: {
                    id: marcaVehiculo
                }
            },
            propietario: {
                nombre: nombrePropietario,
                apellido: apellidoPropietario,
                dni: dniPropietario,
                telefono: telefonoPropietario,
                email: emailPropietario
            }
        },
        inspector: {
            id: parseInt(inspector), 
        },
        estado: {
            id: parseInt(estado), 
        },
        esExento: esExento
    };

    // Convertir el objeto en una cadena JSON
    var inspeccionJson = JSON.stringify(inspeccionData);


    fetch(url + "inspeccion/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: inspeccionJson
    })
    .then(function (response) {
        if (!response.ok) {
            throw new Error("La solicitud no fue exitosa");
        }
        return response.json();
    })
    .catch(error => {
        console.error('Error en la solicitud POST:', error);
    });
});
