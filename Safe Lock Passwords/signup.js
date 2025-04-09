let password = document.querySelector("#Password");
let confirmPassword = document.querySelector("#Confirm-Password");
let email = document.querySelector("#Email");


(
    async function checkLogin(){
        try {
        const userEmail = localStorage.getItem("email")
        if (userEmail) {
           window.location.replace("./login.html")
          }
        } catch (error) {
            console.log(error.code, error.message)
        }
    }
)()

async function signup(){
    try {
    if(!password.value || !confirmPassword || !email.value){
        alert("Please fill in all fields");
        return
    }
    if(password.value != confirmPassword.value){
        alert("enter a valid password");
        return
    }
    const userInfo = {
        email: email.value,
        password: password.value
    }
    fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userInfo)
    }).then(res => res.json())
    .then(data => {
        console.log(data)
        let check = data.message
        alert(check)
        if(check == "Account already exists" || check == "Signup Successful"){
            return window.location.replace("./login.html");
        }
    }).catch(err => {
        console.log(err)
    })
} catch (error) {
    console.log(error.code, error.message)
}
}
window.signup = signup;


