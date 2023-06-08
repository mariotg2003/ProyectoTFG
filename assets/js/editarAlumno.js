let nombre=document.getElementById("nombre")
let apellidos=document.getElementById("apellidos")
let contrasena=document.getElementById("contrasena")
let repetirContra=document.getElementById("repetirContra")


function comprobarID() {
    let token = localStorage.getItem("token");

    if(token===null){
        window.location.href = "index.html";
    }else{
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + token);

        var raw = JSON.stringify({
            "token": token
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/api/BuscarUsuario", requestOptions)
            .then(response => response.json())
            .then(result => {
                let datos = []
                datos=result["usuario"];
                console.log(datos)

                    if (datos["idRol"] == 2) {
                        alert("No tienes permiso para acceder aquí")
                        window.location.href = "index.html";
                    }
            })
            .catch(error => console.log('error', error));
    }

}

comprobarID()



//COGER DE LA URL LA ID
const urlSearchParams = new URLSearchParams(window.location.search);
const id = urlSearchParams.get("id");

console.log(id)

function rellenarDatos(){

    let peticion=fetch("http://127.0.0.1:8000/api/alumnos/"+id)

    peticion.then(Response=>Response.json().then(data=>{

        if(data["mensaje"]=="Alumno no encontrado."){
            alert("Alumno no encontrado")
            location.replace("alumnos.html")
        }


        console.log(data)

        nombre.value=data["data"]["nombre"]
        apellidos.value=data["data"]["apellidos"]

    }))

}

rellenarDatos()

let formu=document.getElementById("formulario")

formu.addEventListener("submit", function(evento){
    evento.preventDefault()
    let token=localStorage.getItem("token")
    const contraRegex = /^(?=.*[A-Z])(?=.*\d).{5,9}$/

    let campoNombre=document.getElementById("nombre")
    let campoApellidos=document.getElementById("apellidos")
    let campoContra=document.getElementById("contrasena")
    let campoRepe=document.getElementById("repetirContra")

    let llave=true


    if(campoNombre.value==""){
        llave=false
        campoNombre.classList="inputsFormuMal"
        campoNombre.value=""
        alert("El campo del nombre debe estar completo")
    }else{
        campoNombre.classList="inputsFormu"
    }


    if(campoApellidos.value==""){
        llave=false
        campoApellidos.classList="inputsFormuMal"
        campoApellidos.value=""
        alert("El campo de los apellidos debe estar completo")
    }else{
        campoApellidos.classList="inputsFormu"
    }


    if(llave && token!=null){

        // Objeto JSON a enviar
        const data = {
            nombre: campoNombre.value,
            apellidos: campoApellidos.value,
        };
        
        // URL de destino
        const url = "http://127.0.0.1:8000/api/EditarAlumno/"+id;
        
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
                if(response.ok){
                    window.location.href="indexProfesor.html"
                }else{
                    alert("Algo salió mal")
                    campoNombre.value=""
                    campoApellidos.value=""
                }
            })
            .then(data => {
                console.log("Respuesta del servidor:", data);
            })
            .catch(error => {
                console.log("Error:", error);
            });

    }else{
        alert("Registro fallido")
        window.location.href="index.html"
    }






})