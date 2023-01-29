import { MsgStoreCode as BaseMsgStoreCode } from '@injectivelabs/core-proto-ts/cosmwasm/wasm/v1/tx'
import { toUtf8 } from '../../../../utils'
import { MsgBase } from '../../MsgBase'
import snakeCaseKeys from 'snakecase-keys'

export declare namespace MsgStoreCode {
  export interface Params {
    sender: string
    wasmBytes: Uint8Array | string
  }

  export interface DirectSign {
    type: '/cosmwasm.wasm.v1.MsgStoreCode'
    message: BaseMsgStoreCode
  }

  export interface Data extends BaseMsgStoreCode {
    '@type': '/cosmwasm.wasm.v1.MsgStoreCode'
  }

  export interface Amino extends BaseMsgStoreCode {
    type: 'wasm/MsgStoreCode'
  }

  export interface Web3 extends BaseMsgStoreCode {
    '@type': '/cosmwasm.wasm.v1.MsgStoreCode'
  }

  export type Proto = BaseMsgStoreCode
}

/**
 * @category Messages
 */
export default class MsgStoreCode extends MsgBase<
  MsgStoreCode.Params,
  MsgStoreCode.Data,
  MsgStoreCode.Proto,
  MsgStoreCode.Amino,
  MsgStoreCode.DirectSign
> {
  static fromJSON(params: MsgStoreCode.Params): MsgStoreCode {
    return new MsgStoreCode(params)
  }

  public toProto(): MsgStoreCode.Proto {
    const { params } = this

    const message = BaseMsgStoreCode.create()

    message.sender = params.sender
    message.wasmByteCode =
      typeof params.wasmBytes === 'string'
        ? toUtf8(params.wasmBytes)
        : params.wasmBytes

    return BaseMsgStoreCode.fromPartial(message)
  }

  public toData(): MsgStoreCode.Data {
    const proto = this.toProto()

    return {
      '@type': '/cosmwasm.wasm.v1.MsgStoreCode',
      ...proto,
    }
  }

  public toAmino(): MsgStoreCode.Amino {
    const proto = this.toProto()
    const message = {
      ...snakeCaseKeys(proto),
    }

    const messageWithProperKeys = snakeCaseKeys(message)

    return {
      type: 'wasm/MsgStoreCode',
      ...messageWithProperKeys,
    } as unknown as MsgStoreCode.Amino
  }

  public toWeb3(): MsgStoreCode.Web3 {
    const amino = this.toAmino()
    const { type, ...rest } = amino

    return {
      '@type': '/cosmwasm.wasm.v1.MsgStoreCode',
      ...rest,
    } as unknown as MsgStoreCode.Web3
  }

  public toDirectSign(): MsgStoreCode.DirectSign {
    const proto = this.toProto()

    return {
      type: '/cosmwasm.wasm.v1.MsgStoreCode',
      message: proto,
    }
  }

  public toBinary(): Uint8Array {
    return BaseMsgStoreCode.encode(this.toProto()).finish()
  }
}
