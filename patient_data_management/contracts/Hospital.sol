// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;
contract Hospital {
    // Define a struct to represent patient details
    struct Patient {
        string patientId;
        string patientName;
        uint256 age;
    }

    // Define a mapping to store patient details
    mapping(string => Patient) public patients;

    // Function to add a new patient
    function addPatient(string memory _patientId, string memory _patientName, uint256 _age) public {
        // Create a new patient object
        Patient memory newPatient = Patient(_patientId, _patientName, _age);

        // Add the new patient to the mapping
        patients[_patientId] = newPatient;
    }
}
