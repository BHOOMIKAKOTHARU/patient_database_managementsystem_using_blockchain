<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
// Database connection details (replace with your actual credentials)
$servername = "localhost";
$username = "root";
$password = "Bhoomika@2003";
$dbname = "mdetails";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Define a function to fetch bill data
function fetchBillData($conn) {
    $sql = "SELECT patient_id,patient_name,bill_type, amount FROM mbills"; // Select only the username and amount columns
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $bills = [];
        while ($row = $result->fetch_assoc()) {
            $bills[] = $row;
        }
        return $bills;
    } else {
        return []; // Return empty array if no bills found
    }
}

// Fetch bill data
$bills = fetchBillData($conn);

// Close connection
$conn->close();

// Set response headers to indicate JSON content
header('Content-Type: application/json');

// Return JSON response
echo json_encode($bills);
?>
