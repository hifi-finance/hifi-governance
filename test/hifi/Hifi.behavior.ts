import { BigNumber } from "@ethersproject/bignumber";
import { expect } from "chai";
import { network } from "hardhat";

export function shouldBehaveLikeHifi(): void {
  const name = "Hifi Finance";
  const symbol = "HIFI";
  const chainId = 1;

  describe("metadata", function () {
    it("has given name", async function () {
      expect(await this.hifi.name()).to.equal(name);
    });

    it("has given symbol", async function () {
      expect(await this.hifi.symbol()).to.equal(symbol);
    });
  });

  describe("balanceOf", function () {
    it("grants to initial account", async function () {
      expect(await this.hifi.balanceOf(this.signers.admin.address)).to.equal("1000000000000000000000000000");
    });
  });

  describe("burn", function () {
    beforeEach(async function () {
      this.supply = await this.hifi.totalSupply();
    });

    it("burn 0", async function () {
      let balanceBefore = await this.hifi.balanceOf(this.signers.admin.address);
      await this.hifi.connect(this.signers.admin).burn(0);
      expect(await this.hifi.balanceOf(this.signers.admin.address)).to.be.eq(balanceBefore);
      expect(await this.hifi.totalSupply()).to.be.eq(this.supply);
    });

    it("burn non-zero", async function () {
      const balanceBefore = await this.hifi.balanceOf(this.signers.admin.address);
      await this.hifi.connect(this.signers.admin).burn(1);
      expect(await this.hifi.balanceOf(this.signers.admin.address)).to.be.eq(balanceBefore.sub(1));
      expect(await this.hifi.totalSupply()).to.be.eq(this.supply.sub(1));
    });

    it("burn > totalSupply", async function () {
      await expect(this.hifi.connect(this.signers.admin).burn(this.supply.add(2))).to.be.revertedWith(
        "Hifi::_burn: amount exceeds totalSupply",
      );
    });

    it("burn > balance", async function () {
      await this.hifi.connect(this.signers.admin).transfer(this.signers.alice.address, 100);
      const balanceBefore = await this.hifi.balanceOf(this.signers.admin.address);
      await expect(this.hifi.connect(this.signers.admin).burn(balanceBefore.add(1))).to.be.revertedWith(
        "Hifi::_burn: transfer amount overflows",
      );
    });
  });

  describe("burnFrom", function () {
    beforeEach(async function () {
      this.supply = await this.hifi.totalSupply();
    });

    it("burn 0", async function () {
      let balanceBefore = await this.hifi.balanceOf(this.signers.admin.address);
      await this.hifi.connect(this.signers.alice).burnFrom(this.signers.admin.address, 0);
      expect(await this.hifi.balanceOf(this.signers.admin.address)).to.be.eq(balanceBefore);
      expect(await this.hifi.totalSupply()).to.be.eq(this.supply);
    });

    it("burn non-zero", async function () {
      const balanceBefore = await this.hifi.balanceOf(this.signers.admin.address);
      await this.hifi.connect(this.signers.admin).approve(this.signers.alice.address, 100);
      await this.hifi.connect(this.signers.alice).burnFrom(this.signers.admin.address, 1);
      expect(await this.hifi.balanceOf(this.signers.admin.address)).to.be.eq(balanceBefore.sub(1));
      expect(await this.hifi.totalSupply()).to.be.eq(this.supply.sub(1));
    });

    it("burn > approval", async function () {
      await this.hifi.connect(this.signers.admin).approve(this.signers.alice.address, 100);
      await expect(this.hifi.connect(this.signers.alice).burnFrom(this.signers.admin.address, 101)).to.be.revertedWith(
        "Hifi::burnFrom: amount exceeds allowance",
      );
    });

    it("burn > totalSupply", async function () {
      const balanceBefore = await this.hifi.balanceOf(this.signers.admin.address);
      await this.hifi.connect(this.signers.admin).approve(this.signers.alice.address, balanceBefore.add(1));
      await expect(
        this.hifi.connect(this.signers.alice).burnFrom(this.signers.admin.address, balanceBefore.add(1)),
      ).to.be.revertedWith("Hifi::_burn: amount exceeds totalSupply");
    });

    it("burn > balance", async function () {
      await this.hifi.connect(this.signers.admin).transfer(this.signers.alice.address, 100);
      const balanceBefore = await this.hifi.balanceOf(this.signers.admin.address);
      await this.hifi.connect(this.signers.admin).approve(this.signers.alice.address, balanceBefore.add(1));
      await expect(
        this.hifi.connect(this.signers.alice).burnFrom(this.signers.admin.address, balanceBefore.add(1)),
      ).to.be.revertedWith("Hifi::_burn: transfer amount overflows");
    });

    it("Zero Address", async function () {
      await expect(
        this.hifi.connect(this.signers.admin).burnFrom("0x0000000000000000000000000000000000000000", 0),
      ).to.be.revertedWith("Hifi::_burn: burn from the zero address");
    });
  });

  describe("numCheckpoints", function () {
    it("returns the number of checkpoints for a delegate", async function () {
      await this.hifi.transfer(this.signers.carol.address, 100); //give an account a few tokens for readability
      expect(await this.hifi.numCheckpoints(this.signers.alice.address)).to.be.equal(0);

      const t1 = await this.hifi.connect(this.signers.carol).delegate(this.signers.alice.address);
      expect(await this.hifi.numCheckpoints(this.signers.alice.address)).to.equal(1);

      const t2 = await this.hifi.connect(this.signers.carol).transfer(this.signers.bob.address, 10);
      expect(await this.hifi.numCheckpoints(this.signers.alice.address)).to.equal(2);

      const t3 = await this.hifi.connect(this.signers.carol).transfer(this.signers.bob.address, 10);
      expect(await this.hifi.numCheckpoints(this.signers.alice.address)).to.equal(3);

      const t4 = await this.hifi.transfer(this.signers.carol.address, 20);
      expect(await this.hifi.numCheckpoints(this.signers.alice.address)).to.equal(4);

      expect({ ...(await this.hifi.checkpoints(this.signers.alice.address, 0)) }).to.deep.include({
        fromBlock: t1.blockNumber,
        votes: BigNumber.from(100),
      });
      expect({ ...(await this.hifi.checkpoints(this.signers.alice.address, 1)) }).to.deep.include({
        fromBlock: t2.blockNumber,
        votes: BigNumber.from(90),
      });
      expect({ ...(await this.hifi.checkpoints(this.signers.alice.address, 2)) }).to.deep.include({
        fromBlock: t3.blockNumber,
        votes: BigNumber.from(80),
      });
      expect({ ...(await this.hifi.checkpoints(this.signers.alice.address, 3)) }).to.deep.include({
        fromBlock: t4.blockNumber,
        votes: BigNumber.from(100),
      });
    });

    it("does not add more than one checkpoint in a block", async function () {
      await this.hifi.transfer(this.signers.carol.address, 100); //give an account a few tokens for readability
      expect(await this.hifi.numCheckpoints(this.signers.alice.address)).to.be.equal(0);

      await network.provider.send("evm_setAutomine", [false]);

      const tx1 = await this.hifi.connect(this.signers.carol).delegate(this.signers.alice.address);
      const tx2 = await this.hifi.connect(this.signers.carol).transfer(this.signers.bob.address, 10);
      const tx3 = await this.hifi.connect(this.signers.carol).transfer(this.signers.bob.address, 10);

      await network.provider.send("evm_setAutomine", [true]);
      await network.provider.send("evm_mine");

      const t1 = await tx1.wait(1);
      await tx2.wait(1);
      await tx3.wait(1);

      expect(await this.hifi.numCheckpoints(this.signers.alice.address)).to.equal(1);

      expect({ ...(await this.hifi.checkpoints(this.signers.alice.address, 0)) }).to.deep.include({
        fromBlock: t1.blockNumber,
        votes: BigNumber.from(80),
      });
      expect({ ...(await this.hifi.checkpoints(this.signers.alice.address, 1)) }).to.deep.include({
        fromBlock: 0,
        votes: BigNumber.from(0),
      });
      expect({ ...(await this.hifi.checkpoints(this.signers.alice.address, 2)) }).to.deep.include({
        fromBlock: 0,
        votes: BigNumber.from(0),
      });

      const t2 = await this.hifi.connect(this.signers.admin).transfer(this.signers.carol.address, 20);
      expect(await this.hifi.numCheckpoints(this.signers.alice.address)).to.equal(2);
      expect({ ...(await this.hifi.checkpoints(this.signers.alice.address, 1)) }).to.deep.include({
        fromBlock: t2.blockNumber,
        votes: BigNumber.from(100),
      });
    });
  });

  describe("getPriorVotes", function () {
    it("reverts if block number >= current block", async function () {
      await expect(this.hifi.getPriorVotes(this.signers.alice.address, 5e10)).to.be.revertedWith(
        "Hifi::getPriorVotes: not yet determined",
      );
    });

    it("returns 0 if there are no checkpoints", async function () {
      expect(await this.hifi.getPriorVotes(this.signers.alice.address, 0)).to.be.equal(0);
    });

    it("returns the latest block if >= last checkpoint block", async function () {
      const t1 = await this.hifi.delegate(this.signers.alice.address);
      await network.provider.send("evm_mine");
      await network.provider.send("evm_mine");

      expect(await this.hifi.getPriorVotes(this.signers.alice.address, t1.blockNumber as number)).to.be.equal(
        "1000000000000000000000000000",
      );
      expect(await this.hifi.getPriorVotes(this.signers.alice.address, (t1.blockNumber as number) + 1)).to.be.equal(
        "1000000000000000000000000000",
      );
    });

    it("returns zero if < first checkpoint block", async function () {
      await network.provider.send("evm_mine");
      const t1 = await this.hifi.delegate(this.signers.alice.address);
      await network.provider.send("evm_mine");
      await network.provider.send("evm_mine");

      expect(await this.hifi.getPriorVotes(this.signers.alice.address, (t1.blockNumber as number) - 1)).to.be.equal(
        "0",
      );
      expect(await this.hifi.getPriorVotes(this.signers.alice.address, (t1.blockNumber as number) + 1)).to.be.equal(
        "1000000000000000000000000000",
      );
    });

    it("generally returns the voting balance at the appropriate checkpoint", async function () {
      const t1 = await this.hifi.delegate(this.signers.alice.address);
      await network.provider.send("evm_mine");
      await network.provider.send("evm_mine");
      const t2 = await this.hifi.transfer(this.signers.bob.address, 10);
      await network.provider.send("evm_mine");
      await network.provider.send("evm_mine");
      const t3 = await this.hifi.transfer(this.signers.bob.address, 10);
      await network.provider.send("evm_mine");
      await network.provider.send("evm_mine");
      const t4 = await this.hifi.connect(this.signers.bob).transfer(this.signers.admin.address, 20);
      await network.provider.send("evm_mine");
      await network.provider.send("evm_mine");

      expect(await this.hifi.getPriorVotes(this.signers.alice.address, (t1.blockNumber as number) - 1)).to.be.equal(
        "0",
      );
      expect(await this.hifi.getPriorVotes(this.signers.alice.address, t1.blockNumber as number)).to.be.equal(
        "1000000000000000000000000000",
      );
      expect(await this.hifi.getPriorVotes(this.signers.alice.address, (t1.blockNumber as number) + 1)).to.be.equal(
        "1000000000000000000000000000",
      );

      expect(await this.hifi.getPriorVotes(this.signers.alice.address, t2.blockNumber as number)).to.be.equal(
        "999999999999999999999999990",
      );
      expect(await this.hifi.getPriorVotes(this.signers.alice.address, (t2.blockNumber as number) + 1)).to.be.equal(
        "999999999999999999999999990",
      );

      expect(await this.hifi.getPriorVotes(this.signers.alice.address, t3.blockNumber as number)).to.be.equal(
        "999999999999999999999999980",
      );
      expect(await this.hifi.getPriorVotes(this.signers.alice.address, (t3.blockNumber as number) + 1)).to.be.equal(
        "999999999999999999999999980",
      );

      expect(await this.hifi.getPriorVotes(this.signers.alice.address, t4.blockNumber as number)).to.be.equal(
        "1000000000000000000000000000",
      );
      expect(await this.hifi.getPriorVotes(this.signers.alice.address, (t4.blockNumber as number) + 1)).to.be.equal(
        "1000000000000000000000000000",
      );
    });
  });
}
