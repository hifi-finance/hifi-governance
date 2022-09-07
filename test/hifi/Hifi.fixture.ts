import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { ethers } from "hardhat";

import type { GodModeHifi__factory } from "../../src/types/factories/test/GodModeHifi__factory";
import type { GodModeHifi } from "../../src/types/test/GodModeHifi";

export async function deployHifiFixture(): Promise<{ hifi: GodModeHifi }> {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const admin: SignerWithAddress = signers[0];

  const account: string = admin.address;
  const minter: string = admin.address;
  const hifiFactory: GodModeHifi__factory = <GodModeHifi__factory>await ethers.getContractFactory("GodModeHifi");
  const hifi: GodModeHifi = <GodModeHifi>await hifiFactory.connect(admin).deploy(account, minter);
  await hifi.deployed();

  return { hifi };
}
