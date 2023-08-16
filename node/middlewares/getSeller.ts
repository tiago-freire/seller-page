import type { ServiceContext } from '@vtex/api'

import type { Clients } from '../clients'

const getSeller = async (context: ServiceContext<Clients>): Promise<void> => {
  const {
    clients: { sellerClient },
    vtex: {
      route: {
        params: { sellerId },
      },
    },
  } = context

  const seller = await sellerClient.getSeller((sellerId as string) ?? '')

  context.set('Access-Control-Allow-Origin', '*')
  context.set('Access-Control-Allow-Headers', '*')
  context.set('Access-Control-Allow-Methods', '*')
  context.set('Access-Control-Allow-Credentials', 'true')
  context.set('Content-Type', 'application/json')
  context.body = seller
  context.status = 200
}

export default getSeller
