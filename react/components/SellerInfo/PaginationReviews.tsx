import React, { FC, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'

interface Props {
  totalPages: number
}

const messages = defineMessages({
  noReviews: {
    id: 'store/seller-page-noReviews',
  },
})

const PaginationReviews: FC<Props> = ({ totalPages }) => {
  const intl = useIntl()
  const handles = useCssHandles([
    'paginationContainer',
    'paginationArrow',
    'paginationItem',
    'paginationLink',
    'active',
  ])

  const [currentPage, setCurrentPage] = useState(1)

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)
  const buttonClasses = `flex items-center b--none t-action br2 ph4 pv3 
     lh-solid pointer ${handles.paginationArrow}`

  const notActiveItemClasses =
    'bg-transparent hover-bg-muted-4 c-on-action-secondary'

  const activeItemClasses = `bg-action-primary c-on-base--inverted ${handles.active}`

  return (
    <div className={`flex items-center ${handles.paginationContainer}`}>
      {!pages.length ? (
        <span className="c-danger">
          {intl.formatMessage(messages.noReviews)}
        </span>
      ) : (
        <>
          <div className={`mr1 ${handles.paginationItem}`}>
            <button
              className={`${notActiveItemClasses} ${buttonClasses} ${handles.paginationArrow}`}
              onClick={() => setCurrentPage((current) => current - 1)}
              disabled={currentPage === 1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="9"
                height="15"
                viewBox="0 0 9 15"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.33266 14.1666C7.018 14.1666 6.702 14.056 6.44733 13.8293L0.447329 8.49597C0.163329 8.24397 -0.000671387 7.87997 -0.000671387 7.49997C-0.000671387 7.11864 0.163329 6.75597 0.447329 6.50264L6.44733 1.16931C6.99933 0.682639 7.84066 0.730639 8.33 1.27997C8.81933 1.83064 8.77 2.67331 8.21933 3.16264L3.34066 7.49997L8.21933 11.836C8.77 12.3253 8.81933 13.168 8.33 13.7186C8.066 14.016 7.70066 14.1666 7.33266 14.1666Z"
                  fill="#4A596B"
                />
              </svg>
            </button>
          </div>
          {pages.map((page) => (
            <div key={page} className={`mh2 ${handles.paginationItem}`}>
              <button
                className={`${buttonClasses} ${handles.paginationLink} ${
                  currentPage === page
                    ? activeItemClasses
                    : notActiveItemClasses
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            </div>
          ))}
          <div className={`ml1 ${handles.paginationItem}`}>
            <button
              className={`${notActiveItemClasses} ${buttonClasses} ${handles.paginationArrow}`}
              onClick={() => setCurrentPage((current) => current + 1)}
              disabled={currentPage === totalPages}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="9"
                height="15"
                viewBox="0 0 9 15"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.6674 14.1666C1.98207 14.1666 2.29807 14.056 2.55273 13.8293L8.55273 8.49597C8.83673 8.24397 9.00073 7.87997 9.00073 7.49997C9.00073 7.11864 8.83673 6.75597 8.55273 6.50264L2.55273 1.16931C2.00073 0.682639 1.1594 0.730639 0.670065 1.27997C0.180732 1.83064 0.230065 2.67331 0.780732 3.16264L5.6594 7.49997L0.780732 11.836C0.230065 12.3253 0.180732 13.168 0.670065 13.7186C0.934065 14.016 1.2994 14.1666 1.6674 14.1666Z"
                  fill="#4A596B"
                />
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default PaginationReviews
