<?php
// Establish database connection for mdetails database (where mbills table is located)
$servername_mdetails = "localhost";
$username_mdetails = "root";
$password_mdetails = "Bhoomika@2003";
$dbname_mdetails = "mdetails";

$conn_mdetails = new mysqli($servername_mdetails, $username_mdetails, $password_mdetails, $dbname_mdetails);

// Check connection for mdetails database
if ($conn_mdetails->connect_error) {
    die("Connection to mdetails database failed: " . $conn_mdetails->connect_error);
}

// Establish database connection for patient database (where bills table is located)
$servername_patient = "localhost";
$username_patient = "root";
$password_patient = "Bhoomika@2003";
$dbname_patient = "patient";

$conn_patient = new mysqli($servername_patient, $username_patient, $password_patient, $dbname_patient);

// Check connection for patient database
if ($conn_patient->connect_error) {
    die("Connection to patient database failed: " . $conn_patient->connect_error);
}

// Get form data
$patientId = $_POST['patientId'];
$patientName = $_POST['patientName'];


// Query the mbills table in mdetails database
$sql1 = "SELECT * FROM mbills WHERE patient_id='$patientId' AND patient_name='$patientName' ";
$result1 = $conn_mdetails->query($sql1);

// Query the bills table in patient database
$sql2 = "SELECT * FROM bills WHERE patientId='$patientId' AND username='$patientName' ";
$result2 = $conn_patient->query($sql2);

// Check if records exist in both tables
if ($result1->num_rows > 0 && $result2->num_rows > 0) {
    // Valid bill
    echo "<div class='result valid'>Valid bill</div>";
} else {
    // Invalid bill
    echo "<div class='result invalid'>Invalid bill</div>";
}
// Close connections
$conn_mdetails->close();
$conn_patient->close();
?>
