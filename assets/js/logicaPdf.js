let tabla=document.getElementById("tabla")
let token = localStorage.getItem("token");

  let botonSubir=document.getElementById("cerrarSesionBoton")

  botonSubir.addEventListener("click",function(){
    document.getElementById('fileInput').click();
  })

  function comprobarIDSubir(archivo) {
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
          if (datos["idRol"] == 1) {
            alert("No tienes permiso para acceder aquí");
            window.location.href = "index.html";
          }else{

            let a=archivo.files[0]
            let b=datos["id"]
            subirCurriculum(a,b)
          }
          

        })
        .catch(error => console.log('error', error));
    }
  }



function pintarCurriculum(id){
  let peticion=fetch("http://127.0.0.1:8000/api/CurriculumPersonal/"+id)

  peticion.then(Response=>Response.json()).then(data=>{
      
      let datos=[]
      datos=data["data"][0]
      

      if(datos!=null){
        let nombreArchivo=datos["ruta"].substring(12)
        let cuadro=document.createElement("tr")
                    cuadro=`<tr>
                              <td><a href="T-manager/public/${datos["ruta"]}" target="_blank">${nombreArchivo}</td>
                                <td>
                                  <form>
                                    <input type="button" value="🗑" class="botonTabla" onclick="eliminarCurriculum(`+datos["idUsuario"]+`)">
                                  </form>
                                </td>
                              </tr>`

        tabla.innerHTML+=cuadro
      }
      

      console.log(datos)
  })
}




function eliminarCurriculum(id){

  let token = localStorage.getItem("token");
  if(confirm("¿Estás seguro de querer borrar el Curriculum?")){

      cabecera=new Headers()
      cabecera.append("Authorization", `Bearer ${token}`)


      var requestOptions = {
          method: 'DELETE',
          redirect: 'follow',
          headers:cabecera
        };
        
        fetch("http://127.0.0.1:8000/api/EliminarCurriculum/"+id, requestOptions)
          .then(response => response.json())
          .then(result => {
            window.location.reload()
          })
          .catch(error => console.log('error', error));
  }

  
}



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
              id=datos["id"]

                  if (datos["idRol"] == 1) {
                      alert("No tienes permiso para acceder aquí")
                      window.location.href = "index.html";
                  }
                    pintarCurriculum(id)
                                   
          })
          .catch(error => console.log('error', error));
  }

}

comprobarID()

function subirCurriculum(archivo,id){

      console.log(archivo)
      console.log(id)


      var bodyArchivo = new FormData();
      bodyArchivo.append("idUsuario", id);
      bodyArchivo.append("ruta", archivo, archivo.name);


      var requestOptions = {
        method: 'POST',
        headers: {
          "Authorization": "Bearer "+token
        },
        body:bodyArchivo,
        redirect: 'follow'
      };

    fetch("http://127.0.0.1:8000/api/NuevoCurriculum", requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result["error"]!=undefined){
          alert("El alumno ya tiene un curriculum subido")
          window.location.reload()
        }else{
          alert("Curriculum Subido");
          window.location.reload()
        }
      })
      .catch(error => console.log('error'));
}