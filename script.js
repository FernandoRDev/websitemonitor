const getregister = document.getElementById("register");
const getlogin = document.getElementById("login");

function login() {
    if (getlogin.style.display === "block") {
        getlogin.style.display = "none";
    } else {
        if (getregister.style.display === "block") {
            getregister.style.display = "none";
        }else{
            getlogin.style.display = "block";
            getregister.style.display = "none";            
        }
    }
}

function register() {
    if (getregister.style.display === "block") {
        getregister.style.display = "none";
    } else {
        getregister.style.display = "block";
        getlogin.style.display = "none";
    }
}