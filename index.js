var selectMarca = document.getElementById("marcaVehiculo");
var selectModelo = document.getElementById("modeloVehiculo");
var selectInspector = document.getElementById("inspector");
var selectEstado = document.getElementById("estado");
var marcaSelected = ""

var url = "http://localhost:8080/"; 


document.addEventListener("DOMContentLoaded", function() {
    // Realiza el fetch al cargar la página
    getMarca();
    getInspector();
    getEstado();
});


function getMarca(){
    fetch(url+"marca/list")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {

        selectMarca.innerHTML = '';
        var optionDefault = document.createElement("option");
            optionDefault.textContent = "Seleccione una marca";
            selectMarca.appendChild(optionDefault);

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
}

function getInspector(){
    fetch(url+"inspector/list")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {

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
}

function getEstado(){
    fetch(url+"estado/list")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {

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
}


function getModelo(){
    var modalModeloLabel = document.getElementById("modelModeloLabel");
    var marcaSelected = selectMarca.options[selectMarca.selectedIndex];
    var marca = selectMarca.value;


    fetch(url+"modelo/listbymarca?marca="+encodeURIComponent(marca))
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {

        selectModelo.innerHTML = '';
        var optionDefault = document.createElement("option");
            optionDefault.textContent = "Seleccione un modelo";
            selectModelo.appendChild(optionDefault);

        data.forEach(function(item) {
            var option = document.createElement("option");
            option.value = item.id; 
            option.textContent = item.nombre;
            selectModelo.appendChild(option);
        });

        selectModelo.removeAttribute("disabled");
        modalModeloLabel.innerHTML = "Crear modelo para: " + marcaSelected.textContent;
    })
    .catch(function(error) {
        console.error("Error al cargar marcas: " + error);
    });
}

function crearMarca(){
    var nombreMarca = document.getElementById("nombreMarca").value;

    var marcaData = {
        nombre: nombreMarca
    }
    
    fetch(url + "marca/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(marcaData)
    })
    .then(function (response) {
        if (response.ok) {

            getMarca();
            var modal = new bootstrap.Modal(document.getElementById('modalMarca'));
            modal.hide();

        } else {
            console.log("Respuesta de red OK pero respuesta HTTP no OK");
        }
    })
    .catch(error => {
        console.error('Error en la solicitud POST:', error);
    });
}

function crearModelo(){
    var nombreModelo = document.getElementById("nombreModelo").value;

    var modeloData = {
        nombre: nombreModelo,
        marca: {
            id: selectMarca.value
        }
    }
    
    fetch(url + "modelo/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(modeloData)
    })
    .then(function (response) {
        if (response.ok) {
            getModelo();
        } else {
            console.log("Respuesta de red OK pero respuesta HTTP no OK");
        }
    })
    .catch(error => {
        console.error('Error en la solicitud POST:', error);
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
    var modeloId = selectModelo.value;
    var inspectorId = selectInspector.value;
    var estadoId = selectEstado.value;
    var esExento = document.getElementById("opcionExento").checked;

    // Construir el objeto JavaScript que representa la estructura del JSON
    var inspeccionData = {
        fecha: fecha,
        hora: hora,
        vehiculo: {
            dominio: dominioVehiculo,
            modelo: {
                id: modeloId
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
            id: inspectorId 
        },
        estado: {
            id: estadoId 
        },
        esExento: esExento
    };

    fetch(url + "inspeccion/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(inspeccionData)
    })
    .then(function (response) {
        if (response.ok) {
            
            console.log("todo bien");
        } else {
            console.log("Respuesta de red OK pero respuesta HTTP no OK");
        }
    })
    .catch(error => {
        console.error('Error en la solicitud POST:', error);
    });
});
