import { QueryClient } from '@tanstack/react-query'

export interface ApiResponse {
  code?: string
  message?: string
  response?: { data?: { error?: string } }
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        const e = error as Error

        console.error('Query Error:', { errorMessage: e.message, failureCount })

        return (
          (e.message.toLowerCase().includes('unhealthy') ||
            e.message.toLowerCase().includes('genericerror')) &&
          failureCount < 10
        )
      },
    },
  },
})

export const apiGetFactory = <T extends ApiResponse>(url: string) => {
  return async () => {
    const response = await fetch(url)
    const json: T = await response.json()

    if (!response.ok) {
      throw new Error(
        json?.response?.data?.error ??
          json?.message ??
          json?.code ??
          response.status.toString()
      )
    }

    return json
  }
}

export * from './seller'
export * from './sellerAddons'
