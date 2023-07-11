import React, { useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { Modal } from 'vtex.styleguide'

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
  deliveryPolicy?: string | null
  exchangeReturnPolicy?: string | null
  securityPrivacyPolicy?: string | null
}

const PoliciesButtons: React.FC<Props> = ({
  handles,
  className,
  deliveryPolicy,
  exchangeReturnPolicy,
  securityPrivacyPolicy,
}) => {
  const intl = useIntl()

  const [openDeliveryPolicy, setOpenDeliveryPolicy] = useState(false)

  const [openExchangeReturnPolicy, setOpenExchangeReturnPolicy] = useState(
    false
  )

  const [openSecurityPrivacyPolicy, setOpenSecurityPrivacyPolicy] = useState(
    false
  )

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
            <p>{deliveryPolicy}</p>
          </Modal>
        </>
      )}

      {!!exchangeReturnPolicy?.trim() && (
        <>
          <button
            className={buttonClasses}
            onClick={() => setOpenExchangeReturnPolicy(true)}
          >
            {intl.formatMessage(messages.exchangeReturnPolicyTitle)}
          </button>
          <Modal
            centered
            isOpen={openExchangeReturnPolicy}
            onClose={() => setOpenExchangeReturnPolicy(false)}
            title={intl.formatMessage(messages.exchangeReturnPolicyTitle)}
          >
            <p>{exchangeReturnPolicy}</p>
          </Modal>
        </>
      )}

      {!!securityPrivacyPolicy?.trim() && (
        <>
          <button
            className={buttonClasses}
            onClick={() => setOpenSecurityPrivacyPolicy(true)}
          >
            {intl.formatMessage(messages.securityPrivacyPolicyTitle)}
          </button>
          <Modal
            centered
            isOpen={openSecurityPrivacyPolicy}
            onClose={() => setOpenSecurityPrivacyPolicy(false)}
            title={intl.formatMessage(messages.securityPrivacyPolicyTitle)}
          >
            <p>{securityPrivacyPolicy}</p>
          </Modal>
        </>
      )}
    </div>
  )
}

export default PoliciesButtons
