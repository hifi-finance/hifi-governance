import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { ethers } from "hardhat";

import type { Hifi } from "../../src/types/Hifi";
import type { Hifi__factory } from "../../src/types/factories/Hifi__factory";

export async function deployHifiFixture(): Promise<{ hifi: Hifi }> {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const admin: SignerWithAddress = signers[0];

  const account: string = admin.address;
  const minter: string = admin.address;
  const hifiFactory: Hifi__factory = <Hifi__factory>await ethers.getContractFactory("Hifi");
  const hifi: Hifi = <Hifi>await hifiFactory.connect(admin).deploy(account, minter);
  await hifi.deployed();

  return { hifi };
}
