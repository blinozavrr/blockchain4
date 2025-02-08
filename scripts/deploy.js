const { ethers } = require("hardhat");

async function main() {
  // Deploy MyToken with an initial supply of 1,000,000 tokens (18 decimals)
  const initialSupply = ethers.parseUnits("1000000", 18); // ✅ Correct usage in ethers v6+
  const MyToken = await ethers.getContractFactory("MyToken");
  const myToken = await MyToken.deploy(initialSupply);
  await myToken.waitForDeployment(); // ✅ Updated for ethers v6+
  console.log("MyToken deployed to:", await myToken.getAddress()); // ✅ Updated for ethers v6+

  // Deploy Marketplace with the token address
  const Marketplace = await ethers.getContractFactory("Marketplace");
  const marketplace = await Marketplace.deploy(await myToken.getAddress());
  await marketplace.waitForDeployment(); // ✅ Updated for ethers v6+
  console.log("Marketplace deployed to:", await marketplace.getAddress()); // ✅ Updated for ethers v6+
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
