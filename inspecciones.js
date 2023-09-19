var url = "http://localhost:8080/"; 
var selectEstado = document.getElementById("selectEstado");

document.addEventListener("DOMContentLoaded", function() {
    getInspeccion();
    getEstado();
});

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

function getInspeccion(){
    fetch(url+"inspeccion/list")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {

        llenarTabla(data);
    })
    .catch(function(error) {
        console.error("Error al cargar inspecciones: " + error);
    });
}

function getInspeccionByEstado(){
    var idEstado = selectEstado.value

    if(selectEstado.value == "all"){

        getInspeccion();

    } else{
        fetch(`${url}inspeccion/listbyestado/${idEstado}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {

            llenarTabla(data);
        })
        .catch(function(error) {
            console.error("Error al cargar inspecciones por estado: " + error);
        });
    }
}

function llenarTabla(datos) {

    const tabla = document.getElementById('tablaInspecciones');
    const tbody = tabla.querySelector('tbody');
  
    tbody.innerHTML = '';

    datos.forEach(function (objeto) {
      const fila = document.createElement('tr');
      const columnaFecha = document.createElement('td');
      const columnaHora = document.createElement('td');
      const columnaNroInscripcion = document.createElement('td');
      const columnaAcciones = document.createElement('td');
  
      columnaFecha.textContent = objeto.fecha;
      columnaHora.textContent = objeto.hora;
      columnaNroInscripcion.textContent = objeto.nroInscripcion;
  
      const boton = document.createElement('button');
      boton.textContent = 'Ver Detalles';
      boton.classList = 'btn btn-primary'
      boton.addEventListener('click', function () {
        // verDetalles(objeto.nroInscripcion);
        window.location.href = 'detalle.html?id=' + objeto.nroInscripcion;
      });
  
      columnaAcciones.appendChild(boton);
  
      fila.appendChild(columnaFecha);
      fila.appendChild(columnaHora);
      fila.appendChild(columnaNroInscripcion);
      fila.appendChild(columnaAcciones);
  
      tbody.appendChild(fila);
    });
}
  