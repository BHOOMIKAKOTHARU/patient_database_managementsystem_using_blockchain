// Define the ABI (Application Binary Interface) of your smart contract
const contractABI = [
  // Your contract ABI here
{
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "string",
          "name": "patientId",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "patientName",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "billType",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "amount",
          "type": "string"
        }
      ],
      "name": "MedicalBillAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "string",
          "name": "patientId",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "patientName",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "billType",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "amount",
          "type": "string"
        }
      ],
      "name": "PatientBillAdded",
      "type": "event"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "amount",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "billType",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "patientId",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "patientName",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "string",
          "name": "_patientId",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_patientName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_billType",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_amount",
          "type": "string"
        }
      ],
      "name": "setPatientBill",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "string",
          "name": "_patientId",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_patientName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_billType",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_amount",
          "type": "string"
        }
      ],
      "name": "setMedicalBill",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "string",
          "name": "_patientId",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_patientName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_billType",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_amount",
          "type": "string"
        }
      ],
      "name": "checkBill",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }

];

// Define the address of your deployed smart contract on your Ganache blockchain
const contractAddress = '0x862c6FE7dbfcC320cA44AD80989513257B51103E';

// Function to handle button click event
async function checkResults() {
  try {
    // Get patient ID and name from input fields
    const patientId = document.getElementById('patientId').value;
    const patientName = document.getElementById('patientName').value;
 const billType = document.getElementById('billType').value;
 const amount = document.getElementById('amount').value;


    // Create a new web3 instance (assuming web3 is available globally)
   const web3 = new Web3('http://localhost:7545');
    // Load the contract instance using the ABI and address
    const contractInstance = new web3.eth.Contract(contractABI, contractAddress);

    // Call the checkBill function of the smart contract
    const result = await contractInstance.methods.checkBill(patientId, patientName,billType,amount).call();

    // Display the result on the HTML page
    document.getElementById('result').innerText = result;
  } catch (error) {
    console.error(error);
  }
}

// Bind function to button click event
document.getElementById('checkResultsBtn').onclick = checkResults;
