import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { ethers } from "hardhat";

import type { GodModeTimelock } from "../../src/types/contracts/test/GodModeTimelock";
import { GodModeTimelock__factory } from "../../src/types/factories/contracts/test/GodModeTimelock__factory";

export async function deployTimelockFixture(): Promise<{
  timelock: GodModeTimelock;
}> {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const admin: SignerWithAddress = signers[0];

  const timelockFactory: GodModeTimelock__factory = <GodModeTimelock__factory>(
    await ethers.getContractFactory("GodModeTimelock")
  );
  const timelock: GodModeTimelock = <GodModeTimelock>await timelockFactory.connect(admin).deploy();
  await timelock.deployed();

  return { timelock };
}
