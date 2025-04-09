let password = document.querySelector("#Password");
let email = document.querySelector("#Email");

(async function checkLogin() {
  try {
    const userEmail = localStorage.getItem("email");
    if (userEmail) {
      window.location.replace("./Dashboard.html");
    }
  } catch (error) {
    console.log(error.code, error.message);
  }
})();

async function Login() {
  try {
    if (!password.value || !email.value) {
      alert("Please fill in all fields");
      return;
    }
    const userInfo = {
      email: email.value,
      password: password.value,
    };
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        let check = data.message;
        let email = data.email;
        localStorage.setItem("email", email);
        console.log(email);
        alert(check);
        if (check == "Account does not exist") {
          return window.location.replace("./signup.html");
        }
        window.location.replace("./Dashboard.html");
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error.code, error.message);
  }
}
window.Login = Login;
