const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const form = document.getElementById("contact-form");
const successMessage = document.getElementById("success-message");

if (fullName && email && form) {

    function saveData() {
        localStorage.setItem("fullName", fullName.value);
        localStorage.setItem("email", email.value);
    }

    function loadData() {
        fullName.value = localStorage.getItem("fullName") || "";
        email.value = localStorage.getItem("email") || "";
    }

    fullName.addEventListener("input", saveData);
    email.addEventListener("input", saveData);

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        successMessage.textContent =
            "✅ Your message has been submitted successfully!";
    });

    window.addEventListener("DOMContentLoaded", loadData);
}