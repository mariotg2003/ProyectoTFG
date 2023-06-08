let tabla=document.getElementById("tabla")
let nombreEmpresa=document.getElementById("empresaNombre")
let empresaCIF=document.getElementById("empresaCIF")
let botonBorrar=document.getElementById("botonBorrar")
let campoIdOculta=document.getElementById("idOculta")
let campoIdOcultaSede=document.getElementById("idOcultaSede")
let token = localStorage.getItem("token");

//COGER DE LA URL LA ID
const urlSearchParams = new URLSearchParams(window.location.search);
const id = urlSearchParams.get("id");

function anadirEnlaceBorrarSede(id){

    if(confirm("¿Estás seguro de querer borrar la sede?")){

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

            fetch("http://127.0.0.1:8000/api/EliminarSede/" + id, requestOptions)
                .then(response => response.json())
                .then(result => {
                alert("Empresa borrada con éxito")
                window.location.reload()
                })
                .catch(error => console.log('error', error));


    }

    
}



function rellenarCampos(){
    let peticionDatos=fetch("http://127.0.0.1:8000/api/empresas/"+id)

    peticionDatos.then(Response=>Response.json()).then(data=>{

        console.log(data)

        if(data["mensaje"]=="Empresa no encontrada."){
            location.replace("empresas.html")
        }

        nombreEmpresa.innerHTML=data["data"]["nombre"]
        empresaCIF.innerHTML=data["data"]["CIF"]
        campoIdOculta.value=id
        campoIdOcultaSede.value=id

    }) 
}


//FUNCION PARA HACER PETICION DE CANDIDATURAS Y MOSTRAR UNA TABLA CON LOS DATOS
function rellenaTabla(){
 

    let peticion=fetch("http://127.0.0.1:8000/api/VerSedes/"+id)

    peticion.then(Response=>Response.json()).then(data=>{
        console.log(data)

        let sedes=[]
        sedes=data["data"]


        sedes.forEach(element => {
            let cuadro=document.createElement("tr")
                cuadro=`<tr>
                            <td>`+element["nombre"]+`</td>
                            <td>`+element["direccion"]+`</td>
                            <td>
                                <form action="EditarSede.html">
                                    <input type="hidden" name="idSede" value=`+element["id"]+`>
                                    <input type="submit" value="✏" class="botonTabla">
                                </form>
                            </td>
                            <td>
                                <form>
                                    <input type="button" value="🗑" class="botonTabla" onclick="anadirEnlaceBorrarSede(`+element["id"]+`)">
                                </form>
                            </td>
                        </tr>`
            
            tabla.innerHTML+=cuadro
        })
    })
}

rellenaTabla()
rellenarCampos()




function anadirEnlaceBorrar(id){


    if(confirm("¿Estás seguro de querer borrar la empresa?")){

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
        

        fetch("http://127.0.0.1:8000/api/EliminarEmpresa/" + id, requestOptions)
        .then(response => response.json())
        .then(result => {
          alert("Empresa borrada con éxito")
          window.location.reload()
        })
        .catch(error => console.log('error', error));

    }       
}



botonBorrar.addEventListener("click",function(){
    anadirEnlaceBorrar(id)})