// SPDX-License-Identifier: UNLICENSED
// solhint-disable comprehensive-interface
// solhint-disable func-name-mixedcase
pragma solidity ^0.8.15;

import "../GovernorBravoDelegate.sol";

/// @author Hifi
/// @dev Strictly for test purposes. Do not use in production.
contract GodModeGovernorBravoDelegate is GovernorBravoDelegate {
    constructor() GovernorBravoDelegate() {
        // solhint-disable-previous-line no-empty-blocks
    }

    function __godMode_setPendingAdmin(address pendingAdmin_) external {
        pendingAdmin = pendingAdmin_;
    }
}
