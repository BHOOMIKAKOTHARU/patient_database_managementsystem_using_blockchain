<?php
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Establish connection to MySQL database
    $servername = "localhost"; // Change this if your MySQL server is running on a different host
    $username = "root"; // Your MySQL username
    $password = "Bhoomika@2003"; // Your MySQL password
    $dbname = "patient"; // Your database name
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Retrieve form data
    $username = $_POST['username']; // Add this line to retrieve username
    $patientId = $_POST['patientId'];
    $billType = $_POST['billType'];
    $amount = $_POST['amount'];

    // Handle file upload and convert file to binary
    $billImage = addslashes(file_get_contents($_FILES["billImage"]["tmp_name"]));

    // Prepare and bind SQL statement
     $stmt = $conn->prepare("INSERT INTO bills (patientId, username, billType, amount, billImage) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $patientId, $username, $billType, $amount, $billImage);
    // Execute the prepared statement
    if ($stmt->execute()) {
        echo "Data inserted successfully.";
    } else {
        echo "Error: " . $stmt->error;
    }

    // Close statement and connection
    $stmt->close();
    $conn->close();
}
?>
