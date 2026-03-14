const hre = require("hardhat");

async function main() {
  const CertChain = await hre.ethers.getContractFactory("CertChain");
  const certchain = await CertChain.deploy();
  await certchain.deployed();
  console.log("CertChain deployed to:", certchain.address);
  // COPY THIS ADDRESS into backend .env
}

main().catch((error) => { console.error(error); process.exit(1); });