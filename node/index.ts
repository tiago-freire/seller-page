import type { ClientsConfig } from '@vtex/api'
import { LRUCache, Service, method } from '@vtex/api'

import { Clients } from './clients'
import getSeller from './middlewares/getSeller'

const TIMEOUT_MS = 800
const memoryCache = new LRUCache<string, never>({ max: 5000 })

const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
    status: {
      memoryCache,
    },
  },
}

export default new Service({
  clients,
  routes: {
    getSeller: method({
      GET: getSeller,
    }),
  },
})
