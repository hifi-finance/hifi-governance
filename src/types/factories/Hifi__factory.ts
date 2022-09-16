/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type { Hifi, HifiInterface } from "../Hifi";
import type { PromiseOrValue } from "../common";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "address",
        name: "minter_",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "delegator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "fromDelegate",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "toDelegate",
        type: "address",
      },
    ],
    name: "DelegateChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "delegate",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "previousBalance",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newBalance",
        type: "uint256",
      },
    ],
    name: "DelegateVotesChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "minter",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newMinter",
        type: "address",
      },
    ],
    name: "MinterChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "DELEGATION_TYPEHASH",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DOMAIN_TYPEHASH",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PERMIT_TYPEHASH",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "rawAmount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "rawAmount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "rawAmount",
        type: "uint256",
      },
    ],
    name: "burnFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    name: "checkpoints",
    outputs: [
      {
        internalType: "uint32",
        name: "fromBlock",
        type: "uint32",
      },
      {
        internalType: "uint96",
        name: "votes",
        type: "uint96",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "delegatee",
        type: "address",
      },
    ],
    name: "delegate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "delegatee",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "expiry",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "delegateBySig",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "delegates",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "getCurrentVotes",
    outputs: [
      {
        internalType: "uint96",
        name: "",
        type: "uint96",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256",
      },
    ],
    name: "getPriorVotes",
    outputs: [
      {
        internalType: "uint96",
        name: "",
        type: "uint96",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "dst",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "rawAmount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "minter",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "nonces",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "numCheckpoints",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "rawAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "minter_",
        type: "address",
      },
    ],
    name: "setMinter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "dst",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "rawAmount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "src",
        type: "address",
      },
      {
        internalType: "address",
        name: "dst",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "rawAmount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040526b033b2e3c9fd0803ce80000006000553480156200002157600080fd5b506040516200276638038062002766833981016040819052620000449162000132565b600080546001600160a01b03841680835260036020908152604080852080546001600160601b0319166001600160601b0390951694909417909355835492519283529092917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a3600180546001600160a01b0319166001600160a01b038316908117909155604080516000815260208101929092527f3b0007eb941cf645526cbb3a4fdaecda9d28ce4843167d9263b536a1f1edc0f6910160405180910390a150506200016a565b80516001600160a01b03811681146200012d57600080fd5b919050565b600080604083850312156200014657600080fd5b620001518362000115565b9150620001616020840162000115565b90509250929050565b6125ec806200017a6000396000f3fe608060405234801561001057600080fd5b50600436106101ae5760003560e01c806370a08231116100ee578063b4b5ea5711610097578063dd62ed3e11610071578063dd62ed3e14610472578063e7a324dc146104b4578063f1127ed8146104db578063fca3b5aa1461054357600080fd5b8063b4b5ea5714610439578063c3cda5201461044c578063d505accf1461045f57600080fd5b80637ecebe00116100c85780637ecebe00146103e357806395d89b4114610403578063a9059cbb1461042657600080fd5b806370a0823114610373578063782d6fe1146103a557806379cc6790146103d057600080fd5b806330adf81f1161015b57806342966c681161013557806342966c68146102e9578063587cde1e146102fc5780635c19a95c146103255780636fcfff451461033857600080fd5b806330adf81f14610293578063313ce567146102ba57806340c10f19146102d457600080fd5b806318160ddd1161018c57806318160ddd1461024257806320606b701461025957806323b872dd1461028057600080fd5b806306fdde03146101b357806307546172146101f4578063095ea7b31461021f575b600080fd5b6101de6040518060400160405280600c81526020016b486966692046696e616e636560a01b81525081565b6040516101eb9190611f87565b60405180910390f35b600154610207906001600160a01b031681565b6040516001600160a01b0390911681526020016101eb565b61023261022d366004611ff8565b610556565b60405190151581526020016101eb565b61024b60005481565b6040519081526020016101eb565b61024b7f8cad95687ba82c2ce50e74f7b754645e5117c3a5bec8151c0726d5857980a86681565b61023261028e366004612022565b61061b565b61024b7f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c981565b6102c2601281565b60405160ff90911681526020016101eb565b6102e76102e2366004611ff8565b610765565b005b6102e76102f736600461205e565b610805565b61020761030a366004612077565b6004602052600090815260409020546001600160a01b031681565b6102e7610333366004612077565b610839565b61035e610346366004612077565b60066020526000908152604090205463ffffffff1681565b60405163ffffffff90911681526020016101eb565b61024b610381366004612077565b6001600160a01b03166000908152600360205260409020546001600160601b031690565b6103b86103b3366004611ff8565b610846565b6040516001600160601b0390911681526020016101eb565b6102e76103de366004611ff8565b610ae9565b61024b6103f1366004612077565b60076020526000908152604090205481565b6101de604051806040016040528060048152602001634849464960e01b81525081565b610232610434366004611ff8565b610bee565b6103b8610447366004612077565b610c2a565b6102e761045a3660046120a3565b610ca9565b6102e761046d3660046120fb565b610fc7565b61024b610480366004612165565b6001600160a01b0391821660009081526002602090815260408083209390941682529190915220546001600160601b031690565b61024b7fe48329057bfd03d55e49b547132e39cffd9c1820ad7b9d4c5307691425d15adf81565b61051f6104e9366004612198565b600560209081526000928352604080842090915290825290205463ffffffff81169064010000000090046001600160601b031682565b6040805163ffffffff90931683526001600160601b039091166020830152016101eb565b6102e7610551366004612077565b6113ba565b600080600019830361057057506001600160601b03610595565b610592836040518060600160405280602581526020016124f6602591396114b0565b90505b3360008181526002602090815260408083206001600160a01b0389168085529083529281902080546bffffffffffffffffffffffff19166001600160601b03871690811790915590519081529192917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a360019150505b92915050565b6001600160a01b03831660009081526002602090815260408083203380855290835281842054825160608101909352602580845291936001600160601b0390911692859261067392889291906124f6908301396114b0565b9050866001600160a01b0316836001600160a01b0316141580156106a057506001600160601b0382811614155b1561074d5760006106ca83836040518060600160405280603d81526020016122c8603d91396114e8565b6001600160a01b038981166000818152600260209081526040808320948a168084529482529182902080546bffffffffffffffffffffffff19166001600160601b0387169081179091559151918252939450919290917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505b610758878783611532565b5060019695505050505050565b6001546001600160a01b031633146107d05760405162461bcd60e51b8152602060048201526024808201527f486966693a3a6d696e743a206f6e6c7920746865206d696e7465722063616e206044820152631b5a5b9d60e21b60648201526084015b60405180910390fd5b60006107f4826040518060600160405280602581526020016123b9602591396114b0565b90506108008382611788565b505050565b600061082982604051806060016040528060258152602001612404602591396114b0565b90506108353382611935565b5050565b6108433382611ae1565b50565b60004382106108bd5760405162461bcd60e51b815260206004820152602760248201527f486966693a3a6765745072696f72566f7465733a206e6f74207965742064657460448201527f65726d696e65640000000000000000000000000000000000000000000000000060648201526084016107c7565b6001600160a01b03831660009081526006602052604081205463ffffffff16908190036108ee576000915050610615565b6001600160a01b038416600090815260056020526040812084916109136001856121ee565b63ffffffff90811682526020820192909252604001600020541611610987576001600160a01b0384166000908152600560205260408120906109566001846121ee565b63ffffffff16815260208101919091526040016000205464010000000090046001600160601b031691506106159050565b6001600160a01b038416600090815260056020908152604080832083805290915290205463ffffffff168310156109c2576000915050610615565b6000806109d06001846121ee565b90505b8163ffffffff168163ffffffff161115610aa357600060026109f584846121ee565b6109ff9190612213565b610a0990836121ee565b6001600160a01b038816600090815260056020908152604080832063ffffffff8581168552908352928190208151808301909252549283168082526401000000009093046001600160601b031691810191909152919250879003610a77576020015194506106159350505050565b805163ffffffff16871115610a8e57819350610a9c565b610a996001836121ee565b92505b50506109d3565b506001600160a01b038516600090815260056020908152604080832063ffffffff909416835292905220546001600160601b036401000000009091041691505092915050565b6000610b0d8260405180606001604052806029815260200161256a602991396114b0565b6001600160a01b038416600090815260026020908152604080832033845282528083205481516060810190925260288083529495509293610b62936001600160601b03169286929190612483908301396114e8565b6001600160a01b0385166000818152600260209081526040808320338085529083529281902080546bffffffffffffffffffffffff19166001600160601b038716908117909155905190815293945090927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3610be88483611935565b50505050565b600080610c13836040518060600160405280602681526020016123de602691396114b0565b9050610c20338583611532565b5060019392505050565b6001600160a01b03811660009081526006602052604081205463ffffffff1680610c55576000610ca2565b6001600160a01b038316600090815260056020526040812090610c796001846121ee565b63ffffffff16815260208101919091526040016000205464010000000090046001600160601b03165b9392505050565b604080518082018252600c81526b486966692046696e616e636560a01b60209182015281517f8cad95687ba82c2ce50e74f7b754645e5117c3a5bec8151c0726d5857980a866818301527f637d65daa3c37e1b3d5637d73b47c451abb3fcc22decd1a9ecc244eecd2ebdcc81840152466060820152306080808301919091528351808303909101815260a0820184528051908301207fe48329057bfd03d55e49b547132e39cffd9c1820ad7b9d4c5307691425d15adf60c08301526001600160a01b038a1660e083015261010082018990526101208083018990528451808403909101815261014083019094528351939092019290922061190160f01b6101608401526101628301829052610182830181905290916000906101a20160408051601f198184030181528282528051602091820120600080855291840180845281905260ff8a169284019290925260608301889052608083018790529092509060019060a0016020604051602081039080840390855afa158015610e30573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116610eb95760405162461bcd60e51b815260206004820152602660248201527f486966693a3a64656c656761746542795369673a20696e76616c69642073696760448201527f6e6174757265000000000000000000000000000000000000000000000000000060648201526084016107c7565b6001600160a01b0381166000908152600760205260408120805491610edd83612244565b919050558914610f3a5760405162461bcd60e51b815260206004820152602260248201527f486966693a3a64656c656761746542795369673a20696e76616c6964206e6f6e604482015261636560f01b60648201526084016107c7565b87421115610fb05760405162461bcd60e51b815260206004820152602660248201527f486966693a3a64656c656761746542795369673a207369676e6174757265206560448201527f787069726564000000000000000000000000000000000000000000000000000060648201526084016107c7565b610fba818b611ae1565b505050505b505050505050565b60006000198603610fe057506001600160601b03611005565b611002866040518060600160405280602481526020016124ab602491396114b0565b90505b604080518082018252600c81526b486966692046696e616e636560a01b60209182015281517f8cad95687ba82c2ce50e74f7b754645e5117c3a5bec8151c0726d5857980a866818301527f637d65daa3c37e1b3d5637d73b47c451abb3fcc22decd1a9ecc244eecd2ebdcc81840152466060820152306080808301919091528351808303909101815260a090910183528051908201206001600160a01b038b166000908152600790925291812080547f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9918c918c918c9190866110e783612244565b909155506040805160208101969096526001600160a01b0394851690860152929091166060840152608083015260a082015260c0810188905260e0016040516020818303038152906040528051906020012090506000828260405160200161116692919061190160f01b81526002810192909252602282015260420190565b60408051601f198184030181528282528051602091820120600080855291840180845281905260ff8b169284019290925260608301899052608083018890529092509060019060a0016020604051602081039080840390855afa1580156111d1573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b0381166112345760405162461bcd60e51b815260206004820152601f60248201527f486966693a3a7065726d69743a20696e76616c6964207369676e61747572650060448201526064016107c7565b8b6001600160a01b0316816001600160a01b0316146112955760405162461bcd60e51b815260206004820152601a60248201527f486966693a3a7065726d69743a20756e617574686f72697a656400000000000060448201526064016107c7565b884211156112e55760405162461bcd60e51b815260206004820152601f60248201527f486966693a3a7065726d69743a207369676e617475726520657870697265640060448201526064016107c7565b84600260008e6001600160a01b03166001600160a01b0316815260200190815260200160002060008d6001600160a01b03166001600160a01b0316815260200190815260200160002060006101000a8154816001600160601b0302191690836001600160601b031602179055508a6001600160a01b03168c6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925876040516113a491906001600160601b0391909116815260200190565b60405180910390a3505050505050505050505050565b6001546001600160a01b0316331461143a5760405162461bcd60e51b815260206004820152603e60248201527f486966693a3a7365744d696e7465723a206f6e6c7920746865206d696e74657260448201527f2063616e206368616e676520746865206d696e7465722061646472657373000060648201526084016107c7565b600154604080516001600160a01b03928316815291831660208301527f3b0007eb941cf645526cbb3a4fdaecda9d28ce4843167d9263b536a1f1edc0f6910160405180910390a16001805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0392909216919091179055565b6000816c0100000000000000000000000084106114e05760405162461bcd60e51b81526004016107c79190611f87565b509192915050565b6000836001600160601b0316836001600160601b03161115829061151f5760405162461bcd60e51b81526004016107c79190611f87565b5061152a838561225d565b949350505050565b6001600160a01b0383166115ae5760405162461bcd60e51b815260206004820152603c60248201527f486966693a3a5f7472616e73666572546f6b656e733a2063616e6e6f7420747260448201527f616e736665722066726f6d20746865207a65726f20616464726573730000000060648201526084016107c7565b6001600160a01b03821661162a5760405162461bcd60e51b815260206004820152603a60248201527f486966693a3a5f7472616e73666572546f6b656e733a2063616e6e6f7420747260448201527f616e7366657220746f20746865207a65726f206164647265737300000000000060648201526084016107c7565b6001600160a01b038316600090815260036020908152604091829020548251606081019093526036808452611675936001600160601b039092169285929190612383908301396114e8565b6001600160a01b03848116600090815260036020908152604080832080546bffffffffffffffffffffffff19166001600160601b039687161790559286168252908290205482516060810190935260308084526116e2949190911692859290919061230590830139611b72565b6001600160a01b0383811660008181526003602090815260409182902080546bffffffffffffffffffffffff19166001600160601b03968716179055905193851684529092918616917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a36001600160a01b0380841660009081526004602052604080822054858416835291205461080092918216911683611bbf565b6001600160a01b0382166118045760405162461bcd60e51b815260206004820152602560248201527f486966693a3a5f6d696e743a206d696e7420746f20746865207a65726f20616460448201527f647265737300000000000000000000000000000000000000000000000000000060648201526084016107c7565b600061182a60005460405180606001604052806027815260200161235c602791396114b0565b905061184f818360405180606001604052806027815260200161233560279139611b72565b6001600160601b0390811660009081556001600160a01b0385168152600360209081526040918290205482516060810190935260268084526118a1949190911692869290919061242990830139611b72565b6001600160a01b038416600081815260036020908152604080832080546bffffffffffffffffffffffff19166001600160601b03968716179055519386168452919290917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a36001600160a01b03808416600090815260046020526040812054610800921684611bbf565b6001600160a01b0382166119b15760405162461bcd60e51b815260206004820152602760248201527f486966693a3a5f6275726e3a206275726e2066726f6d20746865207a65726f2060448201527f616464726573730000000000000000000000000000000000000000000000000060648201526084016107c7565b60006119d76000546040518060600160405280602781526020016124cf602791396114b0565b90506119fc8183604051806060016040528060278152602001612543602791396114e8565b6001600160601b0390811660009081556001600160a01b038516815260036020908152604091829020548251606081019093526026808452611a4e9491909116928692909190612593908301396114e8565b6001600160a01b038416600081815260036020908152604080832080546bffffffffffffffffffffffff19166001600160601b0396871617905551938616845290927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a36001600160a01b0380841660009081526004602052604081205461080092169084611bbf565b6001600160a01b038083166000818152600460208181526040808420805460038452828620549490935287871673ffffffffffffffffffffffffffffffffffffffff1984168117909155905191909516946001600160601b039092169391928592917f3134e8a2e6d97e929a7e54011ea5485d7d196dd5f0ba4d4ef95803e8e3fc257f9190a4610be8828483611bbf565b600080611b7f848661227d565b9050846001600160601b0316816001600160601b031610158390611bb65760405162461bcd60e51b81526004016107c79190611f87565b50949350505050565b816001600160a01b0316836001600160a01b031614158015611bea57506000816001600160601b0316115b15610800576001600160a01b03831615611cb0576001600160a01b03831660009081526006602052604081205463ffffffff169081611c2a576000611c77565b6001600160a01b038516600090815260056020526040812090611c4e6001856121ee565b63ffffffff16815260208101919091526040016000205464010000000090046001600160601b03165b90506000611c9e828560405180606001604052806028815260200161251b602891396114e8565b9050611cac86848484611d69565b5050505b6001600160a01b03821615610800576001600160a01b03821660009081526006602052604081205463ffffffff169081611ceb576000611d38565b6001600160a01b038416600090815260056020526040812090611d0f6001856121ee565b63ffffffff16815260208101919091526040016000205464010000000090046001600160601b03165b90506000611d5f82856040518060600160405280602781526020016125b960279139611b72565b9050610fbf858484845b6000611d8d4360405180606001604052806034815260200161244f60349139611f63565b905060008463ffffffff16118015611de757506001600160a01b038516600090815260056020526040812063ffffffff831691611dcb6001886121ee565b63ffffffff908116825260208201929092526040016000205416145b15611e5c576001600160a01b03851660009081526005602052604081208391611e116001886121ee565b63ffffffff168152602081019190915260400160002080546001600160601b0392909216640100000000026fffffffffffffffffffffffff0000000019909216919091179055611f0e565b60408051808201825263ffffffff80841682526001600160601b0380861660208085019182526001600160a01b038b166000908152600582528681208b8616825290915294909420925183549451909116640100000000026fffffffffffffffffffffffffffffffff19909416911617919091179055611edd8460016122a8565b6001600160a01b0386166000908152600660205260409020805463ffffffff191663ffffffff929092169190911790555b604080516001600160601b038086168252841660208201526001600160a01b038716917fdec2bacdd2f05b59de34da9b523dff8be42e5e38e818c82fdb0bae774387a724910160405180910390a25050505050565b60008164010000000084106114e05760405162461bcd60e51b81526004016107c791905b600060208083528351808285015260005b81811015611fb457858101830151858201604001528201611f98565b81811115611fc6576000604083870101525b50601f01601f1916929092016040019392505050565b80356001600160a01b0381168114611ff357600080fd5b919050565b6000806040838503121561200b57600080fd5b61201483611fdc565b946020939093013593505050565b60008060006060848603121561203757600080fd5b61204084611fdc565b925061204e60208501611fdc565b9150604084013590509250925092565b60006020828403121561207057600080fd5b5035919050565b60006020828403121561208957600080fd5b610ca282611fdc565b803560ff81168114611ff357600080fd5b60008060008060008060c087890312156120bc57600080fd5b6120c587611fdc565b955060208701359450604087013593506120e160608801612092565b92506080870135915060a087013590509295509295509295565b600080600080600080600060e0888a03121561211657600080fd5b61211f88611fdc565b965061212d60208901611fdc565b9550604088013594506060880135935061214960808901612092565b925060a0880135915060c0880135905092959891949750929550565b6000806040838503121561217857600080fd5b61218183611fdc565b915061218f60208401611fdc565b90509250929050565b600080604083850312156121ab57600080fd5b6121b483611fdc565b9150602083013563ffffffff811681146121cd57600080fd5b809150509250929050565b634e487b7160e01b600052601160045260246000fd5b600063ffffffff8381169083168181101561220b5761220b6121d8565b039392505050565b600063ffffffff8084168061223857634e487b7160e01b600052601260045260246000fd5b92169190910492915050565b600060018201612256576122566121d8565b5060010190565b60006001600160601b038381169083168181101561220b5761220b6121d8565b60006001600160601b0380831681851680830382111561229f5761229f6121d8565b01949350505050565b600063ffffffff80831681851680830382111561229f5761229f6121d856fe486966693a3a7472616e7366657246726f6d3a207472616e7366657220616d6f756e742065786365656473207370656e64657220616c6c6f77616e6365486966693a3a5f7472616e73666572546f6b656e733a207472616e7366657220616d6f756e74206f766572666c6f7773486966693a3a5f6d696e743a20616d6f756e74206578636565647320746f74616c537570706c79486966693a3a5f6d696e743a206f6c6420737570706c7920657863656564732039362062697473486966693a3a5f7472616e73666572546f6b656e733a207472616e7366657220616d6f756e7420657863656564732062616c616e6365486966693a3a6d696e743a20726177416d6f756e7420657863656564732039362062697473486966693a3a7472616e736665723a20616d6f756e7420657863656564732039362062697473486966693a3a6275726e3a20726177416d6f756e7420657863656564732039362062697473486966693a3a5f6d696e743a207472616e7366657220616d6f756e74206f766572666c6f7773486966693a3a5f7772697465436865636b706f696e743a20626c6f636b206e756d62657220657863656564732033322062697473486966693a3a6275726e46726f6d3a20616d6f756e74206578636565647320616c6c6f77616e6365486966693a3a7065726d69743a20616d6f756e7420657863656564732039362062697473486966693a3a5f6275726e3a206f6c6420737570706c7920657863656564732039362062697473486966693a3a617070726f76653a20616d6f756e7420657863656564732039362062697473486966693a3a5f6d6f7665566f7465733a20766f746520616d6f756e7420756e646572666c6f7773486966693a3a5f6275726e3a20616d6f756e74206578636565647320746f74616c537570706c79486966693a3a6275726e46726f6d3a20726177416d6f756e7420657863656564732039362062697473486966693a3a5f6275726e3a207472616e7366657220616d6f756e74206f766572666c6f7773486966693a3a5f6d6f7665566f7465733a20766f746520616d6f756e74206f766572666c6f7773a164736f6c634300080f000a";

type HifiConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: HifiConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Hifi__factory extends ContractFactory {
  constructor(...args: HifiConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    account: PromiseOrValue<string>,
    minter_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Hifi> {
    return super.deploy(account, minter_, overrides || {}) as Promise<Hifi>;
  }
  override getDeployTransaction(
    account: PromiseOrValue<string>,
    minter_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(account, minter_, overrides || {});
  }
  override attach(address: string): Hifi {
    return super.attach(address) as Hifi;
  }
  override connect(signer: Signer): Hifi__factory {
    return super.connect(signer) as Hifi__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): HifiInterface {
    return new utils.Interface(_abi) as HifiInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Hifi {
    return new Contract(address, _abi, signerOrProvider) as Hifi;
  }
}