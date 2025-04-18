const { ethers } = require('ethers');

// Setup provider (using Infura or Alchemy)
const provider = new ethers.JsonRpcProvider('https://mainnet.infura.io/v3/7fb363b18e6d4ce7b83c23e11add4aa0');

// Setup wallet (replace with actual private key)
const privateKey = '5a5550416319ee788ff1583400f8f444ffec2d7f888abf6721576566df4d1f8a'; // Replace with your private key
const wallet = new ethers.Wallet(privateKey, provider);

// Define contract details
const contractABI = require('./contractABI.json'); // Path to your contract ABI file
const contractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138'; // Replace with your contract address

// Create contract instance
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// Exported function to interact with contract
exports.sendTransaction = async (freelancer, client, amount) => {
    try {
        // Convert amount to Wei (Ether's smallest unit)
        const amountInWei = ethers.utils.parseEther(amount.toString());

        // Send the transaction to create a contract on the blockchain
        const tx = await contract.createContract(freelancer, client, amountInWei);
        console.log('Transaction hash:', tx.hash);

        // Wait for the transaction to be mined
        await tx.wait();
        console.log('Transaction confirmed in block:', tx.blockNumber);

        return tx.hash; // Return transaction hash
    } catch (error) {
        console.error('Error sending transaction:', error);
        throw new Error('Failed to send transaction');
    }
};
