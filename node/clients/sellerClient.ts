import { ExternalClient, IOContext, InstanceOptions } from '@vtex/api'

export default class SellerClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(
      `http://${context.account}.myvtex.com/api/seller-register/pvt/sellers`,
      context,
      {
        ...options,
        headers: {
          ...options?.headers,
          VtexIdclientAutcookie: context.authToken,
        },
      }
    )
  }

  public async getSeller(sellerId: string) {
    return this.http.get(`/${sellerId}`)
  }
}
