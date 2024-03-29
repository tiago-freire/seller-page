import React, { FC, HTMLProps } from 'react'

import DefaultLogoSvg from './default-logo.svg'

const DefaultLogo: FC<HTMLProps<HTMLImageElement>> = (props) => {
  return <img src={DefaultLogoSvg} {...props} alt={props.alt} />
}

export default DefaultLogo
