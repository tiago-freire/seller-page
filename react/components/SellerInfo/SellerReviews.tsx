import React, { FC, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'
import { Modal } from 'vtex.styleguide'

import SellerLastReviews from './SellerLastReviews'

const messages = defineMessages({
  reviewsLabel: {
    id: 'store/seller-page-reviewsLabel',
  },
  reviewsLabelSingular: {
    id: 'store/seller-page-reviewsLabelSingular',
  },
  reviewsTitle: {
    id: 'store/seller-page-reviewsTitle',
  },
})

type Props = { count: number }

const SellerReviews: FC<Props> = ({ count }) => {
  const intl = useIntl()

  const handles = useCssHandles([
    'reviewsContainer',
    'reviewsBadge',
    'reviewsTrigger',
  ])

  const [open, setOpen] = useState(false)

  const containerClasses = `flex flex-column items-center mt4 ${handles.reviewsContainer}`
  const badgeClasses = `flex items-center justify-center ph3 pv1 t-body br4 ${handles.reviewsBadge}`
  const triggerClasses = `b--none bg-transparent c-on-action-secondary t-body hover-bg-muted-4 lh-solid mt2 ph0 pv0 underline pointer ${handles.reviewsTrigger}`

  return (
    <div className={containerClasses}>
      <div className={badgeClasses}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
        >
          <path
            d="M11.0887 6.30904L11.09 6.30923C11.1692 6.32111 11.2437 6.35418 11.3056 6.40494C11.3655 6.45405 11.4115 6.51796 11.4391 6.59028C11.4607 6.66249 11.4622 6.73925 11.4436 6.81236C11.4243 6.88795 11.3842 6.9566 11.3278 7.0105L11.3278 7.01049L11.3257 7.01251L9.87433 8.41961L9.71909 8.57011L9.75599 8.78314L10.0995 10.7664L10.0996 10.7673C10.1132 10.8449 10.1049 10.9247 10.0755 10.9977C10.0462 11.0707 9.99695 11.1341 9.93345 11.1806C9.86996 11.2272 9.79471 11.255 9.71622 11.261C9.63781 11.267 9.55929 11.2509 9.48952 11.2146C9.48945 11.2146 9.48938 11.2146 9.48931 11.2145L7.6896 10.2731L7.49999 10.174L7.31037 10.2731L5.5105 11.2146C5.51043 11.2147 5.51035 11.2147 5.51028 11.2147C5.44138 11.2506 5.36382 11.2665 5.28637 11.2605C5.20883 11.2546 5.13451 11.2271 5.07181 11.1811L5.07186 11.181L5.06555 11.1766C5.00256 11.1322 4.95354 11.0707 4.92424 10.9994C4.89494 10.9281 4.88658 10.85 4.90015 10.7741L4.90055 10.7717L5.24402 8.78296L5.28095 8.56908L5.12457 8.41858L3.65099 7.00039L3.651 7.00038L3.64885 6.99835C3.59262 6.94501 3.55286 6.87666 3.5343 6.80141C3.51575 6.72627 3.51912 6.64739 3.54399 6.5741C3.56922 6.50048 3.61433 6.43527 3.67432 6.38569C3.73439 6.33604 3.80704 6.30401 3.8842 6.29314L3.88513 6.293L5.89607 6.00493L6.10657 5.97478L6.20283 5.78516L7.12244 3.97365L7.12311 3.97231C7.15824 3.90248 7.21208 3.84378 7.27863 3.80276C7.34518 3.76174 7.42181 3.74002 7.49999 3.74002C7.57816 3.74002 7.65479 3.76174 7.72134 3.80276C7.78789 3.84378 7.84173 3.90248 7.87686 3.97231L7.87754 3.97365L8.79714 5.78516L8.89226 5.97253L9.09997 6.00435L11.0887 6.30904Z"
            fill="#142032"
            stroke="#142032"
            strokeWidth="0.818182"
          />
        </svg>
        {count}
      </div>
      <button className={triggerClasses} onClick={() => setOpen(true)}>
        ({count}{' '}
        {intl.formatMessage(
          count === 1 ? messages.reviewsLabelSingular : messages.reviewsLabel
        )}
        )
      </button>
      <Modal
        centered
        isOpen={open}
        onClose={() => setOpen(false)}
        title={intl.formatMessage(messages.reviewsTitle)}
      >
        <SellerLastReviews />
      </Modal>
    </div>
  )
}

export default SellerReviews
