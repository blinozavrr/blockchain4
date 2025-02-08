require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      // Если необходимо, можно указать приватные ключи или адреса аккаунтов:
      accounts: ["0xbfa1aa5c85f93c1f03ff0ceb0d0497cdb3897a5f93f9201c0acccb0192522912"]
    }
  }
};
