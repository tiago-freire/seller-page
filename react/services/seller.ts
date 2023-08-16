import { useQuery } from '@tanstack/react-query'
import { useRuntime } from 'vtex.render-runtime'

import { ApiResponse, apiGetFactory } from '.'

interface SellerResponse extends ApiResponse {
  id: string
  name: string
  logo: string
  description: string
  deliveryPolicy: string
  exchangeReturnPolicy: string
  securityPrivacyPolicy: string
}

export const useSeller = () => {
  const {
    workspace,
    route: {
      params: { slug },
    },
  } = useRuntime()

  const endpoint = `/_v/seller/${slug}?workspace=${workspace}`

  const { data: seller, isLoading, error } = useQuery<
    SellerResponse | undefined,
    Error
  >({
    queryKey: ['seller', slug],
    queryFn: apiGetFactory<SellerResponse>(endpoint),
  })

  return { seller, isLoading, error }
}
