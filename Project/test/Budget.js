
const { expect } = require("chai");
const { ethers } = require("hardhat");
describe("Budget Contract", async function() {
    let budget


  beforeEach(async function() {
    Budget = await ethers.getContractFactory("Budget");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    budget = await Budget.deploy();
    await budget
  });

  it("Should transfer ether to owner when sending funds", async function() {
    const initialBalance = await ethers.provider.getBalance(owner.address);
    await expect(() => owner.sendTransaction({
      to: budget.address,
      value: ethers.utils.parseEther("1.0")
    })).to.changeEtherBalance(owner, ethers.utils.parseEther("1.0"));
    const finalBalance = await ethers.provider.getBalance(owner.address);
    expect(finalBalance).to.equal(initialBalance);
  });

  it("Should send department details", async function() {
    const name = "Test Department";
    const amount = 100;
    const message = "Test message";

    await budget.connect(addr1).send(name, amount, message);
    const departments = await budget.get();

    expect(departments.length).to.equal(1);
    expect(departments[0].name).to.equal(name);
    expect(departments[0].amount).to.equal(amount);
    expect(departments[0].message).to.equal(message);
    expect(departments[0].from).to.equal(addr1.address);
    expect(departments[0].timestamp).to.be.a("number");
  });

  it("Should revert when sending funds with value 0", async function() {
    await expect(budget.send("Test Department", 0, "Test message")).to.be.revertedWith("send money");
  });
});