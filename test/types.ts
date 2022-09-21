import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";

import { GodModeGovernorBravoDelegate, IERC20 } from "../src/types";
import type { GodModeHifi } from "../src/types/contracts/test/GodModeHifi";
import type { GodModeTimelock } from "../src/types/contracts/test/GodModeTimelock";

type Fixture<T> = () => Promise<T>;

declare module "mocha" {
  export interface Context {
    hifi: GodModeHifi;
    governorBravo: GodModeGovernorBravoDelegate;
    mft: IERC20;
    timelock: GodModeTimelock;
    loadFixture: <T>(fixture: Fixture<T>) => Promise<T>;
    signers: Signers;
  }
}

export interface Signers {
  admin: SignerWithAddress;
  alice: SignerWithAddress;
  bob: SignerWithAddress;
  carol: SignerWithAddress;
  david: SignerWithAddress;
}
