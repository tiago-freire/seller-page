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

  context.set('Access-Control-Allow-Origin', '*')
  context.set('Access-Control-Allow-Headers', '*')
  context.set('Access-Control-Allow-Credentials', 'true')
  context.set('Access-Control-Allow-Methods', '*')
  context.set('Content-Type', 'application/json')

  try {
    const seller = await sellerClient.getSeller((sellerId as string) ?? '')

    context.body = { seller }
    context.status = 200
  } catch (error) {
    const {
      response: {
        status: errorStatus,
        data: { error: errorMessage },
      },
    } = error

    context.body = { error: errorMessage }
    context.status = errorStatus
  }
}

export default getSeller
