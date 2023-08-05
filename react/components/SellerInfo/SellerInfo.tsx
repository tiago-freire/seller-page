import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { FC } from 'react'
import { useCssHandles } from 'vtex.css-handles'

import Skeleton from '../Skeleton'
import DefaultLogo from './DefaultLogo'
import Description from './Description'
import PoliciesButtons from './PoliciesButtons'
import styles from './styles.css'
import useSellerFromSlug from './useSellerFromSlug'

const SellerInfoSkeleton: FC = () => <Skeleton height="30vh" />

const SellerInfo: FC = () => {
  const handles = useCssHandles(['title', ...Object.keys(styles)])
  const { seller, error, isLoading } = useSellerFromSlug()

  if (isLoading) {
    return <SellerInfoSkeleton />
  }

  const {
    name,
    logo,
    description,
    deliveryPolicy,
    exchangeReturnPolicy,
    securityPrivacyPolicy,
  } = seller ?? {}

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
        {error?.message ?? (
          <>
            <div className={logoContainerClasses}>
              {logo ? (
                <img src={logo} alt={name} className={logoClasses} />
              ) : (
                <DefaultLogo alt={name} className={logoClasses} />
              )}
            </div>
            <div className={titleAndDescriptionClasses}>
              <h3 className={titleClasses}>{name}</h3>
              <Description description={description} sellerName={name} />
              <PoliciesButtons {...policiesButtonsProps} />
            </div>
          </>
        )}
      </div>
    </section>
  )
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
})

const SellerInfoWithQueryClient: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SellerInfo />
    </QueryClientProvider>
  )
}

export default SellerInfoWithQueryClient
