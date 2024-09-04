const inputNombre=document.getElementById("nombre")
const inputEmail=document.getElementById("email")
const inputPassword=document.getElementById("password")
const btnSubmit=document.getElementById("btnSubmit")

btnSubmit.addEventListener("click", async(e)=>{
    e.preventDefault()
    let name=inputNombre.value.trim()
    let email=inputEmail.value.trim()
    let password=inputPassword.value.trim()

    if(!name || !email || !password){
        alert("Complete los datos...!!!")
        console.log("completa datos")
        return 
    }

    let body=JSON.stringify({
        name, 
        email, 
        password
    })

    let respuesta=await fetch("/api/sessions/log", {
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body
    })

    console.log(respuesta)

    let datos=await respuesta.json()
    if(respuesta.status===201){
        location.href=`/login?mensaje=Registro correcto para ${email}...!!!`
    }else{
        alert(datos.error)
    }
    console.log(datos)
})