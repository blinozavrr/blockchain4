require("@nomicfoundation/hardhat-toolbox");
require("@openzeppelin/hardhat-upgrades");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545", // Default Ganache URL
      accounts: [`0x${process.env.PRIVATE_KEY}`], // Add your private key from Ganache
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.PROCESS_API}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`], // Add your private key here
    },
  },
  etherscan: {
    apiKey: process.env.PROCESS_API,
  },
};
