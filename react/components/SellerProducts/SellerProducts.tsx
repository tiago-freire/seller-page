import React, { FC } from 'react'
import { ExtensionPoint, useRuntime } from 'vtex.render-runtime'
import ProductQuery from 'vtex.search-result/SearchResultLayoutCustomQuery'

import { withQueryClient } from '../../helpers'
import { useSeller, useSellerAddons } from '../../services'

const SellerProducts: FC = () => {
  const { query } = useRuntime()
  const { seller } = useSeller()
  const { sellerAddons } = useSellerAddons()

  const addonsOrderBy = sellerAddons?.orderByField
  const orderByField =
    query?.order ?? (addonsOrderBy === 'OrderByScoreDESC' ? '' : addonsOrderBy)

  if (!seller?.id) {
    return null
  }

  return (
    <ProductQuery
      querySchema={{
        ...query,
        mapField: 'seller',
        queryField: seller.id,
        orderByField,
        priceRangeField: query?.priceRange,
      }}
    >
      <ExtensionPoint id="search-result-layout.desktop" />
      <ExtensionPoint id="search-result-layout.mobile" />
      <ExtensionPoint id="search-not-found-layout" />
    </ProductQuery>
  )
}

export default withQueryClient(SellerProducts)
