/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type { PromiseOrValue } from "../../../common";
import type {
  GodModeTimelock,
  GodModeTimelockInterface,
} from "../../../contracts/test/GodModeTimelock";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "txHash",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "signature",
        type: "string",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "eta",
        type: "uint256",
      },
    ],
    name: "CancelTransaction",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "txHash",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "signature",
        type: "string",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "eta",
        type: "uint256",
      },
    ],
    name: "ExecuteTransaction",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "NewAdmin",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "newDelay",
        type: "uint256",
      },
    ],
    name: "NewDelay",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "newPendingAdmin",
        type: "address",
      },
    ],
    name: "NewPendingAdmin",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "txHash",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "signature",
        type: "string",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "eta",
        type: "uint256",
      },
    ],
    name: "QueueTransaction",
    type: "event",
  },
  {
    inputs: [],
    name: "GRACE_PERIOD",
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
    inputs: [],
    name: "MAXIMUM_DELAY",
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
    inputs: [],
    name: "MINIMUM_DELAY",
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
        name: "pendingAdmin_",
        type: "address",
      },
    ],
    name: "__godMode_setPendingAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "acceptAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "admin",
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
        name: "target",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "signature",
        type: "string",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "eta",
        type: "uint256",
      },
    ],
    name: "cancelTransaction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "delay",
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
        name: "target",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "signature",
        type: "string",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "eta",
        type: "uint256",
      },
    ],
    name: "executeTransaction",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "pendingAdmin",
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
        name: "target",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "signature",
        type: "string",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "eta",
        type: "uint256",
      },
    ],
    name: "queueTransaction",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "queuedTransactions",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "delay_",
        type: "uint256",
      },
    ],
    name: "setDelay",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "pendingAdmin_",
        type: "address",
      },
    ],
    name: "setPendingAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50336202a300610024565b60405180910390fd5b62278d0081111561009d5760405162461bcd60e51b815260206004820152603860248201527f54696d656c6f636b3a3a73657444656c61793a2044656c6179206d757374206e60448201527f6f7420657863656564206d6178696d756d2064656c61792e0000000000000000606482015260840161001b565b600080546001600160a01b0319166001600160a01b039390931692909217909155600255611017806100d06000396000f3fe6080604052600436106100e15760003560e01c80637d645fab1161007f578063e177246e11610059578063e177246e1461022e578063f2b065371461024e578063f851a4401461028e578063fcf5ad16146102ae57600080fd5b80637d645fab146101e9578063b1b43ae514610200578063c1a287e21461021757600080fd5b80633a66f901116100bb5780633a66f901146101655780634dd18bf514610193578063591fcdfe146101b35780636a42b8f8146101d357600080fd5b80630825f38f146100ed5780630e18b68114610116578063267822471461012d57600080fd5b366100e857005b600080fd5b6101006100fb366004610d9a565b6102f8565b60405161010d9190610ea7565b60405180910390f35b34801561012257600080fd5b5061012b6106d4565b005b34801561013957600080fd5b5060015461014d906001600160a01b031681565b6040516001600160a01b03909116815260200161010d565b34801561017157600080fd5b50610185610180366004610d9a565b6107aa565b60405190815260200161010d565b34801561019f57600080fd5b5061012b6101ae366004610ec1565b610972565b3480156101bf57600080fd5b5061012b6101ce366004610d9a565b610a3e565b3480156101df57600080fd5b5061018560025481565b3480156101f557600080fd5b5061018562278d0081565b34801561020c57600080fd5b506101856202a30081565b34801561022357600080fd5b506101856212750081565b34801561023a57600080fd5b5061012b610249366004610edc565b610b58565b34801561025a57600080fd5b5061027e610269366004610edc565b60036020526000908152604090205460ff1681565b604051901515815260200161010d565b34801561029a57600080fd5b5060005461014d906001600160a01b031681565b3480156102ba57600080fd5b5061012b6102c9366004610ec1565b6001805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0392909216919091179055565b6000546060906001600160a01b031633146103805760405162461bcd60e51b815260206004820152603860248201527f54696d656c6f636b3a3a657865637574655472616e73616374696f6e3a20436160448201527f6c6c206d75737420636f6d652066726f6d2061646d696e2e000000000000000060648201526084015b60405180910390fd5b6000868686868660405160200161039b959493929190610ef5565b60408051601f1981840301815291815281516020928301206000818152600390935291205490915060ff166104385760405162461bcd60e51b815260206004820152603d60248201527f54696d656c6f636b3a3a657865637574655472616e73616374696f6e3a20547260448201527f616e73616374696f6e206861736e2774206265656e207175657565642e0000006064820152608401610377565b824210156104d45760405162461bcd60e51b815260206004820152604560248201527f54696d656c6f636b3a3a657865637574655472616e73616374696f6e3a20547260448201527f616e73616374696f6e206861736e2774207375727061737365642074696d652060648201527f6c6f636b2e000000000000000000000000000000000000000000000000000000608482015260a401610377565b6104e16212750084610f42565b4211156105565760405162461bcd60e51b815260206004820152603360248201527f54696d656c6f636b3a3a657865637574655472616e73616374696f6e3a20547260448201527f616e73616374696f6e206973207374616c652e000000000000000000000000006064820152608401610377565b6000818152600360205260408120805460ff1916905585516060910361057d5750836105a9565b858051906020012085604051602001610597929190610f68565b60405160208183030381529060405290505b600080896001600160a01b031689846040516105c59190610fb1565b60006040518083038185875af1925050503d8060008114610602576040519150601f19603f3d011682016040523d82523d6000602084013e610607565b606091505b50915091508161067f5760405162461bcd60e51b815260206004820152603d60248201527f54696d656c6f636b3a3a657865637574655472616e73616374696f6e3a20547260448201527f616e73616374696f6e20657865637574696f6e2072657665727465642e0000006064820152608401610377565b896001600160a01b0316847fa560e3198060a2f10670c1ec5b403077ea6ae93ca8de1c32b451dc1a943cd6e78b8b8b8b6040516106bf9493929190610fcd565b60405180910390a39998505050505050505050565b6001546001600160a01b031633146107545760405162461bcd60e51b815260206004820152603860248201527f54696d656c6f636b3a3a61636365707441646d696e3a2043616c6c206d75737460448201527f20636f6d652066726f6d2070656e64696e6741646d696e2e00000000000000006064820152608401610377565b600080543373ffffffffffffffffffffffffffffffffffffffff19918216811783556001805490921690915560405190917f71614071b88dee5e0b2ae578a9dd7b2ebbe9ae832ba419dc0242cd065a290b6c91a2565b600080546001600160a01b0316331461082b5760405162461bcd60e51b815260206004820152603660248201527f54696d656c6f636b3a3a71756575655472616e73616374696f6e3a2043616c6c60448201527f206d75737420636f6d652066726f6d2061646d696e2e000000000000000000006064820152608401610377565b6002546108389042610f42565b8210156108d35760405162461bcd60e51b815260206004820152604960248201527f54696d656c6f636b3a3a71756575655472616e73616374696f6e3a204573746960448201527f6d6174656420657865637574696f6e20626c6f636b206d75737420736174697360648201527f66792064656c61792e0000000000000000000000000000000000000000000000608482015260a401610377565b600086868686866040516020016108ee959493929190610ef5565b60408051601f19818403018152828252805160209182012060008181526003909252919020805460ff1916600117905591506001600160a01b0388169082907f76e2796dc3a81d57b0e8504b647febcbeeb5f4af818e164f11eef8131a6a763f90610960908a908a908a908a90610fcd565b60405180910390a39695505050505050565b3330146109e75760405162461bcd60e51b815260206004820152603860248201527f54696d656c6f636b3a3a73657450656e64696e6741646d696e3a2043616c6c2060448201527f6d75737420636f6d652066726f6d2054696d656c6f636b2e00000000000000006064820152608401610377565b6001805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0383169081179091556040517f69d78e38a01985fbb1462961809b4b2d65531bc93b2b94037f3334b82ca4a75690600090a250565b6000546001600160a01b03163314610abe5760405162461bcd60e51b815260206004820152603760248201527f54696d656c6f636b3a3a63616e63656c5472616e73616374696f6e3a2043616c60448201527f6c206d75737420636f6d652066726f6d2061646d696e2e0000000000000000006064820152608401610377565b60008585858585604051602001610ad9959493929190610ef5565b60408051601f19818403018152828252805160209182012060008181526003909252919020805460ff1916905591506001600160a01b0387169082907f2fffc091a501fd91bfbff27141450d3acb40fb8e6d8382b243ec7a812a3aaf8790610b48908990899089908990610fcd565b60405180910390a3505050505050565b333014610bcd5760405162461bcd60e51b815260206004820152603160248201527f54696d656c6f636b3a3a73657444656c61793a2043616c6c206d75737420636f60448201527f6d652066726f6d2054696d656c6f636b2e0000000000000000000000000000006064820152608401610377565b6202a300811015610c465760405162461bcd60e51b815260206004820152603460248201527f54696d656c6f636b3a3a73657444656c61793a2044656c6179206d757374206560448201527f7863656564206d696e696d756d2064656c61792e0000000000000000000000006064820152608401610377565b62278d00811115610cbf5760405162461bcd60e51b815260206004820152603860248201527f54696d656c6f636b3a3a73657444656c61793a2044656c6179206d757374206e60448201527f6f7420657863656564206d6178696d756d2064656c61792e00000000000000006064820152608401610377565b600281905560405181907f948b1f6a42ee138b7e34058ba85a37f716d55ff25ff05a763f15bed6a04c8d2c90600090a250565b80356001600160a01b0381168114610d0957600080fd5b919050565b634e487b7160e01b600052604160045260246000fd5b600067ffffffffffffffff80841115610d3f57610d3f610d0e565b604051601f8501601f19908116603f01168101908282118183101715610d6757610d67610d0e565b81604052809350858152868686011115610d8057600080fd5b858560208301376000602087830101525050509392505050565b600080600080600060a08688031215610db257600080fd5b610dbb86610cf2565b945060208601359350604086013567ffffffffffffffff80821115610ddf57600080fd5b818801915088601f830112610df357600080fd5b610e0289833560208501610d24565b94506060880135915080821115610e1857600080fd5b508601601f81018813610e2a57600080fd5b610e3988823560208401610d24565b95989497509295608001359392505050565b60005b83811015610e66578181015183820152602001610e4e565b83811115610e75576000848401525b50505050565b60008151808452610e93816020860160208601610e4b565b601f01601f19169290920160200192915050565b602081526000610eba6020830184610e7b565b9392505050565b600060208284031215610ed357600080fd5b610eba82610cf2565b600060208284031215610eee57600080fd5b5035919050565b6001600160a01b038616815284602082015260a060408201526000610f1d60a0830186610e7b565b8281036060840152610f2f8186610e7b565b9150508260808301529695505050505050565b60008219821115610f6357634e487b7160e01b600052601160045260246000fd5b500190565b7fffffffff00000000000000000000000000000000000000000000000000000000831681528151600090610fa3816004850160208701610e4b565b919091016004019392505050565b60008251610fc3818460208701610e4b565b9190910192915050565b848152608060208201526000610fe66080830186610e7b565b8281036040840152610ff88186610e7b565b9150508260608301529594505050505056fea164736f6c634300080f000a";

type GodModeTimelockConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: GodModeTimelockConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class GodModeTimelock__factory extends ContractFactory {
  constructor(...args: GodModeTimelockConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<GodModeTimelock> {
    return super.deploy(overrides || {}) as Promise<GodModeTimelock>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): GodModeTimelock {
    return super.attach(address) as GodModeTimelock;
  }
  override connect(signer: Signer): GodModeTimelock__factory {
    return super.connect(signer) as GodModeTimelock__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): GodModeTimelockInterface {
    return new utils.Interface(_abi) as GodModeTimelockInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): GodModeTimelock {
    return new Contract(address, _abi, signerOrProvider) as GodModeTimelock;
  }
}
