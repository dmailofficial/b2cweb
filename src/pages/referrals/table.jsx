import React, { useEffect, useState, useCallback, useRef } from 'react';
import styled from 'styled-components'
// https://react-table.tanstack.com/docs/api/useTable#cell-properties
import { useTable, usePagination } from 'react-table'
import Dialog from '@mui/material/Dialog';
import { useHistory } from "react-router-dom";
import { observer, inject } from 'mobx-react';
import { Alert } from './dialog'

import { remainDecimalByString } from '@/utils/index'
import { Wrapper, ToolBar, Content, TableChunk, Button, Circle, NoDataWraper } from './css'
import Pagination from './pagination'
import noDataImg from '../../static/images/empty.png'

const columns = [
  {
    Header: 'No.',
    accessor: 'index',
  },
  {
    Header: 'Invitees',
    accessor: 'address',
  },
  {
    Header: 'Order Quantity',
    accessor: 'buyCount',
  },
  {
    Header: 'Total amount',
    accessor: 'priceValue',
  },
] 

export const NoData = () => {
  return (
    <NoDataWraper>
      <div className="no-data">
        <img src={noDataImg} alt=""/>
        <div className="no-data-text">
          <p>No orders</p>
        </div>
      </div>
    </NoDataWraper>
  )
}

const Table = (props) => {
  const { store: { wallet }, data, fetchData, pageCount, loading, setReceiveId } = props
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
    if (key === 'priceValue') {
      return value ? `${remainDecimalByString(value, 4)} ${original.tokenType.toUpperCase()}` : '- -'
    }
    return value || '- -'
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
      <Pagination columns={columns} {...props} />
    </>
  )
}

export default inject('store')(observer(Table))
