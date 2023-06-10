let home = document.getElementById("home");
let web_console = document.getElementById("web_console");
let reference = document.getElementById("reference");
let about = document.getElementById("about");
function show_home() {
    home.style.display = "flex";
    home.classList.add("fade-in");
    web_console.style.display = "none";
    reference.style.display = "none";
    reference.classList.remove("fade-in");
    about.style.display = "none";
    about.classList.remove("fade-in");
}

function show_console() {
    home.style.display = "none";
    home.classList.remove("fade-in");
    web_console.style.display = "flex";
    reference.style.display = "none";
    reference.classList.remove("fade-in");
    about.style.display = "none";
    about.classList.remove("fade-in");
    window.dispatchEvent(new Event('resize'));
}

function show_reference() {
    home.style.display = "none";
    home.classList.remove("fade-in");
    web_console.style.display = "none";
    reference.style.display = "flex";
    reference.classList.add("fade-in");
    about.style.display = "none";
    about.classList.remove("fade-in");
}

function show_about() {
    home.style.display = "none";
    home.classList.remove("fade-in");
    web_console.style.display = "none";
    reference.style.display = "none";
    reference.classList.remove("fade-in");
    about.style.display = "block";
    about.classList.add("fade-in");
    window.dispatchEvent(setTimeout());
    window.dispatchEvent(new Event('resize'));
}

