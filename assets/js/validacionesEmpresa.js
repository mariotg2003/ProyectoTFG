let formu=document.getElementById("formulario")

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



formu.addEventListener("submit",function(evento){
    evento.preventDefault()
    let token = localStorage.getItem("token");
    const cifRegex = /^\d{8}[a-zA-Z]$/

    let campoNombre=document.getElementById("nombre")
    let campoCif=document.getElementById("cif")

 
    let llave=true



    if(campoNombre.value==""){
        llave=false
        console.log("a")
        campoNombre.classList="inputsFormuMal"
        campoNombre.value=""
        alert("El campo del nombre debe estar completo")
    }else{
        campoNombre.classList="inputsFormu"
    }


    if(campoCif.value==""){
        llave=false
        campoCif.classList="inputsFormuMal"
        campoCif.value=""
        alert("El campo del cif debe estar completo")
    }else if(!cifRegex.test(campoCif.value)){
        llave=false
        campoCif.classList="inputsFormuMal"
        campoCif.value=""
        alert("El cif no cumple las características")
    }else{
        campoCif.classList="inputsFormu"
    }


    if(llave){
            // Objeto JSON a enviar
            const data = {
                CIF: campoCif.value,
                nombre: campoNombre.value
            };
            
            // URL de destino
            const url = "http://127.0.0.1:8000/api/NuevaEmpresa";
            
            // Configuración de la solicitud
            const options = {
                method: "POST",
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
                        window.location.href="empresas.html"
                    }else{
                        alert("El CIF ya está registrado")
                        campoCif.value=""
                        campoNombre.value=""
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