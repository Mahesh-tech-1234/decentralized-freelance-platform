const { ethers } = require('ethers');
const contractABI = require('../utils/contractABI.json'); // Path to the ABI file
const contractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138'; // Replace with your contract address

// Setup provider and signer (using Infura or Alchemy)
const provider = new ethers.JsonRpcProvider('https://mainnet.infura.io/v3/7fb363b18e6d4ce7b83c23e11add4aa0');
const privateKey = '5a5550416319ee788ff1583400f8f444ffec2d7f888abf6721576566df4d1f8a'; // Replace with your private key
const wallet = new ethers.Wallet(privateKey, provider);

// Create contract instance
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// Controller function to create contract
exports.createContract = async (req, res) => {
    const { freelancer, client, amount } = req.body;

    try {
        // Convert amount to Wei (the smallest unit of Ether) before passing to the smart contract
        const amountInWei = ethers.utils.parseEther(amount.toString());

        // Send the transaction to the smart contract
        const tx = await contract.createContract(freelancer, client, amountInWei);
        console.log('Transaction hash:', tx.hash);

        // Wait for the transaction to be mined
        await tx.wait();
        console.log('Transaction confirmed in block:', tx.blockNumber);

        res.status(200).json({
            message: 'Transaction successful!',
            transactionHash: tx.hash,
            blockNumber: tx.blockNumber,
        });
    } catch (error) {
        console.error('Error creating contract:', error);
        res.status(500).json({ error: 'Failed to create contract' });
    }
};
