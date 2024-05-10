<?php
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Establish connection to MySQL database
    $servername = "localhost"; // Change this if your MySQL server is running on a different host
    $username = "root"; // Your MySQL username
    $password = "Bhoomika@2003"; // Your MySQL password
    $dbname = "pdmsb"; // Your database name
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare and bind SQL statement
    $stmt = $conn->prepare("INSERT INTO store (username, email, dob, age, phoneNumber, password) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $username, $email, $dob, $age, $phoneNumber, $password);

    // Set parameters and execute
    $username = $_POST['username'];
     // hashing
     $email = $_POST['email'];
    $dob = $_POST['dob'];
    $age = $_POST['age'];
    $phoneNumber = $_POST['phoneNumber'];
    $password = $_POST['password'];
   
       
    // Execute the prepared statement
    if ($stmt->execute()) {
        // Redirect to dashboard.html upon successful record insertion
        header("Location: index.html");
        exit(); // Ensure that script execution stops after redirection
    } else {
        echo "Error: " . $stmt->error;
    }
  var_dump($_POST);
exit();
    // Close statement and connection
    $stmt->close();
    $conn->close();
}
?>
