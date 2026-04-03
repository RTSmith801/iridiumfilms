document.getElementById("contactForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent form from submitting normally
    console.log("Form submission prevented.");

    const form = event.target;
    const formData = new FormData(form);
    const responseDiv = document.getElementById("form-response");

    // Manually append the reCAPTCHA response
    formData.append("g-recaptcha-response", grecaptcha.getResponse());

    try {
        // Send the form data using fetch
        const response = await fetch("send_email.php", {
            method: "POST",
            body: formData
        });

        // Check if the response is OK (status 200)
        if (!response.ok) {
            throw new Error("Failed to send the form.");
        }

        // Parse the response as JSON
        const result = await response.json();

        // Handle the result from PHP
        if (result.status === "success") {
            responseDiv.style.color = "green";
            responseDiv.style.backgroundColor = "rgba(0,0,0,0.5)";
            responseDiv.textContent = result.message; // Display success message
            // Clear the form after successful submission
            form.reset();
        } else {
            responseDiv.style.color = "red";
            responseDiv.textContent = result.message; // Display failure message
        }
    } catch (error) {
        responseDiv.style.color = "red"; // Set error message color
        responseDiv.style.backgroundColor = "rgba(0,0,0,0.5)";
        responseDiv.textContent = "An error occurred. Please try again."; // Handle any fetch errors
        console.error(error); // Log the error for debugging
    }
});