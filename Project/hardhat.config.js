require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */

const SEPOLIA_RPC_URL =
    process.env.SEPOLIA_RPC_URL||"https://sepolia.infura.io/v3/49633786c04c4da9ad01c60a9f96ca22";
const PRIVATE_KEY = process.env.PRIVATE_KEY;
module.exports = {
  solidity: "0.8.24",
  //sepolia: {
    //url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
   // accounts: [SEPOLIA_PRIVATE_KEY],
  };
