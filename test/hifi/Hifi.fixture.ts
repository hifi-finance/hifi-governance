import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { artifacts, ethers } from "hardhat";
import { Artifact } from "hardhat/types";

import type { IERC20 } from "../../src/types";
import type { GodModeHifi } from "../../src/types/contracts/test/GodModeHifi";
import type { GodModeHifi__factory } from "../../src/types/factories/contracts/test/GodModeHifi__factory";

export async function deployHifiFixture(): Promise<{ hifi: GodModeHifi; mft: IERC20 }> {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const admin: SignerWithAddress = signers[0];

  const account: string = admin.address;
  const minter: string = admin.address;
  const hifiFactory: GodModeHifi__factory = <GodModeHifi__factory>await ethers.getContractFactory("GodModeHifi");
  const hifi: GodModeHifi = <GodModeHifi>await hifiFactory.connect(admin).deploy(account, minter);
  await hifi.deployed();

  const mftToken = "0xdf2c7238198ad8b389666574f2d8bc411a4b7428";
  const erc20Artifact: Artifact = await artifacts.readArtifact("IERC20");
  const mft = <IERC20>new ethers.Contract(mftToken, erc20Artifact.abi, admin);

  return { hifi, mft };
}
