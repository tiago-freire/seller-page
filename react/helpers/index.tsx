import React, { Fragment } from 'react'

export const convertBreakToBrHTML = (text: string, keyPrefix: string) =>
  text.split(/\n/g).map((paragraph, index) => (
    <Fragment key={`${keyPrefix}-${index}`}>
      {paragraph}
      <br />
    </Fragment>
  ))
