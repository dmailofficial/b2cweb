import React, { useEffect, useState, useCallback, useRef } from 'react';
import styled from 'styled-components'
// https://react-table.tanstack.com/docs/api/useTable#cell-properties
import { useTable, usePagination } from 'react-table'
import { observer, inject } from 'mobx-react';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Tooltip from '@mui/material/Tooltip';

import { shortPrincipalId, copyTextToClipboard, remainDecimalByString } from '@/utils/index'
import Pagination from './pagination'
import { NoData } from './table'
import { getRecordList } from './api'
import { getNetwork } from './utils'
import { TableChunk } from './css'

Date.prototype.Format = function(fmt) {
  var o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    'S': this.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length)) }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
  }
  return fmt
}

function formatTimeToStr(times, pattern) {
  var d = new Date(times).Format('yyyy-MM-dd hh:mm:ss')
  if (pattern) {
    d = new Date(times).Format(pattern)
  }
  return d.toLocaleString()
}

const  columns = [
  {
    Header: 'Date',
    accessor: 'date',
  },
  {
    Header: 'Balance',
    accessor: 'quantity',
  },
  {
    Header: 'Withdraw amount ',
    accessor: 'withdrawal',
  },
  {
    Header: 'Network fee',
    accessor: 'fee',
  },
  {
    Header: 'Receive amount',
    accessor: 'account',
  },
  {
    Header: 'Address',
    accessor: 'address',
  },
  {
    Header: 'State',
    accessor: 'state',
  },
  {
    Header: 'Txn Hash',
    accessor: 'hash',
  },
]

const stateMap = {
  0: {
    className: 'withdrawing',
    text: 'Withdrawing',
  },
  1: {
    className: 'completed',
    text: 'Completed',
  },
  2: {
    className: 'failed',
    text: 'Failed',
  }
}

const unitMap = {
  56: 'USDT',
  998: 'ICP',
  5656: 'BUSD'
}

const renderTd = (cell, index) => {
  const key = cell.column.id
  const original = cell.row.original
  const value = original[key]
  const isIcp = original['unit'] === 'icp'
  if (key === 'date') {
    if (!value?.includes(' ')) {
      return value
    }
    const aDate = value.split(' ')
    return (
      <>
        {aDate.map((date, key) => (
          <p key={key} style={{whiteSpace: 'nowrap'}}>
            {date}
          </p>
        ))}
      </>
    )
  } else if (key === 'state') {
    if (!(value in stateMap)) {
      return '--'
    }
    const { className, text } = stateMap[value]
    const failedReason = value == 2 ? <Tooltip title={original['mark']} arrow><QuestionMarkIcon /></Tooltip> : null
    return <span className={`state ${className}`}><i></i>{text}{ failedReason }</span>
  } else if (key === 'address') {
    return <span style={{cursor: 'pointer'}} onClick={() => copyTextToClipboard(value)}>{shortPrincipalId(value, isIcp)}</span>
  } else if (['quantity', 'fee', 'account', 'withdrawal'].includes(key)) {
    const unit = original['unit']
    return value ? `${remainDecimalByString(value, isIcp ? 2 : 4)} ${unit}` : '--'
  } else if (key === 'hash') {
    return <span style={{cursor: 'pointer'}} onClick={() => copyTextToClipboard(value)}>{value.length > 10 ? shortPrincipalId(value, isIcp) : value}</span>
  }
  return value || '- -'
}

const WithdrawalsRecord = ({ channelId, tokenType }) => {
  const [data, setData] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const fetchData = useCallback(async ({ pageIndex, pageSize }) => {
    const { list, total } = await getRecordList(channelId, pageIndex + 1, pageSize)
    setData(list.map(({ CreatedAt, amount, fee, real_withdraw, dst_address, status, txn_hash, mark, network }) => ({
      date: formatTimeToStr(CreatedAt),
      quantity: amount,
      withdrawal: fee+real_withdraw,
      fee,
      account: real_withdraw,
      address: dst_address,
      state: status, 
      hash: txn_hash,
      mark,
      unit: unitMap[network]
    })))
    setPageCount(Math.ceil(total / pageSize))
  }, [channelId])

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

  // useEffect(() => {
  //   fetchData()
  // }, [fetchData])

  // Render the UI for your table
  return (
    <div>
      <TableChunk className={'withdrawals-record'}>
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
      <Pagination columns={columns} data={data} pageCount={pageCount} fetchData={fetchData}  />
    </div>
  )
}

export default inject('store')(observer(WithdrawalsRecord))
