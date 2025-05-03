<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "contact.alexahousecleaning@gmail.com";
    $subject = "New Contact Form Submission - Alexa House Cleaning";

    $name = strip_tags(trim($_POST["Name"]));
    $lastName = strip_tags(trim($_POST["Last_name"]));
    $email = filter_var(trim($_POST["Email"]), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["Message"]);

    $email_content = "Name: $name\n";
    $email_content .= "Last Name: $lastName\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Message:\n$message\n";

    $headers = "From: $email";

    if (mail($to, $subject, $email_content, $headers)) {
        echo "success";
    } else {
        echo "error sending mail"; // <-- aquí verás si es error de envío
    }
} else {
    echo "invalid method"; // <-- aquí verás si es error de método
}
?>

