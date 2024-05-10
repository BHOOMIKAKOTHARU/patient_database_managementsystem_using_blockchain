// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract Insurance {
    // Variables to store emitted values from Patient and Medical contracts
    string public patientId;
    string public patientName;
    string public billType;
    string public amount;

    // Events to listen for emitted values from Patient and Medical contracts
    event PatientBillAdded(string indexed patientId, string patientName, string billType, string amount);
    event MedicalBillAdded(string indexed patientId, string patientName, string billType, string amount);

    // Function to store emitted values from Patient contract
    function setPatientBill(string memory _patientId, string memory _patientName, string memory _billType, string memory _amount) public {
        patientId = _patientId;
        patientName = _patientName;
        billType = _billType;
        amount = _amount;
        emit PatientBillAdded(_patientId, _patientName, _billType, _amount);
    }

    // Function to store emitted values from Medical contract
    function setMedicalBill(string memory _patientId, string memory _patientName, string memory _billType, string memory _amount) public {
        patientId = _patientId;
        patientName = _patientName;
        billType = _billType;
        amount = _amount;
        emit MedicalBillAdded(_patientId, _patientName, _billType, _amount);
    }

    // Function to check if the patient and medical bills match
    function checkBill(string memory _patientId, string memory _patientName, string memory _billType, string memory _amount) public view returns (string memory) {
        if (keccak256(abi.encodePacked(_patientId)) == keccak256(abi.encodePacked(patientId)) &&
            keccak256(abi.encodePacked(_patientName)) == keccak256(abi.encodePacked(patientName)) &&
            keccak256(abi.encodePacked(_billType)) == keccak256(abi.encodePacked(billType)) &&
            keccak256(abi.encodePacked(_amount)) == keccak256(abi.encodePacked(amount))) {
            return "Valid bill";
        } else {
            return "Invalid bill";
        }
    }
}
