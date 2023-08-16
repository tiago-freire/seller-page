import { useQuery } from '@tanstack/react-query'
import { useRuntime } from 'vtex.render-runtime'

import { ApiResponse, apiGetFactory } from '.'

interface SellerAddonsResponse extends ApiResponse {
  id?: string
  banner?: string
  bannerUrl?: string
  orderByField?: string
  description?: string
  deliveryPolicy?: string
  exchangeReturnPolicy?: string
  securityPrivacyPolicy?: string
}

export const useSellerAddons = () => {
  const {
    route: {
      params: { slug },
    },
  } = useRuntime()

  const endpoint = `https://${slug}.myvtex.com/_v/get-addons`

  const { data: sellerAddons, isLoading, error } = useQuery<
    SellerAddonsResponse | undefined,
    Error
  >({
    queryKey: ['seller-addons', slug],
    queryFn: apiGetFactory<SellerAddonsResponse>(endpoint),
  })

  return { sellerAddons, isLoading, error }
}