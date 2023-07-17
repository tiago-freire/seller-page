import React, { FC, PropsWithChildren } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { useProduct } from 'vtex.product-context'
import { Link } from 'vtex.render-runtime'
import { CurrentSellerContext } from 'vtex.seller-selector'

const SellerPageLink: FC<PropsWithChildren<never>> = ({ children }) => {
  const productContext = useProduct()

  const handles = useCssHandles(['sellerLink'])
  const { useCurrentSeller } = CurrentSellerContext
  let { currentSeller } = useCurrentSeller()

  if (!currentSeller) {
    currentSeller =
      productContext?.selectedItem?.sellers?.find(
        (seller) => seller.sellerDefault
      ) ?? null
  }

  const slug = currentSeller?.sellerId

  return slug ? (
    <Link
      className={`c-link ${handles.sellerLink}`}
      target="_blank"
      params={{ slug }}
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
