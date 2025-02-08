## AI Marketplace with Blockchain Integration
Welcome to the AI Marketplace with Blockchain Integration repository. This platform allows users to buy and sell AI models using ERC-20 tokens. The marketplace integrates with blockchain tools like MetaMask for wallet connection and secure transactions.

## Features
1. User Authentication and Wallet Integration
MetaMask or similar wallet integration: Users can connect their wallet to interact with the blockchain.
After connecting, users can view wallet details, ensuring a secure and seamless marketplace experience.
2. Token Balance Display
Users can check their ERC-20 token balance directly within the marketplace interface.
Token balance is updated regularly, and users can refresh the balance to reflect real-time data.
3. AI Model Listings
Sellers can list their AI models with the following details:
Model Name
Description
Price (in ERC-20 tokens)
Seller Details (e.g., wallet address)
Model File Upload or Secure Access Link for Download
The marketplace will display these details for buyers to explore.
 4. Purchase Flow
Buyers can:
View detailed information about each AI model.
Initiate purchases by transferring the required ERC-20 tokens to the seller’s wallet.
Upon successful transactions, the marketplace UI will:
Mark the AI model as "Sold".
Adjust inventory to reflect the updated status.
Prerequisites
Node.js (v14 or later)
MetaMask browser extension
Ganache (for local blockchain testing)

## Installation
Clone the Repository:

```bash
cd my-marketplace
```
Install Dependencies:

   ```bash
npm install hardhat
```
Deploy Smart Contracts:

   ```bash
npx hardhat run scripts/deploy.js --network ganache
```

Compile Smart Contracts:
   ```bash
npx hardhat compile
```
Usage
1. Connect Your Wallet
Open the marketplace in your browser.
Ensure you have MetaMask (or a compatible wallet extension) installed.
Click on the "Connect Wallet" button to link your wallet to the marketplace.
Once connected, you can view your ERC-20 token balance and interact with the platform.
2. Browse and Purchase AI Models
After wallet connection, browse through the available AI models.
To purchase a model, click on the listing for more details.
Press "Buy Now" to initiate the purchase, transferring the required tokens to the seller’s wallet.
3. Create New Listings
As a seller, go to the "Create Listing" page.
Provide the following details for your AI model:
Model Name
Description
Price (in ERC-20 tokens)
Upload Model File or provide a download link.
After submitting, your listing will be visible in the marketplace for buyers.
4. Refresh Token Balance
Keep your ERC-20 token balance updated by clicking on the "Refresh Balance" button.
This will reflect your current token balance in real-time.
5. View Purchase Status
After a transaction is completed:
The model will be marked as "Sold".
The inventory count will be adjusted accordingly.

## Screenshots
![image](https://github.com/user-attachments/assets/a0a22398-a203-44cb-93de-02a35803629d)




## References
- [Connecting to MetaMask with Vanilla JS](https://docs.web3js.org/guides/dapps/metamask-vanilla/)
- [OpenZeppelin Contracts Wizard](https://wizard.openzeppelin.com/)

