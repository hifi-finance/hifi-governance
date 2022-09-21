import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { ethers } from "hardhat";

import type { Signers } from "../types";
import { shouldBehaveLikeHifi } from "./Hifi.behavior";
import { deployHifiFixture } from "./Hifi.fixture";

describe("Unit tests", function () {
  before(async function () {
    this.signers = {} as Signers;

    const signers: SignerWithAddress[] = await ethers.getSigners();
    this.signers.admin = signers[0];
    this.signers.alice = signers[1];
    this.signers.bob = signers[2];
    this.signers.carol = signers[3];
    this.signers.david = signers[4];

    this.loadFixture = loadFixture;
  });

  describe("Hifi", function () {
    beforeEach(async function () {
      const { hifi, mft } = await this.loadFixture(deployHifiFixture);
      this.hifi = hifi;
      this.mft = mft;
    });

    shouldBehaveLikeHifi();
  });
});
