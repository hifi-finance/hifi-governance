import { BigNumber } from "@ethersproject/bignumber";
import { expect } from "chai";
import { constants, utils } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { ethers, network } from "hardhat";

import { InvalidV, MaxUint96 } from "../constants";

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

  describe("approve", function () {
    describe("rawAmount == type(uint256).max", function () {
      it("succeeds", async function () {
        const call = await this.hifi
          .connect(this.signers.alice)
          .approve(this.signers.bob.address, constants.MaxUint256);
        await expect(call)
          .to.emit(this.hifi, "Approval")
          .withArgs(this.signers.alice.address, this.signers.bob.address, MaxUint96);
        expect(await this.hifi.allowance(this.signers.alice.address, this.signers.bob.address)).to.be.equal(MaxUint96);
      });
    });

    describe("rawAmount < type(uint256).max", function () {
      describe("rawAmount is not safe96", function () {
        it("reverts", async function () {
          await expect(
            this.hifi.connect(this.signers.alice).approve(this.signers.bob.address, MaxUint96.add(1)),
          ).to.be.revertedWith("Hifi::approve: amount exceeds 96 bits");
        });
      });

      describe("rawAmount is safe96", function () {
        it("succeeds", async function () {
          const call = await this.hifi.connect(this.signers.alice).approve(this.signers.bob.address, MaxUint96);
          await expect(call)
            .to.emit(this.hifi, "Approval")
            .withArgs(this.signers.alice.address, this.signers.bob.address, MaxUint96);
          expect(await this.hifi.allowance(this.signers.alice.address, this.signers.bob.address)).to.be.equal(
            MaxUint96,
          );
        });
      });
    });
  });

  describe("balanceOf", function () {
    it("grants to initial account", async function () {
      expect(await this.hifi.balanceOf(this.signers.admin.address)).to.equal("26250000000000000000000000");
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
      await expect(this.hifi.connect(this.signers.admin).burn(this.supply.add(2))).to.be.revertedWith("0x11");
    });

    it("burn > balance", async function () {
      await this.hifi.connect(this.signers.admin).transfer(this.signers.alice.address, 100);
      const balanceBefore = await this.hifi.balanceOf(this.signers.admin.address);
      await expect(this.hifi.connect(this.signers.admin).burn(balanceBefore.add(1))).to.be.revertedWith("0x11");
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
        "0x11",
      );
    });

    it("burn > totalSupply", async function () {
      const balanceBefore = await this.hifi.balanceOf(this.signers.admin.address);
      await this.hifi.connect(this.signers.admin).approve(this.signers.alice.address, balanceBefore.add(1));
      await expect(
        this.hifi.connect(this.signers.alice).burnFrom(this.signers.admin.address, balanceBefore.add(1)),
      ).to.be.revertedWith("0x11");
    });

    it("burn > balance", async function () {
      await this.hifi.connect(this.signers.admin).transfer(this.signers.alice.address, 100);
      const balanceBefore = await this.hifi.balanceOf(this.signers.admin.address);
      await this.hifi.connect(this.signers.admin).approve(this.signers.alice.address, balanceBefore.add(1));
      await expect(
        this.hifi.connect(this.signers.alice).burnFrom(this.signers.admin.address, balanceBefore.add(1)),
      ).to.be.revertedWith("0x11");
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
    beforeEach(async function () {
      const { chainId } = await ethers.provider.getNetwork();
      this.domain = {
        name: "Hifi Finance",
        chainId: chainId,
        verifyingContract: this.hifi.address,
      };
      this.types = {
        Delegation: [
          { name: "delegatee", type: "address" },
          { name: "nonce", type: "uint256" },
          { name: "expiry", type: "uint256" },
        ],
      };
      this.delegatee = this.signers.bob.address;
    });

    describe("recovered signatory is invalid", function () {
      it("reverts", async function () {
        const nonce = await this.hifi.nonces(this.signers.admin.address);
        const expiry = constants.MaxUint256;

        const value = {
          delegatee: this.delegatee,
          nonce,
          expiry,
        };

        const signature = await this.signers.admin._signTypedData(this.domain, this.types, value);
        const { r, s } = ethers.utils.splitSignature(signature);

        await expect(
          this.hifi
            .connect(this.signers.david)
            .delegateBySig(this.signers.bob.address, nonce, expiry, InvalidV, utils.hexlify(r), utils.hexlify(s)),
        ).to.be.revertedWith("Hifi::delegateBySig: invalid signature");
      });
    });

    describe("recovered signatory is valid", function () {
      describe("nonce is invalid", function () {
        it("reverts", async function () {
          const nonce = (await this.hifi.nonces(this.signers.admin.address)).add(1);
          const expiry = constants.MaxUint256;

          const value = {
            delegatee: this.delegatee,
            nonce,
            expiry,
          };

          const signature = await this.signers.admin._signTypedData(this.domain, this.types, value);
          const { v, r, s } = ethers.utils.splitSignature(signature);

          await expect(
            this.hifi
              .connect(this.signers.david)
              .delegateBySig(this.signers.bob.address, nonce, expiry, v, utils.hexlify(r), utils.hexlify(s)),
          ).to.be.revertedWith("Hifi::delegateBySig: invalid nonce");
        });
      });

      describe("nonce is valid", function () {
        describe("signature expired", function () {
          it("reverts", async function () {
            const nonce = await this.hifi.nonces(this.signers.admin.address);
            const expiry = 0;

            const value = {
              delegatee: this.delegatee,
              nonce,
              expiry,
            };

            const signature = await this.signers.admin._signTypedData(this.domain, this.types, value);
            const { v, r, s } = ethers.utils.splitSignature(signature);

            await expect(
              this.hifi
                .connect(this.signers.david)
                .delegateBySig(this.signers.bob.address, nonce, expiry, v, utils.hexlify(r), utils.hexlify(s)),
            ).to.be.revertedWith("Hifi::delegateBySig: signature expired");
          });
        });

        describe("signature is not expired", function () {
          it("succeeds", async function () {
            const nonce = await this.hifi.nonces(this.signers.admin.address);
            const expiry = constants.MaxUint256;

            const value = {
              delegatee: this.delegatee,
              nonce,
              expiry,
            };

            const signature = await this.signers.admin._signTypedData(this.domain, this.types, value);
            const { v, r, s } = ethers.utils.splitSignature(signature);

            expect(await this.hifi.getCurrentVotes(this.signers.bob.address)).to.be.eq(0);

            await this.hifi
              .connect(this.signers.david)
              .delegateBySig(this.signers.bob.address, nonce, expiry, v, utils.hexlify(r), utils.hexlify(s));

            expect(await this.hifi.getCurrentVotes(this.signers.bob.address)).to.be.eq(parseEther("26250000"));
          });
        });
      });
    });
  });

  describe("permit", async function () {
    beforeEach(async function () {
      const { chainId } = await ethers.provider.getNetwork();
      this.domain = {
        name: "Hifi Finance",
        chainId: chainId,
        verifyingContract: this.hifi.address,
      };
      this.types = {
        Permit: [
          { name: "owner", type: "address" },
          { name: "spender", type: "address" },
          { name: "value", type: "uint256" },
          { name: "nonce", type: "uint256" },
          { name: "deadline", type: "uint256" },
        ],
      };
      this.owner = this.signers.admin.address;
      this.spender = this.signers.alice.address;
      this.nonce = await this.hifi.nonces(this.signers.admin.address);
      this.deadline = constants.MaxUint256;
    });

    describe("rawAmount == type(uint256).max", function () {
      it("succeeds", async function () {
        const rawAmount = constants.MaxUint256;

        const value = {
          owner: this.owner,
          spender: this.spender,
          value: rawAmount,
          nonce: this.nonce,
          deadline: this.deadline,
        };

        const signature = await this.signers.admin._signTypedData(this.domain, this.types, value);
        const { v, r, s } = ethers.utils.splitSignature(signature);
        await this.hifi.permit(
          this.owner,
          this.spender,
          rawAmount,
          this.deadline,
          v,
          utils.hexlify(r),
          utils.hexlify(s),
        );
        expect(await this.hifi.allowance(this.owner, this.spender)).to.eq(MaxUint96);
        expect(await this.hifi.nonces(this.owner)).to.eq(1);
      });
    });

    describe("rawAmount < type(uint256).max", function () {
      describe("rawAmount is not safe96", function () {
        it("reverts", async function () {
          const rawAmount = MaxUint96.add(1);

          const value = {
            owner: this.owner,
            spender: this.spender,
            value: rawAmount,
            nonce: this.nonce,
            deadline: this.deadline,
          };

          const signature = await this.signers.admin._signTypedData(this.domain, this.types, value);
          const { v, r, s } = ethers.utils.splitSignature(signature);

          await expect(
            this.hifi.permit(this.owner, this.spender, rawAmount, this.deadline, v, utils.hexlify(r), utils.hexlify(s)),
          ).to.be.revertedWith("Hifi::permit: amount exceeds 96 bits");
        });
      });

      describe("rawAmount is safe96", function () {
        describe("recovered signatory is invalid", function () {
          it("reverts", async function () {
            const rawAmount = MaxUint96;

            const value = {
              owner: this.owner,
              spender: this.spender,
              value: rawAmount,
              nonce: this.nonce,
              deadline: this.deadline,
            };

            const signature = await this.signers.admin._signTypedData(this.domain, this.types, value);
            const { r, s } = ethers.utils.splitSignature(signature);

            await expect(
              this.hifi.permit(
                this.owner,
                this.spender,
                rawAmount,
                this.deadline,
                InvalidV,
                utils.hexlify(r),
                utils.hexlify(s),
              ),
            ).to.be.revertedWith("Hifi::permit: invalid signature");
          });
        });

        describe("recovered signatory is valid", function () {
          describe("recovered signatory is not owner", function () {
            it("reverts", async function () {
              const rawAmount = MaxUint96;

              const value = {
                owner: this.spender,
                spender: this.spender,
                value: rawAmount,
                nonce: this.nonce,
                deadline: this.deadline,
              };

              const signature = await this.signers.admin._signTypedData(this.domain, this.types, value);
              const { v, r, s } = ethers.utils.splitSignature(signature);

              await expect(
                this.hifi.permit(
                  this.owner,
                  this.spender,
                  rawAmount,
                  this.deadline,
                  v,
                  utils.hexlify(r),
                  utils.hexlify(s),
                ),
              ).to.be.revertedWith("Hifi::permit: unauthorized");
            });
          });

          describe("recovered signatory is owner", function () {
            describe("signature expired", function () {
              it("reverts", async function () {
                const rawAmount = MaxUint96;
                this.deadline = 0;

                const value = {
                  owner: this.owner,
                  spender: this.spender,
                  value: rawAmount,
                  nonce: this.nonce,
                  deadline: this.deadline,
                };

                const signature = await this.signers.admin._signTypedData(this.domain, this.types, value);
                const { v, r, s } = ethers.utils.splitSignature(signature);

                await expect(
                  this.hifi.permit(
                    this.owner,
                    this.spender,
                    rawAmount,
                    this.deadline,
                    v,
                    utils.hexlify(r),
                    utils.hexlify(s),
                  ),
                ).to.be.revertedWith("Hifi::permit: signature expired");
              });
            });

            describe("signature is not expired", function () {
              it("succeeds", async function () {
                const rawAmount = 123;

                const value = {
                  owner: this.owner,
                  spender: this.spender,
                  value: rawAmount,
                  nonce: this.nonce,
                  deadline: this.deadline,
                };

                const signature = await this.signers.admin._signTypedData(this.domain, this.types, value);
                const { v, r, s } = ethers.utils.splitSignature(signature);
                await this.hifi.permit(
                  this.owner,
                  this.spender,
                  rawAmount,
                  this.deadline,
                  v,
                  utils.hexlify(r),
                  utils.hexlify(s),
                );
                expect(await this.hifi.allowance(this.owner, this.spender)).to.eq(rawAmount);
                expect(await this.hifi.nonces(this.owner)).to.eq(1);

                await this.hifi.connect(this.signers.alice).transferFrom(this.owner, this.spender, rawAmount);
              });
            });
          });
        });
      });
    });
  });

  describe("swap", async function () {
    describe("mftAmount == 0", function () {
      it("reverts", async function () {
        await expect(this.hifi.swap(0)).to.be.revertedWith("Hifi::swap: swap amount can't be zero");
      });
    });

    describe("mftAmount != 0", function () {
      describe("mftAmount > user balance", function () {
        it("reverts", async function () {
          await expect(this.hifi.swap(1)).to.be.reverted;
        });
      });

      describe("mftAmount <= user balance", function () {
        beforeEach(async function () {
          const whale = "0xa984Faa7a5Ff8Ee8182572d84Db12bc4B88983f7";
          const signer = await ethers.getSigner(whale);
          await this.signers.admin.sendTransaction({
            to: signer.address,
            value: ethers.utils.parseEther("1.0"),
          });
          await network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [whale],
          });
          this.balance = "1000000000000000000";
          await this.mft.connect(signer).transfer(this.signers.alice.address, this.balance);
          await network.provider.request({
            method: "hardhat_stopImpersonatingAccount",
            params: [whale],
          });
        });

        describe("mftAmount > allowance", function () {
          it("reverts", async function () {
            await expect(this.hifi.swap(1)).to.be.reverted;
          });
        });

        describe("mftAmount <= allowance", function () {
          beforeEach(async function () {
            await this.mft.connect(this.signers.alice).approve(this.hifi.address, constants.MaxUint256);
          });

          it("succeeds", async function () {
            const call = await this.hifi.connect(this.signers.alice).swap(this.balance);
            await expect(call)
              .to.emit(this.hifi, "Swap")
              .withArgs(this.signers.alice.address, this.balance, "10000000000000000");
            expect(await this.hifi.balanceOf(this.signers.alice.address)).to.be.equal("10000000000000000");
          });
        });
      });
    });
  });

  describe("transferFrom", async function () {
    describe("src == address(0)", function () {
      it("reverts", async function () {
        const signer = await ethers.getSigner(constants.AddressZero);
        await network.provider.request({
          method: "hardhat_impersonateAccount",
          params: [constants.AddressZero],
        });
        await expect(
          this.hifi.connect(signer).transferFrom(constants.AddressZero, this.signers.bob.address, 1),
        ).to.be.revertedWith("Hifi::_transferTokens: cannot transfer from the zero address");
      });
    });

    describe("dst == address(0)", function () {
      it("reverts", async function () {
        await expect(
          this.hifi.connect(this.signers.admin).transferFrom(this.signers.admin.address, constants.AddressZero, 1),
        ).to.be.revertedWith("Hifi::_transferTokens: cannot transfer to the zero address");
      });
    });

    describe("spender == src", function () {
      it("succeeds", async function () {
        const call = this.hifi
          .connect(this.signers.admin)
          .transferFrom(this.signers.admin.address, this.signers.bob.address, 1);
        await expect(call)
          .to.emit(this.hifi, "Transfer")
          .withArgs(this.signers.admin.address, this.signers.bob.address, 1);
      });
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
        "26250000000000000000000000",
      );
      expect(await this.hifi.getPriorVotes(this.signers.alice.address, (t1.blockNumber as number) + 1)).to.be.equal(
        "26250000000000000000000000",
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
        "26250000000000000000000000",
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
        "26250000000000000000000000",
      );
      expect(await this.hifi.getPriorVotes(this.signers.alice.address, (t1.blockNumber as number) + 1)).to.be.equal(
        "26250000000000000000000000",
      );

      expect(await this.hifi.getPriorVotes(this.signers.alice.address, t2.blockNumber as number)).to.be.equal(
        "26249999999999999999999990",
      );
      expect(await this.hifi.getPriorVotes(this.signers.alice.address, (t2.blockNumber as number) + 1)).to.be.equal(
        "26249999999999999999999990",
      );

      expect(await this.hifi.getPriorVotes(this.signers.alice.address, t3.blockNumber as number)).to.be.equal(
        "26249999999999999999999980",
      );
      expect(await this.hifi.getPriorVotes(this.signers.alice.address, (t3.blockNumber as number) + 1)).to.be.equal(
        "26249999999999999999999980",
      );

      expect(await this.hifi.getPriorVotes(this.signers.alice.address, t4.blockNumber as number)).to.be.equal(
        "26250000000000000000000000",
      );
      expect(await this.hifi.getPriorVotes(this.signers.alice.address, (t4.blockNumber as number) + 1)).to.be.equal(
        "26250000000000000000000000",
      );
    });
  });
}
