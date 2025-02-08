
const provider = new ethers.providers.Web3Provider(window.ethereum);
let signer;
let userAddress;
const contractABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "allowance",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "needed",
          "type": "uint256"
        }
      ],
      "name": "ERC20InsufficientAllowance",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "balance",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "needed",
          "type": "uint256"
        }
      ],
      "name": "ERC20InsufficientBalance",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "approver",
          "type": "address"
        }
      ],
      "name": "ERC20InvalidApprover",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        }
      ],
      "name": "ERC20InvalidReceiver",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "ERC20InvalidSender",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "ERC20InvalidSpender",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "OwnableInvalidOwner",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "OwnableUnauthorizedAccount",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "modelId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "creator",
          "type": "address"
        }
      ],
      "name": "ModelListed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "modelId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        }
      ],
      "name": "ModelPurchased",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "modelId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "rater",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint8",
          "name": "rating",
          "type": "uint8"
        }
      ],
      "name": "ModelRated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "TransactionMade",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "MAX_TRANSACTIONS",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getLatestTransactionReceiver",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getLatestTransactionSender",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getLatestTransactionTime",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "modelId",
          "type": "uint256"
        }
      ],
      "name": "getModelDetails",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "creator",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "averageRating",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "numberOfRatings",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "hasRated",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        }
      ],
      "name": "listModel",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "models",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "creator",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "totalRatings",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "ratingSum",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "numberOfRatings",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "exists",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "modelId",
          "type": "uint256"
        }
      ],
      "name": "purchaseModel",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "purchases",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "modelId",
          "type": "uint256"
        },
        {
          "internalType": "uint8",
          "name": "rating",
          "type": "uint8"
        }
      ],
      "name": "rateModel",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "withdrawFunds",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
const tokenAddress = "0x6D5F86542D706f5422f68924A844e8547179430e";
let tokenContract = new ethers.Contract(tokenAddress, contractABI, provider);

async function connectWallet() {
  if (!window.ethereum) {
    alert("Please install Metamask!");
    return;
  }
  try {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    signer = provider.getSigner();
    userAddress = await signer.getAddress();
    tokenContract = tokenContract.connect(signer);
    document.getElementById("walletStatus").innerText = 
      "Connected: " + userAddress;
    await updateTokenBalance();
  } catch (error) {
    console.error("Connection failed", error);
  }
}


async function checkConnection() {
  const accounts = await ethereum.request({ method: "eth_accounts" });
  const balanceElement = document.getElementById("wallet-balance");

  if (accounts.length === 0) {
    document.getElementById("wallet-status").innerText = "Not connected";
    balanceElement.innerText = "150 AST";
  } else {
    document.getElementById(
      "wallet-status"
    ).innerText = `Connected: ${accounts[0]}`;
    const balance = await tokenContract.balanceOf(accounts[0]);
    balanceElement.innerText = `${ethers.utils.formatEther(balance)} AST`;
  }
}

async function updateTokenBalance() {
  try {
    const balance = await tokenContract.balanceOf(userAddress);
    document.getElementById("tokenBalance").innerText = 
      `Balance: ${ethers.utils.formatEther(balance)} AST`;
  } catch (error) {
    console.error("Error fetching balance", error);
  }
}


async function listModel(event) {
  event.preventDefault();
  try {
    if (!signer) {
      alert("Please connect your wallet first!");
      return;
    }

    const name = document.getElementById("modelName").value;
    const description = document.getElementById("modelDescription").value;
    const price = document.getElementById("modelPrice").value;

    const contractWithSigner = tokenContract.connect(signer);
    const priceInWei = ethers.utils.parseEther(price.toString());

    const tx = await contractWithSigner.listModel(
      name,
      description,
      priceInWei
    );
    await tx.wait();

    alert("Model listed successfully!");
    document.getElementById("listModelForm").reset();
    loadModels();
  } catch (error) {
    console.error("Error listing model:", error);
    alert("Failed to list model: " + error.message);
  }
  await updateTokenBalance();
  const balance = await contract.balanceOf(userAddress);
console.log("Balance:", balance.toString());
}

async function purchaseModel() {
  try {
    const button = document.getElementById("purchase-button");
    const status = document.getElementById("purchase-status");
    const input = document.getElementById("purchase-model-id");

    if (!signer) {
      alert("Please connect your wallet first!");
      return;
    }

    const modelId = input.value.trim();
    if (!modelId) {
      alert("Please enter a valid Model ID.");
      return;
    }

    button.disabled = true;
    button.innerText = "Processing...";
    status.style.display = "none";

    const contractWithSigner = tokenContract.connect(signer);

    const modelDetails = await tokenContract.getModelDetails(modelId);
    const modelPrice = modelDetails[2];

    const userBalance = await tokenContract.balanceOf(userAddress);
    if (userBalance.lt(modelPrice)) {
      alert("Insufficient balance to purchase this model.");
      button.disabled = false;
      button.innerText = "Purchase";
      return;
    }

    const txApprove = await contractWithSigner.approve(
      tokenAddress,
      modelPrice
    );
    await txApprove.wait();

    const txPurchase = await contractWithSigner.purchaseModel(modelId);
    await txPurchase.wait();

    status.innerText = "Model purchased successfully!";
    status.style.display = "block";

    updateTokenBalance();
    loadModels();
  } catch (error) {
    console.error("Error purchasing model:", error);
    alert("Failed to purchase model: " + error.message);
  } finally {
    button.disabled = false;
    button.innerText = "Purchase";
  }
}

function handleRateModel() {
  const modelId = parseInt(document.getElementById("rate-model-id").value);
  const rating = parseInt(document.getElementById("rate-value").value);

  if (!modelId || rating < 1 || rating > 5) {
    alert("Please enter a valid Model ID and a rating between 1 and 5.");
    return;
  }

  rateModel(modelId, rating);
}

async function checkIfPurchased(modelId) {
  try {
    const signer = await provider.getSigner();
    const userAddress = await signer.getAddress();
    return await tokenContract.purchases(userAddress, modelId);
  } catch (error) {
    console.error("Error checking purchase:", error);
    return false;
  }
}

async function rateModel(modelId, rating) {
  try {
    const purchased = await checkIfPurchased(modelId);
    if (!purchased) {
      alert("You must purchase this model before rating.");
      return;
    }

    const signer = await provider.getSigner();
    const contractWithSigner = tokenContract.connect(signer);

    console.log(`Rating model ${modelId} with ${rating} stars...`);

    let tx = await contractWithSigner.rateModel(modelId, rating);
    await tx.wait();

    alert(`You rated Model ${modelId} with ${rating} stars!`);

    updateModelRating(modelId);
  } catch (error) {
    console.error("Rating failed:", error);
    alert("Rating failed: " + (error.data?.message || error.message));
  }
}

// Функция для обновления рейтинга модели в интерфейсе
async function updateModelRating(modelId) {
  try {
    const modelDetails = await tokenContract.getModelDetails(modelId);
    const averageRating = modelDetails[4].toNumber(); // Преобразуем BigNumber в число

    document.getElementById(
      `model-rating-${modelId}`
    ).innerText = `Rating: ${averageRating}/5`;
  } catch (error) {
    console.error("Failed to update rating:", error);
  }
}

async function getModelDetails() {
  try {
    const modelId = document.getElementById("details-model-id").value;
    const details = await tokenContract.getModelDetails(modelId);

    const modelInfo = document.getElementById("model-info");
    modelInfo.innerHTML = `
            <div class="model-details">
                <p><strong>Name:</strong> ${details[0]}</p>
                <p><strong>Description:</strong> ${details[1]}</p>
                <p><strong>Price:</strong> ${ethers.utils.formatEther(
                  details[2]
                )} AST</p>
                <p><strong>Creator:</strong> ${details[3]}</p>
                <p><strong>Average Rating:</strong> ${details[4].toNumber()}/5</p>
                <p><strong>Number of Ratings:</strong> ${details[5].toNumber()}</p>
            </div>
        `;
  } catch (error) {
    console.error("Error fetching model details:", error);
    document.getElementById("model-info").innerHTML =
      "Error fetching model details";
  }
}

async function getModelDetailsUI() {
  const modelId = document.getElementById("model-id-input").value;

  if (!modelId) {
    alert("Please enter a valid Model ID.");
    return;
  }

  try {
    const modelDetails = await tokenContract.getModelDetails(modelId);

    document.getElementById("model-name").innerText = modelDetails[0];
    document.getElementById("model-description").innerText = modelDetails[1];
    document.getElementById("model-price").innerText = modelDetails[2];
    document.getElementById("model-creator").innerText = modelDetails[3];
    document.getElementById("model-average-rating").innerText = modelDetails[4];
    document.getElementById("model-ratings-count").innerText = modelDetails[5];

    document.getElementById("model-info").style.display = "block";
  } catch (error) {
    console.error("Failed to fetch model details:", error);
    alert("Error fetching model details.");
  }
}

async function withdrawFunds() {
  try {
    if (!signer) {
      alert("Please connect your wallet first!");
      return;
    }

    const contractWithSigner = tokenContract.connect(signer);
    const tx = await contractWithSigner.withdrawFunds();
    await tx.wait();

    alert("Funds withdrawn successfully!");
    updateTokenBalance();
  } catch (error) {
    console.error("Error withdrawing funds:", error);
    alert("Failed to withdraw funds: " + error.message);
  }
}

async function loadModels() {
  try {
    const modelsContainer = document.getElementById("modelsContainer");
    modelsContainer.innerHTML = "";

    for (let i = 1; i < 5; i++) {
      try {
        const details = await tokenContract.getModelDetails(i);
        const li = document.createElement("li");
        li.className = "model-item";
        li.innerHTML = `
                    <div class="model-card">
                        <h3>${details[0]}</h3>
                        <p>${details[1]}</p>
                        <p>Price: ${ethers.utils.formatEther(
                          details[2]
                        )} AST</p>
                        <p>Creator: ${details[3]}</p>
                        <p>Rating: ${details[4].toNumber()}/5 (${details[5].toNumber()} ratings)</p>
                        <div class="model-id">ID: ${i}</div>
                    </div>
                `;
        modelsContainer.appendChild(li);
      } catch (error) {
        console.error(`Error loading model ${i}:`, error);
      }
    }
  } catch (error) {
    console.error("Error loading models:", error);
  }
}

// Event listeners
window.addEventListener("load", async () => {
  if (window.ethereum) {
    provider.send("eth_accounts", []).then(async (accounts) => {
      if (accounts.length > 0) {
        userAddress = accounts[0];
        document.getElementById("walletStatus").innerText =
          "Connected: " + userAddress;
        updateTokenBalance();
        loadModels();
      }
    });
  }
});

document
  .getElementById("connectWalletBtn")
  .addEventListener("click", connectWallet);
document.getElementById("listModelForm").addEventListener("submit", listModel);
document
  .getElementById("purchase-button")
  .addEventListener("click", purchaseModel);
document
  .getElementById("rate-button")
  .addEventListener("click", handleRateModel);
document
  .getElementById("model_button")
  .addEventListener("click", getModelDetailsUI);

export {
  connectWallet,
  listModel,
  purchaseModel,
  rateModel,
  getModelDetails,
  loadModels,
  withdrawFunds,
};
