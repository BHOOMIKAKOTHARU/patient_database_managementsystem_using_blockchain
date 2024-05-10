async function connectToBlockchain() {
    try {
        var web3;
        if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
        } else {
            // Set up Ganache provider
            web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
        }

        // Check connection
        var isListening = await web3.eth.net.isListening();
        console.log('Connected to Ganache:', isListening);
        
        return web3; // Return the web3 instance for further use
    } catch (error) {
        console.error('Error connecting to Ganache:', error);
        throw error;
    }
}
async function loadContract(web3) {
    try {
        var contractAbi = [{
      "constant": true,
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "patients",
      "outputs": [
        {
          "internalType": "string",
          "name": "patientId",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "patientName",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "age",
          "type": "uint256"
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
          "internalType": "uint256",
          "name": "_age",
          "type": "uint256"
        }
      ],
      "name": "addPatient",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }

]; // Your contract ABI
        var contractAddress = '0xFC8Decc8C19f683fB146E3fB07eef4c7b2a78583'; // Replace with your contract address
        var contract = new web3.eth.Contract(contractAbi, contractAddress);

        return contract; // Return the contract instance for further use
    } catch (error) {
        console.error('Error loading contract:', error);
        throw error;
    }
}
async function fetchDepartmentsData() {
  try {
    const response = await fetch('get_hos.php');

        if (!response.ok) {
            throw new Error('Failed to fetch data. HTTP status ' + response.status);
        }
    const departments = await response.text();

    console.log('Response text:', departments); // Debug statement
        
        // Check if response is empty
        if (!departments.trim()) {
            throw new Error('Empty response received');
        }
        
        // Try parsing the response text as JSON
        let jsonData;
        try {
            jsonData = JSON.parse(departments);
        } catch (parseError) {
            throw new Error('Failed to parse response as JSON');
        }
        
        console.log('JSON data:', jsonData); // Debug statement
        
        return jsonData;
    } catch (error) {
        console.error('Error fetching bills:', error);
        return []; // Return empty array on error
    }
}


async function main() {
  try {
    var web3 = await connectToBlockchain();
    var contract = await loadContract(web3);

    // Fetch data from the database (departments)
    const response = await fetchDepartmentsData();
const bills = await response.json(); 
    // Functionality related to bills (assuming from previous script.js)
    // ... your existing code to fetch bills and interact with the blockchain

  for (const bill of bills) {
            await contract.methods.addBill(bill.patient_id, bill.patient_name, bill.age).send({ from: "0xDbAdaB25058aeA8EBbF57F4ea6F8445E0BdE06a2", gas: 500000 });
            console.log('Hospital data added successfully:', bill);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}
main(); // Execute the main function