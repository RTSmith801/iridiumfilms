<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $secretKey = "6LePyuAqAAAAAKiEQiVrU1OqtL3DmGC8aHofkbRZ";
    $recaptchaResponse = $_POST['g-recaptcha-response'];

    $verifyURL = "https://www.google.com/recaptcha/api/siteverify";
    $response = file_get_contents($verifyURL . "?secret=" . $secretKey . "&response=" . $recaptchaResponse);
    $responseKeys = json_decode($response, true);

    if ($responseKeys["success"]) {
        $name = htmlspecialchars($_POST['name']);
        $email = htmlspecialchars($_POST['email']);
        $company = htmlspecialchars($_POST['company']); 
        $message = htmlspecialchars($_POST['message']);

        $to = "RTSmith801@gmail.com, jxoum9@gmail.com";
        $subject = "New Message from $name";

        // Include company if provided
        $body = "This email was generated from the contact form at IridiumFilms.com.\n\n";
        $body .= "Contact Name: $name\n";
        $body .= "Contact Email: $email\n";
        if (!empty($company)) {
            $body .= "Company: $company\n";
        }
        $body .= "\nMessage:\n$message";

        $headers = "From: IridiumFilms.com";

        if (mail($to, $subject, $body, $headers)) {
            echo json_encode(["status" => "success", "message" => "Email sent successfully."]);
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to send the email. Please try again."]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "reCAPTCHA verification failed. Please try again."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request."]);
}
?>