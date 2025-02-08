const { ethers, network, run } = require("hardhat");

async function main() {
  try {
    console.log("Starting deployment of MyToken...");

    const MyToken = await ethers.getContractFactory("MyToken");

    const myToken = await MyToken.deploy();

    await myToken.waitForDeployment();

    const contractAddress = await myToken.getAddress();

    console.log(`MyToken deployed successfully to: ${contractAddress}`);

    if (network.name !== "hardhat" && network.name !== "localhost") {
      console.log("Waiting for block confirmations...");

      await myToken.deploymentTransaction().wait(6);

      console.log("Verifying contract on Etherscan...");

      await run("verify:verify", {
        address: contractAddress,
        constructorArguments: [],
      });

      console.log("Contract verified on Etherscan");
    }

    const totalSupply = await myToken.totalSupply();
    console.log(`Initial total supply: ${ethers.formatEther(totalSupply)} AST`);

    const [deployer] = await ethers.getSigners();
    const deployerBalance = await myToken.balanceOf(deployer.address);
    console.log(`Deployer balance: ${ethers.formatEther(deployerBalance)} AST`);
  } catch (error) {
    console.error("Error during deployment:", error);
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
