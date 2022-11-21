/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";

export interface GovernorBravoDelegatorInterface extends utils.Interface {
  functions: {
    "_setImplementation(address)": FunctionFragment;
    "admin()": FunctionFragment;
    "implementation()": FunctionFragment;
    "pendingAdmin()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "_setImplementation"
      | "admin"
      | "implementation"
      | "pendingAdmin"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "_setImplementation",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "admin", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "implementation",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "pendingAdmin",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "_setImplementation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "admin", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "implementation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "pendingAdmin",
    data: BytesLike
  ): Result;

  events: {
    "MaxProposalThresholdBpSet(uint256,uint256)": EventFragment;
    "MinProposalThresholdBpSet(uint256,uint256)": EventFragment;
    "NewAdmin(address,address)": EventFragment;
    "NewImplementation(address,address)": EventFragment;
    "NewPendingAdmin(address,address)": EventFragment;
    "ProposalCanceled(uint256)": EventFragment;
    "ProposalCreated(uint256,address,address[],uint256[],string[],bytes[],uint256,uint256,string)": EventFragment;
    "ProposalExecuted(uint256)": EventFragment;
    "ProposalQueued(uint256,uint256)": EventFragment;
    "ProposalThresholdBpSet(uint256,uint256)": EventFragment;
    "QuorumVotesBpSet(uint256,uint256)": EventFragment;
    "VoteCast(address,uint256,uint8,uint256,string)": EventFragment;
    "VotingDelaySet(uint256,uint256)": EventFragment;
    "VotingPeriodSet(uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "MaxProposalThresholdBpSet"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "MinProposalThresholdBpSet"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewAdmin"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewImplementation"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewPendingAdmin"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ProposalCanceled"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ProposalCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ProposalExecuted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ProposalQueued"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ProposalThresholdBpSet"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "QuorumVotesBpSet"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "VoteCast"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "VotingDelaySet"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "VotingPeriodSet"): EventFragment;
}

export interface MaxProposalThresholdBpSetEventObject {
  oldMaxProposalThresholdBp: BigNumber;
  newMaxProposalThresholdBp: BigNumber;
}
export type MaxProposalThresholdBpSetEvent = TypedEvent<
  [BigNumber, BigNumber],
  MaxProposalThresholdBpSetEventObject
>;

export type MaxProposalThresholdBpSetEventFilter =
  TypedEventFilter<MaxProposalThresholdBpSetEvent>;

export interface MinProposalThresholdBpSetEventObject {
  oldMinProposalThresholdBp: BigNumber;
  newMinProposalThresholdBp: BigNumber;
}
export type MinProposalThresholdBpSetEvent = TypedEvent<
  [BigNumber, BigNumber],
  MinProposalThresholdBpSetEventObject
>;

export type MinProposalThresholdBpSetEventFilter =
  TypedEventFilter<MinProposalThresholdBpSetEvent>;

export interface NewAdminEventObject {
  oldAdmin: string;
  newAdmin: string;
}
export type NewAdminEvent = TypedEvent<[string, string], NewAdminEventObject>;

export type NewAdminEventFilter = TypedEventFilter<NewAdminEvent>;

export interface NewImplementationEventObject {
  oldImplementation: string;
  newImplementation: string;
}
export type NewImplementationEvent = TypedEvent<
  [string, string],
  NewImplementationEventObject
>;

export type NewImplementationEventFilter =
  TypedEventFilter<NewImplementationEvent>;

export interface NewPendingAdminEventObject {
  oldPendingAdmin: string;
  newPendingAdmin: string;
}
export type NewPendingAdminEvent = TypedEvent<
  [string, string],
  NewPendingAdminEventObject
>;

export type NewPendingAdminEventFilter = TypedEventFilter<NewPendingAdminEvent>;

export interface ProposalCanceledEventObject {
  id: BigNumber;
}
export type ProposalCanceledEvent = TypedEvent<
  [BigNumber],
  ProposalCanceledEventObject
>;

export type ProposalCanceledEventFilter =
  TypedEventFilter<ProposalCanceledEvent>;

export interface ProposalCreatedEventObject {
  id: BigNumber;
  proposer: string;
  targets: string[];
  values: BigNumber[];
  signatures: string[];
  calldatas: string[];
  startBlock: BigNumber;
  endBlock: BigNumber;
  description: string;
}
export type ProposalCreatedEvent = TypedEvent<
  [
    BigNumber,
    string,
    string[],
    BigNumber[],
    string[],
    string[],
    BigNumber,
    BigNumber,
    string
  ],
  ProposalCreatedEventObject
>;

export type ProposalCreatedEventFilter = TypedEventFilter<ProposalCreatedEvent>;

export interface ProposalExecutedEventObject {
  id: BigNumber;
}
export type ProposalExecutedEvent = TypedEvent<
  [BigNumber],
  ProposalExecutedEventObject
>;

export type ProposalExecutedEventFilter =
  TypedEventFilter<ProposalExecutedEvent>;

export interface ProposalQueuedEventObject {
  id: BigNumber;
  eta: BigNumber;
}
export type ProposalQueuedEvent = TypedEvent<
  [BigNumber, BigNumber],
  ProposalQueuedEventObject
>;

export type ProposalQueuedEventFilter = TypedEventFilter<ProposalQueuedEvent>;

export interface ProposalThresholdBpSetEventObject {
  oldProposalThreshold: BigNumber;
  newProposalThreshold: BigNumber;
}
export type ProposalThresholdBpSetEvent = TypedEvent<
  [BigNumber, BigNumber],
  ProposalThresholdBpSetEventObject
>;

export type ProposalThresholdBpSetEventFilter =
  TypedEventFilter<ProposalThresholdBpSetEvent>;

export interface QuorumVotesBpSetEventObject {
  oldQuorumVotesBp: BigNumber;
  newQuorumVotesBp: BigNumber;
}
export type QuorumVotesBpSetEvent = TypedEvent<
  [BigNumber, BigNumber],
  QuorumVotesBpSetEventObject
>;

export type QuorumVotesBpSetEventFilter =
  TypedEventFilter<QuorumVotesBpSetEvent>;

export interface VoteCastEventObject {
  voter: string;
  proposalId: BigNumber;
  support: number;
  votes: BigNumber;
  reason: string;
}
export type VoteCastEvent = TypedEvent<
  [string, BigNumber, number, BigNumber, string],
  VoteCastEventObject
>;

export type VoteCastEventFilter = TypedEventFilter<VoteCastEvent>;

export interface VotingDelaySetEventObject {
  oldVotingDelay: BigNumber;
  newVotingDelay: BigNumber;
}
export type VotingDelaySetEvent = TypedEvent<
  [BigNumber, BigNumber],
  VotingDelaySetEventObject
>;

export type VotingDelaySetEventFilter = TypedEventFilter<VotingDelaySetEvent>;

export interface VotingPeriodSetEventObject {
  oldVotingPeriod: BigNumber;
  newVotingPeriod: BigNumber;
}
export type VotingPeriodSetEvent = TypedEvent<
  [BigNumber, BigNumber],
  VotingPeriodSetEventObject
>;

export type VotingPeriodSetEventFilter = TypedEventFilter<VotingPeriodSetEvent>;

export interface GovernorBravoDelegator extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: GovernorBravoDelegatorInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    _setImplementation(
      implementation_: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    admin(overrides?: CallOverrides): Promise<[string]>;

    implementation(overrides?: CallOverrides): Promise<[string]>;

    pendingAdmin(overrides?: CallOverrides): Promise<[string]>;
  };

  _setImplementation(
    implementation_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  admin(overrides?: CallOverrides): Promise<string>;

  implementation(overrides?: CallOverrides): Promise<string>;

  pendingAdmin(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    _setImplementation(
      implementation_: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    admin(overrides?: CallOverrides): Promise<string>;

    implementation(overrides?: CallOverrides): Promise<string>;

    pendingAdmin(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "MaxProposalThresholdBpSet(uint256,uint256)"(
      oldMaxProposalThresholdBp?: null,
      newMaxProposalThresholdBp?: null
    ): MaxProposalThresholdBpSetEventFilter;
    MaxProposalThresholdBpSet(
      oldMaxProposalThresholdBp?: null,
      newMaxProposalThresholdBp?: null
    ): MaxProposalThresholdBpSetEventFilter;

    "MinProposalThresholdBpSet(uint256,uint256)"(
      oldMinProposalThresholdBp?: null,
      newMinProposalThresholdBp?: null
    ): MinProposalThresholdBpSetEventFilter;
    MinProposalThresholdBpSet(
      oldMinProposalThresholdBp?: null,
      newMinProposalThresholdBp?: null
    ): MinProposalThresholdBpSetEventFilter;

    "NewAdmin(address,address)"(
      oldAdmin?: null,
      newAdmin?: null
    ): NewAdminEventFilter;
    NewAdmin(oldAdmin?: null, newAdmin?: null): NewAdminEventFilter;

    "NewImplementation(address,address)"(
      oldImplementation?: null,
      newImplementation?: null
    ): NewImplementationEventFilter;
    NewImplementation(
      oldImplementation?: null,
      newImplementation?: null
    ): NewImplementationEventFilter;

    "NewPendingAdmin(address,address)"(
      oldPendingAdmin?: null,
      newPendingAdmin?: null
    ): NewPendingAdminEventFilter;
    NewPendingAdmin(
      oldPendingAdmin?: null,
      newPendingAdmin?: null
    ): NewPendingAdminEventFilter;

    "ProposalCanceled(uint256)"(id?: null): ProposalCanceledEventFilter;
    ProposalCanceled(id?: null): ProposalCanceledEventFilter;

    "ProposalCreated(uint256,address,address[],uint256[],string[],bytes[],uint256,uint256,string)"(
      id?: null,
      proposer?: null,
      targets?: null,
      values?: null,
      signatures?: null,
      calldatas?: null,
      startBlock?: null,
      endBlock?: null,
      description?: null
    ): ProposalCreatedEventFilter;
    ProposalCreated(
      id?: null,
      proposer?: null,
      targets?: null,
      values?: null,
      signatures?: null,
      calldatas?: null,
      startBlock?: null,
      endBlock?: null,
      description?: null
    ): ProposalCreatedEventFilter;

    "ProposalExecuted(uint256)"(id?: null): ProposalExecutedEventFilter;
    ProposalExecuted(id?: null): ProposalExecutedEventFilter;

    "ProposalQueued(uint256,uint256)"(
      id?: null,
      eta?: null
    ): ProposalQueuedEventFilter;
    ProposalQueued(id?: null, eta?: null): ProposalQueuedEventFilter;

    "ProposalThresholdBpSet(uint256,uint256)"(
      oldProposalThreshold?: null,
      newProposalThreshold?: null
    ): ProposalThresholdBpSetEventFilter;
    ProposalThresholdBpSet(
      oldProposalThreshold?: null,
      newProposalThreshold?: null
    ): ProposalThresholdBpSetEventFilter;

    "QuorumVotesBpSet(uint256,uint256)"(
      oldQuorumVotesBp?: null,
      newQuorumVotesBp?: null
    ): QuorumVotesBpSetEventFilter;
    QuorumVotesBpSet(
      oldQuorumVotesBp?: null,
      newQuorumVotesBp?: null
    ): QuorumVotesBpSetEventFilter;

    "VoteCast(address,uint256,uint8,uint256,string)"(
      voter?: PromiseOrValue<string> | null,
      proposalId?: null,
      support?: null,
      votes?: null,
      reason?: null
    ): VoteCastEventFilter;
    VoteCast(
      voter?: PromiseOrValue<string> | null,
      proposalId?: null,
      support?: null,
      votes?: null,
      reason?: null
    ): VoteCastEventFilter;

    "VotingDelaySet(uint256,uint256)"(
      oldVotingDelay?: null,
      newVotingDelay?: null
    ): VotingDelaySetEventFilter;
    VotingDelaySet(
      oldVotingDelay?: null,
      newVotingDelay?: null
    ): VotingDelaySetEventFilter;

    "VotingPeriodSet(uint256,uint256)"(
      oldVotingPeriod?: null,
      newVotingPeriod?: null
    ): VotingPeriodSetEventFilter;
    VotingPeriodSet(
      oldVotingPeriod?: null,
      newVotingPeriod?: null
    ): VotingPeriodSetEventFilter;
  };

  estimateGas: {
    _setImplementation(
      implementation_: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    admin(overrides?: CallOverrides): Promise<BigNumber>;

    implementation(overrides?: CallOverrides): Promise<BigNumber>;

    pendingAdmin(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    _setImplementation(
      implementation_: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    admin(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    implementation(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pendingAdmin(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
