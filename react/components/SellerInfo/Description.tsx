import React, { Children, FC, Fragment, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'

import { convertBreakToBrHTML } from '../../helpers'

const messages = defineMessages({
  fallbackDescription: {
    id: 'store/seller-page-fallbackDescription',
  },
  moreDescription: {
    id: 'store/seller-page-moreDescription',
  },
  lessDescription: {
    id: 'store/seller-page-lessDescription',
  },
})

type Props = { sellerName?: string; description?: string }

const Description: FC<Props> = ({ sellerName, description }) => {
  const intl = useIntl()
  const handles = useCssHandles(['description'])
  const [openMore, setOpenMore] = useState(false)

  const descriptionParagraphs = Children.toArray(
    convertBreakToBrHTML(description ?? '', 'description')
  )

  const descriptionNotMaxLength = (description?.length ?? 0) <= 800

  const renderAll: boolean =
    descriptionNotMaxLength && descriptionParagraphs.length < 3

  const descriptionToRender =
    renderAll || openMore
      ? descriptionParagraphs
      : descriptionParagraphs.length === 1 && !descriptionNotMaxLength
      ? [description?.substring(0, 800) ?? '']
      : descriptionParagraphs.slice(0, 2)

  const showMoreButtonClasses =
    'b--none bg-transparent c-on-action-secondary t-action hover-bg-muted-4 lh-solid ml3 ph0 pointer pv0 underline'

  return (
    <p className={`c-muted-1 ${handles.description}`}>
      {descriptionToRender.length ? (
        <>
          {descriptionToRender.map((p, index) => (
            <Fragment key={`description-${sellerName}-${index}`}>
              {p}
              {index < descriptionToRender.length - 1 && (
                <>
                  <br />
                  <br />
                </>
              )}
            </Fragment>
          ))}
          {!renderAll && (
            <button
              className={showMoreButtonClasses}
              onKeyUp={() => setOpenMore((prevOpen) => !prevOpen)}
              onClick={() => setOpenMore((prevOpen) => !prevOpen)}
            >
              {openMore ? 'less' : 'more'}
            </button>
          )}
        </>
      ) : (
        intl.formatMessage(messages.fallbackDescription, { sellerName })
      )}
    </p>
  )
}

export default Description
