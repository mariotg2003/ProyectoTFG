let enlace=document.getElementById("cerrarSesion")
let token = localStorage.getItem("token");
let nombreSpan=document.getElementById("nombreSpan")
let nombre=""
enlace.addEventListener("click",function(){
    localStorage.removeItem("token")
    window.location.replace("index.html")
})

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
                nombre= datos["nombre"]
                if (datos["idRol"] == 2) {
                    linkMenu.href = "indexAlumno.html";
                } else {
                    linkMenu.href = "indexProfesor.html";
                }
                
            })
            .catch(error => console.log('error', error));
    }
}

comprobarID()

function escribeNombre(nombre){
    nombreSpan.innerHTML="Bienvenido " + nombre
}


function comprobarIDNombre() {
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
                nombre= datos["nombre"]

                escribeNombre(nombre)
            })
            .catch(error => console.log('error', error));
    }
}

comprobarIDNombre()