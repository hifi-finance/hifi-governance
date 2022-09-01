import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { task, types } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

import type { Hifi } from "../../src/types/contracts/Hifi";
import { Hifi__factory } from "../../src/types/factories/contracts/Hifi__factory";
import { SUBTASK_DEPLOY_WAIT_FOR_CONFIRMATIONS, SUBTASK_VERIFY, TASK_DEPLOY_CONTRACT_HIFI } from "../constants";

task(TASK_DEPLOY_CONTRACT_HIFI)
  // Contract arguments
  .addParam("account", "The initial account to grant all the tokens")
  .addParam("minter", "The account with minting ability")
  .addParam("mft", "The address of mft token")
  .addParam("hifiMftRatio", "Hifi to MFT token swap ratio")
  // Developer settings
  .addOptionalParam("confirmations", "How many block confirmations to wait for", 2, types.int)
  .addOptionalParam("print", "Print the address in the console", true, types.boolean)
  .addOptionalParam("verify", "Verify the contract on Etherscan", true, types.boolean)
  .setAction(async function (taskArgs: TaskArguments, { ethers, run }): Promise<string> {
    const signers: SignerWithAddress[] = await ethers.getSigners();
    const hifiFactory: Hifi__factory = new Hifi__factory(signers[0]);
    const hifi: Hifi = <Hifi>(
      await hifiFactory.deploy(taskArgs.account, taskArgs.minter, taskArgs.mft, taskArgs.hifiMftRatio)
    );

    await run(SUBTASK_DEPLOY_WAIT_FOR_CONFIRMATIONS, { contract: hifi, confirmations: taskArgs.confirmations });

    if (taskArgs.print) {
      console.table([{ name: "Hifi Token", address: hifi.address }]);
    }

    if (taskArgs.verify) {
      try {
        await run(SUBTASK_VERIFY, {
          address: hifi.address,
          constructorArguments: [taskArgs.account, taskArgs.minter],
        });
      } catch (error) {
        console.error("Error while verifying contract:", error);
      }
    }

    return hifi.address;
  });
