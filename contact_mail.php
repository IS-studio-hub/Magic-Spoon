<?php
$toEmail = "your_email@mail.com";
$mailHeaders = "From: " . $_POST["userName"] . "<". $_POST["userEmail"] .">\r\n";
if(mail($toEmail, $_POST["subject"], $_POST["content"], $mailHeaders)) {
print "<p class='success'>Message Sent.</p>";
} else {
print "<p class='error'>Problem Sending Message.</p>";
}
?>