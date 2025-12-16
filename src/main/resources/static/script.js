

document.addEventListener('DOMContentLoaded',cargarEnemigos)
datos = ""
async function cargarEnemigos(){

    try{
        const response = await fetch('api/enemigo');
        const enemigos = await response.json();
        datos = enemigos;
        mostrarEnemigos(enemigos);

    }catch(error){
        console.error("error al cargar usuarios");
                alert(error.toString());

        console.log(error.toString())
    }//fin catch
}//fin cargar enemigos

function descargarTabla(){

        const csv = Papa.unparse(datos);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'enemigos.csv';
        link.click();

}
botonPulsado=false
async function ordenarTabla(){
        console.log(botonPulsado)
        if(botonPulsado===false){
            try{
                        const response = await fetch('api/enemigo/ordenado');
                        const enemigos = await response.json();
                        datos = enemigos;
                        mostrarEnemigos(enemigos);
                    }catch(error){
                        console.error("error al cargar usuarios");
                                alert(error.toString());

                        console.log(error.toString())
                    }//fin catch
            botonPulsado=true
        }else{
            cargarEnemigos();
            botonPulsado=false
        }


}
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
document.getElementById('formEliminarEnemigo').addEventListener('submit',eliminarEnemigo)
document.getElementById('formBusqueda').addEventListener('submit',buscarEnemigo)

async function buscarEnemigo(){
                        nombre = document.getElementById("busqueda").value
                        console.log(nombre)

                        try{

                            const response = await fetch(`/api/enemigo/obtenerEnemigo/${nombre}`);
                            const enemigo = await response.json();
                            const enemigoDiv = document.getElementById("enemigoBuscado");
                                                                htmlEnemigo = `
                                                                    <h2>Enemigo Encontrado</h2>
                                                                    <p><strong>ID:</strong> ${enemigo.id}</p>
                                                                    <p><strong>Nombre:</strong> ${enemigo.nombre}</p>
                                                                    <p><strong>País:</strong> ${enemigo.pais}</p>
                                                                    <p><strong>Afiliación política:</strong> ${enemigo.afiliacion_politica}</p>
                                                                `;
                            if(response.ok){


                                    // Insertamos el HTML en la página
                            }else{
                                alert("Enemigo no encontrado, asegúrate de que el nombre es correcto")
                                htmlEnemigo=`
                                    <h2>Enemigo NO Encontrado</h2>

                                `
                            }
                                                                enemigoDiv.innerHTML = htmlEnemigo;

                        }catch(error){
                            console.error("error al cargar usuarios");
                            //alert(error.toString());
                            console.log(error.toString())
                        }//fin catch

}

async function eliminarEnemigo(e){
    e.preventDefault();
    const id = document.getElementById('idEliminar').value
    btnSubmit.disabled = true;
    btnSubmit.textContent = 'Eliminando...';
       try {
            const response = await fetch(`api/enemigo/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id,
                })
            });


            if (response.ok) {


                // Resetear el formulario
                document.getElementById('formEliminarEnemigo').reset();
                console.log('Formulario reseteado'); // DEBUG

                // Recargar la tabla
                await cargarEnemigos();
                console.log('Enemigos recargados'); // DEBUG

            } else {
                const error = await response.text();
                alert(error);
                console.error('Error del servidor:', error);

            }
        } catch(error) {
            console.error('Error en catch:', error);

        } finally {
            btnSubmit.disabled = false;
            btnSubmit.textContent = 'Eliminar Enemigo';

        }
}
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
                afiliacion_politica: afiliacion
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
            alert(error);

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
                afiliacion_politica: afiliacion
            })
        });
        if(response.ok){
            const nuevoEnemigo = await response.json();
            document.getElementById('formInsertarEnemigo').reset();
            await cargarEnemigos() //CARGAR LOS ENEMIGOS;
        }else{
                const error = await response.text();
                alert(error);
                console.log(error);
        }
    }catch(error){
           console.error(error)
    }finally{
        btnSubmit.disabled=false;
        btnSubmit.textContent='Agregar Enemigo'
    }

}