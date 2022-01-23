import React, { useEffect, useState, useCallback, useRef } from 'react';
import styled from 'styled-components'
import { useHistory } from "react-router-dom";

import Header from '@/components/newheader'
import { Wrapper, ToolBar, Content } from './css'
import Table from './table'
import Dialog from './dialog'
import Wallet from '@/wallet/index'
import axios from '@/utils/axios';
import { baseUrl } from '../utils'
import { login, verifySign } from '../request'

const columns = [
  {
    Header: 'Date',
    accessor: 'date',
  },
  {
    Header: 'NFT Domain',
    accessor: 'domain',
  },
  {
    Header: 'Price',
    accessor: 'price',
  },
  {
    Header: 'Txn Hash',
    accessor: 'hash',
  },
  {
    Header: 'Status',
    accessor: 'status',
  },
  {
    Header: 'NFT Number',
    accessor: 'number',
  },
  {
    Header: 'Owner',
    accessor: 'owner',
  },
  {
    Header: 'Expiration Date',
    accessor: 'expirationDate',
  },
  {
    Header: 'Operation',
    accessor: 'operation',
  },
]

const testData = [
  {
    date: '2020/03/24 10:44',
    domain: 'www.google.com',
    price: '9.9USDT',
    hash: ['0x3dfanlkfjdkla', 'fdajfda2fdafda'],
    status: '1',
    statusText: ['NFT Issued'],
    number: '#032123',
    owner: ['0x3dfanlkfjdkla', 'fdajfda2fdafda'],
    expirationDate: 'Permanent',
    // operation: 'Use Email',
    operation: '1',
    // operationText: ''
  },
  {
    date: '2020/03/24 10:44',
    domain: 'www.google.com',
    price: '9.9USDT',
    hash: ['0x3dfanlkfjdkla', 'fdajfda2fdafda'],
    status: '2',
    statusText: ['NFT Issuing'],
    number: '#032123',
    owner: ['0x3dfanlkfjdkla', 'fdajfda2fdafda'],
    expirationDate: 'Permanent',
    // operation: 'Use Email',
    operation: '2',
    // operationText: ''
  },
  {
    date: '2020/03/24 10:44',
    domain: 'www.google.com',
    price: '9.9USDT',
    hash: ['0x3dfanlkfjdkla', 'fdajfda2fdafda'],
    status: '2',
    statusText: ['NFT Uncollected'],
    number: '#032123',
    owner: ['0x3dfanlkfjdkla', 'fdajfda2fdafda'],
    expirationDate: 'Permanent',
    // operation: 'Use Email',
    operation: '3',
    // operationText: ''
  },
  {
    date: '2020/03/24 10:44',
    domain: 'www.google.com',
    price: '9.9USDT',
    hash: ['0x3dfanlkfjdkla', 'fdajfda2fdafda'],
    status: '2',
    statusText: ['To be paid', '01:30:00'],
    number: '#032123',
    owner: ['0x3dfanlkfjdkla', 'fdajfda2fdafda'],
    expirationDate: 'Permanent',
    // operation: 'Use Email',
    operation: '3',
    // operationText: ''
  },
  {
    date: '2020/03/24 10:44',
    domain: 'www.google.com',
    price: '9.9USDT',
    hash: ['0x3dfanlkfjdkla', 'fdajfda2fdafda'],
    status: '3',
    statusText: ['Closed'],
    number: '#032123',
    owner: ['0x3dfanlkfjdkla', 'fdajfda2fdafda'],
    expirationDate: 'Permanent',
    // operation: 'Use Email',
    operation: '4',
    // operationText: ''
  }
]

function App() {
  const history = useHistory();
  const [data, setData] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [address, setAddress] = useState('')
  const [jwt, setJwt] = useState('')

  const goPresale = () => {
    history.push("/presale")
  }

  const fetchData = useCallback(async ({ pageIndex, pageSize }) => {
    if (!address) {
      return
    }
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    try {
      const res = await axios({
        url: `${baseUrl}/trades`,
        method: 'post',
        data: {
          jwt,
          address: '0xedfAa9fea4275dbaAc341Fd1EE9c782cb838818A',
        },
        // errorTitle: '',
      })
      const { code, data, message, success } = res.data
      console.log(res.data)
    } catch (error) {
      // console.log(error)      
    }
    const random = Math.random()
    // console.log(pageIndex, pageSize, random)
    setPageCount(random > 0.8 ? 0 : 13)
    setData(random > 0.5 ? [] : testData)
    setLoading(false)
  }, [address, jwt])

  // useEffect(() => {
  //   setAddress('0x3dfanlkfjdklafdajfda2fdafda')
  // })

  const [open, setOpen] = useState(false);
  const [inputErrorIndex, setInputErrorIndex] = useState(0);
  const receive = (id) => {
    console.log(id)
    // do something
    if (id) {
      setOpen(false);
    } else {
      setInputErrorIndex(inputErrorIndex+1)
    }
  }

  useEffect(async () => {
    // const _wallet = new Wallet('metamask');
    // const account = await _wallet.requestAccounts();
    // console.log('account', account)
    // if (Array.isArray(account) && account.length) {
    //   const { success, msg, data } = await login(account[0]);
    //   console.log("login info: ", data)
    //   if(!success){
    //     alert("login error!")
    //     return false;
    //   }
    // }
    if (typeof history.location.state === 'object' && history.location.state) {
      const { address, jwt, walletName } = history.location.state
      console.log(walletName, history.location.state)
      setAddress(address)
      setJwt(jwt)
    }
  }, [])

  return (
    <>
      <Header />
      <Wrapper>
        <ToolBar>
          <div className="left" onClick={goPresale}>
            <i></i>
            <span>Orders</span>
          </div>
          <div className="right">{address}</div>
        </ToolBar>
        <Content>
          <div className="tip">
            <i></i>
            <p>When the payment is done, please claim your NFT domain account.The Dmail NFT Domain Account will be sent to your Principal ID account in 24 hours. If you have any problem, please connect to our official email:contact@dmail.ai .</p>
          </div>
          <Table columns={columns} loading={loading} data={data} pageCount={pageCount} fetchData={fetchData} setOpen={setOpen} />
        </Content>
      </Wrapper>
      <Dialog open={open} setOpen={setOpen} receive={receive} errorIndex={inputErrorIndex} />
    </>
  )
}

export default App
