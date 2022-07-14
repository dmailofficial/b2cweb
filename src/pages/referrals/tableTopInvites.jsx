import React, { useEffect, useState, useCallback, useRef } from 'react';
import styled from 'styled-components'
// https://react-table.tanstack.com/docs/api/useTable#cell-properties
import { useTable, usePagination } from 'react-table'
import Dialog from '@mui/material/Dialog';
import { observer, inject } from 'mobx-react';
import { Alert } from './dialog'

import { TableChunk } from './css'
import first from "@/static/images/first.png";
import second from "@/static/images/second.png";
import third from "@/static/images/third.png";


const columns = [
  {
    Header: 'Ranking',
    accessor: 'channel_id',
  },
  {
    Header: 'Address',
    accessor: 'address',
  },
  {
    Header: 'Total orders',
    accessor: 'order_count',
  },
] 

const Table = ({ data }) => {
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

  const renderTd = (cell, index) => {
    const key = cell.column.id
    const original = cell.row.original
    const value = original[key]
    if (key === 'channel_id') {
      if (index === 0) {
        return <img src={first} width="25" />
      } else if (index === 1) {
        return <img src={second} width="25" />
      } else if (index === 2) {
        return <img src={third} width="25" />
      }
      return index + 1
    }
    if (key === 'address' && typeof value === 'string') {
      return value.substring(0,6)+"***"+value.substring(value.length-4, value.length)
    }
    return value || '- -'
  }

  // Render the UI for your table
  return (
    <TableChunk className={'top-invites'}>
      <div className="thead">
        {columns.map(({ Header }) => (
          <span key={Header}>{Header}</span>
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
                      return <td className={cell.column.id} {...cell.getCellProps()}>{renderTd(cell, i)}</td>
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
