var url = "http://localhost:8080/"; 

document.addEventListener("DOMContentLoaded", function() {
    getInspeccion();
});

function getInspeccion(){
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    fetch(`${url}inspeccion/detail/${id}`)
    .then(function(response) {
        return response.json();
    })
    .then(function(inspeccion) {


        document.getElementById('fecha').value = inspeccion.fecha;
        document.getElementById('hora').value = inspeccion.hora;

        document.getElementById('nombrePropietario').value = inspeccion.vehiculo.propietario.nombre;
        document.getElementById('apellidoPropietario').value = inspeccion.vehiculo.propietario.apellido;
        document.getElementById('dniPropietario').value = inspeccion.vehiculo.propietario.dni;
        document.getElementById('telefonoPropietario').value = inspeccion.vehiculo.propietario.telefono;
        document.getElementById('emailPropietario').value = inspeccion.vehiculo.propietario.email;

        document.getElementById('dominioVehiculo').value = inspeccion.vehiculo.dominio;
        document.getElementById('marcaVehiculo').value = inspeccion.vehiculo.modelo.marca.nombre;
        document.getElementById('modeloVehiculo').value = inspeccion.vehiculo.modelo.nombre;

        document.getElementById('inspector').value = inspeccion.inspector.apellido
        
        document.getElementById('estado').value = inspeccion.estado.nombre
        

    })
    .catch(function(error) {
        console.error("Error al cargar la inspeccion: " + error);
    });
}


