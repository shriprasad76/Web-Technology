document.getElementById("myForm").addEventListener("submit", function(event) {

    event.preventDefault();  // Stop form submission

    let name = document.getElementById("name").value.trim();
    let prn = document.getElementById("prn").value.trim();
    let email = document.getElementById("email").value.trim();
    let mobile = document.getElementById("mobile").value.trim();

    let nameError = document.getElementById("nameError");
    let prnError = document.getElementById("prnError");
    let emailError = document.getElementById("emailError");
    let mobileError = document.getElementById("mobileError");
    let successMessage = document.getElementById("successMessage");

    // Clear previous messages
    nameError.innerHTML = "";
    prnError.innerHTML = "";
    emailError.innerHTML = "";
    mobileError.innerHTML = "";
    successMessage.innerHTML = "";

    let isValid = true;

    // Name validation (required)
    if (name === "") {
        nameError.innerHTML = " Name is required ";
        isValid = false;
    }

    // PRN validation (required and 10 digits)
    if (prn === "") {
        prnError.innerHTML = " PRN is required ";
        isValid = false;
    } 
    else if (!/^[0-9]{10}$/.test(prn)) {
        prnError.innerHTML = " PRN must be 10 digits ";
        isValid = false;
    }

    // Email validation (required)
    if (email === "") {
        emailError.innerHTML = " Email is required ";
        isValid = false;
    } 
    else if (!/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(email)) {
        emailError.innerHTML = " Invalid Email ";
        isValid = false;
    }

    // Mobile validation (required and 10 digits)
    if (mobile === "") {
        mobileError.innerHTML = " Mobile number is required ";
        isValid = false;
    } 
    else if (!/^[0-9]{10}$/.test(mobile)) {
        mobileError.innerHTML = " Mobile must be 10 digits ";
        isValid = false;
    }

    // If everything is valid
    if (isValid) {
        successMessage.innerHTML = "Form submitted successfully!";
        document.getElementById("myForm").reset();
    }

});