import React, { useEffect, useState, useCallback, useRef } from 'react';
import styled from 'styled-components'
// https://react-table.tanstack.com/docs/api/useTable#cell-properties
import { useTable, usePagination } from 'react-table'
import Dialog from '@mui/material/Dialog';
import { useHistory } from "react-router-dom";
import { observer, inject } from 'mobx-react';
import { Alert } from './dialog'
import { emailLogin } from '@/utils/index'

import { Wrapper, ToolBar, Content, TableChunk, Button, Circle, NoDataWraper } from './css'
import Pagination from './pagination'
import noDataImg from '../../../static/images/no-data.png'

const statusMap = {
  0: {
    class: 'ing',
    text: 'NFT uncollected',
    operationText: 'Receive NFT',
    operationType: 'primary',
  },
  1: {
    class: 'success',
    text: 'NFT issued',
    operationText: 'Use email',
    operationType: 'normal',
  },
  2: {
    class: 'ing',
    text: 'NFT issuing',
    operationText: 'Pending',
    operationType: 'disabled',
  },
  99: {
    class: 'ing',
    // text: 'To be paid',
    text: 'Confirming transaction',
    operationText: 'Receive NFT',
    operationType: 'disabled',
    // operationText: 'Payment',
    // operationType: 'ghost',
  },
  9: {
    class: 'close',
    text: 'Transaction failed'
  },
}

// const operationMap = {
//   1: {
//     text: 'Use Email',
//     type: 'normal',
//   },
//   2: {
//     text: 'PENDING',
//     type: 'disabled',
//   },
//   3: {
//     text: 'Receive NFT',
//     type: 'primary',
//   },
//   4: {
//     text: 'Payment',
//     type: 'ghost',
//   },
// }

const NoData = () => {
  return (
    <NoDataWraper>
      <div className="no-data">
        <img src={noDataImg} alt=""/>
        <div className="no-data-text">
          <p>Not owned Dmail NFT Domain Account</p>
          <p><a rel="noopener noreferrer"  href='/presale'>Jump to the activity page to search for e-mail</a></p>
        </div>
      </div>
    </NoDataWraper>
  )
}

const Table = (props) => {
  const { store: { wallet }, columns, data, fetchData, pageCount, loading, setReceiveId } = props
  const history = useHistory();
  const [alertInfo, setAlertInfo] = useState(null)

  const toPay = (product_name) => {
    if (wallet && wallet.info && wallet.info.walletName) {
      history.push("/presale", { step: 'pay', wallet: wallet.info.walletName, product_name })
    }
  }

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

  const onBtnClick = (type, o) => () => {
    const { product_name, id } = o
    if (type === 'disabled') {
      return;
    }
    if (type === 'primary') {
      setReceiveId(id)
    } else if (type === 'ghost') {
      toPay(product_name)
    } else if (type === 'normal') {
      setAlertInfo({
        title: 'Coming soon!'
      })
    }
  }

  const renderTd = (cell) => {
    const key = cell.column.id
    const original = cell.row.original
    const value = original[key]
    // console.log(key, original, cell)
    if (key === 'date') {
      if (!value?.includes(' ')) {
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
    } else if ([ 'domain', 'price', 'expirationDate'].includes(key)) {
      return (
        <span className="break-word">
          {value ? value : '- -'}
        </span>
      )
    }else if ([ 'hash', 'owner'].includes(key)) {
      return (
        <span className="break-word">
          {value}
        </span>
      )
    } else if (key === 'operation') {
      const status = original['status']
      if (!(status in statusMap)) {
        return null
      }
      const obj = statusMap[status]
      if (obj.operationType === 'normal') {
        return (
          <Button type={obj.operationType} rel="noopener noreferrer" target="_blank" href={emailLogin}>{obj.operationText}</Button>
        )
      }
      return (
        <Button type={obj.operationType} rel="noopener noreferrer" onClick={onBtnClick(obj.operationType, original)}>{obj.operationText}</Button>
      )
    } else if (key === 'status') {
      const current = statusMap[value]
      const aStatusText = current ? current.text : '- -'
      return (
        <div className="status">
          <Circle type={current ? current.class : ''}></Circle>
          <span>
            {aStatusText}
          </span>
        </div>
      )
    }
    return value ? `#${value}` : '- -'
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
      <Alert info={alertInfo} setInfo={setAlertInfo} />
      <Pagination {...props} />
    </>
  )
}

export default inject('store')(observer(Table))
