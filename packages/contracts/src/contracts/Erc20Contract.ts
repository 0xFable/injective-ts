import {
  AccountAddress,
  EthereumChainId,
  TransactionOptions,
} from '@injectivelabs/ts-types'
import { UnspecifiedErrorCode, Web3Exception } from '@injectivelabs/exceptions'
import abi from './abi/injective'
import { Contract, ContractFunctionObj, ContractTxFunctionObj } from '../types'
import { getTransactionOptionsAsNonPayableTx } from '../utils'
import BaseContract from '../BaseContract'

export class Erc20Contract extends BaseContract<any> {
  static contractName = 'Erc20'

  constructor({
    ethereumChainId,
    address,
    provider,
  }: {
    ethereumChainId: EthereumChainId
    address: string
    provider: any
  }) {
    super({
      abi: JSON.stringify(abi),
      ethereumChainId,
      address,
      provider,
    })
  }

  getBalanceOf(address: AccountAddress): ContractFunctionObj<string> {
    const { contract } = this

    return {
      async callAsync() {
        return contract.methods.balanceOf(address).call()
      },

      getABIEncodedTransactionData(): string {
        return contract.methods.balanceOf(address).encodeABI()
      },
    }
  }

  getAllowanceOf(
    address: AccountAddress,
    contractAddress: string,
  ): ContractFunctionObj<string> {
    const { contract } = this

    return {
      async callAsync() {
        return contract.methods.allowance(address, contractAddress).call()
      },

      getABIEncodedTransactionData(): string {
        return contract.methods.allowance(address, contractAddress).encodeABI()
      },
    }
  }

  setAllowanceOf({
    contractAddress,
    amount,
    transactionOptions,
  }: {
    contractAddress: string
    amount: string
    transactionOptions: TransactionOptions
  }): ContractTxFunctionObj<string> {
    const { contract } = this

    return {
      callAsync() {
        throw new Web3Exception(
          new Error('You cannot call this contract method as a call'),
          {
            code: UnspecifiedErrorCode,
            contextModule: Contract.Erc20Contract,
          },
        )
      },

      getABIEncodedTransactionData(): string {
        return contract.methods.approve(contractAddress, amount).encodeABI()
      },

      async sendTransactionAsync(): Promise<string> {
        const { transactionHash } = await contract.methods
          .approve(contractAddress, amount)
          .send(getTransactionOptionsAsNonPayableTx(transactionOptions))

        return transactionHash
      },

      async estimateGasAsync(): Promise<number> {
        return contract.methods
          .approve(contractAddress, amount)
          .estimateGas(transactionOptions)
      },
    }
  }

  transfer({
    recipient,
    amount,
    transactionOptions,
  }: {
    recipient: string
    amount: string
    transactionOptions: TransactionOptions
  }): ContractTxFunctionObj<string> {
    const { contract } = this

    return {
      callAsync() {
        throw new Web3Exception(
          new Error('You cannot call this contract method as a call'),
          {
            code: UnspecifiedErrorCode,
            contextModule: Contract.Erc20Contract,
          },
        )
      },

      getABIEncodedTransactionData(): string {
        return contract.methods.transfer(recipient, amount).encodeABI()
      },

      async sendTransactionAsync(): Promise<string> {
        const { transactionHash } = await contract.methods
          .transfer(recipient, amount)
          .send(getTransactionOptionsAsNonPayableTx(transactionOptions))

        return transactionHash
      },

      async estimateGasAsync(): Promise<number> {
        return contract.methods
          .transfer(recipient, amount)
          .estimateGas(transactionOptions)
      },
    }
  }

  getName(): ContractFunctionObj<string> {
    const { contract } = this

    return {
      async callAsync() {
        return contract.methods.name().call()
      },

      getABIEncodedTransactionData(): string {
        return contract.methods.name().encodeABI()
      },
    }
  }

  getDecimals(): ContractFunctionObj<string> {
    const { contract } = this

    return {
      async callAsync() {
        return contract.methods.decimals().call()
      },

      getABIEncodedTransactionData(): string {
        return contract.methods.decimals().encodeABI()
      },
    }
  }

  getSymbol(): ContractFunctionObj<string> {
    const { contract } = this

    return {
      async callAsync() {
        return contract.methods.symbol().call()
      },

      getABIEncodedTransactionData(): string {
        return contract.methods.symbol().encodeABI()
      },
    }
  }
}
