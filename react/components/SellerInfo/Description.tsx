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

const MAX_CHARS = 400
const MAX_PARAGRAPHS = 1

type Props = { sellerName?: string; description?: string }

const Description: FC<Props> = ({ sellerName, description }) => {
  const intl = useIntl()
  const handles = useCssHandles(['description'])
  const [openMore, setOpenMore] = useState(false)

  const descriptionParagraphs = Children.toArray(
    convertBreakToBrHTML(
      description?.substring(0, openMore ? undefined : MAX_CHARS) ?? '',
      'description'
    )
  )

  const descriptionNotMaxLength = (description?.length ?? 0) <= MAX_CHARS

  const renderAll: boolean =
    descriptionNotMaxLength && descriptionParagraphs.length < MAX_PARAGRAPHS + 1

  const descriptionToRender =
    renderAll || openMore
      ? descriptionParagraphs
      : descriptionParagraphs.slice(0, MAX_PARAGRAPHS)

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
