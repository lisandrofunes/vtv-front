var url = "http://localhost:8080/"; 

document.addEventListener("DOMContentLoaded", function() {
    getCliente();
});

function getCliente(){
    fetch(url+"propietario/list")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {

        llenarTablaCliente(data);
    })
    .catch(function(error) {
        console.error("Error al cargar clientes: " + error);
    });
}

function getVehiculoByProp(clienteId){
    fetch(`${url}vehiculo/listbyprop/${clienteId}`)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {

        llenarTablaVehiculo(data);

    })
    .catch(function(error) {
        console.error("Error al cargar Vehiculos por propietario: " + error);
    });
}

function getInspeccion(vehiculoId){
    fetch(`${url}inspeccion/listbyvehiculo/${vehiculoId}`)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {

        window.location.href = 'detalle.html?id=' + data.nroInscripcion; 

    })
    .catch(function(error) {
        console.error("Error al cargar Vehiculos por propietario: " + error);
    });

}

function llenarTablaCliente(datos) {

    const tabla = document.getElementById('tablaClientes');
    const tbody = tabla.querySelector('tbody');
  
    tbody.innerHTML = '';

    datos.forEach(function (cliente) {
      const fila = document.createElement('tr');
      const columnaApellido = document.createElement('td');
      const columnaNombre = document.createElement('td');
      const columnaDNI = document.createElement('td');
      const columnaAcciones = document.createElement('td');
  
      columnaApellido.textContent = cliente.apellido;
      columnaNombre.textContent = cliente.nombre;
      columnaDNI.textContent = cliente.dni;
  
      const boton = document.createElement('button');
      boton.type = 'button';
      boton.textContent = 'Ver vehículos';
      boton.classList = 'btn btn-primary';
      boton.setAttribute("data-bs-toggle", "modal");
      boton.setAttribute("data-bs-target", "#modalVehiculos")
      boton.addEventListener('click', function () {
        
        getVehiculoByProp(cliente.id);

      });
  
      columnaAcciones.appendChild(boton);
  
      fila.appendChild(columnaApellido);
      fila.appendChild(columnaNombre);
      fila.appendChild(columnaDNI);
      fila.appendChild(columnaAcciones);
  
      tbody.appendChild(fila);
    });
}

function llenarTablaVehiculo(datos){

    const tabla = document.getElementById('tablaVehiculos');
    const tbody = tabla.querySelector('tbody');
  
    tbody.innerHTML = '';

    datos.forEach(function (vehiculo) {
        const fila = document.createElement('tr');
        const columnaDominio = document.createElement('td');
        const columnaMarca = document.createElement('td');
        const columnaModelo = document.createElement('td');
        const columnaAcciones = document.createElement('td');
    
        columnaDominio.textContent = vehiculo.dominio;
        columnaModelo.textContent = vehiculo.modelo.nombre;
        columnaMarca.textContent = vehiculo.modelo.marca.nombre;

        const boton = document.createElement('button');
        boton.type = 'button';
        boton.textContent = 'Ver inspeccion';
        boton.classList = 'btn btn-primary';
        boton.addEventListener('click', function () {

          getInspeccion(vehiculo.id)
  
        });
    
        columnaAcciones.appendChild(boton);
    
        fila.appendChild(columnaDominio);
        fila.appendChild(columnaMarca);
        fila.appendChild(columnaModelo);
        fila.appendChild(columnaAcciones);
    
        tbody.appendChild(fila);
      });

}
  