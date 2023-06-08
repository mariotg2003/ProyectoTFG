let tabla=document.getElementById("tabla")
let id=""
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
                id=datos["id"]

                    if (datos["idRol"] == 1) {
                        alert("No tienes permiso para acceder aquí")
                        window.location.href = "index.html";
                    }else{
                        rellenaTabla(id)
                    }

            })
            .catch(error => console.log('error', error));
    }

}

comprobarID()




//FUNCION PARA HACER PETICION DE CANDIDATURAS Y MOSTRAR UNA TABLA CON LOS DATOS
function rellenaTabla(id){


    let peticion=fetch("http://127.0.0.1:8000/api/candidaturas/"+id)

    peticion.then(Response=>Response.json()).then(data=>{
        console.log(data)

        candidaturas=data["candidaturas"]
        
        
        candidaturas.forEach(element => {

            let peticionEmpresa=fetch("http://127.0.0.1:8000/api/empresas/"+element["idEmpresa"])
            
            peticionEmpresa.then(Response=>Response.json().then(data=>{
                empresa=data["data"]["nombre"]
                console.log(empresa)
            
                let cuadro=document.createElement("tr")
                if(element["estado"]){
                    cuadro=`<tr>
                            <td>`+empresa+`</td>
                            <td>Aceptada</td>
                            </tr>`
                }else{
                    cuadro=`<tr>
                            <td>`+empresa+`</td>
                            <td>Denegada</td>
                            </tr>`
                }
                
                tabla.innerHTML+=cuadro
                
                
                }))

        })
    })
}

