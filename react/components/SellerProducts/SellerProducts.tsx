import React, { FC } from 'react'
import { ExtensionPoint, useRuntime } from 'vtex.render-runtime'
import ProductQuery from 'vtex.search-result/SearchResultLayoutCustomQuery'

const SellerProducts: FC = () => {
  const {
    query,
    route: {
      params: { slug },
    },
  } = useRuntime()

  return (
    <ProductQuery
      querySchema={{
        ...query,
        mapField: 'seller',
        queryField: slug,
        orderByField: query?.order,
        priceRangeField: query?.priceRange,
      }}
    >
      <ExtensionPoint id="search-result-layout.desktop" />
      <ExtensionPoint id="search-result-layout.mobile" />
      <ExtensionPoint id="search-not-found-layout" />
    </ProductQuery>
  )
}

export default SellerProducts
