import React, { FC } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'
import { useFormattedPrice } from 'vtex.formatted-price'
import { useProduct } from 'vtex.product-context'
import { useRuntime } from 'vtex.render-runtime'

const messages = defineMessages({
  listPricePrefix: {
    id: 'store/seller-page-listPricePrefix',
    defaultMessage: 'From',
  },
  sellingPricePrefix: {
    id: 'store/seller-page-sellingPricePrefix',
    defaultMessage: ' ',
  },
})

const SellerProductPrice: FC = () => {
  const intl = useIntl()

  const handles = useCssHandles([
    'priceContainer',
    'listPriceContainer',
    'sellingPriceContainer',
  ])

  const {
    route: {
      params: { slug },
    },
  } = useRuntime()

  const productContext = useProduct()
  const currentSeller = productContext?.selectedItem?.sellers?.find(
    (seller) => seller.sellerId === slug
  )

  const unit = productContext?.selectedItem?.measurementUnit
  const listPrice = currentSeller?.commertialOffer.ListPrice ?? 0
  const price = currentSeller?.commertialOffer.Price ?? 0
  const listPriceFormatted = useFormattedPrice(listPrice)
  const priceFormatted = useFormattedPrice(price)

  return (
    <div
      className={`flex flex-grow-1 flex-column
        justify-end ${handles.priceContainer}`}
    >
      {listPrice && listPrice > price && (
        <div className={`c-muted-2 ${handles.listPriceContainer}`}>
          {intl.formatMessage(messages.listPricePrefix)}{' '}
          <span className="strike">{listPriceFormatted}</span>{' '}
        </div>
      )}
      <div className={`c-action-primary ${handles.sellingPriceContainer}`}>
        {intl.formatMessage(messages.sellingPricePrefix)}{' '}
        <span className="b t-action--large">{priceFormatted}</span> / {unit}
      </div>
    </div>
  )
}

export default SellerProductPrice
