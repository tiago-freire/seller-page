import React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'
import { useProduct } from 'vtex.product-context'

const CSS_HANDLES = ['sellerTextContainer', 'sellerText']

const messages = defineMessages({
  sellerPdpText: {
    id: 'store/seller-page-sellerPdpText',
  },
})

const SellerPdpText = () => {
  const intl = useIntl()
  const handles = useCssHandles(CSS_HANDLES)
  const productContextValue = useProduct()

  const sellerName = productContextValue?.selectedItem?.sellers.find(
    (seller) => seller.sellerDefault
  )?.sellerName

  return (
    <div className={`${handles.sellerTextContainer}`}>
      {productContextValue ? (
        <span className={`${handles.sellerText}`}>
          {intl.formatMessage(messages.sellerPdpText, { sellerName })}
        </span>
      ) : (
        ''
      )}
    </div>
  )
}

export default SellerPdpText
