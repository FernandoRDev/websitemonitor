//Config firebase
const config = {
    apiKey: "AIzaSyAPHPawp-rH7O9zolT4MQa6V1OxoucibUQ",
    authDomain: "webmoonitor.firebaseapp.com",
    databaseURL: "https://webmoonitor.firebaseio.com",
    projectId: "webmoonitor",
    storageBucket: "webmoonitor.appspot.com",
    messagingSenderId: "812088992257",
    appId: "1:812088992257:web:b7bbe5b3ecc23f07211600",
    measurementId: "G-M97ZY1J6XJ"
};

//Firebase init
firebase.initializeApp(config);

// Auth var
const auth = firebase.auth();

const loginForm = document.querySelector("#loginForm");
const registerForm = document.querySelector("#registerForm");

const getRegister = document.getElementById("register");
const getLogin = document.getElementById("login");
const getDetail = document.getElementById("detail");

btnUser = document.getElementById("btn-user")

//Logout
function logout() {
    auth.signOut();
    location.reload();
}

function recoveryPass() {
    let loginEmail = getInputVal("login-email");

    if (loginEmail == '' || loginEmail == null) {
        return alert("Preencha o campo de e-mail para recuperar")
    }

    auth.sendPasswordResetEmail(loginEmail).then(function () {
        return alert("E-mail de recuperação enviado")
    }).catch(function (e) {
        return alert(e.message)
    });
}

//Listing change of user
auth.onAuthStateChanged(function (user) {
    let btnLogout = document.getElementById("btn-logout")
    let btnLogin = document.getElementById("btn-user")

    if (user) {
        btnUser.textContent = (user.email).split("@")[0]
        btnLogout.style.display = "block";
        btnLogin.removeAttribute('onclick');
    }
});

//Login
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const loginPass = getInputVal("login-password");
    const loginEmail = getInputVal("login-email");

    firebase.auth().signInWithEmailAndPassword(loginEmail, loginPass).then((cred) => {
            loginForm.reset();
            getLogin.style.display = "none";
        })
        .catch((e) => {
            return alert(e.message) //TODO: feedback login errado kek
        });
});

//Registro
registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const registerPass = getInputVal("register-password");
    const repeatPass = getInputVal("repeat-password");
    const registerEmail = getInputVal("register-email");

    if (registerPass != repeatPass) {
        return alert("errou brother");
    }

    firebase.auth().createUserWithEmailAndPassword(registerEmail, registerPass).then((cred) => {
            loginForm.reset();
            getRegister.style.display = "none";
        })
        .catch((e) => {
            return alert(e.message)
        });
});

// Function to get form values
function getInputVal(id) {
    return document.getElementById(id).value;
}

// Modal login
function login() {
    if (getLogin.style.display === "flex") {
        getLogin.style.display = "none";
    } else {
        if (getRegister.style.display === "flex") {
            getRegister.style.display = "none";
        } else {
            getLogin.style.display = "flex";
            getRegister.style.display = "none";
        }
    }
}

// Modal register
function register() {
    if (getRegister.style.display === "flex") {
        getRegister.style.display = "none";
    } else {
        getRegister.style.display = "flex";
        getLogin.style.display = "none";
    }
}


//------------- MONITORAMENTO --------------//


const monitorForm = document.querySelector("#monitorForm");
var sites = [];

//Login
monitorForm.addEventListener("submit", (e) => {
    e.preventDefault()
    site = getInputVal("endereco");
    if (!isURL(site)) {
        return alert("Informe uma url valida")
    }
    site = site.replace('https://', '')
    site = site.replace('http://', '')
    site = site.replace('www.', '')
    site = site.replace('ww2.', '')
    if (site.includes('/')) {
        site = site.split('/')[0]
    }
    console.log(site)
    monitorForm.reset()
    addSite(site)
});


function addSite(site) {
    if (sites.indexOf(site)) {
        sites.push(site)
    } else {
        return
    }

    var table = document.getElementById("monitorTable")
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);


    fetch("https://cors-anywhere.herokuapp.com/" + site).then(function (response) {
        if (response.status == 200) {
            cell1.innerHTML = '<div> <img src="http://www.google.com/s2/favicons?domain=' + site + '"/>' + site + '</div>'
            cell2.innerHTML = '<div> <img src="assets/on.png" alt="icon"/> online</div>'

        } else {
            cell1.innerHTML = '<div> <img src="http://www.google.com/s2/favicons?domain=' + site + '"/>' + site + '</div>'
            cell2.innerHTML = '<div> <img src="assets/off.png" alt="icon"/>offline</div>'
        }
    }).catch(function (e) {
        cell1.innerHTML = '<div> <img src="http://www.google.com/s2/favicons?domain=' + site + '"/>' + site + '</div>'
        cell2.innerHTML = '<div> <img src="assets/off.png" alt="icon"/>offline</div>'
    });

}



function isURL(str) {
    regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (regexp.test(str)) {
        return true;
    } else {
        return false;
    }
}

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

function loop() {
    sleep(5000).then(() => {
        console.log("eho")
        sites.forEach(site => {
            fetch("https://cors-anywhere.herokuapp.com/" + site).then(function (response) {
                if (response.status == 200) {
                    console.log("Site Online")
                } else {
                    //console.clear()
                    console.log("Site offline")
                }
            })

        });
        loop();
    });

}

//loop();