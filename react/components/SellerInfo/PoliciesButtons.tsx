import React, { FC, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import ReactMarkdown from 'react-markdown'
import { Modal } from 'vtex.styleguide'

import { CustomMarkdownLink } from '../../helpers'

const messages = defineMessages({
  deliveryPolicyTitle: { id: 'store/seller-page-deliveryPolicyTitle' },
  exchangeReturnPolicyTitle: {
    id: 'store/seller-page-exchangeReturnPolicyTitle',
  },
  securityPrivacyPolicyTitle: {
    id: 'store/seller-page-securityPrivacyPolicyTitle',
  },
})

interface Props {
  handles: Record<string, string>
  className?: string
  deliveryPolicy?: string
  exchangeReturnPolicy?: string
  securityPrivacyPolicy?: string
}

const PoliciesButtons: FC<Props> = ({
  handles,
  className,
  deliveryPolicy,
  exchangeReturnPolicy,
  securityPrivacyPolicy,
}) => {
  const intl = useIntl()

  const [openDeliveryPolicy, setOpenDeliveryPolicy] = useState(false)
  const [openExchangePolicy, setOpenExchangePolicy] = useState(false)
  const [openSecurityPolicy, setOpenSecurityPolicy] = useState(false)

  const buttonClasses = `b--black-20 b--solid bg-white hover-bg-muted-4
    br4 c-on-base mt4 ml4-m mt0-m pointer t-heading-6 ph4 pv2
    ${handles.policyButton}`

  return (
    <div className={className}>
      {!!deliveryPolicy?.trim() && (
        <>
          <button
            className={buttonClasses.replace(' mt4 ml4-m', '')}
            onClick={() => setOpenDeliveryPolicy(true)}
          >
            {intl.formatMessage(messages.deliveryPolicyTitle)}
          </button>
          <Modal
            centered
            isOpen={openDeliveryPolicy}
            onClose={() => setOpenDeliveryPolicy(false)}
            title={intl.formatMessage(messages.deliveryPolicyTitle)}
          >
            <ReactMarkdown components={{ a: CustomMarkdownLink }}>
              {deliveryPolicy}
            </ReactMarkdown>
          </Modal>
        </>
      )}

      {!!exchangeReturnPolicy?.trim() && (
        <>
          <button
            className={buttonClasses}
            onClick={() => setOpenExchangePolicy(true)}
          >
            {intl.formatMessage(messages.exchangeReturnPolicyTitle)}
          </button>
          <Modal
            centered
            isOpen={openExchangePolicy}
            onClose={() => setOpenExchangePolicy(false)}
            title={intl.formatMessage(messages.exchangeReturnPolicyTitle)}
          >
            <ReactMarkdown components={{ a: CustomMarkdownLink }}>
              {exchangeReturnPolicy}
            </ReactMarkdown>
          </Modal>
        </>
      )}

      {!!securityPrivacyPolicy?.trim() && (
        <>
          <button
            className={buttonClasses}
            onClick={() => setOpenSecurityPolicy(true)}
          >
            {intl.formatMessage(messages.securityPrivacyPolicyTitle)}
          </button>
          <Modal
            centered
            isOpen={openSecurityPolicy}
            onClose={() => setOpenSecurityPolicy(false)}
            title={intl.formatMessage(messages.securityPrivacyPolicyTitle)}
          >
            <ReactMarkdown components={{ a: CustomMarkdownLink }}>
              {securityPrivacyPolicy}
            </ReactMarkdown>
          </Modal>
        </>
      )}
    </div>
  )
}

export default PoliciesButtons
