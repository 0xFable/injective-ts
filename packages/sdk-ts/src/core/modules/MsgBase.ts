import snakecaseKeys from 'snakecase-keys'
import {
  mapValuesToProperValueType,
  objectKeysToEip712Types,
  TypedDataField,
} from './tx/eip712'
import { prepareSignBytes } from './utils'

/**
 * @category Messages
 */
export abstract class MsgBase<
  Params,
  DataRepresentation,
  ProtoRepresentation,
  AminoRepresentation,
  DirectSignRepresentation,
> {
  params: Params

  constructor(params: Params) {
    this.params = params
  }

  public abstract toDirectSign(): DirectSignRepresentation

  public abstract toData(): DataRepresentation

  public abstract toProto(): ProtoRepresentation

  public abstract toAmino(): AminoRepresentation

  public abstract toBinary(): Uint8Array

  public abstract toWeb3(): Omit<AminoRepresentation, 'type'> & {
    '@type': string
  }

  public toJSON(): string {
    return JSON.stringify(prepareSignBytes(this.toData()))
  }

  /**
   * Returns the types of the message for EIP712
   */
  public toEip712Types(): Map<string, TypedDataField[]> {
    const amino = this.toAmino() as { type: string }

    return objectKeysToEip712Types({
      object: amino as Record<string, any>,
      messageType: amino.type,
    })
  }

  /**
   * Returns the values of the message for EIP712
   */
  public toEip712(): {
    type: string
    value: Omit<AminoRepresentation, 'type'>
  } {
    const amino = this.toAmino()
    const { type, ...rest } = amino as { type: string } & Record<string, any>
    const value = snakecaseKeys(rest) as Omit<AminoRepresentation, 'type'>

    return {
      type,
      value: mapValuesToProperValueType(value, type),
    }
  }

  public toDirectSignJSON(): string {
    return JSON.stringify(prepareSignBytes(this.toDirectSign()))
  }
}
