import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { task, types } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

import { GovernorBravoDelegator } from "../../src/types/GovernorBravoDelegator";
import { GovernorBravoDelegator__factory } from "../../src/types/factories/GovernorBravoDelegator__factory";
import {
  SUBTASK_DEPLOY_WAIT_FOR_CONFIRMATIONS,
  SUBTASK_VERIFY,
  TASK_DEPLOY_CONTRACT_GOVERNOR_BRAVO_DELEGATOR,
} from "../constants";

task(TASK_DEPLOY_CONTRACT_GOVERNOR_BRAVO_DELEGATOR)
  // Contract arguments
  .addParam("timelock", "The timelock contract address")
  .addParam("hifi", "The Hifi token contract address")
  .addParam("admin", "The admin wallet account")
  .addParam("implementation", "The GovernorBravoDelegate implementation contract")
  .addParam("votingPeriod", "The voting period")
  .addParam("votingDelay", "The voting delay")
  .addParam("proposalThreshold", "The proposal threshold")
  // Developer settings
  .addOptionalParam("confirmations", "How many block confirmations to wait for", 2, types.int)
  .addOptionalParam("print", "Print the address in the console", true, types.boolean)
  .addOptionalParam("verify", "Verify the contract on Etherscan", true, types.boolean)
  .setAction(async function (taskArgs: TaskArguments, { ethers, run }): Promise<string> {
    const signers: SignerWithAddress[] = await ethers.getSigners();
    const governorBravoDelegatorFactory: GovernorBravoDelegator__factory = new GovernorBravoDelegator__factory(
      signers[0],
    );
    const governorBravoDelegator: GovernorBravoDelegator = <GovernorBravoDelegator>(
      await governorBravoDelegatorFactory.deploy(
        taskArgs.timelock,
        taskArgs.hifi,
        taskArgs.admin,
        taskArgs.implementation,
        taskArgs.votingPeriod,
        taskArgs.votingDelay,
        taskArgs.proposalThreshold,
      )
    );

    await run(SUBTASK_DEPLOY_WAIT_FOR_CONFIRMATIONS, {
      contract: governorBravoDelegator,
      confirmations: taskArgs.confirmations,
    });

    if (taskArgs.print) {
      console.table([{ name: "GovernorBravoDelegator", address: governorBravoDelegator.address }]);
    }

    if (taskArgs.verify) {
      try {
        await run(SUBTASK_VERIFY, {
          address: governorBravoDelegator.address,
          constructorArguments: [
            taskArgs.timelock,
            taskArgs.hifi,
            taskArgs.admin,
            taskArgs.implementation,
            taskArgs.votingPeriod,
            taskArgs.votingDelay,
            taskArgs.proposalThreshold,
          ],
        });
      } catch (error) {
        console.error("Error while verifying contract:", error);
      }
    }

    return governorBravoDelegator.address;
  });
