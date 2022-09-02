// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import "../Hifi.sol";

/// @author Hifi
/// @dev Strictly for test purposes. Do not use in production.
contract GodModeHifi is Hifi {
    constructor() Hifi(msg.sender, msg.sender) {}
}
