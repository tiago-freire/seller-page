import { QueryClientProvider } from '@tanstack/react-query'
import React, { FC, Fragment, PropsWithChildren } from 'react'
import ReactMarkdown from 'react-markdown'
import { ReactMarkdownProps } from 'react-markdown/lib/complex-types'

import { queryClient } from '../services'

export const CustomMarkdownLink: FC<
  PropsWithChildren<
    Pick<
      React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,
      'key' | keyof React.HTMLAttributes<HTMLElement>
    > &
      ReactMarkdownProps
  >
> = ({ children, ...props }) => {
  return (
    <a target="_blank" rel="noopener noreferrer" className="c-link" {...props}>
      {children}
    </a>
  )
}

export const convertBreakToBrHTML = (text: string, keyPrefix: string) => {
  const textSplitted = text?.split(/\n/g)

  return textSplitted?.map((paragraph, index) =>
    paragraph?.trim() ? (
      <ReactMarkdown
        components={{
          p: Fragment,
          a: CustomMarkdownLink,
        }}
        key={`${keyPrefix}-${index}`}
      >
        {paragraph}
      </ReactMarkdown>
    ) : undefined
  )
}

export const withQueryClient = (Component: FC) => {
  const WrappedComponent: FC = () => (
    <QueryClientProvider client={queryClient}>
      <Component />
    </QueryClientProvider>
  )

  return WrappedComponent
}
