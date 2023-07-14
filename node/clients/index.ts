import { IOClients } from '@vtex/api'

import SellerClient from './sellerClient'

export class Clients extends IOClients {
  public get sellerClient() {
    return this.getOrSet('sellerClient', SellerClient)
  }
}
