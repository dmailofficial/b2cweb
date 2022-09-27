import React, { useEffect, useRef, useState, } from 'react';
import styled  from 'styled-components';
import { useTable, usePagination } from 'react-table'
import { observer, inject } from 'mobx-react';

const flex = `display: flex;`
const flexAlign = `${flex}; align-items: center;`
const flexBetween = `${flexAlign};justify-content: space-between;`
const flexJustBetween = `${flex}; justify-content: space-between;`

const PaginationWrapper = styled.div`
  ${flexBetween};
  margin-top: 16px;

  .pagination {
    ${flexAlign};

    &.disabled {
      span {
        cursor: not-allowed;
      }
    }
  }

  span {
    width: 36px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    background: #353537;
    margin-left: 1px;
    cursor: pointer;
    border: none;
    user-select: none;
    font-size: 12px;

    &:hover {
      color: #E84118;
    }
  }

  .prev, .next {
    ${flexAlign};
    justify-content: center;
    position: relative;

    &.disabled {
      cursor: not-allowed;
    }

    &::before {
      content: '';
      width: 16px;
      height: 16px;
      background: rgba(255, 255, 255, 0.01);
    }

    &::after {
      content: '';
      position: absolute;
      margin-left: -5px;
      width: 0;
      height: 0;
      border-width: 4px;
      border-style: dashed solid dashed dashed;
      border-color: transparent #fff transparent transparent;
    }
  }

  .prev {
    border-radius: 4px 0px 0px 4px;

    &:hover {
      &::after {
        border-right-color: #E84118;
      }
    }

    &.disabled {
      &::after {
        border-right-color: #737373;
      }
    }
  }

  .next {
    border-radius: 0px 4px 4px 0px;

    &::after {
      margin-left: 4px;
      border-style: dashed dashed dashed solid;
      border-color: transparent transparent transparent #fff;
    }

    &:hover {
      &::after {
        border-left-color: #E84118;
      }
    }

    &.disabled {
      &::after {
        border-left-color: #737373;
      }
    }
  }

  .on {
    color: #E84118;
    cursor: default;
  }
`

const showButtonsNum = 5
// not good enough
const usePageButtons = (pageIndex, pageCount, gotoPage, loadingRef) => {
  if (pageIndex < 0 || pageCount <= 0) {
    return null
  }
  const _pageIndex = pageIndex + 1
  let min = _pageIndex - Math.floor(showButtonsNum / 2)
  let max = _pageIndex + Math.floor(showButtonsNum / 2)
  // if prev has no enough num
  if (min <= 0) {
    min = 1
    if (max - min < showButtonsNum) {
      max = min + showButtonsNum - 1
    }
  }
  if (max > pageCount) {
    max = pageCount
  }
  // if next has no enough num
  if (max === pageCount && max - min < showButtonsNum && min > 1) {
    min = max - showButtonsNum + 1
    if (min <= 0) {
      min = 1
    }
  }
  const pages = [min]
  while(1) {
    const last = pages[pages.length - 1]
    if (last >= max) {
      break;
    }
    pages.push(last+1)
  }

  const toPage = (page) => {
    !loadingRef.current && gotoPage(page - 1)
  }

  return (
    pages.map((page) => (
      <span className={ _pageIndex === page ? 'on' : '' } onClick={() => toPage(page)} key={page}>{page}</span>
    ))
  )
}

const Pagination = ({ store: { presale }, children, columns, data, fetchData, loading, ...props }) => {
  const {
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    // Get the state from the instance
    state: { pageIndex, pageSize },
  } = useTable({
    columns,
    data,
    initialState: { pageIndex: 0 }, // Pass our hoisted table state
    manualPagination: true, // Tell the usePagination
    // hook that we'll handle our own data fetching
    // This means we'll also have to provide our own
    // pageCount.
    pageCount: props.pageCount,
  }, usePagination)

  const pageInfo = useRef({
    pageIndex, 
    pageSize
  })
  const loadingRef = useRef(loading)
  const pageButtons = usePageButtons(pageIndex, pageCount, gotoPage, loadingRef)

  const onPrev = () => {
    if (loadingRef.current || !canPreviousPage) {
      return
    }

    previousPage()
  }

  const onNext = () => {
    if (loadingRef.current || !canNextPage) {
      return
    }

    nextPage()
  }

  useEffect(() => {
    pageInfo.current = { pageIndex, pageSize }
    !loadingRef.current && fetchData({ pageIndex, pageSize })
  }, [fetchData, pageIndex, pageSize])

  useEffect(() => {
    loadingRef.current = loading
  }, [loading])

  useEffect(() => {
    if (presale.triggerReload > 0) {
      const { pageIndex, pageSize } = pageInfo.current
      !loadingRef.current && fetchData({ pageIndex, pageSize })
    }
  }, [presale.triggerReload])

  return (
    <PaginationWrapper>
      {children ? children : <div className="for-layout"></div>}
      {!pageCount ? null : (
        <div className={`pagination ${loading ? 'disabled' : ''}`}>
          <span className={`prev ${!canPreviousPage ? 'disabled' : ''}`} onClick={onPrev} >
          </span>
          {pageButtons}
          <span className={`next ${!canNextPage ? 'disabled' : ''}`} onClick={onNext} >
          </span>
        </div>
      )}
    </PaginationWrapper>
  )
}

export default inject('store')(observer(Pagination))
