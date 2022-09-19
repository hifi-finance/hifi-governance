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

---

#### Commit:

[ddded2ac84fdcee3e90a3dbcb3ca9a395b365cdd](https://github.com/hifi-finance/hifi-governance/commit/ddded2ac84fdcee3e90a3dbcb3ca9a395b365cdd)

#### Changes:

- Added Ampleforth token burn functionality to Hifi token. Forked code from [ampleforth/Forth/contracts/Forth.sol L134](https://github.com/ampleforth/Forth/blob/e8498423870a6698e8f06a2a74a04f298f1aab82/contracts/Forth.sol#L134) to [ampleforth/Forth/contracts/Forth.sol L176](https://github.com/ampleforth/Forth/blob/e8498423870a6698e8f06a2a74a04f298f1aab82/contracts/Forth.sol#L176).

---

#### Commit:

[29b9886ee7ba140f21029d8d2355bbca016e7445](https://github.com/hifi-finance/hifi-governance/commit/29b9886ee7ba140f21029d8d2355bbca016e7445)

#### Changes:

- Removed Uniswap emission schedule from Hifi token. Includes the following changes:

  - Removed `mintingAllowedAfter` storage var.
  - Removed `minimumTimeBetweenMints` constant.
  - Removed `mintCap` constant.
  - Remove any require statements that depend on any removed variables.
  - Refactor `mint(...)` function implementation.

  Note: this commit includes a bug at [hifi-finance/hifi-governance/contracts/Hifi.sol L119](https://github.com/hifi-finance/hifi-governance/blob/29b9886ee7ba140f21029d8d2355bbca016e7445/contracts/Hifi.sol#L119) that was fixed later on in [2f2bdf95b3bdeeeadb8bac01837847de689a6c43](https://github.com/hifi-finance/hifi-governance/commit/2f2bdf95b3bdeeeadb8bac01837847de689a6c43).

---

#### Commit:

[3c6c3a51c4a4c7d3707389a3eec2f639d4489ce6](https://github.com/hifi-finance/hifi-governance/commit/3c6c3a51c4a4c7d3707389a3eec2f639d4489ce6)

#### Changes:

- Completely removed `SafeMath.sol` file and replace SafeMath operations inside `Timelock.sol` with standard Solidity math operations.

---

#### Commit:

[2f2bdf95b3bdeeeadb8bac01837847de689a6c43](https://github.com/hifi-finance/hifi-governance/commit/2f2bdf95b3bdeeeadb8bac01837847de689a6c43)

#### Changes:

- Fixes a bug that was introduced at [hifi-finance/hifi-governance/contracts/Hifi.sol L119](https://github.com/hifi-finance/hifi-governance/blob/29b9886ee7ba140f21029d8d2355bbca016e7445/contracts/Hifi.sol#L119).

---

#### Commit:

[12ff0b4014b80f538dc640df6a084ea92c0d5acd](https://github.com/hifi-finance/hifi-governance/commit/12ff0b4014b80f538dc640df6a084ea92c0d5acd)

#### Changes:

- Added a gas optimization at [hifi-finance/hifi-governance/contracts/GovernorBravoDelegate.sol L127](https://github.com/hifi-finance/hifi-governance/blob/12ff0b4014b80f538dc640df6a084ea92c0d5acd/contracts/GovernorBravoDelegate.sol#L127) by avoiding multiple SLOAD operations.
