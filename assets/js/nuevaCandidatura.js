let selectAlum=document.getElementById("alumnos")
let selectEmpresa=document.getElementById("empresas")



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


function rellenarDatos(){

    let peticionAlumno=fetch("http://127.0.0.1:8000/api/alumnos")
    let peticionEmpresa=fetch("http://127.0.0.1:8000/api/empresas")

    peticionAlumno.then(Response=>Response.json().then(data=>{

        console.log(data)

        alumnos=[]
        alumnos=data["data"]

        console.log(alumnos)

        alumnos.forEach(element => {
            let elementoAlumno=document.createElement("option")
            elementoAlumno.value=element["id"]
            elementoAlumno.innerHTML=element["nombre"]
            console.log(elementoAlumno)
            selectAlum.append(elementoAlumno)
        });

    }))

    peticionEmpresa.then(Response=>Response.json().then(data=>{

        console.log(data)

        empresas=[]
        empresas=data["data"]

        console.log(empresas)
        empresas.forEach(element => {
            let elementoEmpresa=document.createElement("option")
            elementoEmpresa.value=element["id"]
            elementoEmpresa.innerHTML=element["nombre"]
            console.log(elementoEmpresa)
            selectEmpresa.append(elementoEmpresa)
        });

    }))

}

rellenarDatos() 

let formu=document.getElementById("formulario")

formu.addEventListener("submit",function(evento){
    evento.preventDefault()
    let token = localStorage.getItem("token");
    let campoAlumno=document.getElementById("alumnos")
    let campoDireccion=document.getElementById("empresas")

    let llave=true


    if(campoAlumno.value==""){
        llave=false
        campoAlumno.style.background="#f12f0db6"
        campoAlumno.style.border="2px solid black"
        campoAlumno.value=""
        alert("El campo del alumno debe estar completo")
    }else{
        campoAlumno.style.background="#d1ecdf"
        campoAlumno.style.color="black"
    }

    if(campoDireccion.value==""){
        llave=false
        campoDireccion.style.background="#f12f0db6"
        campoDireccion.style.border="2px solid black"
        campoDireccion.value=""
        alert("El campo de la empresa debe estar completo")
    }else{
        campoDireccion.style.background="#d1ecdf"
        campoDireccion.style.color="black"
    }


    if(llave){

        // Objeto JSON a enviar
        const data = {
            idEmpresa: selectEmpresa.value,
            idAlumno: selectAlum.value,
            estado:false, 
        };
        
        // URL de destino
        const url = "http://127.0.0.1:8000/api/NuevaCandidatura";
        
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
                    window.location.href="candidaturas.html"
                }else{
                    alert("La candidatura ya está registrada")
                    selectAlum.value=""
                    selectEmpresa.value=""
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