import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { Contract } from "ethers";
import { ethers } from "hardhat";
import { artifacts, waffle } from "hardhat";

import type { GovernorBravoDelegator as GovernorBravoProxy } from "../../src/types/contracts/GovernorBravoDelegator";
import type { GodModeGovernorBravoDelegate as GovernorBravoImplementation } from "../../src/types/contracts/test/GodModeGovernorBravoDelegate";
import type { GodModeHifi } from "../../src/types/contracts/test/GodModeHifi";
import type { GodModeTimelock } from "../../src/types/contracts/test/GodModeTimelock";
import type { GovernorBravoDelegator__factory as GovernorBravoProxy__factory } from "../../src/types/factories/contracts/GovernorBravoDelegator__factory";
import { GodModeGovernorBravoDelegate__factory as GovernorBravoImplementation_factory } from "../../src/types/factories/contracts/test/GodModeGovernorBravoDelegate__factory";

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
  const godModeHifi: GodModeHifi = <GodModeHifi>(
    await waffle.deployContract(admin, godModeHifiArtifact, [admin.address, admin.address])
  );

  const governorBravoImplementationFactory: GovernorBravoImplementation_factory = <GovernorBravoImplementation_factory>(
    await ethers.getContractFactory("GodModeGovernorBravoDelegate")
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
  const proposalThreshold = (await godModeHifi.totalSupply()).div(10000);
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
        proposalThreshold,
      )
  );
  await governorBravoProxy.deployed();

  const governorBravo = <GovernorBravoImplementation>(
    new Contract(governorBravoProxy.address, GovernorBravoImplementation_factory.abi, signers[0])
  );

  return { governorBravo, godModeHifi };
}
