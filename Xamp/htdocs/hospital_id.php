<?php
// Database connection
$servername = "localhost"; // Change this if your database is hosted elsewhere
$username = "root"; // Your database username
$password = "Bhoomika@2003"; // Your database password
$dbname = "hdetails"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Function to generate a unique patient ID
function generatePatientID() {
    return 'PAT' . uniqid(); // You can modify the prefix if needed
}

// Handling form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $patientName = $_POST['patientName'];
    $age = $_POST['age'];
    
    // Generating patient ID
    $patientId = generatePatientID();
    
    // SQL query to insert data into the database
    $sql = "INSERT INTO patients (patient_id, patient_name, age) VALUES ('$patientId', '$patientName', '$age')";

    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

// Close connection
$conn->close();
?>
