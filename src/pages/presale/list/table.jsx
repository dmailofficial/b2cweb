import React, { useEffect, useState, useCallback, useRef } from 'react';
import styled from 'styled-components'
// https://react-table.tanstack.com/docs/api/useTable#cell-properties
import { useTable, usePagination } from 'react-table'
import Dialog from '@mui/material/Dialog';

import { Wrapper, ToolBar, Content, TableChunk, Button, Circle, NoDataWraper } from './css'
import Pagination from './pagination'
import noDataImg from '../../../static/images/no-data.png'

const statusMap = {
  1: 'success',
  2: 'ing',
  3: 'close',
}

const operationMap = {
  1: {
    text: 'Use Email',
    type: 'normal',
  },
  2: {
    text: 'PENDING',
    type: 'disabled',
  },
  3: {
    text: 'Receive NFT',
    type: 'primary',
  },
  4: {
    text: 'Payment',
    type: 'ghost',
  },
}

const NoData = () => {
  return (
    <NoDataWraper>
      <div className="no-data">
        <img src={noDataImg} alt=""/>
        <div className="no-data-text">
          <p>Not owned Dmail NFT Domain Account</p>
          <p>Jump to the activity page to search for e-mail</p>
        </div>
      </div>
    </NoDataWraper>
  )
}

const Table = (props) => {
  const { columns, data, fetchData, pageCount, loading, setOpen } = props

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  const onBtnClick = (type) => () => {
    if (type === 'disabled') {
      return;
    }
    console.log(type)
    if (type === 'primary') {
      setOpen(true)
    }
  }

  const renderTd = (cell) => {
    const key = cell.column.id
    const original = cell.row.original
    const value = original[key]
    // console.log(key, original, cell)
    if (key === 'date') {
      if (!value.includes(' ')) {
        return value
      }
      const aDate = value.split(' ')
      return (
        <>
          {aDate.map((date, key) => (
            <span key={key}>
              {date}
              {key !== aDate.length - 1 ? <br /> : null}
            </span>
          ))}
        </>
      )
    } else if (['hash', 'owner'].includes(key) && Array.isArray(value)) {
      return (
        <>
          {value.map((item, key) => <p key={key}>{item}</p>)}
        </>
      )
    } else if (key === 'operation') {
      return (
        <Button type={operationMap[value].type} onClick={onBtnClick(operationMap[value].type)}>{operationMap[value].text}</Button>
      )
    } else if (key === 'status') {
      const aStatusText = original['statusText']
      return (
        <div className="status">
          <Circle type={statusMap[value]}></Circle>
          <span>
            {aStatusText.map((text, key) => (
              <span key={key}>
                {text}
                {key !== aStatusText.length - 1 ? <br /> : null}
              </span>
            ))}
          </span>
        </div>
      )
    }
    return cell.render('Cell') || '- -'
  }

  // Render the UI for your table
  return (
    <>
      <TableChunk className={loading ? 'loading' : ''}>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          {pageCount <= 0 ? null : (
            <tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return <td {...cell.getCellProps()}>{renderTd(cell)}</td>
                    })}
                  </tr>
                )
              })}
            </tbody>
          )}
        </table>
        {pageCount <= 0 ? <NoData /> : null}
      </TableChunk>
      <Pagination {...props} />
    </>
  )
}

export default Table
