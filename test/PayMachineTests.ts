import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("PaymentMachine Tests", function () {

    let payMachine: Contract, someToken: Contract;
    let owner: SignerWithAddress, account_1: SignerWithAddress, account_2: SignerWithAddress;

    beforeEach(async function () {
        const PayMachineFactory = await ethers.getContractFactory("PayMachine");
        payMachine = await PayMachineFactory.deploy();
        const SomeTokenFactory = await ethers.getContractFactory("SomeToken");
        const totalSupply = (10 ** 9).toString()
        someToken = await SomeTokenFactory.deploy(ethers.parseEther(totalSupply));
        [owner, account_1, account_2] = await ethers.getSigners();
    });

    describe("transferEth", function () {

        it("Should fail on zero address", async function () {
            await expect(payMachine.transferEth(ethers.ZeroAddress, {value: 1}))
            .to.be.revertedWith("PayMachine: Canont transfer to the zero address");
        });

        it("Should fail on zero amount", async function () {
            await expect(payMachine.transferEth(account_1, {value: 0}))
            .to.be.revertedWith("PayMachine: Cannot transfer 0 ether");
        });

        it("Should transfer 1 eth to the contract", async function () {
            await expect(payMachine.transferEth(account_1, {value: 1})).to.not.be.reverted;
        });

        it("Should emit TransferEth event", async function () { 
            expect(payMachine.transferEth(account_1, {value: 1}))
            .to.emit(payMachine, "TransferEth")
            .withArgs(owner.address, account_1.address, 1);
        });

    });

    describe("transferToken", function () {

        it("Should fail on insufficient funds", async function () {
            await expect(payMachine.connect(account_1).transferToken(someToken.getAddress(), account_2.address, 1))
            .to.be.revertedWith("PayMachine: Cannot transfer more than the balance of the sender");
        });

        it("Should fail on zero address", async function () {
            await expect(payMachine.connect(owner).transferToken(someToken.getAddress(), ethers.ZeroAddress, 1))
            .to.be.revertedWith("PayMachine: Canont transfer to the zero address");
        });

        it("Should transfer 1 token to recipient", async function () {
            const amount = ethers.parseEther("1");
            await someToken.connect(owner).approve(payMachine.getAddress(), amount);
            await expect(payMachine.connect(owner).transferToken(someToken.getAddress(), account_1.address, amount)).to.not.be.reverted;
        });

        it("Should emit TransferToken event", async function () { 
            const amount = ethers.parseEther("1");
            await someToken.connect(owner).approve(payMachine.getAddress(), amount);
            expect(payMachine.connect(owner).transferToken(someToken.getAddress(), account_1, amount))
            .emit(payMachine, "TransferToken")
            .withArgs(someToken.getAddress(), owner.address, account_1.address, amount);
        });
    });

});