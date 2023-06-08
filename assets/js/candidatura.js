let tabla=document.getElementById("tabla")
let token = localStorage.getItem("token");



function eliminar(id){

    if(confirm("¿Estás seguro de querer borrar la candidatura?")){

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
    
        var requestOptions = {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/api/EliminarCandidatura/" + id, requestOptions)
        .then(response => response.json())
        .then(result => {
          alert("alumno borrado con éxito")
          window.location.reload()
        })
        .catch(error => console.log('error', error));
    }

    
}


function Editar(id, estado){
    // Objeto JSON a enviar
    const data = {
        estado: estado
    };

    // URL de destino
    const url = "http://127.0.0.1:8000/api/EditarCandidatura/" + id;

    // Configuración de la solicitud
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    };

    // Enviar la solicitud
    fetch(url, options)
        .then(response => {
            if (response.ok) {
                window.location.reload();
            }
        })
        .then(data => {
            console.log(data)
            console.log("Respuesta del servidor:", data);
        })
        .catch(error => {
            console.log("Error:", error);
        });
}

function modificar(id, alumno,valor) {
    let selector = document.getElementById("selectTablaCandidatura");

    comprobarCandi(alumno, function (result) {
        console.log("Hay?:",result["candidatura"])
        console.log(valor)

        if (valor === "1" && result["candidatura"] === 0) {
            
            setTimeout(() => {
                Editar(id,valor)
              },1000);
              

        } else if(valor === "1" && result["candidatura"] === 1){

            setTimeout(() => {
                Editar(id,0)
              },1000);

            alert("No puedes aceptar más candidaturas")
            window.location.reload()
           
        } else if(valor === "0" && result["candidatura"] === 0) {

            setTimeout(() => {
                Editar(id,0)
              },1000);


        } else if(valor === "0" && result["candidatura"] === 1){

            setTimeout(() => {
                Editar(id,0)
              },1000);

        } 

    });
}

function comprobarCandi(alumno, callback) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("http://127.0.0.1:8000/api/comprobarCandidatura/" + alumno, requestOptions)
        .then(response => response.json())
        .then(result => {
            callback(result);
        })
        .catch(error => console.log('error', error));
}




//FUNCION PARA HACER PETICION DE CANDIDATURAS Y MOSTRAR UNA TABLA CON LOS DATOS
function rellenaTabla(){

    let personajes=[]
    let idAlumno

    let peticion=fetch("http://127.0.0.1:8000/api/candidaturas")
    

    peticion.then(Response=>Response.json()).then(data=>{
        console.log(data)

        candidaturas=data["data"]

        let idEmpresa=""

        candidaturas.forEach(element => {

            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
              };

            idAlumno=element["idAlumno"]
            console.log(idEmpresa)
            let alumno
            let empresa
            
              
              fetch("http://127.0.0.1:8000/api/alumnos/"+idAlumno, requestOptions)
                .then(response => response.json())
                .then(result => {   
                    alumno=(result["data"]["nombre"])

                    fetch("http://127.0.0.1:8000/api/empresas/"+element["idEmpresa"], requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        empresa=(result["data"]["nombre"])
                        let cuadro=document.createElement("tr")
                        if(element["estado"]){
                            cuadro=`<tr>
                                <td>`+alumno+`</td>
                                <td>`+empresa+`</td>
                                <td>
                                    <select id="selectTablaCandidatura" onchange="modificar(`+element["id"]+`,`+element["idAlumno"]+`, this.value)">
                                        <option value="1" selected>Aceptada</option>
                                        <option value="0">Denegada</option>    
                                    </select>
                                </td>
                                <td>
                                    <form>
                                        <input type="button" value="🗑" class="botonTabla" onclick="eliminar(`+element["id"]+`)">
                                    </form>
                                </td>
                            </tr>`
                        }else{
                            cuadro=`<tr>
                                <td>`+alumno+`</td>
                                <td>`+empresa+`</td>
                                <td>
                                    <select id="selectTablaCandidatura" onchange="modificar(`+element["id"]+`,`+element["idAlumno"]+`, this.value)">
                                        <option value="1">Aceptada</option>
                                        <option value="0" selected>Denegada</option>    
                                    </select>
                                </td>
                                <td>
                                    <form>
                                        <input type="button" value="🗑" class="botonTabla" onclick="eliminar(`+element["id"]+`)">
                                    </form>
                                </td>
                            </tr>`
                        }
                        
                        tabla.innerHTML+=cuadro
                        
                        let selector=document.getElementById("selectTablaCandidatura")

                        


                    })
                    .catch(error => console.log('error', error));

                })
                .catch(error => console.log('error', error)); 
        })
    })
}

rellenaTabla()



