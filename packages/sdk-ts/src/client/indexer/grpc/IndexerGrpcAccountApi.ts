import {
  RewardsRequest,
  RewardsResponse,
  PortfolioRequest,
  PortfolioResponse,
  OrderStatesRequest,
  OrderStatesResponse,
  SubaccountsListRequest,
  SubaccountsListResponse,
  SubaccountHistoryRequest,
  SubaccountHistoryResponse,
  SubaccountBalancesListRequest,
  SubaccountOrderSummaryRequest,
  SubaccountBalancesListResponse,
  SubaccountOrderSummaryResponse,
  SubaccountBalanceEndpointRequest,
  SubaccountBalanceEndpointResponse,
} from '@injectivelabs/indexer-api/injective_accounts_rpc_pb'
import { InjectiveAccountsRPC } from '@injectivelabs/indexer-api/injective_accounts_rpc_pb_service'
import BaseConsumer from '../../BaseGrpcConsumer'
import { PaginationOption } from '../../../types/pagination'
import { IndexerGrpcAccountTransformer } from '../transformers'
import { IndexerModule } from '../types'
import {
  GrpcUnaryRequestException,
  UnspecifiedErrorCode,
} from '@injectivelabs/exceptions'

/**
 * @category Indexer Grpc API
 */
export class IndexerGrpcAccountApi extends BaseConsumer {
  protected module: string = IndexerModule.Account

  /**
   * @deprecated - use IndexerGrpcAccountPortfoliooApi.fetchPortfolio instead
   */
  async fetchPortfolio(address: string) {
    const request = new PortfolioRequest()

    request.setAccountAddress(address)

    try {
      const response = await this.request<
        PortfolioRequest,
        PortfolioResponse,
        typeof InjectiveAccountsRPC.Portfolio
      >(request, InjectiveAccountsRPC.Portfolio)

      return IndexerGrpcAccountTransformer.accountPortfolioResponseToAccountPortfolio(
        response,
      )
    } catch (e: unknown) {
      if (e instanceof GrpcUnaryRequestException) {
        throw e
      }

      throw new GrpcUnaryRequestException(e as Error, {
        code: UnspecifiedErrorCode,
        contextModule: this.module,
      })
    }
  }

  async fetchRewards({ address, epoch }: { address: string; epoch: number }) {
    const request = new RewardsRequest()

    request.setAccountAddress(address)

    if (epoch) {
      request.setEpoch(epoch)
    }

    try {
      const response = await this.request<
        RewardsRequest,
        RewardsResponse,
        typeof InjectiveAccountsRPC.Rewards
      >(request, InjectiveAccountsRPC.Rewards)

      return IndexerGrpcAccountTransformer.tradingRewardsResponseToTradingRewards(
        response,
      )
    } catch (e: unknown) {
      if (e instanceof GrpcUnaryRequestException) {
        throw e
      }

      throw new GrpcUnaryRequestException(e as Error, {
        code: UnspecifiedErrorCode,
        contextModule: this.module,
      })
    }
  }

  async fetchSubaccountsList(address: string) {
    const request = new SubaccountsListRequest()

    request.setAccountAddress(address)

    try {
      const response = await this.request<
        SubaccountsListRequest,
        SubaccountsListResponse,
        typeof InjectiveAccountsRPC.SubaccountsList
      >(request, InjectiveAccountsRPC.SubaccountsList)

      return response.getSubaccountsList()
    } catch (e: unknown) {
      if (e instanceof GrpcUnaryRequestException) {
        throw e
      }

      throw new GrpcUnaryRequestException(e as Error, {
        code: UnspecifiedErrorCode,
        contextModule: this.module,
      })
    }
  }

  async fetchSubaccountBalance(subaccountId: string, denom: string) {
    const request = new SubaccountBalanceEndpointRequest()

    request.setSubaccountId(subaccountId)
    request.setDenom(denom)

    try {
      const response = await this.request<
        SubaccountBalanceEndpointRequest,
        SubaccountBalanceEndpointResponse,
        typeof InjectiveAccountsRPC.SubaccountBalanceEndpoint
      >(request, InjectiveAccountsRPC.SubaccountBalanceEndpoint)

      return IndexerGrpcAccountTransformer.balanceResponseToBalance(response)
    } catch (e: unknown) {
      if (e instanceof GrpcUnaryRequestException) {
        throw e
      }

      throw new GrpcUnaryRequestException(e as Error, {
        code: UnspecifiedErrorCode,
        contextModule: this.module,
      })
    }
  }

  async fetchSubaccountBalancesList(subaccountId: string) {
    const request = new SubaccountBalancesListRequest()

    request.setSubaccountId(subaccountId)

    try {
      const response = await this.request<
        SubaccountBalancesListRequest,
        SubaccountBalancesListResponse,
        typeof InjectiveAccountsRPC.SubaccountBalancesList
      >(request, InjectiveAccountsRPC.SubaccountBalancesList)

      return IndexerGrpcAccountTransformer.balancesResponseToBalances(response)
    } catch (e: unknown) {
      if (e instanceof GrpcUnaryRequestException) {
        throw e
      }

      throw new GrpcUnaryRequestException(e as Error, {
        code: UnspecifiedErrorCode,
        contextModule: this.module,
      })
    }
  }

  async fetchSubaccountHistory({
    subaccountId,
    denom,
    transferTypes = [],
    pagination,
  }: {
    subaccountId: string
    denom?: string
    transferTypes?: string[]
    pagination?: PaginationOption
  }) {
    const request = new SubaccountHistoryRequest()

    request.setSubaccountId(subaccountId)

    if (denom) {
      request.setDenom(denom)
    }

    if (transferTypes.length > 0) {
      request.setTransferTypesList(transferTypes)
    }

    if (pagination) {
      if (pagination.skip !== undefined) {
        request.setSkip(pagination.skip)
      }

      if (pagination.limit !== undefined) {
        request.setLimit(pagination.limit)
      }

      if (pagination.endTime !== undefined) {
        request.setEndTime(pagination.endTime)
      }
    }

    try {
      const response = await this.request<
        SubaccountHistoryRequest,
        SubaccountHistoryResponse,
        typeof InjectiveAccountsRPC.SubaccountHistory
      >(request, InjectiveAccountsRPC.SubaccountHistory)

      return IndexerGrpcAccountTransformer.transferHistoryResponseToTransferHistory(
        response,
      )
    } catch (e: unknown) {
      if (e instanceof GrpcUnaryRequestException) {
        throw e
      }

      throw new GrpcUnaryRequestException(e as Error, {
        code: UnspecifiedErrorCode,
        contextModule: this.module,
      })
    }
  }

  async fetchSubaccountOrderSummary({
    subaccountId,
    marketId,
    orderDirection,
  }: {
    subaccountId: string
    marketId?: string
    orderDirection?: string
  }) {
    const request = new SubaccountOrderSummaryRequest()

    request.setSubaccountId(subaccountId)

    if (marketId) {
      request.setMarketId(marketId)
    }

    if (orderDirection) {
      request.setOrderDirection(orderDirection)
    }

    try {
      const response = await this.request<
        SubaccountOrderSummaryRequest,
        SubaccountOrderSummaryResponse,
        typeof InjectiveAccountsRPC.SubaccountOrderSummary
      >(request, InjectiveAccountsRPC.SubaccountOrderSummary)

      return response.toObject()
    } catch (e: unknown) {
      if (e instanceof GrpcUnaryRequestException) {
        throw e
      }

      throw new GrpcUnaryRequestException(e as Error, {
        code: UnspecifiedErrorCode,
        contextModule: this.module,
      })
    }
  }

  async fetchOrderStates(params?: {
    spotOrderHashes?: string[]
    derivativeOrderHashes?: string[]
  }) {
    const { spotOrderHashes = [], derivativeOrderHashes = [] } = params || {}
    const request = new OrderStatesRequest()

    request.setSpotOrderHashesList(spotOrderHashes)
    request.setDerivativeOrderHashesList(derivativeOrderHashes)

    try {
      const response = await this.request<
        OrderStatesRequest,
        OrderStatesResponse,
        typeof InjectiveAccountsRPC.OrderStates
      >(request, InjectiveAccountsRPC.OrderStates)

      return response.toObject() /* TODO */
    } catch (e: unknown) {
      if (e instanceof GrpcUnaryRequestException) {
        throw e
      }

      throw new GrpcUnaryRequestException(e as Error, {
        code: UnspecifiedErrorCode,
        contextModule: this.module,
      })
    }
  }
}
