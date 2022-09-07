import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";

import { GovernorBravoDelegate } from "../src/types";
import type { GodModeHifi } from "../src/types/test/GodModeHifi";

type Fixture<T> = () => Promise<T>;

declare module "mocha" {
  export interface Context {
    hifi: GodModeHifi;
    governorBravo: GovernorBravoDelegate;
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
