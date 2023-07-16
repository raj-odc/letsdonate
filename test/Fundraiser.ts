const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { artifacts, ethers } from "hardhat";
import { assert } from "console";

// const FundraiserContract = artifacts.require('Fundraiser');

async function loadFundRaiser() {
  const name = 'Save Earth';
  const image = 'some.png';
  const description = 'We work as team to save world';
  const goalAmount = '10000';
  // Contracts are deployed using the first signer/account by default
  const [beneficiary, owner, donor1, donor2] = await ethers.getSigners();
  
  const greeter = await ethers.getContractFactory("Fundraiser");
  const fundraiser = await greeter.deploy(name,
    image,
    description,
    goalAmount,
    owner,
    );

  // const Fundraiser = await ethers.deployContract("Fundraiser",{ name,
  //   image,
  //   description,
  //   goalAmount,
  //   beneficiary, owner});
  // const FundraiserFactory = await ethers.deployContract("FundraiserFactory");
  // console.log("FundraiserFundraiser", fundraiser);
  // console.log("FundraiserFactory", FundraiserFactory);

  // const fundraiserObject = await FundraiserFactory.createFundraiser(name,
  //   image,
  //   description,
  //   goalAmount,
  //   beneficiary);
  return { fundraiser, owner, beneficiary, donor1, donor2}
};

describe("Fundraiser", function () {

  describe('valid params', () => {
    it('should get the beneficiary name',async () => {
      const {fundraiser} = await loadFundRaiser();
      // console.log('fundraiserObject',fundraiserObject)
      expect(await fundraiser.name()).to.equal('Save Earth');
    })

    it('should get the goalAmount', async () => {
      const {fundraiser} = await loadFundRaiser();
      expect(await fundraiser.goalAmount()).to.equal('10000');
    });

    it('should get the owner', async () => {
      const {fundraiser, owner} = await loadFundRaiser();
      const newOwner = await fundraiser.beneficiary();
      expect(newOwner).to.equal(owner.address);
    });
  });

  describe('Lets donate', () => {

    // it('should increase the totaldonation by 2',async () => {
    //   const {fundraiser, donor1} = await loadFundRaiser();
    //   const value = ethers.parseEther('0.10');

    //   console.log(" donor1.address",donor1);
    //   console.log("fundraiser",fundraiser);
    //   const currentDonationsCount = await fundraiser.myDonationsCount({
    //     from: donor1,
    //   });
    //   console.log("currentDonationsCountcurrentDonationsCountcurrentDonationsCount", currentDonationsCount)
    //   // expect(await fundraiser.donate({from: donor1.address, value})).to.equal(currentDonationsCount+ethers.parseEther('0.10'));
    // })

    // it('includes donation in myDonations', async () => {
    //   const value = ethers.parseEther('0.10');
    //   const {fundraiser, donor1} = await loadFundRaiser();
    //   await fundraiser.donate({ from: donor1, value });
    //   console.log("fundraiser", value)
    //   const { values, dates } = await fundraiser.myDonations({ from: donor1 });

    //   console.log("values", values);
    //   // assert.equal(value, values[0], 'values should match');
    //   // assert(dates[0], 'date should be present');
    // });

  })

});
