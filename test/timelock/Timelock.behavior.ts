import { expect } from "chai";
import { ethers, network } from "hardhat";

export function shouldBehaveLikeTimelock(): void {
  describe("acceptAdmin", function () {
    describe("msg.sender != pendingAdmin", function () {
      it("reverts", async function () {
        await expect(this.timelock.connect(this.signers.admin).acceptAdmin()).to.be.revertedWith(
          "Timelock::acceptAdmin: Call must come from pendingAdmin.",
        );
      });
    });
  });

  describe("setDelay", function () {
    describe("msg.sender != address(this)", function () {
      it("reverts", async function () {
        await expect(this.timelock.connect(this.signers.admin).setDelay(0)).to.be.revertedWith(
          "Timelock::setDelay: Call must come from Timelock.",
        );
      });
    });

    describe("msg.sender == address(this)", function () {
      beforeEach(async function () {
        await this.signers.admin.sendTransaction({
          to: this.timelock.address,
          value: ethers.utils.parseEther("1.0"),
        });

        this.signer = await ethers.getSigner(this.timelock.address);
        await network.provider.request({
          method: "hardhat_impersonateAccount",
          params: [this.timelock.address],
        });
      });

      afterEach(async function () {
        await network.provider.request({
          method: "hardhat_stopImpersonatingAccount",
          params: [this.timelock.address],
        });
      });

      describe("delay_ >= MINIMUM_DELAY", function () {
        describe("delay_ <= MAXIMUM_DELAY", function () {
          it("succeeds", async function () {
            const newDelay = (await this.timelock.MAXIMUM_DELAY()).sub(1);
            const call = await this.timelock.connect(this.signer).setDelay(newDelay);
            await expect(call).to.emit(this.timelock, "NewDelay").withArgs(newDelay);
          });
        });

        describe("Otherwise", function () {
          it("reverts", async function () {
            const newDelay = (await this.timelock.MAXIMUM_DELAY()).add(1);
            await expect(this.timelock.connect(this.signer).setDelay(newDelay)).to.be.revertedWith(
              "Timelock::setDelay: Delay must not exceed maximum delay.",
            );
          });
        });
      });

      describe("Otherwise", function () {
        it("reverts", async function () {
          const newDelay = (await this.timelock.MINIMUM_DELAY()).sub(1);
          await expect(this.timelock.connect(this.signer).setDelay(newDelay)).to.be.revertedWith(
            "Timelock::setDelay: Delay must exceed minimum delay.",
          );
        });
      });
    });
  });

  describe("setPendingAdmin", function () {
    describe("msg.sender != address(this)", function () {
      it("reverts", async function () {
        await expect(
          this.timelock.connect(this.signers.alice).setPendingAdmin(this.signers.admin.address),
        ).to.be.revertedWith("Timelock::setPendingAdmin: Call must come from Timelock.");
      });
    });

    describe("msg.sender == address(this)", function () {
      beforeEach(async function () {
        await this.signers.admin.sendTransaction({
          to: this.timelock.address,
          value: ethers.utils.parseEther("1.0"),
        });

        this.signer = await ethers.getSigner(this.timelock.address);
        await network.provider.request({
          method: "hardhat_impersonateAccount",
          params: [this.timelock.address],
        });
      });

      afterEach(async function () {
        await network.provider.request({
          method: "hardhat_stopImpersonatingAccount",
          params: [this.timelock.address],
        });
      });

      it("succeeds", async function () {
        const newPendingAdmin = this.signers.alice.address;
        const call = await this.timelock.connect(this.signer).setPendingAdmin(newPendingAdmin);
        await expect(call).to.emit(this.timelock, "NewPendingAdmin").withArgs(newPendingAdmin);
      });
    });
  });
}
