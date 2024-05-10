// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;
contract Medical {
    // Define a struct to represent medical bill details
    struct Bill {
        string patientId;
        string patientName;
        string billType;
        string amount;
    }

    // Define an array to store medical bills
    Bill[] public bills;

    // Event to emit when a new medical bill is added
    event BillAdded(
        string indexed patientId,
        string patientName,
        string billType,
        string amount
    );

    // Function to add a new medical bill
    function addMedicalBill(string memory _patientId, string memory _patientName, string memory _billType, string memory _amount) public {
        // Create a new bill object
        Bill memory newBill = Bill(_patientId, _patientName, _billType, _amount);

        // Add the new bill to the array
        bills.push(newBill);

        // Emit the BillAdded event
        emit BillAdded(_patientId, _patientName, _billType, _amount);
    }
}
