require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: "0.8.20",
  networks:{
    hardhat:{},
     rskTestnet: {
      url: "https://public-node.testnet.rsk.co", 
      accounts: ["5ad7f7823ac4a9518b1ce47b007c63c150bc31382d6878d48cce4abb2cc707ef"], 
      chainId: 31
    },

  }
};