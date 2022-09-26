// SPDX-License-Identifier: UNLICENSED
// solhint-disable comprehensive-interface
// solhint-disable func-name-mixedcase
pragma solidity ^0.8.15;

import "../Timelock.sol";

/// @author Hifi
/// @dev Strictly for test purposes. Do not use in production.
contract GodModeTimelock is Timelock {
    constructor() Timelock(msg.sender, Timelock.MINIMUM_DELAY) {
        // solhint-disable-previous-line no-empty-blocks
    }

    function __godMode_setPendingAdmin(address pendingAdmin_) external {
        pendingAdmin = pendingAdmin_;
    }
}
