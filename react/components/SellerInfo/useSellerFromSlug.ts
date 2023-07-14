import { useEffect, useState } from 'react'
import { useRuntime } from 'vtex.render-runtime'

interface ApiResponse {
  seller?: {
    id: string
    name: string
    logo: string
    description: string
    deliveryPolicy: string
    exchangeReturnPolicy: string
    securityPrivacyPolicy: string
  }
  error?: string
}

const useSellerFromSlug = () => {
  const {
    workspace,
    route: {
      params: { slug },
    },
  } = useRuntime()

  const [data, setData] = useState<ApiResponse>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/_v/seller/${slug}?workspace=${workspace}`)
      .then((response) => response.json())
      .then((json) => {
        setData(json)
      })
      .finally(() => setLoading(false))
  }, [slug, workspace])

  return { data, loading }
}

export default useSellerFromSlug
