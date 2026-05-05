function scrollToSection(id) {
document.getElementById(id).scrollIntoView({behavior:'smooth'});
}

function registerEvent(name) {
alert("Registered for " + name);
}

document.getElementById("eventForm").addEventListener("submit",function(e){
e.preventDefault();
document.getElementById("msg").innerText="Registration Successful!";
});