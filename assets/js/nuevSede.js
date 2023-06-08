let formu=document.getElementById("formulario")
let token = localStorage.getItem("token");

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

formu.addEventListener("submit",function(evento){
    evento.preventDefault()
    let token = localStorage.getItem("token");
    let campoNombre=document.getElementById("nombre")
    let campoDireccion=document.getElementById("direccion")

    let llave=true


    if(campoNombre.value==""){
        llave=false
        campoNombre.classList="inputsFormuMal"
        campoNombre.value=""
        alert("El campo del nombre debe estar completo")
    }

    if(campoDireccion.value==""){
        llave=false
        campoDireccion.classList="inputsFormuMal"
        campoDireccion.value=""
        alert("El campo de la dirección debe estar completo")
    }


    if(llave){

        // Objeto JSON a enviar
        const data = {
            nombre: campoNombre.value,
            idEmpresa: id,
            direccion: campoDireccion.value
        };
        
        // URL de destino
        const url = "http://127.0.0.1:8000/api/NuevaSede";
        
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
                    window.location.href="empresas.html"
                }else{
                    alert("La sede ya está registrada")
                    campoNombre.value=""
                    campoDireccion.value=""
                }
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