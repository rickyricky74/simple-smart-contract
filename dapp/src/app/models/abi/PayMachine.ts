/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "./common";

export interface PayMachineInterface extends utils.Interface {
  functions: {
    "transferEth(address)": FunctionFragment;
    "transferToken(address,address,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "transferEth" | "transferToken"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "transferEth", values: [string]): string;
  encodeFunctionData(
    functionFragment: "transferToken",
    values: [string, string, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "transferEth",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferToken",
    data: BytesLike
  ): Result;

  events: {
    "TransferEth(address,address,uint256)": EventFragment;
    "TransferToken(address,address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "TransferEth"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TransferToken"): EventFragment;
}

export interface TransferEthEventObject {
  sender: string;
  recipient: string;
  amount: BigNumber;
}
export type TransferEthEvent = TypedEvent<
  [string, string, BigNumber],
  TransferEthEventObject
>;

export type TransferEthEventFilter = TypedEventFilter<TransferEthEvent>;

export interface TransferTokenEventObject {
  tokenAddress: string;
  sender: string;
  recipient: string;
  amount: BigNumber;
}
export type TransferTokenEvent = TypedEvent<
  [string, string, string, BigNumber],
  TransferTokenEventObject
>;

export type TransferTokenEventFilter = TypedEventFilter<TransferTokenEvent>;

export interface PayMachine extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: PayMachineInterface;

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
    transferEth(
      _recipient: string,
      overrides?: PayableOverrides & { from?: string }
    ): Promise<ContractTransaction>;

    transferToken(
      _tokenAddress: string,
      _recipient: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;
  };

  transferEth(
    _recipient: string,
    overrides?: PayableOverrides & { from?: string }
  ): Promise<ContractTransaction>;

  transferToken(
    _tokenAddress: string,
    _recipient: string,
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  callStatic: {
    transferEth(_recipient: string, overrides?: CallOverrides): Promise<void>;

    transferToken(
      _tokenAddress: string,
      _recipient: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "TransferEth(address,address,uint256)"(
      sender?: string | null,
      recipient?: string | null,
      amount?: null
    ): TransferEthEventFilter;
    TransferEth(
      sender?: string | null,
      recipient?: string | null,
      amount?: null
    ): TransferEthEventFilter;

    "TransferToken(address,address,address,uint256)"(
      tokenAddress?: string | null,
      sender?: string | null,
      recipient?: string | null,
      amount?: null
    ): TransferTokenEventFilter;
    TransferToken(
      tokenAddress?: string | null,
      sender?: string | null,
      recipient?: string | null,
      amount?: null
    ): TransferTokenEventFilter;
  };

  estimateGas: {
    transferEth(
      _recipient: string,
      overrides?: PayableOverrides & { from?: string }
    ): Promise<BigNumber>;

    transferToken(
      _tokenAddress: string,
      _recipient: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    transferEth(
      _recipient: string,
      overrides?: PayableOverrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    transferToken(
      _tokenAddress: string,
      _recipient: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;
  };
}
