const { ethers } = require("ethers");

async function main() {
  const wallet = ethers.Wallet.createRandom();

  console.log("Private Key:", wallet.privateKey);
  console.log("Address:", wallet.address);

  // Create a provider to connect to Ethereum network
  // Using Ethereum mainnet public endpoint
  const provider = new ethers.JsonRpcProvider(
    "https://eth-mainnet.public.blastapi.io"
  );

  // Connect wallet to the provider
  wallet.connect(provider);

  // Get ETH balance
  const balance = await provider.getBalance(wallet.address);

  // Format balance from wei to ETH
  const ethBalance = ethers.formatEther(balance);

  console.log("ETH Balance:", ethBalance);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
