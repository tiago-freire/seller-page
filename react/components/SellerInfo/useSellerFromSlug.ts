import { useEffect, useState } from 'react'
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

  useEffect(() => {
    fetch(`/_v/seller/${slug}?workspace=${workspace}`)
      .then((response) => response.json())
      .then((json: ApiResponse) => {
        setError(json?.error)
        setSeller(json?.seller)
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [slug, workspace])

  return { seller, error, loading }
}

export default useSellerFromSlug
