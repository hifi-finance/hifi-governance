import { BigNumber } from "@ethersproject/bignumber";
import { expect } from "chai";
import { constants, utils } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { ethers, network } from "hardhat";

export function shouldBehaveLikeHifi(): void {
  const name = "Hifi Finance";
  const symbol = "HIFI";

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
      const balanceBefore = await this.hifi.balanceOf(this.signers.admin.address);
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
      const balanceBefore = await this.hifi.balanceOf(this.signers.admin.address);
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

  describe("setMinter", async function () {
    describe("msg.sender == minter", function () {
      it("succeeds", async function () {
        await expect(this.hifi.setMinter(this.signers.alice.address))
          .to.emit(this.hifi, "MinterChanged")
          .withArgs(this.signers.admin.address, this.signers.alice.address);
        expect(await this.hifi.minter()).to.be.equal(this.signers.alice.address);
      });
    });

    describe("msg.sender != minter", function () {
      it("reverts", async function () {
        await expect(this.hifi.connect(this.signers.alice).setMinter(this.signers.alice.address)).to.be.revertedWith(
          "Hifi::setMinter: only the minter can change the minter address",
        );
      });
    });
  });

  describe("mint", async function () {
    describe("dst == address(0)", function () {
      it("reverts", async function () {
        await expect(this.hifi.mint(constants.AddressZero, 10)).to.be.revertedWith(
          "Hifi::_mint: mint to the zero address",
        );
      });
    });

    describe("dst != address(0)", function () {
      describe("msg.sender == minter", function () {
        it("succeeds", async function () {
          const totalSupplyBefore = await this.hifi.totalSupply();
          await expect(this.hifi.mint(this.signers.alice.address, 10))
            .to.emit(this.hifi, "Transfer")
            .withArgs(constants.AddressZero, this.signers.alice.address, 10);
          expect(await this.hifi.balanceOf(this.signers.alice.address)).to.be.equal(10);
          expect(await this.hifi.totalSupply()).to.be.equal(totalSupplyBefore.add(10));
        });
      });

      describe("msg.sender != minter", function () {
        it("reverts", async function () {
          await expect(this.hifi.connect(this.signers.alice).mint(this.signers.alice.address, 10)).to.be.revertedWith(
            "Hifi::mint: only the minter can mint",
          );
        });
      });
    });
  });

  describe("delegate", async function () {
    it("nested delegation", async function () {
      await this.hifi.transfer(this.signers.alice.address, parseEther("1"));
      await this.hifi.transfer(this.signers.bob.address, parseEther("2"));

      const currectVotes0 = await this.hifi.getCurrentVotes(this.signers.alice.address);
      let currectVotes1 = await this.hifi.getCurrentVotes(this.signers.bob.address);
      expect(currectVotes0).to.be.eq(0);
      expect(currectVotes1).to.be.eq(0);

      await this.hifi.connect(this.signers.alice).delegate(this.signers.bob.address);
      currectVotes1 = await this.hifi.getCurrentVotes(this.signers.bob.address);
      expect(currectVotes1).to.be.eq(parseEther("1"));

      await this.hifi.connect(this.signers.bob).delegate(this.signers.bob.address);
      currectVotes1 = await this.hifi.getCurrentVotes(this.signers.bob.address);
      expect(currectVotes1).to.be.eq(parseEther("1").add(parseEther("2")));

      await this.hifi.connect(this.signers.bob).delegate(this.signers.admin.address);
      currectVotes1 = await this.hifi.getCurrentVotes(this.signers.bob.address);
      expect(currectVotes1).to.be.eq(parseEther("1"));
    });
  });

  describe("delegateBySig", async function () {
    it("succeeds", async function () {
      const { chainId } = await ethers.provider.getNetwork();
      const domain = {
        name: "Hifi Finance",
        chainId: chainId,
        verifyingContract: this.hifi.address,
      };
      const types = {
        Delegation: [
          { name: "delegatee", type: "address" },
          { name: "nonce", type: "uint256" },
          { name: "expiry", type: "uint256" },
        ],
      };

      const delegatee = this.signers.bob.address;
      const nonce = await this.hifi.nonces(this.signers.admin.address);
      const expiry = constants.MaxUint256;

      const value = {
        delegatee,
        nonce,
        expiry,
      };

      const signature = await this.signers.admin._signTypedData(domain, types, value);
      const { v, r, s } = ethers.utils.splitSignature(signature);

      expect(await this.hifi.getCurrentVotes(this.signers.bob.address)).to.be.eq(0);

      await this.hifi
        .connect(this.signers.david)
        .delegateBySig(this.signers.bob.address, nonce, expiry, v, utils.hexlify(r), utils.hexlify(s));

      expect(await this.hifi.getCurrentVotes(this.signers.bob.address)).to.be.eq(parseEther("1000000000"));
    });
  });

  describe("permit", async function () {
    it("succeeds", async function () {
      const { chainId } = await ethers.provider.getNetwork();
      const domain = {
        name: "Hifi Finance",
        chainId: chainId,
        verifyingContract: this.hifi.address,
      };
      const types = {
        Permit: [
          { name: "owner", type: "address" },
          { name: "spender", type: "address" },
          { name: "value", type: "uint256" },
          { name: "nonce", type: "uint256" },
          { name: "deadline", type: "uint256" },
        ],
      };

      const owner = this.signers.admin.address;
      const spender = this.signers.alice.address;
      const amount = 123;
      const nonce = await this.hifi.nonces(this.signers.admin.address);
      const deadline = constants.MaxUint256;

      const value = {
        owner,
        spender,
        value: amount,
        nonce,
        deadline,
      };

      const signature = await this.signers.admin._signTypedData(domain, types, value);
      const { v, r, s } = ethers.utils.splitSignature(signature);
      await this.hifi.permit(owner, spender, amount, deadline, v, utils.hexlify(r), utils.hexlify(s));
      expect(await this.hifi.allowance(owner, spender)).to.eq(amount);
      expect(await this.hifi.nonces(owner)).to.eq(1);

      await this.hifi.connect(this.signers.alice).transferFrom(owner, spender, amount);
    });
  });

  describe("getCurrentVotes", function () {
    describe("nCheckpoints > 0", function () {
      beforeEach(async function () {
        await this.hifi.__godMode_setCheckpoint(this.signers.alice.address, 0, 0, 1);
        await this.hifi.__godMode_setNumCheckpoints(this.signers.alice.address, 1);
      });

      it("succeeds", async function () {
        expect(await this.hifi.getCurrentVotes(this.signers.alice.address)).to.be.equal(1);
      });
    });

    describe("nCheckpoints == 0", function () {
      it("succeeds", async function () {
        expect(await this.hifi.getCurrentVotes(this.signers.alice.address)).to.be.equal(0);
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
