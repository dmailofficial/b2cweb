import React, { useEffect, useState, useCallback, useRef } from 'react';
import styled from 'styled-components'
// https://react-table.tanstack.com/docs/api/useTable#cell-properties
import { useTable, usePagination } from 'react-table'
import Dialog from '@mui/material/Dialog';
import { observer, inject } from 'mobx-react';
import { Alert } from './dialog'

import { Wrapper, ToolBar, Content, TableChunk, Button, Circle, NoDataWraper } from './css'

const columns = [
  {
    Header: 'Ranking',
    accessor: 'ranking',
  },
  {
    Header: 'Address',
    accessor: 'address',
  },
  {
    Header: 'Total orders',
    accessor: 'total',
  },
] 

const Table = (props) => {
  const { store: { wallet } } = props

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

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

  const renderTd = (cell) => {
    const key = cell.column.id
    const original = cell.row.original
    const value = original[key]
    if (key === 'address') {
      return value.substring(0,6)+"***"+value.substring(value.length-4, value.length)
    }
    return value || '- -'
  }

  useEffect(() => {
    setData([
      {
        ranking: 1,
        address: '0xE92210810151Ca42c6E38aeeda294981991Aa93b',
        total: 12
      },
      {
        ranking: 2,
        address: '0xE92210810151Ca42c6E38aeeda294981991Aa93b',
        total: 11
      },
      {
        ranking: 3,
        address: '0xE92210810151Ca42c6E38aeeda294981991Aa93b',
        total: 10
      },
      {
        ranking: 4,
        address: '0xE92210810151Ca42c6E38aeeda294981991Aa93b',
        total: 9
      },
      {
        ranking: 5,
        address: '0xE92210810151Ca42c6E38aeeda294981991Aa93b',
        total: 8
      },
      {
        ranking: 6,
        address: '0xE92210810151Ca42c6E38aeeda294981991Aa93b',
        total: 7
      },
      {
        ranking: 7,
        address: '0xE92210810151Ca42c6E38aeeda294981991Aa93b',
        total: 6
      },
      {
        ranking: 8,
        address: '0xE92210810151Ca42c6E38aeeda294981991Aa93b',
        total: 5
      },
      {
        ranking: 9,
        address: '0xE92210810151Ca42c6E38aeeda294981991Aa93b',
        total: 4
      },
    ])
  }, [])

  // Render the UI for your table
  return (
    <TableChunk className={loading ? 'loading top-invites' : 'top-invites'}>
      <div className="thead">
        {columns.map(({ Header }) => (
          <span>{Header}</span>
        ))}
      </div>
      <div className="table">
        <table {...getTableProps()}>
          {!data.length ? null : (
            <tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return <td className={cell.column.id} {...cell.getCellProps()}>{renderTd(cell)}</td>
                    })}
                  </tr>
                )
              })}
            </tbody>
          )}
        </table>
      </div>
    </TableChunk>
  )
}

export default inject('store')(observer(Table))
