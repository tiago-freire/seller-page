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
  const imgAlt = 'Seller Banner'
  const imgClasses = `br3 ${handles.bannerImage}`

  const imageBanner =
    banner || bannerMobile ? (
      isMobile ? (
        <img className={imgClasses} src={bannerMobile || banner} alt={imgAlt} />
      ) : (
        banner && <img className={imgClasses} src={banner} alt={imgAlt} />
      )
    ) : null

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
