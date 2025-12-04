document.addEventListener('DOMContentLoaded',cargarEnemigos)

async function cargarEnemigos(){
    try{

        const response = await fetch('api/enemigo');
        const enemigos = await response.json();
        mostrarEnemigos(enemigos);

    }catch(error){
        console.error("error al cargar usuarios");
        console.log(error.toString())
    }//fin catch
}//fin cargar enemigos

function mostrarEnemigos(enemigos){

    const tbody = document.getElementById('enemigosBody');
    const table = document.getElementById('enemigosTable');
    tbody.innerHTML = '';

    if (enemigos.length === 0){
        console.log("la lista de enemigos esta vacia");
    }
    enemigos.forEach( enemigo => {
        const tr = document.createElement('tr');
        tr.innerHTML =  `
            <td>${enemigo.id}</td>
            <td>${enemigo.nombre}</td>
            <td>${enemigo.pais}</td>
            <td>${enemigo.afiliacion_politica}</td>
        `;
        tbody.appendChild(tr);
    });
}// fin de mostrar

document.getElementById('formInsertarEnemigo').addEventListener('submit',insertarEnemigo)
document.getElementById('formEditarEnemigo').addEventListener('submit',editarEnemigo)

async function editarEnemigo(e) {
    e.preventDefault();

    const id = document.getElementById('idE').value;
    const nombre = document.getElementById('nombreE').value;
    const pais = document.getElementById('paisE').value;
    const afiliacion = document.getElementById('afiliacionE').value;
    const btnSubmit = document.getElementById('btnEditar');

    console.log('Editando enemigo:', { id, nombre, pais, afiliacion }); // DEBUG

    btnSubmit.disabled = true;
    btnSubmit.textContent = 'Actualizando...';

    try {
        const response = await fetch(`api/enemigo/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                nombre: nombre,
                pais: pais,
                afiliacion: afiliacion
            })
        });


        if (response.ok) {
            const enemigoActualizado = await response.json();


            // Resetear el formulario
            document.getElementById('formEditarEnemigo').reset();
            console.log('Formulario reseteado'); // DEBUG

            // Recargar la tabla
            await cargarEnemigos();
            console.log('Enemigos recargados'); // DEBUG

        } else {
            const error = await response.text();
            console.error('Error del servidor:', error);

        }
    } catch(error) {
        console.error('Error en catch:', error);

    } finally {
        btnSubmit.disabled = false;
        btnSubmit.textContent = 'Editar Enemigo';

    }
}

async function insertarEnemigo (e){
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const pais = document.getElementById('pais').value;
    const afiliacion = document.getElementById('afiliacion').value;
    const btnSubmit = document.getElementById('btnSubmit');

    //esto mientras se procesa
    btnSubmit.disabled=true;
    btnSubmit.textContent='Enviando formulario a servidores externos...'



    try{

        const response = await fetch('api/enemigo', {
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre,
                pais: pais,
                afiliacion: afiliacion
            })
        });
        if(response.ok){
            const nuevoEnemigo = await response.json();
            document.getElementById('formInsertarEnemigo').reset();
            await cargarEnemigos() //CARGAR LOS ENEMIGOS;
        }else{
                const error = await response.text();
                console.log(error);
        }
    }catch(error){
           console.error(error)
    }finally{
        btnSubmit.disabled=false;
        btnSubmit.textContent='Agregar Enemigo'
    }

}