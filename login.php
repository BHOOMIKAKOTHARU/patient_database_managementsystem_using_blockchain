<?php
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Connect to your database
    $conn = new mysqli("localhost", "root", "Padmaja@205", "pdms");

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Get form data
    $username = $_POST["username"];
    $password = $_POST["password"];

    // Check if username and password match
    $sql = "SELECT * FROM users WHERE username='$username' AND password='$password'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Login successful
        echo "Login successful";
    } else {
        // Login failed
        echo "Invalid username or password";
    }

    $conn->close();
}
?>
