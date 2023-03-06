import { ZERO_ADDRESS } from '@injectivelabs/utils'
import { ChainId } from '@injectivelabs/ts-types'
import { Network } from '@injectivelabs/networks'
import { GeneralException } from '@injectivelabs/exceptions'
import {
  ContractAddressesForChainId,
  ContractAddressesForNetwork,
  ContractAddresses,
} from './types'

export const contractAddresses: ContractAddressesForChainId = {
  '1': {
    peggy: '0xF955C57f9EA9Dc8781965FEaE0b6A2acE2BAD6f3',
    injective: '0xe28b3b32b6c345a34ff64674606124dd5aceca30',
  },
  '3': {
    peggy: ZERO_ADDRESS,
    injective: ZERO_ADDRESS,
  },
  '4': {
    peggy: ZERO_ADDRESS,
    injective: ZERO_ADDRESS,
  },
  '5': {
    peggy: '0x430544ca09F7914077a0E8F405Da62292428F49D',
    injective: '0xBe8d71D26525440A03311cc7fa372262c5354A3c',
  },
  '42': {
    peggy: '0xd6Da9dA014806Fdb64bF39b48fcA386AE3420d21',
    injective: '0x0FA925f53949C1796eb75E3F95B4a863d39b81C6',
  },
  '888': {
    peggy: ZERO_ADDRESS,
    injective: ZERO_ADDRESS,
  },
  '1337': {
    peggy: '0x8d61158a366019aC78Db4149D75FfF9DdA51160D',
    injective: '0x04B5dAdd2c0D6a261bfafBc964E0cAc48585dEF3',
  },
  '31337': {
    peggy: '0x25B8Fe1DE9dAf8BA351890744FF28cf7dFa8f5e3',
    injective: '0x0B1ba0af832d7C05fD64161E0Db78E85978E8082',
  },
}

export const contractAddressesByNetwork: ContractAddressesForNetwork = {
  [Network.Mainnet]: {
    peggy: '0xF955C57f9EA9Dc8781965FEaE0b6A2acE2BAD6f3',
    injective: '0xe28b3b32b6c345a34ff64674606124dd5aceca30',
  },
  [Network.MainnetK8s]: {
    peggy: '0xF955C57f9EA9Dc8781965FEaE0b6A2acE2BAD6f3',
    injective: '0xe28b3b32b6c345a34ff64674606124dd5aceca30',
  },
  [Network.MainnetLB]: {
    peggy: '0xF955C57f9EA9Dc8781965FEaE0b6A2acE2BAD6f3',
    injective: '0xe28b3b32b6c345a34ff64674606124dd5aceca30',
  },
  [Network.Public]: {
    peggy: '0xF955C57f9EA9Dc8781965FEaE0b6A2acE2BAD6f3',
    injective: '0xe28b3b32b6c345a34ff64674606124dd5aceca30',
  },
  [Network.Staging]: {
    peggy: '0xF955C57f9EA9Dc8781965FEaE0b6A2acE2BAD6f3',
    injective: '0xe28b3b32b6c345a34ff64674606124dd5aceca30',
  },
  [Network.Testnet]: {
    peggy: '0xd2C6753F6B1783EF0a3857275e16e79D91b539a3',
    injective: '0xAD1794307245443B3Cb55d88e79EEE4d8a548C03',
  },
  [Network.TestnetK8s]: {
    peggy: '0xd2C6753F6B1783EF0a3857275e16e79D91b539a3',
    injective: '0xAD1794307245443B3Cb55d88e79EEE4d8a548C03',
  },
  [Network.TestnetOld]: {
    peggy: '0xd2C6753F6B1783EF0a3857275e16e79D91b539a3',
    injective: '0xAD1794307245443B3Cb55d88e79EEE4d8a548C03',
  },
  [Network.Devnet]: {
    peggy: '0x430544ca09F7914077a0E8F405Da62292428F49D',
    injective: '0xBe8d71D26525440A03311cc7fa372262c5354A3c',
  },
  [Network.Devnet1]: {
    peggy: '0x0AAd19327a1b90DDE4e2D12FB99Ab8ee7E4E528D',
    injective: '0xBe8d71D26525440A03311cc7fa372262c5354A3c',
  },
  [Network.Devnet2]: {
    peggy: '0x0AAd19327a1b90DDE4e2D12FB99Ab8ee7E4E528D',
    injective: '0xBe8d71D26525440A03311cc7fa372262c5354A3c',
  },
  [Network.Local]: {
    peggy: '0x3c92F7779A7845d5eEf307aEF39066Ddba04A54b',
    injective: '0x3d940951C2cdFc7091cb6064A41053FBFbD016EF',
  },
}

export const getContractAddressesForChainOrThrow = (
  chainId: ChainId,
): ContractAddresses => {
  const chainToAddresses: {
    [chainId: string]: ContractAddresses
  } = contractAddresses

  if (chainToAddresses[chainId] === undefined) {
    throw new GeneralException(new Error(`Unknown chain id (${chainId}).`))
  }

  return { ...chainToAddresses[chainId] }
}

export const getContractAddressesForNetworkOrThrow = (
  network: Network,
): ContractAddresses => {
  const chainToAddresses: {
    [network: string]: ContractAddresses
  } = contractAddressesByNetwork

  if (chainToAddresses[network] === undefined) {
    throw new GeneralException(new Error(`Unknown network (${network}).`))
  }

  return { ...chainToAddresses[network] }
}
