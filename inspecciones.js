var url = "http://localhost:8080/"; 

document.addEventListener("DOMContentLoaded", function() {
    getInspeccion();
});

function getInspeccion(){
    fetch(url+"inspeccion/list")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {

        llenarTabla(data);
    })
    .catch(function(error) {
        console.error("Error al cargar marcas: " + error);
    });
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
        window.location.href = 'inspeccion.html?id=' + objeto.nroInscripcion;
      });
  
      columnaAcciones.appendChild(boton);
  
      fila.appendChild(columnaFecha);
      fila.appendChild(columnaHora);
      fila.appendChild(columnaNroInscripcion);
      fila.appendChild(columnaAcciones);
  
      tbody.appendChild(fila);
    });
}
  