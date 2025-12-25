const { ethers } = require("ethers");
const ContractABI = require("../contract/abi.json");
const contractAddress = process.env.CONTRACT_ADDRESS;

// lay thon tin tu file .env
const relayerPrivateKey = process.env.PRIVATE_KEY;

if (!relayerPrivateKey) {
  throw new Error("PRIVATE_KEY must be set in .env for Relayer.");
}

const provider = new ethers.WebSocketProvider("wss://polygon-amoy.infura.io/ws/v3/be43e48316e74761a6595959ee476b15");

// tai khoan Relayer de ky giao dich
const relayerSigner = new ethers.Wallet(relayerPrivateKey, provider);
console.log(`Relayer Wallet Address: ${relayerSigner.address}`);

// moi lenh ghoi ham ghi tren doi tuong nay se duoc ky boi relayerSigner
const contractInstance = new ethers.Contract(
  contractAddress,
  ContractABI,
  relayerSigner
);

const readContractInstance = new ethers.Contract(
  contractAddress,
  ContractABI,
  provider
);

module.exports = {
  // contract dung de gui giao dich (ky boi Relayer)
  contract: contractInstance,
  // contract dung chi de doc du lieu
  readContract: readContractInstance,
  // dia chi vi Relayer ky giao dich
  relayerAddress: relayerSigner.address,
};
