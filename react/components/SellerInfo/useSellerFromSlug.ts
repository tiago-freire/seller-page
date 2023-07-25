import { useCallback, useEffect, useState } from 'react'
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
  error?: string
}

const useSellerFromSlug = () => {
  const {
    workspace,
    route: {
      params: { slug },
    },
  } = useRuntime()

  const [seller, setSeller] = useState<Seller>()
  const [error, setError] = useState<string>()
  const [loading, setLoading] = useState(true)

  const fetchSeller = useCallback(async () => {
    const maxRetries = 3
    const retryInterval = 300

    const fetchData = async () => {
      try {
        const response = await fetch(
          `/_v/seller/${slug}?workspace=${workspace}`
        )

        if (!response.ok) {
          const json = await response.json()

          throw new Error(json?.message || response.status.toString())
        }

        const json: ApiResponse = await response.json()

        setError(json?.error)
        setSeller(json?.seller)
        setLoading(false)

        return
      } catch (e) {
        throw e
      }
    }

    let retryCount = 0

    while (retryCount < maxRetries) {
      try {
        // eslint-disable-next-line no-await-in-loop
        await fetchData()

        return
      } catch (e) {
        retryCount++
        if (retryCount < maxRetries) {
          // eslint-disable-next-line no-await-in-loop
          await new Promise((resolve) => setTimeout(resolve, retryInterval))
        } else {
          setError(e.message)
          setLoading(false)
        }
      }
    }
  }, [slug, workspace])

  useEffect(() => {
    fetchSeller()
  }, [fetchSeller])

  return { seller, error, loading }
}

export default useSellerFromSlug
