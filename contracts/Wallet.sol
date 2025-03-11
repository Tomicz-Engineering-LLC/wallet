// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Wallet {
    address public owner;
    
    // Events to track wallet activities
    event Received(address indexed sender, uint256 amount);
    event Withdrawn(address indexed recipient, uint256 amount);
    
    // Make the creator the owner of the wallet
    constructor() {
        owner = msg.sender;
    }
    
    // Ensure only owner can access certain functions
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }
    
    // Function to receive Ether
    receive() external payable {
        emit Received(msg.sender, msg.value);
    }
    
    // Function to withdraw Ether
    function withdraw(uint256 _amount) external onlyOwner {
        require(_amount <= address(this).balance, "Insufficient balance");
        payable(owner).transfer(_amount);
        emit Withdrawn(owner, _amount);
    }
    
    // Function to check wallet balance
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
} 