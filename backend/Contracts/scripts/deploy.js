const hre = require("hardhat");

async function main() {
  const userContract = await ethers.getContractFactory("User");
  const  userContractDpeloyement= await userContract.deploy();
  const userContractDeployedAddress=await userContractDpeloyement.getAddress()

  console.log("✅ UserStorage deployed at:",userContractDeployedAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
