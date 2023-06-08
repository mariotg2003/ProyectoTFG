let formularioRegister=document.getElementById("formularioRegistro")

let token = localStorage.getItem("token");


function comprobarID() {
    

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

formularioRegister.addEventListener("submit",function(evento){
    evento.preventDefault()

    const contraRegex = /^(?=.*[A-Z])(?=.*\d).{5,9}$/

    let campoNombre=document.getElementById("nombre")
    let campoApellidos=document.getElementById("apellidos")
    let campoEmail=document.getElementById("email")
    let campoContra=document.getElementById("contrasena")
    let campoRepe=document.getElementById("repetirContra")
    let campoSelect=document.getElementById("selecto")

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


    if(campoEmail.value==""){
        llave=false
        campoEmail.classList="inputsFormuMal"
        campoEmail.value=""
        alert("El campo del email debe estar completo")
    }else{
        campoEmail.classList="inputsFormu"
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
        alert("El campo de repetir contraseña debe estar completo")
    }else if(campoRepe.value!=campoContra.value){
        llave=false
        alert("La contraseña no coincide")
        campoRepe.classList="inputsFormuMal"
        campoRepe.value=""
    }else{
        campoRepe.classList="inputsFormu"
    }

    if(campoSelect.value==""){
        llave=false
        campoSelect.style.background="#f12f0db6"
        campoSelect.value=""
        alert("Se debe seleccionar un rol")
    }else{
        campoSelect.classList="inputsFormu"
        campoSelect.style.background="#d1ecdf"

    }



    if(llave){

        // Objeto JSON a enviar
        const data = {
            nombre: campoNombre.value,
            apellidos: campoApellidos.value,
            idRol:parseInt(campoSelect.value), 
            email: campoEmail.value,
            password: campoContra.value
        };
        
        // URL de destino
        const url = "http://127.0.0.1:8000/api/register";
        
        // Configuración de la solicitud
        const options = {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
            },
            body: JSON.stringify(data)
        };
        
        // Enviar la solicitud
        fetch(url, options)
            .then(response => {
                if(response.ok){
                    window.location.href="indexProfesor.html"
                }else{
                    alert("El email ya está registrado")
                    campoNombre.value=""
                    campoApellidos.value=""
                    campoEmail.value=""
                    campoContra.value=""
                    campoRepe.value=""
                }
            })
            .then(data => {
                console.log("Respuesta del servidor:", data);
            })
            .catch(error => {
                console.log("Error:", error);
            });
        
            
            
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