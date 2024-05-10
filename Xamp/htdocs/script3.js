const web3 = new Web3(new Web3.providers.WebsocketProvider("ws://localhost:7545"));
const insuranceABI = [{
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
const insuranceAddress = '0x68d9daA14dD96A390F83941B82e502BBDF8EACE1'; // Address of deployed Insurance contract

const insuranceContract = new web3.eth.Contract(insuranceABI, insuranceAddress);
insuranceContract.events.PatientBillAdded()
    .on('data', function(event) {
        console.log('Patient bill added:', event.returnValues);
        // Call checkBill function and update HTML
    })
    .on('error', console.error);

insuranceContract.events.MedicalBillAdded()
    .on('data', function(event) {
        console.log('Medical bill added:', event.returnValues);
        // Call checkBill function and update HTML
    })
    .on('error', console.error);
async function checkBill() {
    // Get bill details from user input or other sources
    const result = await insuranceContract.methods.checkBill(patientId, patientName, billType, amount).call();
    console.log('Check bill result:', result);
    // Update HTML to display the result
}
