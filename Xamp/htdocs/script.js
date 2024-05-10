// Function to connect to the blockchain
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

// Function to load smart contract
async function loadContract(web3) {
    try {
        var contractAbi = [{
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "string",
          "name": "username",
          "type": "string"
        },
        {
          "indexed": true,
          "internalType": "string",
          "name": "patientId",
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
      "name": "BillAdded",
      "type": "event"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "bills",
      "outputs": [
        {
          "internalType": "string",
          "name": "username",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "patientId",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "billType",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "amount",
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
          "name": "_username",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_patientId",
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
      "name": "addBill",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
]; // Your contract ABI
        var contractAddress = '0x68A72Abc7e6329314525c303A0F07a167Ad58BDA'; // Replace with your contract address
        var contract = new web3.eth.Contract(contractAbi, contractAddress);

        return contract; // Return the contract instance for further use
    } catch (error) {
        console.error('Error loading contract:', error);
        throw error;
    }
}

// Function to fetch data from the database
async function fetchBillsData() {
  try {
      const response = await fetch('get_bills.php');
      
      if (!response.ok) {
          throw new Error('Failed to fetch bill data. HTTP status ' + response.status);
      }
      
      // Read the response text
      const textData = await response.text();
      
      console.log('Response text:', textData); // Debug statement
      
      // Check if response is empty
      if (!textData.trim()) {
          throw new Error('Empty response received');
      }
      
      // Try parsing the response text as JSON
      let jsonData;
      try {
          jsonData = JSON.parse(textData);
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

fetchBillsData();
// Main function
async function main() {
    try {
        var web3 = await connectToBlockchain();
        var contract = await loadContract(web3);

        // Fetch data from the database
        const response = await fetchBillsData();
        const bills = await response.json(); // Parse JSON from the response


        // Iterate through the bills and add them to the blockchain
        for (const bill of bills) {
            await contract.methods.addBill(bill.patientId, bill.username, bill.billType, bill.amount).send({ from: "0xDbAdaB25058aeA8EBbF57F4ea6F8445E0BdE06a2", gas: 500000 });
            console.log('Medical bill added successfully:', bill);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

main(); // Execute the main function
