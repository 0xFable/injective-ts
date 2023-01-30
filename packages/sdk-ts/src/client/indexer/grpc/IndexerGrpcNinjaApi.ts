import {
  GetVaultsRequest,
  GetVaultsResponse,
  GetVaultRequest,
  GetVaultResponse,
  LPTokenPriceChartRequest,
  LPTokenPriceChartResponse,
  TVLChartRequest,
  TVLChartResponse,
  VaultsByHolderAddressRequest,
  VaultsByHolderAddressResponse,
  LPHoldersRequest,
  LPHoldersResponse,
  PortfolioRequest,
  PortfolioResponse,
  LeaderboardRequest,
  LeaderboardResponse,
} from '@injectivelabs/ninja-api/goadesign_goagen_ninja_api_pb'
import { NinjaAPI } from '@injectivelabs/ninja-api/goadesign_goagen_ninja_api_pb_service'
import BaseConsumer from '../../BaseGrpcConsumer'
import { IndexerGrpcNinjaTransformer } from '../transformers'
import { IndexerModule } from '../types'
import {
  GrpcUnaryRequestException,
  UnspecifiedErrorCode,
} from '@injectivelabs/exceptions'
import { GrpcWebError } from '@injectivelabs/indexer-proto-ts/injective_explorer_rpc'

/**
 * @category Indexer Grpc API
 */
export class IndexerGrpcNinjaApi extends BaseConsumer {
  protected module: string = IndexerModule.Ninja

  async fetchVault({
    contractAddress,
    slug,
  }: {
    contractAddress?: string
    slug?: string
  }) {
    const request = new GetVaultRequest()

    if (contractAddress) {
      request.setContractAddress(contractAddress)
    }

    if (slug) {
      request.setSlug(slug)
    }

    try {
      const response = await this.request<
        GetVaultRequest,
        GetVaultResponse,
        typeof NinjaAPI.GetVault
      >(request, NinjaAPI.GetVault)

      return response
        .getVaultList()
        .map(IndexerGrpcNinjaTransformer.grpcVaultToVault)
    } catch (e: unknown) {
      if (e instanceof GrpcWebError) {
        throw new GrpcUnaryRequestException(new Error(e.toString()), {
          code: e.code,
          contextModule: this.module,
        })
      }

      throw new GrpcUnaryRequestException(e as Error, {
        code: UnspecifiedErrorCode,
        contextModule: this.module,
      })
    }
  }

  async fetchVaults({
    pageSize,
    pageIndex,
    codeId,
  }: {
    pageSize?: number
    pageIndex?: number
    codeId?: number
  }) {
    const request = new GetVaultsRequest()

    if (pageSize) {
      request.setPageSize(pageSize)
    }

    if (pageIndex) {
      request.setPageIndex(pageIndex)
    }

    if (codeId) {
      request.setCodeId(codeId)
    }

    try {
      const response = await this.request<
        GetVaultsRequest,
        GetVaultsResponse,
        typeof NinjaAPI.GetVaults
      >(request, NinjaAPI.GetVaults)

      const vaultsList = response.getVaultsList()
      const pagination = response.getPagination()

      return {
        vaults: vaultsList.map(IndexerGrpcNinjaTransformer.grpcVaultToVault),
        pagination:
          IndexerGrpcNinjaTransformer.grpcPaginationToPagination(pagination),
      }
    } catch (e: unknown) {
      if (e instanceof GrpcWebError) {
        throw new GrpcUnaryRequestException(new Error(e.toString()), {
          code: e.code,
          contextModule: this.module,
        })
      }

      throw new GrpcUnaryRequestException(e as Error, {
        code: UnspecifiedErrorCode,
        contextModule: this.module,
      })
    }
  }

  async fetchLpTokenPriceChart({
    vaultAddress,
    from,
    to,
  }: {
    vaultAddress: string
    from?: number
    to?: number
  }) {
    const request = new LPTokenPriceChartRequest()

    request.setVaultAddress(vaultAddress)

    if (from) {
      request.setFromTime(from)
    }

    if (to) {
      request.setToTime(to)
    }

    try {
      const response = await this.request<
        LPTokenPriceChartRequest,
        LPTokenPriceChartResponse,
        typeof NinjaAPI.LPTokenPriceChart
      >(request, NinjaAPI.LPTokenPriceChart)

      return response
        .getPricesList()
        .map(IndexerGrpcNinjaTransformer.grpcPriceSnapShotToPriceSnapShot)
    } catch (e: unknown) {
      if (e instanceof GrpcWebError) {
        throw new GrpcUnaryRequestException(new Error(e.toString()), {
          code: e.code,
          contextModule: this.module,
        })
      }

      throw new GrpcUnaryRequestException(e as Error, {
        code: UnspecifiedErrorCode,
        contextModule: this.module,
      })
    }
  }

  async fetchTVLChartRequest({
    vaultAddress,
    from,
    to,
  }: {
    vaultAddress: string
    from?: number
    to?: number
  }) {
    const request = new TVLChartRequest()

    request.setVaultAddress(vaultAddress)

    if (from) {
      request.setFromTime(from)
    }

    if (to) {
      request.setToTime(to)
    }

    try {
      const response = await this.request<
        TVLChartRequest,
        TVLChartResponse,
        typeof NinjaAPI.TVLChart
      >(request, NinjaAPI.TVLChart)

      return response
        .getPricesList()
        .map(IndexerGrpcNinjaTransformer.grpcPriceSnapShotToPriceSnapShot)
    } catch (e: unknown) {
      if (e instanceof GrpcWebError) {
        throw new GrpcUnaryRequestException(new Error(e.toString()), {
          code: e.code,
          contextModule: this.module,
        })
      }

      throw new GrpcUnaryRequestException(e as Error, {
        code: UnspecifiedErrorCode,
        contextModule: this.module,
      })
    }
  }

  async fetchVaultsByHolderAddress({
    pageSize,
    pageIndex,
    holderAddress,
    vaultAddress,
  }: {
    pageSize?: number
    pageIndex?: number
    holderAddress: string
    vaultAddress?: string
  }) {
    const request = new VaultsByHolderAddressRequest()

    request.setHolderAddress(holderAddress)

    if (vaultAddress) {
      request.setVaultAddress(vaultAddress)
    }

    if (pageSize) {
      request.setPageSize(pageSize)
    }

    if (pageIndex) {
      request.setPageIndex(pageIndex)
    }

    try {
      const response = await this.request<
        VaultsByHolderAddressRequest,
        VaultsByHolderAddressResponse,
        typeof NinjaAPI.VaultsByHolderAddress
      >(request, NinjaAPI.VaultsByHolderAddress)

      return response
        .getSubscriptionsList()
        .map(IndexerGrpcNinjaTransformer.grpcSubscriptionToSubscription)
    } catch (e: unknown) {
      if (e instanceof GrpcWebError) {
        throw new GrpcUnaryRequestException(new Error(e.toString()), {
          code: e.code,
          contextModule: this.module,
        })
      }

      throw new GrpcUnaryRequestException(e as Error, {
        code: UnspecifiedErrorCode,
        contextModule: this.module,
      })
    }
  }

  async fetchLPHolders({
    pageSize,
    pageIndex,
    vaultAddress,
  }: {
    pageSize?: number
    pageIndex?: number
    vaultAddress: string
  }) {
    const request = new LPHoldersRequest()

    request.setVaultAddress(vaultAddress)

    if (pageSize) {
      request.setPageSize(pageSize)
    }

    if (pageIndex) {
      request.setPageIndex(pageIndex)
    }

    try {
      const response = await this.request<
        LPHoldersRequest,
        LPHoldersResponse,
        typeof NinjaAPI.LPHolders
      >(request, NinjaAPI.LPHolders)

      return response
        .getHoldersList()
        .map(IndexerGrpcNinjaTransformer.grpcHoldersToHolders)
    } catch (e: unknown) {
      if (e instanceof GrpcWebError) {
        throw new GrpcUnaryRequestException(new Error(e.toString()), {
          code: e.code,
          contextModule: this.module,
        })
      }

      throw new GrpcUnaryRequestException(e as Error, {
        code: UnspecifiedErrorCode,
        contextModule: this.module,
      })
    }
  }

  async fetchHolderPortfolio(holderAddress: string) {
    const request = new PortfolioRequest()

    request.setHolderAddress(holderAddress)

    try {
      const response = await this.request<
        PortfolioRequest,
        PortfolioResponse,
        typeof NinjaAPI.Portfolio
      >(request, NinjaAPI.Portfolio)

      return IndexerGrpcNinjaTransformer.grpcPortfolioToPortfolio(response)
    } catch (e: unknown) {
      if (e instanceof GrpcWebError) {
        throw new GrpcUnaryRequestException(new Error(e.toString()), {
          code: e.code,
          contextModule: this.module,
        })
      }

      throw new GrpcUnaryRequestException(e as Error, {
        code: UnspecifiedErrorCode,
        contextModule: this.module,
      })
    }
  }

  async fetchLeaderboard() {
    const request = new LeaderboardRequest()

    try {
      const response = await this.request<
        LeaderboardRequest,
        LeaderboardResponse,
        typeof NinjaAPI.Leaderboard
      >(request, NinjaAPI.Leaderboard)

      return IndexerGrpcNinjaTransformer.grpcLeaderboardToLeaderboard(response)
    } catch (e: unknown) {
      if (e instanceof GrpcWebError) {
        throw new GrpcUnaryRequestException(new Error(e.toString()), {
          code: e.code,
          contextModule: this.module,
        })
      }

      throw new GrpcUnaryRequestException(e as Error, {
        code: UnspecifiedErrorCode,
        contextModule: this.module,
      })
    }
  }
}
