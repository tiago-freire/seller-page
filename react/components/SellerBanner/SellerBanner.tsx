import React, { FC, PropsWithChildren } from 'react'
import { useCssHandles } from 'vtex.css-handles'
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
  const handles = useCssHandles(['bannerImage', 'bannerLink'])
  const { sellerAddons, error } = useSellerAddons()

  const bannerUrl = sellerAddons?.bannerUrl
  const banner = sellerAddons?.banner
  const imageBanner = banner && (
    <img className={handles.bannerImage} src={banner} alt="Seller Banner" />
  )

  if (error) return null

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
