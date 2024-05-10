const Patient = artifacts.require("Patient");

contract("Patient", (accounts) => {
  let patientInstance;

  before(async () => {
    patientInstance = await Patient.deployed();
  });

  it("should retrieve medical bills", async () => {
    // Call the function to retrieve medical bills
    const medicalBills = await patientInstance.getAllMedicalBills();
    
    // Assert that medicalBills is an array
    assert(Array.isArray(medicalBills), "Medical bills should be an array");

    // Add more assertions as needed to validate the output
  });
});
