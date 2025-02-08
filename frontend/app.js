// app.js

let provider;
let signer;
let myTokenContract;
let marketplaceContract;
let userAddress;

// !!! IMPORTANT !!!
// Replace the following placeholder addresses with the actual deployed contract addresses.
const myTokenAddress = "0xe35b06F312D203f9183498B7994efFB1791217A3";       
const marketplaceAddress = "0xC1C6D85340F4c1e0484643c549Bdc79d8b371F62"; 

// ABI for the ERC-20 token contract
const myTokenABI = [
    "function balanceOf(address account) view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function approve(address spender, uint256 amount) returns (bool)"
];

// ABI for the marketplace contract
const marketplaceABI = [
    "function models(uint256) view returns (uint256 id, string name, string description, uint256 price, address seller, string fileUrl, bool sold)",
    "function nextModelId() view returns (uint256)",
    "function purchaseModel(uint256 modelId) external",
    "function listModel(string memory name, string memory description, uint256 price, string memory fileUrl) external"
];

async function connectWallet() {
    if (window.ethereum) {
        try {
            provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            signer = provider.getSigner();
            userAddress = await signer.getAddress();
            document.getElementById("accountInfo").innerText = "Connected account: " + userAddress;
            // Initialize contracts
            myTokenContract = new ethers.Contract(myTokenAddress, myTokenABI, signer);
            marketplaceContract = new ethers.Contract(marketplaceAddress, marketplaceABI, signer);
            updateBalance();
            loadModels();
        } catch (error) {
            console.error("Error connecting wallet:", error);
            alert("Failed to connect wallet.");
        }
    } else {
        alert("MetaMask is not installed!");
    }
}

async function updateBalance() {
    try {
        const balance = await myTokenContract.balanceOf(userAddress);
        // To avoid potential ENS resolution errors on local networks,
        // we assume token decimals to be 18 (standard for ERC-20 tokens).
        const formattedBalance = ethers.utils.formatUnits(balance, 18);
        document.getElementById("tokenBalance").innerText = formattedBalance;
    } catch (error) {
        console.error("Error updating balance:", error);
        document.getElementById("tokenBalance").innerText = "Error";
    }
}

async function loadModels() {
    try {
        const modelsListDiv = document.getElementById("modelsList");
        modelsListDiv.innerHTML = "";
        const nextModelId = await marketplaceContract.nextModelId();
        const numModels = nextModelId.toNumber();
        for (let i = 0; i < numModels; i++) {
            const model = await marketplaceContract.models(i);
            const modelDiv = document.createElement("div");
            modelDiv.className = "model";
            modelDiv.innerHTML = `
                <strong>ID:</strong> ${model.id} <br>
                <strong>Name:</strong> ${model.name} <br>
                <strong>Description:</strong> ${model.description} <br>
                <strong>Price:</strong> ${ethers.utils.formatUnits(model.price, 18)} tokens<br>
                <strong>Seller:</strong> ${model.seller} <br>
                <strong>Download:</strong> <a href="${model.fileUrl}" target="_blank">Link</a> <br>
                <strong>Status:</strong> ${model.sold ? "Sold" : "Available"}
            `;
            if (!model.sold) {
                const buyBtn = document.createElement("button");
                buyBtn.innerText = "Buy";
                buyBtn.onclick = async () => {
                    await buyModel(model.id, model.price);
                };
                modelDiv.appendChild(buyBtn);
            }
            modelsListDiv.appendChild(modelDiv);
        }
    } catch (error) {
        console.error("Error loading models:", error);
    }
}

async function buyModel(modelId, price) {
    try {
        // Approve tokens for the marketplace contract.
        const txApprove = await myTokenContract.approve(marketplaceAddress, price);
        await txApprove.wait();
        // Purchase the model.
        const txPurchase = await marketplaceContract.purchaseModel(modelId);
        await txPurchase.wait();
        alert("Model purchased successfully!");
        updateBalance();
        loadModels();
    } catch (error) {
        console.error("Error purchasing model:", error);
        alert("Error purchasing model. See console for details.");
    }
}

async function listModel() {
    const name = document.getElementById("modelName").value;
    const description = document.getElementById("modelDescription").value;
    const priceInput = document.getElementById("modelPrice").value;
    const fileUrl = document.getElementById("modelFileUrl").value;
    if (!name || !description || !priceInput || !fileUrl) {
        alert("Please fill in all fields.");
        return;
    }
    const price = ethers.utils.parseUnits(priceInput, 18);
    try {
        const tx = await marketplaceContract.listModel(name, description, price, fileUrl);
        await tx.wait();
        alert("Model added successfully!");
        loadModels();
    } catch (error) {
        console.error("Error adding model:", error);
        alert("Error adding model. See console for details.");
    }
}

document.getElementById("connectWallet").addEventListener("click", connectWallet);
document.getElementById("refreshBalance").addEventListener("click", updateBalance);
document.getElementById("listModelBtn").addEventListener("click", listModel);
