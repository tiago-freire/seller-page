import { useQuery } from '@tanstack/react-query'
import { useRuntime } from 'vtex.render-runtime'

interface Seller {
  id: string
  name: string
  logo: string
  description: string
  deliveryPolicy: string
  exchangeReturnPolicy: string
  securityPrivacyPolicy: string
}

interface ApiResponse {
  seller?: Seller
  message?: string
  error?: string
}

const MAX_RETRIES = 10

const useSellerFromSlug = () => {
  const {
    workspace,
    route: {
      params: { slug },
    },
  } = useRuntime()

  const { data: seller, isLoading, error } = useQuery<
    Seller | undefined,
    Error
  >({
    queryKey: ['seller', slug],
    queryFn: async () => {
      const response = await fetch(`/_v/seller/${slug}?workspace=${workspace}`)

      const json: ApiResponse = await response.json()

      if (!response.ok) {
        throw new Error(
          json?.message ?? json?.error ?? response.status.toString()
        )
      }

      return json?.seller
    },
    retry: MAX_RETRIES,
  })

  return { seller, isLoading, error }
}

export default useSellerFromSlug
