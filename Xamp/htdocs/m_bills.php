<?php
// Database connection for hdetails database (to check patient details)
$servername_hdetails = "localhost";
$username_hdetails = "root";
$password_hdetails = "Bhoomika@2003";
$dbname_hdetails = "hdetails";

// Create connection for hdetails database
$conn_hdetails = new mysqli($servername_hdetails, $username_hdetails, $password_hdetails, $dbname_hdetails);

// Check connection for hdetails database
if ($conn_hdetails->connect_error) {
    die("Connection to hdetails database failed: " . $conn_hdetails->connect_error);
}

// Database connection for mdetails database (to insert bill details)
$servername_mdetails = "localhost";
$username_mdetails = "root";
$password_mdetails = "Bhoomika@2003";
$dbname_mdetails = "mdetails";

// Create connection for mdetails database
$conn_mdetails = new mysqli($servername_mdetails, $username_mdetails, $password_mdetails, $dbname_mdetails);

// Check connection for mdetails database
if ($conn_mdetails->connect_error) {
    die("Connection to mdetails database failed: " . $conn_mdetails->connect_error);
}

// Handling form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $patientId = $_POST['patientId'];
    $username = $_POST['username'];
    $billType = $_POST['billType'];
    $amount = $_POST['amount'];

    // Query to check if patient details exist in patients table of hdetails database
    $sql_check_patient = "SELECT * FROM patients WHERE patient_id = '$patientId' AND patient_name = '$username'";
    $result_check_patient = $conn_hdetails->query($sql_check_patient);

    if ($result_check_patient && $result_check_patient->num_rows > 0) {
        // Patient details found, proceed with inserting bill details into mbills table
        $sql_insert_bill = "INSERT INTO mbills (patient_id, patient_name, bill_type, amount) VALUES ('$patientId', '$username', '$billType', '$amount')";

        if ($conn_mdetails->query($sql_insert_bill) === TRUE) {
            echo "Record inserted successfully";
        } else {
            echo "Error: " . $sql_insert_bill . "<br>" . $conn_mdetails->error;
        }
    } else {
        echo "Invalid patient ID or patient name. Cannot add the bill.";
    }
}

// Close connections
$conn_hdetails->close();
$conn_mdetails->close();
?>
