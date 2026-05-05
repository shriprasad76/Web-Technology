//get values from dom
function functionjs(){
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    document.getElementById("nameError").innerHTML = "";
    document.getElementById("emailError").innerHTML = "";
    document.getElementById("passwordError").innerHTML = "";
    let isvalid = true;

    //name validation
    if(name == ""){
        document.getElementById("nameError").innerHTML = "Name must be Entered.";
        isvalid = false;
    }
     //email validation
    if(email == ""){
        document.getElementById("emailError").innerHTML = "Email must be Entered."; 
        isvalid = false;
    }
    else if(!email.includes("@")){
        document.getElementById("emailError").innerHTML = "Email must contain @ character.";
    }

    //password validation
    if(password == ""){
        document.getElementById("passwordError").innerHTML = "Password must be Entered.";
        isvalid = false;
    }
    else if(password.length < 6){
        document.getElementById("passwordError").innerHTML = "Password must be at least 6 characters long.";
        isvalid = false;
    }
    
    
   
}