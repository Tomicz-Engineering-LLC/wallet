# Ethereum Wallet Implementation

A simple decentralized Ethereum wallet implementation built with Hardhat and Solidity.

## Features

- Create and manage Ethereum wallets
- Send and receive ETH
- Owner-restricted withdrawals
- Event tracking for deposits and withdrawals

## Technologies Used

- Solidity ^0.8.19
- Hardhat
- Ethers.js
- Node.js

## Project Structure

```plaintext
wallet/
├── contracts/         # Smart contracts
│   └── Wallet.sol     # Main wallet contract
├── scripts/           # Deployment and utility scripts
│   ├── deploy-wallet.js
│   └── get-wallet-info.js
├── test/              # Test files
│   └── Wallet.test.js
└── hardhat.config.js  # Hardhat configuration
```

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/wallet.git
   cd wallet
   ```

2. Install dependencies
   ```bash
   npm install
   ```

### Testing

Run the tests to ensure everything is working correctly:

```bash
npx hardhat test
```

### Deployment

To deploy the wallet to the local Hardhat network:

```bash
npx hardhat run scripts/deploy-wallet.js
```

To get information about the deployed wallet:

```bash
npx hardhat run scripts/get-wallet-info.js
```

## Contract Functions

- `withdraw(uint256 amount)`: Withdraw ETH from the wallet (owner only)
- `getBalance()`: Check the wallet's balance
- `getContractAddress()`: Get the wallet's address

## Security Considerations

- The wallet uses an `onlyOwner` modifier to restrict withdrawals
- Never share your private keys or mnemonic phrases
- Always audit contracts before deploying to mainnet
- Consider gas costs when performing transactions

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Hardhat documentation
- Ethereum community
- Solidity documentation
