// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import "../Hifi.sol";

/// @author Hifi
/// @dev Strictly for test purposes. Do not use in production.
contract GodModeHifi is Hifi {
    constructor(address account, address minter_) Hifi(account, minter_) {}

    function __godMode_setCheckpoint(
        address delegatee,
        uint32 index,
        uint32 blockNumber,
        uint32 newVotes
    ) external {
        checkpoints[delegatee][index] = Checkpoint(blockNumber, newVotes);
    }

    function __godMode_setNumCheckpoints(address account, uint32 newNumCheckpoints) external {
        numCheckpoints[account] = newNumCheckpoints;
    }
}
