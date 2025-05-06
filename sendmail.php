<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "contact.alexahousecleaning@gmail.com";
    $subject = "New Contact Form Message";

    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $phone = strip_tags(trim($_POST["phone"]));
    $message = trim($_POST["message"]);

    $email_body = "Name: $name\n";
    $email_body .= "Email: $email\n";
    $email_body .= "Phone: $phone\n";
    $email_body .= "Message:\n$message\n";

    $headers = "From: $email";

    if (mail($to, $subject, $email_body, $headers)) {
        header("Location: thanks.html");
        exit();
    } else {
        echo "Message could not be sent. Please try again.";
    }
} else {
    echo "Invalid request.";
}
?>
