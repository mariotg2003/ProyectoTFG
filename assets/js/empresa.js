let tabla=document.getElementById("panelesProfesor")


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


//FUNCION PARA HACER PETICION DE EMPRESAS Y MOSTRAR UNA TABLA CON LOS DATOS
function rellenaTabla(){

    let peticion=fetch("http://127.0.0.1:8000/api/empresas")

    peticion.then(Response=>Response.json()).then(data=>{
        
        empresas=data["data"]
        empresas.forEach(element => {
            let cuadro=document.createElement("div") 
            console.log(element["id"])
            cuadro=`   
                    <div class="col-xl-3 col-md-6" data-aos="fade-up" data-aos-delay="200">
                        <form action="BuscaEmpresa.html" method="get" id="formulario">
                            <div class="icon-box" style="color:white" class="miDiv">
                                <div class="icon">🏢</div><br>
                                `+element["nombre"]+`<br>
                                <input type="hidden" value="`+element["id"]+`"name="id" id="idEm">
                                <input type="submit" class="botonFormulario" value="Detalles" style="margin-top:10%">
                            </div> 
                        </form>
                    </div>
                <!--End Icon Box -->`
            tabla.innerHTML+=cuadro 
        })

    })
}
 


  


rellenaTabla()

