const Patient = artifacts.require("Patient");
const Hospital = artifacts.require("Hospital");
const Medical = artifacts.require("Medical");
const Insurance = artifacts.require("Insurance");

module.exports = function(deployer) {
  deployer.deploy(Patient);
  deployer.deploy(Hospital);
  deployer.deploy(Medical);
  deployer.deploy(Insurance);
};
