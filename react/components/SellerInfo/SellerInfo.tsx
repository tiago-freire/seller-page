import React, { useEffect } from 'react'
import { useLazyQuery } from 'react-apollo'
import { defineMessages, useIntl } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'
import { useRuntime } from 'vtex.render-runtime'
import type { QuerySellerArgs, Seller } from 'vtex.sellers-graphql'

import GET_SELLER from '../../graphql/getSeller.gql'
import Skeleton from '../Skeleton'
import DefaultLogo from './DefaultLogo'
import PoliciesButtons from './PoliciesButtons'
import styles from './styles.css'

const messages = defineMessages({
  fallbackDescriptionPrefix: {
    id: 'store/seller-page-fallbackDescriptionPrefix',
  },
})

interface SellerQuery {
  seller: Seller
}

const SellerInfoSkeleton: React.FC = () => <Skeleton height="30vh" />

const SellerInfo: React.FC = () => {
  const intl = useIntl()

  const handles = useCssHandles(['title', ...Object.keys(styles)])

  const {
    route: {
      params: { slug: id },
    },
  } = useRuntime()

  const [getSeller, { data, loading, called }] = useLazyQuery<
    SellerQuery,
    QuerySellerArgs
  >(GET_SELLER, {
    variables: { id },
    ssr: true,
  })

  useEffect(() => {
    getSeller()
  }, [getSeller])

  if (!called || (called && loading)) {
    return <SellerInfoSkeleton />
  }

  if (!data) {
    return null
  }

  const {
    name,
    logo,
    description,
    deliveryPolicy,
    exchangeReturnPolicy,
    securityPrivacyPolicy,
  } = data?.seller

  const hasDescription = !!description?.trim()
  const fallbackDescription = (
    <>
      {intl.formatMessage(messages.fallbackDescriptionPrefix)} <i>{name}</i>.
    </>
  )

  const logoContainerClasses = `flex items-center justify-center overflow-hidden
    bg-white mb6 mb0-l mr6-l ${handles.logoContainer}`

  const logoClasses = `h-auto ${handles.logo}`
  const titleClasses = `t-heading-3 mb2 mt0 fw4 ${handles.title}`
  const titleAndDescriptionClasses =
    'flex flex-grow-1 flex-column justify-center'

  const policiesButtonsProps = {
    handles,
    className: 'flex flex-column flex-row-m mt4',
    deliveryPolicy,
    exchangeReturnPolicy,
    securityPrivacyPolicy,
  }

  return (
    <section className={`bg-muted-5 pv6 ph8 br3 ${handles.infoContainer}`}>
      <div className="flex flex-column items-center items-start-l flex-row-l">
        <div className={logoContainerClasses}>
          {logo ? (
            <img src={logo} alt={name} className={logoClasses} />
          ) : (
            <DefaultLogo alt={name} className={logoClasses} />
          )}
        </div>
        <div className={titleAndDescriptionClasses}>
          <h3 className={titleClasses}>{name}</h3>
          <p className="c-muted-1">
            {hasDescription ? description : fallbackDescription}
          </p>
          <PoliciesButtons {...policiesButtonsProps} />
        </div>
      </div>
    </section>
  )
}

export default SellerInfo
