<?php
// Establishing connection to the database
$servername = "localhost"; // Assuming your database is on localhost
$username = "root"; // Replace with your database username
$password = "Bhoomika@2003"; // Replace with your database password
$dbname = "pdmsb"; // Replace with your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Getting username and password from the form
$username = $_POST['username'];
$password = $_POST['password'];

// Query to retrieve password from the database for the entered username
$sql = "SELECT password FROM store WHERE username='$username'";
$result = $conn->query($sql);
var_dump($_POST);

// Check if username exists
if ($result->num_rows > 0) {
    // Username exists, now checking if password matches
    $row = $result->fetch_assoc();
    $stored_password = $row['password'];
    
    if ($password == $stored_password) {
        // Password matches, redirecting to success page
        header("Location: insurance_success.html");
        exit();
    } else {
        // Password doesn't match
        echo "Password doesn't match.";
    }
} else {
    // Username doesn't exist
    echo "Username doesn't exist.";
}

$conn->close();
?>
