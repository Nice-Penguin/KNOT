let home = document.getElementById("home");
let web_console = document.getElementById("web_console");
let reference = document.getElementById("reference");
let about = document.getElementById("about");
const change_view = {
    show_home : show_home(),
    show_console : show_console(),
    show_reference : show_reference(),
    show_about : show_about()
}
function show_home() {
    home.style.display = "flex";
    web_console.style.display = "none";
    reference.style.display = "none";
    about.style.display = "none";
}

function show_console() {
    home.style.display = "none";
    web_console.style.display = "flex";
    reference.style.display = "none";
    about.style.display = "none";
}

function show_reference() {
    home.style.display = "none";
    web_console.style.display = "none";
    reference.style.display = "flex";
    about.style.display = "none";
}

function show_about() {
    home.style.display = "none";
    web_console.style.display = "none";
    reference.style.display = "none";
    about.style.display = "block";
}

export default change_view;