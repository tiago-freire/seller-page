import React, { FC, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'
import { Button, Textarea, utils } from 'vtex.styleguide'

import PaginationReviews from './PaginationReviews'
import styles from './SellerLastReviews.css'

const messages = defineMessages({
  typeReviewLabel: {
    id: 'store/seller-page-typeReviewLabel',
  },
  countdownText: {
    id: 'store/seller-page-characterCountdownText',
  },
  reviewsLabelSingular: {
    id: 'store/seller-page-reviewsLabelSingular',
  },
  sendLabel: {
    id: 'store/seller-page-sendLabel',
  },
  cancelLabel: {
    id: 'store/seller-page-cancelLabel',
  },
  reviewSentMessage: {
    id: 'store/seller-page-reviewSentMessage',
  },
})

const SellerLastReviews: FC = () => {
  const intl = useIntl()
  const handles = useCssHandles(Object.keys(styles))
  const [review, setReview] = useState('')
  const { isOpen, onToggle } = utils.useDisclosure()
  const [sent, setSent] = useState(false)

  return (
    <div className={handles.sellerLastReviewsContainer}>
      <div className="flex justify-between">
        <PaginationReviews totalPages={0} />
        <Button
          onClick={() => {
            onToggle()
            setReview('')
            setSent(false)
          }}
          className="review"
          variant="primary"
        >
          {isOpen
            ? intl.formatMessage(messages.cancelLabel)
            : `${intl.formatMessage(messages.sendLabel)} ${intl.formatMessage(
                messages.reviewsLabelSingular
              )}`}
        </Button>
      </div>
      {isOpen && (
        <div className="mt4">
          <Textarea
            value={review}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setReview(e.target.value)
              setSent(false)
            }}
            label={intl.formatMessage(messages.typeReviewLabel)}
            maxLength="250"
            characterCountdownText={intl.formatMessage(messages.countdownText)}
          />
          <Button
            onClick={() => {
              setReview('')
              setSent(true)
            }}
            className="review"
            variant="primary"
          >
            {intl.formatMessage(messages.sendLabel)}
          </Button>
          {sent && (
            <p className="c-success">
              {intl.formatMessage(messages.reviewSentMessage)}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default SellerLastReviews
