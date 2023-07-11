import React, { PropsWithChildren } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { Link } from 'vtex.render-runtime'
import { CurrentSellerContext } from 'vtex.seller-selector'

function SellerPageLink({ children }: PropsWithChildren<never>) {
  const handles = useCssHandles(['sellerLink'])
  const { useCurrentSeller } = CurrentSellerContext
  const { currentSeller } = useCurrentSeller()
  const sellerId = currentSeller?.sellerId

  return sellerId ? (
    <Link
      className={handles.sellerLink}
      target="_blank"
      params={{ slug: sellerId }}
      title={currentSeller?.sellerName}
      page="store.seller"
    >
      {children}
    </Link>
  ) : (
    children
  )
}

export default SellerPageLink
