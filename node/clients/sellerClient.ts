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
          VtexIdclientAutcookie: context.authToken ?? '',
        },
      }
    )
  }

  public async getSeller(sellerId: string) {
    return this.http.get(`/${sellerId}`, { forceMaxAge: 5000 })
  }
}
