require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: "0.8.20",
  networks:{
    hardhat:{},
     rskTestnet: {
      url: "https://public-node.testnet.rsk.co", 
      accounts: [""], 
      chainId: 31
    },

  }
};