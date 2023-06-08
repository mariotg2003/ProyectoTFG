let enlace=document.getElementById("cerrarSesion")
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


enlace.addEventListener("click",function(){
    localStorage.removeItem("token")
    window.location.replace("index.html")
})


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