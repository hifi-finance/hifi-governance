import { AddressZero } from "@ethersproject/constants";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { Contract, getDefaultProvider } from "ethers";
import { ethers } from "hardhat";
import { artifacts, waffle } from "hardhat";
import { Artifact } from "hardhat/types";

import type { GovernorBravoDelegate as GovernorBravoImplementation } from "../../src/types/GovernorBravoDelegate";
import type { GovernorBravoDelegator as GovernorBravoProxy } from "../../src/types/GovernorBravoDelegator";
import { GovernorBravoDelegate__factory as GovernorBravoImplementation_factory } from "../../src/types/factories/GovernorBravoDelegate__factory";
import type { GovernorBravoDelegator__factory as GovernorBravoProxy__factory } from "../../src/types/factories/GovernorBravoDelegator__factory";
import type { GodModeHifi } from "../../src/types/test/GodModeHifi";
import type { GodModeTimelock } from "../../src/types/test/GodModeTimelock";

function getContractAddress(address: string, nonce: number): string {
  const contract_address = "0x".concat(
    ethers.utils
      .keccak256(ethers.utils.RLP.encode([address, ethers.BigNumber.from(nonce.toString()).toHexString()]))
      .substring(26),
  );
  return ethers.utils.getAddress(contract_address);
}

export async function deployGovernorBravoFixture(): Promise<{
  governorBravo: GovernorBravoImplementation;
  godModeHifi: GodModeHifi;
}> {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const admin: SignerWithAddress = signers[0];

  const godModeTimelockArtifact = await artifacts.readArtifact("GodModeTimelock");
  const godModeTimelock: GodModeTimelock = <GodModeTimelock>(
    await waffle.deployContract(admin, godModeTimelockArtifact, [])
  );

  const godModeHifiArtifact = await artifacts.readArtifact("GodModeHifi");
  const godModeHifi: GodModeHifi = <GodModeHifi>await waffle.deployContract(admin, godModeHifiArtifact, []);

  const governorBravoImplementationFactory: GovernorBravoImplementation_factory = <GovernorBravoImplementation_factory>(
    await ethers.getContractFactory("GovernorBravoDelegate")
  );
  const governorBravoImplementation: GovernorBravoImplementation = <GovernorBravoImplementation>(
    await governorBravoImplementationFactory.connect(admin).deploy()
  );
  await governorBravoImplementation.deployed();

  const nonce = await admin.getTransactionCount();
  const pendingAdmin = getContractAddress(admin.address, nonce + 1);
  await godModeTimelock.__godMode_setPendingAdmin(pendingAdmin);

  const governorBravo__factory: GovernorBravoProxy__factory = <GovernorBravoProxy__factory>(
    await ethers.getContractFactory("GovernorBravoDelegator")
  );
  const governorBravoProxy: GovernorBravoProxy = <GovernorBravoProxy>(
    await governorBravo__factory
      .connect(admin)
      .deploy(
        godModeTimelock.address,
        godModeHifi.address,
        admin.address,
        governorBravoImplementation.address,
        5760,
        1,
        "75000000000000000000000",
      )
  );
  await governorBravoProxy.deployed();

  const governorBravo = <GovernorBravoImplementation>(
    new Contract(governorBravoProxy.address, GovernorBravoImplementation_factory.abi, signers[0])
  );

  return { governorBravo, godModeHifi };
}
