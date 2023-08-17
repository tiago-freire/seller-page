import React, { FC, PropsWithChildren } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { useDevice } from 'vtex.device-detector'
import { Link } from 'vtex.render-runtime'

import { withQueryClient } from '../../helpers'
import { useSellerAddons } from '../../services'

const Wrapper = ({ children }: PropsWithChildren<unknown>) => {
  const handles = useCssHandles(['bannerWrapper'])

  return (
    <div className={`flex justify-center ${handles.bannerWrapper}`}>
      {children}
    </div>
  )
}

const SellerBanner: FC = () => {
  const { isMobile } = useDevice()
  const handles = useCssHandles(['bannerImage', 'bannerLink'])
  const { sellerAddons, error } = useSellerAddons()

  if (error) return null

  const banner = sellerAddons?.banner ?? ''
  const bannerMobile = sellerAddons?.bannerMobile ?? ''
  const imageAlt = 'Seller Banner'

  const imageBanner =
    (banner || bannerMobile) && isMobile ? (
      <img
        className={handles.bannerImage}
        src={bannerMobile || banner}
        alt={imageAlt}
      />
    ) : (
      banner && (
        <img className={handles.bannerImage} src={banner} alt={imageAlt} />
      )
    )

  const bannerUrl = sellerAddons?.bannerUrl

  if (bannerUrl && imageBanner) {
    return (
      <Wrapper>
        <Link className={handles.bannerLink} to={bannerUrl}>
          {imageBanner}
        </Link>
      </Wrapper>
    )
  }

  return <Wrapper>{imageBanner}</Wrapper>
}

export default withQueryClient(SellerBanner)
