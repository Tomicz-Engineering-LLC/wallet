const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Wallet", function () {
  let Wallet, wallet, owner, addr1;

  beforeEach(async function () {
    // Get test accounts
    [owner, addr1] = await ethers.getSigners();

    // Deploy wallet
    Wallet = await ethers.getContractFactory("Wallet");
    wallet = await Wallet.deploy();
    await wallet.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await wallet.owner()).to.equal(owner.address);
    });

    it("Should have zero initial balance", async function () {
      expect(await wallet.getBalance()).to.equal(0);
    });
  });

  describe("Transactions", function () {
    it("Should receive funds", async function () {
      const sendAmount = ethers.parseEther("1.0");
      const walletAddress = await wallet.getAddress(); // Get the deployed contract address

      await addr1.sendTransaction({
        to: walletAddress, // Use the contract address
        value: sendAmount,
      });

      expect(await wallet.getBalance()).to.equal(sendAmount);
    });

    it("Should allow owner to withdraw", async function () {
      const sendAmount = ethers.parseEther("1.0");
      const walletAddress = await wallet.getAddress(); // Get the deployed contract address

      // First send some ETH to the wallet
      await addr1.sendTransaction({
        to: walletAddress, // Use the contract address
        value: sendAmount,
      });

      // Check owner can withdraw
      await expect(wallet.withdraw(sendAmount))
        .to.emit(wallet, "Withdrawn")
        .withArgs(owner.address, sendAmount);
    });

    it("Should prevent non-owner from withdrawing", async function () {
      const sendAmount = ethers.parseEther("1.0");
      const walletAddress = await wallet.getAddress(); // Get the deployed contract address

      await addr1.sendTransaction({
        to: walletAddress, // Use the contract address
        value: sendAmount,
      });

      await expect(
        wallet.connect(addr1).withdraw(sendAmount)
      ).to.be.revertedWith("Only owner can perform this action");
    });
  });
});
