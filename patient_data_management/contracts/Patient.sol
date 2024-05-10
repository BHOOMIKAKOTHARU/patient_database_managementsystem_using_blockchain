// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract Patient {
    // Define a struct to represent a patient's bill
    struct Bill {
        string username;
        string patientId;
        string billType;
        string amount;
    }

    // Define an array to store all bills
    Bill[] public bills;

    // Event to emit when a new bill is added
    event BillAdded(
        string indexed username,
        string indexed patientId,
        string billType,
        string amount
    );

    // Function to add a new bill
    function addBill(string memory _username, string memory _patientId, string memory _billType, string memory _amount) public {
        // Create a new bill object
        Bill memory newBill = Bill(_username, _patientId, _billType, _amount);

        // Add the new bill to the array
        bills.push(newBill);

        // Emit the BillAdded event
        emit BillAdded(_username, _patientId, _billType, _amount);
    }
}