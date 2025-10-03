require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: "0.8.20",
  networks: {
    calibration: {
      url: "https://api.calibration.node.glif.io/rpc/v1",
      accounts: ["a353ffe172dc100b60488db322da5cf8ca7b77850e829aeaab7232d55ee956df"], // load from .env
      chainId: 314159
    }
  }
};