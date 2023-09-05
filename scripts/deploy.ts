import { ethers } from "hardhat";

async function main() {

  const someToken = await ethers.deployContract("SomeToken", [ethers.parseEther("1000000000")]);
  await someToken.waitForDeployment();

  console.log(`SomeToken deployed to ${await someToken.getAddress()}`);

  const payMachine = await ethers.deployContract("PayMachine");
  await payMachine.waitForDeployment();

  console.log(`PayMachine deployed to ${await payMachine.getAddress()}`);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
