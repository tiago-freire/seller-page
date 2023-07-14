import { ExternalClient, IOContext, InstanceOptions } from '@vtex/api'

export default class SellerClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(
      `http://${context.account}.myvtex.com/api/seller-register/pvt/sellers`,
      context,
      {
        ...options,
        params: {
          ...options?.params,
          workspace: context.workspace,
        },
        headers: {
          ...options?.headers,
          'Cache-Control': 'no-cache',
          Accept: 'application/json',
          'Content-Type': 'application/json',
          VtexIdclientAutcookie: context.authToken ?? '',
        },
      }
    )
  }

  public async getSeller(sellerId: string) {
    return this.http.get(`/${sellerId}`)
  }
}
