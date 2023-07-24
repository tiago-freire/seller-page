import React, { Fragment } from 'react'
import ReactMarkdown from 'react-markdown'

export const convertBreakToBrHTML = (text: string, keyPrefix: string) => {
  const textSplitted = text?.split(/\n/g)

  return textSplitted?.map((paragraph, index) =>
    paragraph?.trim() ? (
      <ReactMarkdown
        components={{
          p: Fragment,
        }}
        key={`${keyPrefix}-${index}`}
      >
        {paragraph}
      </ReactMarkdown>
    ) : undefined
  )
}
