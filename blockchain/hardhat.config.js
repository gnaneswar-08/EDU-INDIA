require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
  solidity: "0.8.19",
  networks: {
    mumbai: {
      url: process.env.POLYGON_RPC_URL, // from Alchemy or Infura
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};