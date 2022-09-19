#### Commit:

[320d6262af1b28ed72fe8533f43e1e38ee75c98f](https://github.com/hifi-finance/hifi-governance/commit/320d6262af1b28ed72fe8533f43e1e38ee75c98f)

#### Changes:

- Forked code from followed sources:
  - `Uni.sol` from [Uniswap/governance/contracts/Uni.sol](https://github.com/Uniswap/governance/blob/eabd8c71ad01f61fb54ed6945162021ee419998e/contracts/Uni.sol)
  - `SafeMath.sol` from [Uniswap/governance/contracts/SafeMath.sol](https://github.com/Uniswap/governance/blob/eabd8c71ad01f61fb54ed6945162021ee419998e/contracts/SafeMath.sol)
  - `Timelock.sol` from [ampleforth/Forth/contracts/Timelock.sol](https://github.com/ampleforth/Forth/blob/e8498423870a6698e8f06a2a74a04f298f1aab82/contracts/Timelock.sol)
  - `GovernorBravoDelegate.sol` from [ampleforth/Forth/contracts/GovernorBravoDelegate.sol](https://github.com/ampleforth/Forth/blob/e8498423870a6698e8f06a2a74a04f298f1aab82/contracts/GovernorBravoDelegate.sol)
  - `GovernorBravoDelegator.sol` from [ampleforth/Forth/contracts/GovernorBravoDelegator.sol](https://github.com/ampleforth/Forth/blob/e8498423870a6698e8f06a2a74a04f298f1aab82/contracts/GovernorBravoDelegator.sol)
  - `GovernorBravoInterfaces.sol` from [ampleforth/Forth/contracts/GovernorBravoInterfaces.sol](https://github.com/ampleforth/Forth/blob/e8498423870a6698e8f06a2a74a04f298f1aab82/contracts/GovernorBravoInterfaces.sol)

---

#### Commit:

[38b3a8d87f415325989626c4aa987aad0d3b4307](https://github.com/hifi-finance/hifi-governance/commit/38b3a8d87f415325989626c4aa987aad0d3b4307)

#### Changes:

- Renamed as follows:
  - Renamed all instances of "FORTH" to "HIFI"
  - Renamed all instances of "UNI" to "HIFI"
  - Renamed all instances of "Forth" to "Hifi"
  - Renamed all instances of "Uni" to "Hifi"
  - Renamed all instances of "forth" to "hifi"
  - Renamed all instances of "uni" to "hifi"
  - Renamed all instances of "Ampleforth" to "Hifi"
  - Renamed all instances of "Uniswap" to "Hifi Finance"
- Remove `public` visibility modifier from Hifi token constructor.
- Add `@notice` NatSpec tags to comments inside `GovernorBravoInterfaces.sol`.
- Fix typo in `initialize(...)` function comment in `GovernorBravoDelegate.sol`.

---

#### Commit:

[4fafc8b8db71db51730c8587e3235846123962e6](https://github.com/hifi-finance/hifi-governance/commit/4fafc8b8db71db51730c8587e3235846123962e6)

#### Changes:

- Upgraded Solidity version to ^0.8.15.
- Removed superfluous `pragma experimental ABIEncoderV2;` lines.
- Fix outdated struct initialization in [contracts/GovernorBravoDelegate.sol L129](https://github.com/hifi-finance/hifi-governance/commit/4fafc8b8db71db51730c8587e3235846123962e6#diff-f1f76a3dc930c6d6e026256b79a4ed32b935041ad4e5b73668825aba68822481L129). This is similar to the latest Compound implementation in [contracts/Governance/GovernorBravoDelegate L95](https://github.com/compound-finance/compound-protocol/blob/a3214f67b73310d547e00fc578e8355911c9d376/contracts/Governance/GovernorBravoDelegate.sol#L95).
- Use `view` modifier for `getChainId(...)` and `getChainIdInternal(...)` functions instead of `pure`.
- Remove superfluous `public` visibility tags from constructors.
- Remove superfluous `SafeMath.sol`.
- Use `type(uint256).max` instead of deprecated `uint256(-1)`.
- Use `type(uint96).max` instead of deprecated `uint96(-1)`.
- Use `block.timestamp` instead of deprecated `now`.
