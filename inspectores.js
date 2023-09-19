var url = "http://localhost:8080/"; 
var selectEstado = document.getElementById("selectEstado");

document.addEventListener("DOMContentLoaded", function() {
    getInspector();
});

function getInspector(){
    fetch(url+"inspector/list")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {

        llenarTabla(data);
        
    })
    .catch(function(error) {
        console.error("Error al cargar inspectores: " + error);
    });
}

function llenarTabla(data){
    const tabla = document.getElementById('tablaInspectores');
    const tbody = tabla.querySelector('tbody');
  
    tbody.innerHTML = '';

    data.forEach(function(inspector) {

        const fila = document.createElement('tr');
        const columnaLegajo = document.createElement('td');
        const columnaApellido = document.createElement('td');
        const columnaNombre = document.createElement('td');
        const columnaDni = document.createElement('td');
        const columnaTel = document.createElement('td');
        const columnaEmail = document.createElement('td');
        const columnaAcciones = document.createElement('td');
    
        columnaLegajo.textContent = inspector.legajo;
        columnaApellido.textContent = inspector.apellido;
        columnaNombre.textContent = inspector.nombre;
        columnaDni.textContent = inspector.dni;
        columnaTel.textContent = inspector.telefono;
        columnaEmail.textContent = inspector.email;
    
        const btnModificar = document.createElement('button');
        btnModificar.textContent = 'Modificar';
        btnModificar.classList = 'btn btn-warning me-2'
        btnModificar.addEventListener('click', function () {
            // verDetalles(objeto.nroInscripcion);
            // window.location.href = 'detalle.html?id=' + objinspectoreto.nroInscripcion;
        });

        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.classList = 'btn btn-danger'
        btnEliminar.addEventListener('click', function () {
            // verDetalles(objeto.nroInscripcion);
            // window.location.href = 'detalle.html?id=' + objinspectoreto.nroInscripcion;
        });
    
        columnaAcciones.appendChild(btnModificar);
        columnaAcciones.appendChild(btnEliminar);
    
        fila.appendChild(columnaLegajo);
        fila.appendChild(columnaApellido);
        fila.appendChild(columnaNombre);
        fila.appendChild(columnaDni);
        fila.appendChild(columnaTel);
        fila.appendChild(columnaEmail);
        fila.appendChild(columnaAcciones);
    
        tbody.appendChild(fila);
    });
}