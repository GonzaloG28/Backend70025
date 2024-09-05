const inputFirstName=document.getElementById("first_name")
const inputLastName=document.getElementById("last_name")
const inputAge=document.getElementById("age")
const inputEmail=document.getElementById("email")
const inputPassword=document.getElementById("password")
const btnSubmit=document.getElementById("btnSubmit")

btnSubmit.addEventListener("click", async(e)=>{
    e.preventDefault()
    let first_name=inputFirstName.value.trim()
    let last_name=inputLastName.value.trim()
    let age=inputAge.value.trim()
    let email=inputEmail.value.trim()
    let password=inputPassword.value.trim()

    if(!first_name || !last_name || !age || !email || !password){
        alert("Complete los datos...!!!")
        console.log("completa datos")
        return 
    }

    let body=JSON.stringify({
        first_name,
        last_name,
        age, 
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
        location.href=`/login`
    }else{
        alert(datos.error)
    }
    console.log(datos)
})