import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { task, types } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

import { Timelock } from "../../src/types/contracts/Timelock";
import { Timelock__factory } from "../../src/types/factories/contracts/Timelock__factory";
import { SUBTASK_DEPLOY_WAIT_FOR_CONFIRMATIONS, SUBTASK_VERIFY, TASK_DEPLOY_CONTRACT_TIMELOCK } from "../constants";

task(TASK_DEPLOY_CONTRACT_TIMELOCK)
  // Contract arguments
  .addParam("admin", "The admin wallet account")
  .addParam("delay", "The timelock delay")
  // Developer settings
  .addOptionalParam("confirmations", "How many block confirmations to wait for", 2, types.int)
  .addOptionalParam("print", "Print the address in the console", true, types.boolean)
  .addOptionalParam("verify", "Verify the contract on Etherscan", true, types.boolean)
  .setAction(async function (taskArgs: TaskArguments, { ethers, run }): Promise<string> {
    const signers: SignerWithAddress[] = await ethers.getSigners();
    const timelockFactory: Timelock__factory = new Timelock__factory(signers[0]);
    const timelock: Timelock = <Timelock>await timelockFactory.deploy(taskArgs.admin, taskArgs.delay);

    await run(SUBTASK_DEPLOY_WAIT_FOR_CONFIRMATIONS, {
      contract: timelock,
      confirmations: taskArgs.confirmations,
    });

    if (taskArgs.print) {
      console.table([{ name: "Timelock", address: timelock.address }]);
    }

    if (taskArgs.verify) {
      try {
        await run(SUBTASK_VERIFY, {
          address: timelock.address,
          constructorArguments: [taskArgs.admin, taskArgs.delay],
        });
      } catch (error) {
        console.error("Error while verifying contract:", error);
      }
    }

    return timelock.address;
  });
