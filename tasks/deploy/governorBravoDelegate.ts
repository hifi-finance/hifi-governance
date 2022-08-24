import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { task, types } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

import { GovernorBravoDelegate } from "../../src/types/GovernorBravoDelegate";
import { GovernorBravoDelegate__factory } from "../../src/types/factories/GovernorBravoDelegate__factory";
import {
  SUBTASK_DEPLOY_WAIT_FOR_CONFIRMATIONS,
  SUBTASK_VERIFY,
  TASK_DEPLOY_CONTRACT_GOVERNOR_BRAVO_DELEGATE,
} from "../constants";

task(TASK_DEPLOY_CONTRACT_GOVERNOR_BRAVO_DELEGATE)
  // Developer settings
  .addOptionalParam("confirmations", "How many block confirmations to wait for", 2, types.int)
  .addOptionalParam("print", "Print the address in the console", true, types.boolean)
  .addOptionalParam("verify", "Verify the contract on Etherscan", true, types.boolean)
  .setAction(async function (taskArgs: TaskArguments, { ethers, run }): Promise<string> {
    const signers: SignerWithAddress[] = await ethers.getSigners();
    const governorBravoDelegateFactory: GovernorBravoDelegate__factory = new GovernorBravoDelegate__factory(signers[0]);
    const governorBravoDelegate: GovernorBravoDelegate = <GovernorBravoDelegate>(
      await governorBravoDelegateFactory.deploy()
    );

    await run(SUBTASK_DEPLOY_WAIT_FOR_CONFIRMATIONS, {
      contract: governorBravoDelegate,
      confirmations: taskArgs.confirmations,
    });

    if (taskArgs.print) {
      console.table([{ name: "GovernorBravoDelegate", address: governorBravoDelegate.address }]);
    }

    if (taskArgs.verify) {
      try {
        await run(SUBTASK_VERIFY, {
          address: governorBravoDelegate.address,
        });
      } catch (error) {
        console.error("Error while verifying contract:", error);
      }
    }

    return governorBravoDelegate.address;
  });
