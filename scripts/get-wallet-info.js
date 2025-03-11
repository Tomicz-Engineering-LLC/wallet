const { ethers } = require("hardhat");

async function main() {
  const Wallet = await ethers.getContractFactory("Wallet");
  const wallet = await Wallet.deploy();
  await wallet.waitForDeployment();

  console.log("Wallet deployed to:" + (await wallet.getAddress()));
  console.log("Wallet balance:" + (await wallet.getBalance()));
  console.log("Wallet owner:" + (await wallet.owner()));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
