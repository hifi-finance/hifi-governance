import { defaultAbiCoder } from "@ethersproject/abi";
import { expect } from "chai";
import { constants } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { ethers, network } from "hardhat";

export function shouldBehaveLikeGovernorBravo(): void {
  describe("castVote", function () {
    beforeEach(async function () {
      this.targets = [this.signers.alice.address];
      this.values = ["0"];
      this.signatures = ["getBalanceOf(address)"];
      this.callDatas = [defaultAbiCoder.encode(["address"], [this.signers.alice.address])];

      await this.hifi.delegate(this.signers.admin.address);
      await this.governorBravo.propose(this.targets, this.values, this.signatures, this.callDatas, "do nothing");
      this.proposalId = await this.governorBravo.latestProposalIds(this.signers.admin.address);
    });

    describe("We must revert if:", function () {
      it("There does not exist a proposal with matching proposal id where the current block number is between the proposal's start block (exclusive) and end block (inclusive)", async function () {
        await expect(this.governorBravo.castVote(this.proposalId, 1)).to.be.revertedWith(
          "GovernorBravo::castVoteInternal: voting is closed",
        );
      });

      it("Such proposal already has an entry in its voters set matching the sender", async function () {
        await network.provider.send("evm_mine");
        await network.provider.send("evm_mine");

        await this.governorBravo.connect(this.signers.david).castVote(this.proposalId, 1);
        await this.governorBravo.connect(this.signers.carol).castVoteWithReason(this.proposalId, 1, "");

        await expect(this.governorBravo.connect(this.signers.david).castVote(this.proposalId, 1)).to.be.revertedWith(
          "GovernorBravo::castVoteInternal: voter already voted",
        );
      });
    });

    describe("Otherwise", function () {
      it("we add the sender to the proposal's voters set", async function () {
        await network.provider.send("evm_mine");

        expect({
          ...(await this.governorBravo.getReceipt(this.proposalId, this.signers.carol.address)),
        }).to.deep.include({
          hasVoted: false,
        });
        await this.governorBravo.connect(this.signers.carol).castVote(this.proposalId, 1);
        expect({
          ...(await this.governorBravo.getReceipt(this.proposalId, this.signers.carol.address)),
        }).to.deep.include({
          hasVoted: true,
        });
      });

      describe("and we take the balance returned by GetPriorVotes for the given sender and the proposal's start block, which may be zero,", function () {
        it("and we add that ForVotes", async function () {
          await this.hifi.transfer(this.signers.bob.address, parseEther("400001"));
          await this.hifi.connect(this.signers.bob).delegate(this.signers.bob.address);

          await this.governorBravo
            .connect(this.signers.bob)
            .propose(this.targets, this.values, this.signatures, this.callDatas, "do nothing");

          this.proposalId = await this.governorBravo.latestProposalIds(this.signers.bob.address);

          const beforeFors = (await this.governorBravo.proposals(this.proposalId)).forVotes;

          await network.provider.send("evm_mine");
          await this.governorBravo.connect(this.signers.bob).castVote(this.proposalId, 1);

          const afterFors = (await this.governorBravo.proposals(this.proposalId)).forVotes;

          expect(afterFors).to.be.equal(beforeFors.add(parseEther("400001")));
        });

        it("or AgainstVotes corresponding to the caller's support flag.", async function () {
          await this.hifi.transfer(this.signers.david.address, parseEther("400001"));
          await this.hifi.connect(this.signers.david).delegate(this.signers.david.address);

          await this.governorBravo
            .connect(this.signers.david)
            .propose(this.targets, this.values, this.signatures, this.callDatas, "do nothing");
          this.proposalId = await this.governorBravo.latestProposalIds(this.signers.david.address);

          const beforeAgainsts = (await this.governorBravo.proposals(this.proposalId)).againstVotes;

          await network.provider.send("evm_mine");
          await this.governorBravo.connect(this.signers.david).castVote(this.proposalId, 0);

          const afterAgainsts = (await this.governorBravo.proposals(this.proposalId)).againstVotes;

          expect(afterAgainsts).to.be.equal(beforeAgainsts.add(parseEther("400001")));
        });

        describe("castVoteBySig", function () {
          it("reverts if the signatory is invalid", async function () {
            await expect(
              this.governorBravo.castVoteBySig(
                this.proposalId,
                0,
                0,
                "0x0000000000000000000000000000000000000000000000000000000000000bad",
                "0x0000000000000000000000000000000000000000000000000000000000000bad",
              ),
            ).to.be.revertedWith("GovernorBravo::castVoteBySig: invalid signature");
          });
        });
      });
    });
  });

  describe("propose", function () {
    beforeEach(async function () {
      this.targets = [this.signers.admin.address];
      this.values = ["0"];
      this.signatures = ["getBalanceOf(address)"];
      this.callDatas = [defaultAbiCoder.encode(["address"], [this.signers.alice.address])];
      await this.hifi.delegate(this.signers.admin.address);
      await this.governorBravo.propose(this.targets, this.values, this.signatures, this.callDatas, "do nothing");

      this.proposalBlock = (await ethers.provider.getBlock("latest")).number;
      this.proposalId = await this.governorBravo.latestProposalIds(this.signers.admin.address);
      this.trivialProposal = await this.governorBravo.proposals(this.proposalId);
    });

    describe("simple initialization", function () {
      it("ID is set to a globally unique identifier", async function () {
        expect(this.trivialProposal.id).to.be.equal(this.proposalId);
      });

      it("Proposer is set to the sender", async function () {
        expect(this.trivialProposal.proposer).to.be.equal(this.signers.admin.address);
      });

      it("Start block is set to the current block number plus vote delay", async function () {
        expect(this.trivialProposal.startBlock).to.be.equal(this.proposalBlock + 1);
      });

      it("End block is set to the current block number plus the sum of vote delay and vote period", async function () {
        expect(this.trivialProposal.endBlock).to.be.equal(this.proposalBlock + 1 + 5760);
      });

      it("ForVotes and AgainstVotes are initialized to zero", async function () {
        expect(this.trivialProposal.forVotes).to.be.equal("0");
        expect(this.trivialProposal.againstVotes).to.be.equal("0");
      });

      it("Executed and Canceled flags are initialized to false", async function () {
        expect(this.trivialProposal.canceled).to.be.equal(false);
        expect(this.trivialProposal.executed).to.be.equal(false);
      });

      it("ETA is initialized to zero", async function () {
        expect(this.trivialProposal.eta).to.be.equal("0");
      });

      it("Targets, Values, Signatures, Calldatas are set according to parameters", async function () {
        const dynamicFields = await this.governorBravo.getActions(this.trivialProposal.id);
        expect(dynamicFields.targets).to.be.deep.equal(this.targets);
        expect(dynamicFields[1]).to.be.deep.equal(this.values);
        expect(dynamicFields.signatures).to.be.deep.equal(this.signatures);
        expect(dynamicFields.calldatas).to.be.deep.equal(this.callDatas);
      });

      describe("This function must revert if", function () {
        it("the length of the values, signatures or calldatas arrays are not the same length,", async function () {
          await expect(
            this.governorBravo.propose(
              this.targets.concat(this.signers.admin.address),
              this.values,
              this.signatures,
              this.callDatas,
              "do nothing",
            ),
          ).to.be.revertedWith("GovernorBravo::propose: proposal function information arity mismatch");

          await expect(
            this.governorBravo.propose(
              this.targets,
              this.values.concat(this.values),
              this.signatures,
              this.callDatas,
              "do nothing",
            ),
          ).to.be.revertedWith("GovernorBravo::propose: proposal function information arity mismatch");

          await expect(
            this.governorBravo.propose(
              this.targets,
              this.values,
              this.signatures.concat(this.signatures),
              this.callDatas,
              "do nothing",
            ),
          ).to.be.revertedWith("GovernorBravo::propose: proposal function information arity mismatch");

          await expect(
            this.governorBravo.propose(
              this.targets,
              this.values,
              this.signatures,
              this.callDatas.concat(this.callDatas),
              "do nothing",
            ),
          ).to.be.revertedWith("GovernorBravo::propose: proposal function information arity mismatch");
        });

        it("or if that length is zero or greater than Max Operations.", async function () {
          await expect(this.governorBravo.propose([], [], [], [], "do nothing")).to.be.revertedWith(
            "GovernorBravo::propose: must provide actions",
          );
        });

        describe("Additionally, if there exists a pending or active proposal from the same proposer, we must revert.", function () {
          it("reverts with pending", async function () {
            await expect(
              this.governorBravo.propose(this.targets, this.values, this.signatures, this.callDatas, "do nothing"),
            ).to.be.revertedWith(
              "GovernorBravo::propose: one live proposal per proposer, found an already pending proposal",
            );
          });

          it("reverts with active", async function () {
            await network.provider.send("evm_mine");
            await network.provider.send("evm_mine");

            await expect(
              this.governorBravo.propose(this.targets, this.values, this.signatures, this.callDatas, "do nothing"),
            ).to.be.revertedWith(
              "GovernorBravo::propose: one live proposal per proposer, found an already active proposal",
            );
          });
        });
      });

      it("This function returns the id of the newly created proposal. # proposalId(n) = succ(proposalId(n-1))", async function () {
        await this.hifi.transfer(this.signers.david.address, parseEther("400001"));
        await this.hifi.connect(this.signers.david).delegate(this.signers.david.address);

        await network.provider.send("evm_mine");
        const nextProposalId = await this.governorBravo
          .connect(this.signers.david)
          .callStatic.propose(this.targets, this.values, this.signatures, this.callDatas, "yoot");

        expect(+nextProposalId).to.be.equal(+this.trivialProposal.id + 1);
      });

      it("emits log with id and description", async function () {
        await this.hifi.transfer(this.signers.david.address, parseEther("400001"));
        await this.hifi.connect(this.signers.david).delegate(this.signers.david.address);

        await network.provider.send("evm_mine");

        const nextProposalId = await this.governorBravo
          .connect(this.signers.david)
          .callStatic.propose(this.targets, this.values, this.signatures, this.callDatas, "yoot");

        const call = await this.governorBravo
          .connect(this.signers.david)
          .propose(this.targets, this.values, this.signatures, this.callDatas, "second proposal");

        await expect(call)
          .to.emit(this.governorBravo, "ProposalCreated")
          .withArgs(
            nextProposalId,
            this.signers.david.address,
            this.targets,
            this.values,
            this.signatures,
            this.callDatas,
            15522512,
            15528272,
            "second proposal",
          );
      });
    });
  });

  describe("queue", function () {
    describe("overlapping actions", function () {
      it("reverts on queueing overlapping actions in same proposal", async function () {
        await this.hifi.transfer(this.signers.bob.address, parseEther("3000000"));
        await this.hifi.connect(this.signers.bob).delegate(this.signers.bob.address);
        await network.provider.send("evm_mine");

        this.targets = [this.hifi.address, this.hifi.address];
        this.values = ["0", "0"];
        this.signatures = ["getBalanceOf(address)", "getBalanceOf(address)"];
        this.callDatas = [
          defaultAbiCoder.encode(["address"], [this.signers.admin.address]),
          defaultAbiCoder.encode(["address"], [this.signers.admin.address]),
        ];
        this.proposalId1 = await this.governorBravo
          .connect(this.signers.bob)
          .callStatic.propose(this.targets, this.values, this.signatures, this.callDatas, "do nothing");
        await this.governorBravo
          .connect(this.signers.bob)
          .propose(this.targets, this.values, this.signatures, this.callDatas, "do nothing");
        await network.provider.send("evm_mine");
        await network.provider.send("evm_mine");

        await this.governorBravo.connect(this.signers.bob).callStatic.castVote(this.proposalId1, 1);
        await this.governorBravo.connect(this.signers.bob).castVote(this.proposalId1, 1);
        await network.provider.send("hardhat_mine", ["0x168A"]);
        await network.provider.send("evm_mine");
        await network.provider.send("evm_mine");

        await expect(this.governorBravo.queue(this.proposalId1)).to.be.revertedWith(
          "GovernorBravo::queueOrRevertInternal: identical proposal action already queued at eta",
        );
      });
    });
  });

  describe("state", function () {
    beforeEach(async function () {
      this.targets = [this.signers.admin.address];
      this.values = ["0"];
      this.signatures = ["getBalanceOf(address)"];
      this.callDatas = [defaultAbiCoder.encode(["address"], [this.signers.alice.address])];
      await this.hifi.delegate(this.signers.admin.address);
      await this.governorBravo.propose(this.targets, this.values, this.signatures, this.callDatas, "do nothing");
      this.proposalId = await this.governorBravo.latestProposalIds(this.signers.admin.address);
      this.trivialProposal = await this.governorBravo.proposals(this.proposalId);
    });

    it("Invalid for proposal not found", async function () {
      await expect(this.governorBravo.state(5)).to.be.revertedWith("GovernorBravo::state: invalid proposal id");
    });

    it("Pending", async function () {
      expect(await this.governorBravo.state(this.trivialProposal.id)).to.be.equal(0);
    });

    it("Active", async function () {
      await network.provider.send("evm_mine");
      await network.provider.send("evm_mine");
      expect(await this.governorBravo.state(this.trivialProposal.id)).to.be.equal(1);
    });

    it("Canceled", async function () {
      await this.hifi.transfer(this.signers.alice.address, parseEther("4000000"));
      await this.hifi.connect(this.signers.alice).delegate(this.signers.alice.address);

      await network.provider.send("evm_mine");
      await this.governorBravo
        .connect(this.signers.alice)
        .propose(this.targets, this.values, this.signatures, this.callDatas, "do nothing");
      const newProposalId = await this.governorBravo.proposalCount();

      // send away the delegates
      await this.hifi.connect(this.signers.alice).delegate(this.signers.admin.address);
      await this.governorBravo.cancel(newProposalId);

      expect(await this.governorBravo.state(newProposalId)).to.be.equal(2);
    });

    it("Defeated", async function () {
      // travel to end block
      await network.provider.send("hardhat_mine", ["0x4E20"]);

      expect(await this.governorBravo.state(this.trivialProposal.id)).to.be.equal(3);
    });

    it("Succeeded", async function () {
      await this.hifi.transfer(this.signers.alice.address, parseEther("4000000"));
      await this.hifi.connect(this.signers.alice).delegate(this.signers.alice.address);

      await network.provider.send("evm_mine");
      this.newProposalId = await this.governorBravo
        .connect(this.signers.alice)
        .callStatic.propose(this.targets, this.values, this.signatures, this.callDatas, "do nothing");
      await this.governorBravo
        .connect(this.signers.alice)
        .propose(this.targets, this.values, this.signatures, this.callDatas, "do nothing");

      await network.provider.send("evm_mine");
      await this.governorBravo.castVote(this.newProposalId, 1);
      await network.provider.send("hardhat_mine", ["0x4E20"]);

      expect(await this.governorBravo.state(this.newProposalId)).to.be.equal(4);
    });

    it("Queued", async function () {
      await this.hifi.transfer(this.signers.alice.address, parseEther("4000000"));
      await this.hifi.connect(this.signers.alice).delegate(this.signers.alice.address);

      await network.provider.send("evm_mine");
      this.newProposalId = await this.governorBravo
        .connect(this.signers.alice)
        .callStatic.propose(this.targets, this.values, this.signatures, this.callDatas, "do nothing");
      await this.governorBravo
        .connect(this.signers.alice)
        .propose(this.targets, this.values, this.signatures, this.callDatas, "do nothing");
      await network.provider.send("evm_mine");
      await this.governorBravo.castVote(this.newProposalId, 1);
      await network.provider.send("hardhat_mine", ["0x4E20"]);

      await this.governorBravo.queue(this.newProposalId);
      expect(await this.governorBravo.state(this.newProposalId)).to.be.equal(5);
    });

    it("Expired", async function () {
      await this.hifi.transfer(this.signers.alice.address, parseEther("4000000"));
      await this.hifi.connect(this.signers.alice).delegate(this.signers.alice.address);

      await network.provider.send("evm_mine");
      this.newProposalId = await this.governorBravo
        .connect(this.signers.alice)
        .callStatic.propose(this.targets, this.values, this.signatures, this.callDatas, "do nothing");
      await this.governorBravo
        .connect(this.signers.alice)
        .propose(this.targets, this.values, this.signatures, this.callDatas, "do nothing");
      await network.provider.send("evm_mine");
      await this.governorBravo.castVote(this.newProposalId, 1);
      await network.provider.send("hardhat_mine", ["0x4E20"]);

      await this.governorBravo.queue(this.newProposalId);

      const gracePeriod = 14 * 24 * 60 * 60;
      const p = await this.governorBravo.proposals(this.newProposalId);
      const eta = p.eta;

      await network.provider.send("evm_setNextBlockTimestamp", [eta.add(gracePeriod).sub(1).toHexString()]);
      await network.provider.send("evm_mine");

      expect(await this.governorBravo.state(this.newProposalId)).to.be.equal(5);

      await network.provider.send("evm_setNextBlockTimestamp", [eta.add(gracePeriod).toHexString()]);
      await network.provider.send("evm_mine");

      expect(await this.governorBravo.state(this.newProposalId)).to.be.equal(6);
    });

    it("Executed", async function () {
      await this.hifi.transfer(this.signers.alice.address, parseEther("4000000"));
      await this.hifi.connect(this.signers.alice).delegate(this.signers.alice.address);

      await network.provider.send("evm_mine");
      this.newProposalId = await this.governorBravo
        .connect(this.signers.alice)
        .callStatic.propose(this.targets, this.values, this.signatures, this.callDatas, "do nothing");
      await this.governorBravo
        .connect(this.signers.alice)
        .propose(this.targets, this.values, this.signatures, this.callDatas, "do nothing");
      await network.provider.send("evm_mine");
      await this.governorBravo.castVote(this.newProposalId, 1);
      await network.provider.send("hardhat_mine", ["0x4E20"]);

      await network.provider.send("evm_increaseTime", [1]);
      await network.provider.send("evm_mine");
      await this.governorBravo.connect(this.signers.alice).queue(this.newProposalId);

      const gracePeriod = 14 * 24 * 60 * 60;
      const p = await this.governorBravo.proposals(this.newProposalId);
      const eta = p.eta;

      await network.provider.send("evm_setNextBlockTimestamp", [eta.add(gracePeriod).sub(3).toHexString()]);
      await network.provider.send("evm_mine");

      expect(await this.governorBravo.state(this.newProposalId)).to.be.equal(5);
      await this.governorBravo.connect(this.signers.alice).execute(this.newProposalId);

      expect(await this.governorBravo.state(this.newProposalId)).to.be.equal(7);

      // still executed even though would be expired
      await network.provider.send("evm_setNextBlockTimestamp", [eta.add(gracePeriod).toHexString()]);
      await network.provider.send("evm_mine");
      await network.provider.send("evm_mine");

      expect(await this.governorBravo.state(this.newProposalId)).to.be.equal(7);
    });
  });

  describe("_setVotingDelay", function () {
    describe("msg.sender != admin", function () {
      it("reverts", async function () {
        await expect(this.governorBravo.connect(this.signers.alice)._setVotingDelay(0)).to.be.revertedWith(
          "GovernorBravo::_setVotingDelay: admin only",
        );
      });
    });

    describe("msg.sender == admin", function () {
      describe("newVotingDelay >= MIN_VOTING_DELAY && newVotingDelay <= MAX_VOTING_DELAY", function () {
        it("succeeds", async function () {
          const votingDelayBefore = await this.governorBravo.votingDelay();
          const newVotingDelay = await this.governorBravo.MIN_VOTING_DELAY();
          const call = await this.governorBravo._setVotingDelay(newVotingDelay);
          await expect(call).to.emit(this.governorBravo, "VotingDelaySet").withArgs(votingDelayBefore, newVotingDelay);
        });
      });

      describe("Otherwise", function () {
        it("reverts", async function () {
          await expect(this.governorBravo._setVotingDelay(0)).to.be.revertedWith(
            "GovernorBravo::_setVotingDelay: invalid voting delay",
          );
        });
      });
    });
  });

  describe("_setVotingPeriod", function () {
    describe("msg.sender != admin", function () {
      it("reverts", async function () {
        await expect(this.governorBravo.connect(this.signers.alice)._setVotingPeriod(0)).to.be.revertedWith(
          "GovernorBravo::_setVotingPeriod: admin only",
        );
      });
    });

    describe("msg.sender == admin", function () {
      it("succeeds", async function () {
        const votingPeriodBefore = await this.governorBravo.votingPeriod();
        const newVotingPeriod = await this.governorBravo.MIN_VOTING_PERIOD();
        const call = await this.governorBravo._setVotingPeriod(newVotingPeriod);
        await expect(call).to.emit(this.governorBravo, "VotingPeriodSet").withArgs(votingPeriodBefore, newVotingPeriod);
      });
    });
  });

  describe("_setProposalThreshold", function () {
    describe("msg.sender != admin", function () {
      it("reverts", async function () {
        await expect(this.governorBravo.connect(this.signers.alice)._setProposalThreshold(0)).to.be.revertedWith(
          "GovernorBravo::_setProposalThreshold: admin only",
        );
      });
    });

    describe("msg.sender == admin", function () {
      describe("newProposalThreshold >= MIN_PROPOSAL_THRESHOLD && newProposalThreshold <= MAX_PROPOSAL_THRESHOLD", function () {
        it("succeeds", async function () {
          const proposalThresholdBefore = await this.governorBravo.proposalThreshold();
          const newProposalThreshold = await this.governorBravo.MIN_PROPOSAL_THRESHOLD();
          const call = await this.governorBravo._setProposalThreshold(newProposalThreshold);
          await expect(call)
            .to.emit(this.governorBravo, "ProposalThresholdSet")
            .withArgs(proposalThresholdBefore, newProposalThreshold);
        });
      });

      describe("Otherwise", function () {
        it("reverts", async function () {
          await expect(this.governorBravo._setProposalThreshold(0)).to.be.revertedWith(
            "GovernorBravo::_setProposalThreshold: invalid proposal threshold",
          );
        });
      });
    });
  });

  describe("_setPendingAdmin", function () {
    describe("msg.sender != admin", function () {
      it("reverts", async function () {
        await expect(
          this.governorBravo.connect(this.signers.alice)._setPendingAdmin(constants.AddressZero),
        ).to.be.revertedWith("GovernorBravo:_setPendingAdmin: admin only");
      });
    });

    describe("msg.sender == admin", function () {
      it("succeeds", async function () {
        const pendingAdminBefore = await this.governorBravo.pendingAdmin();
        const newPendingAdmin = this.signers.alice.address;
        const call = await this.governorBravo._setPendingAdmin(newPendingAdmin);
        await expect(call).to.emit(this.governorBravo, "NewPendingAdmin").withArgs(pendingAdminBefore, newPendingAdmin);
      });
    });
  });

  describe("_acceptAdmin", function () {
    describe("msg.sender != pendingAdmin", function () {
      it("reverts", async function () {
        await expect(this.governorBravo.connect(this.signers.alice)._acceptAdmin()).to.be.revertedWith(
          "GovernorBravo:_acceptAdmin: pending admin only",
        );
      });
    });

    describe("msg.sender == pendingAdmin", function () {
      beforeEach(async function () {
        await this.governorBravo.__godMode_setPendingAdmin(this.signers.alice.address);
      });

      describe("msg.sender != address(0)", function () {
        it("succeeds", async function () {
          const adminBefore = await this.governorBravo.admin();
          const pendingAdminBefore = await this.governorBravo.pendingAdmin();
          const call = await this.governorBravo.connect(this.signers.alice)._acceptAdmin();
          await expect(call).to.emit(this.governorBravo, "NewAdmin").withArgs(adminBefore, this.signers.alice.address);
          await expect(call)
            .to.emit(this.governorBravo, "NewPendingAdmin")
            .withArgs(pendingAdminBefore, constants.AddressZero);
        });
      });

      describe("msg.sender == address(0)", function () {
        it("reverts", async function () {
          const signer = await ethers.getSigner(constants.AddressZero);
          await network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [constants.AddressZero],
          });
          await expect(this.governorBravo.connect(signer)._acceptAdmin()).to.be.revertedWith(
            "GovernorBravo:_acceptAdmin: pending admin only",
          );
          await network.provider.request({
            method: "hardhat_stopImpersonatingAccount",
            params: [constants.AddressZero],
          });
        });
      });
    });
  });
}
