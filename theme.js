// light Mode
let lightMode = localStorage.getItem('lightMode');
const enablelightMode = () => {

    document.body.classList.add('lightmode');

    localStorage.setItem("lightMode", "enabled");

};

const disablelightMode = () => {

    document.body.classList.remove('lightmode');

    localStorage.setItem("lightMode", null);

};

if (lightMode == 'enabled') {
    enablelightMode();
}

function theme() {
    lightMode = localStorage.getItem('lightMode');
    if (lightMode !== "enabled") {
        enablelightMode();
    } else {
        disablelightMode();
    }
}