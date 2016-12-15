<?php
require 'PHPMailerAutoload.php';

$mail = new PHPMailer;

//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.server.com';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'your@email.com';                 // SMTP username
$mail->Password = 'password';                           // SMTP password
                          // Enable TLS encryption, `ssl` also accepted
$mail->Port = 25;                                    // TCP port to connect to

$mail->setFrom('postmaster@doomsday.com', 'Doomsday Preppers Postmaster');
$mail->addAddress('recipient@email.com', 'Webmaster');     // Add a recipient

$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Received from Doomsday preppers site';

$from = $_REQUEST['email']; 
$name = $_REQUEST['name']; 
$message = $_REQUEST['message']; 

$fields = array(); 
$fields{"name"} = "name"; 
$fields{"email"} = "email"; 
$fields{"message"} = "message";

$mail->Body  = "Here is what was sent:\n\n"; 
foreach($fields as $a => $b){   
    $mail->Body  .= sprintf("%20s: %s\n",$b,$_REQUEST[$a]); 
}

if(!$mail->send()) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Message has been sent';
}
?>