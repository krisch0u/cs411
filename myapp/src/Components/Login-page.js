const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    if (username == "user" && password == "web_dev") {
        // successful login
        alert("Login Successful");
        location.reload(); // change this here to open the enter city page ???
    }
    else {
        // failed login
        loginErrorMsg.style.opacity = 1;
    }
})