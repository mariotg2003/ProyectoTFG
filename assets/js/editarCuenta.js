let nombre=document.getElementById("nombre")
let apellidos=document.getElementById("apellidos")
let contrasena=document.getElementById("contrasena")
let repetirContra=document.getElementById("repetirContra")
let linkMenu=document.getElementById("linkMenu")
let formularioAction=document.getElementById("formulario")
let emailUser = "";
let id=""

function comprobarID() {
    let token = localStorage.getItem("token");

    if (token === null) {
        window.location.href = "index.html";
    } else {
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
                let datos = result["usuario"];
                emailUser = datos["email"];
                id=datos["id"]
                
                if (datos["idRol"] == 2) {
                    linkMenu.href = "indexAlumno.html";
                    formularioAction.action="indexAlumno.html"
                } else {
                    linkMenu.href = "indexProfesor.html";
                    formularioAction.action="indexProfesor.html"
                }
                rellenarDatos();
            })
            .catch(error => console.log('error', error));
    }
}

comprobarID()




function rellenarDatos(){
    
    let peticion=fetch("http://127.0.0.1:8000/api/BuscaCorreo/"+emailUser)

    peticion.then(Response=>Response.json().then(data=>{

        console.log(data)
        datos=[]

        datos=data["data"][0]

        nombre.value=datos["nombre"]
        apellidos.value=datos["apellidos"]
        contrasena.value=""
        repetirContra.value=""

    }))

}







let formu=document.getElementById("formulario")

formu.addEventListener("submit", function(evento){
    evento.preventDefault()
    let token = localStorage.getItem("token");
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

    if(campoContra.value==""){
        llave=false
        campoContra.classList="inputsFormuMal"
        campoContra.value=""
        alert("El campo de la contraseña debe estar completo")
    }else if(!contraRegex.test(campoContra.value)){
        llave=false
        alert("La contraseña no cumple los requisitos")
        campoContra.classList="inputsFormuMal"
        campoContra.value=""
    }else{
        campoContra.classList="inputsFormu"
    }


    if(campoRepe.value==""){
        llave=false
        campoRepe.classList="inputsFormuMal"
        campoRepe.value=""
        alert("El campo de confirmación de contraseña debe estar completo")
    }else if(campoRepe.value!=campoContra.value){
        llave=false
        alert("La contraseña no coincide")
        campoRepe.classList="inputsFormuMal"
        campoRepe.value=""
    }else{
        campoRepe.classList="inputsFormu"
    }


    if(llave){
        // Objeto JSON a enviar
        const data = {
            nombre: campoNombre.value,
            apellidos: campoApellidos.value,
            password: campoContra.value
        };
        
        // URL de destino
        const url = "http://127.0.0.1:8000/api/EditarUsuario/"+id;
        
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
                alert("Modificado correctamente")
                this.submit()
                } else {
                alert("Algo salió mal");
                window.location.reload();
                }
                return response.json();
            })
            .then(data => {
                console.log("Respuesta del servidor:", data);
            })
            .catch(error => {
                console.log("Error:", error);
            });

        }else{
            console.log("Registro fallido")
        }


})


function resizeInput(campo) {
    let input = document.getElementById(campo);
    console.log(input.value.length)
    if(input.value.length>19){
        input.size = input.value.length;
    }else if(input.value.length<19){
        input.size=20
    }
  }




