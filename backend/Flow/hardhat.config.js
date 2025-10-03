require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat:{},
   flowTestnet: {
     url: 'https://testnet.evm.nodes.onflow.org',
     accounts: [""],
   },
},

};
