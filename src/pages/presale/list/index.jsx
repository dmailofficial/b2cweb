import React, { useEffect, useState, useCallback, useRef } from 'react';
import styled from 'styled-components'
import { useHistory } from "react-router-dom";
import { observer, inject } from 'mobx-react';

import Header from '@/components/newheader'
import { Wrapper, ToolBar, Content } from './css'
import Table from './table'
import ReceiveDialog, { Alert, Success } from './dialog'
import Wallet from '@/wallet/index'
import axios from '@/utils/axios';
import { baseUrl } from '../utils'
import { login, verifySign } from '../request'
import WalletDialog from '../walletDialog'

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
    hash: '0x3dfanlkfjdklafdajfda2fdafda',
    status: '0',
    statusText: ['NFT Issued'],
    product_name: 'xxxx',
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
    hash: '0x3dfanlkfjdklafdajfda2fdafda',
    status: '1',
    statusText: ['NFT Issuing'],
    product_name: 'xxxx',
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
    hash: '0x3dfanlkfjdklafdajfda2fdafda',
    status: '2',
    statusText: ['NFT Uncollected'],
    product_name: 'xxxx',
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
    hash: '0x3dfanlkfjdklafdajfda2fdafda',
    status: '9',
    statusText: ['To be paid', '01:30:00'],
    product_name: 'xxxx',
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
    hash: '0x3dfanlkfjdklafdajfda2fdafda',
    status: '3',
    statusText: ['Closed'],
    product_name: 'xxxx',
    number: '#032123',
    owner: ['0x3dfanlkfjdkla', 'fdajfda2fdafda'],
    expirationDate: 'Permanent',
    // operation: 'Use Email',
    operation: '4',
    // operationText: ''
  }
]

function App({ store: { wallet, presale } }) {
  const history = useHistory();
  const [data, setData] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [alertInfo, setAlertInfo] = useState(null)
  const [successText, setSuccessText] = useState('')

  const [walletInstance, setWalletInstance] = useState({})
  const [walletDialog, setWalletDialog] = useState(false)
  const walletDialogClose = () => {
    setWalletDialog(false);
  }

  const [errorToast, setErrorToast] = useState(false)
  const getWalletInstance = (instance) => {
    setWalletInstance(instance)
  }
  const [errorToastMsg, setErrorToastMsg] = useState(false)
  const poptoast = (txt) => {
    setErrorToast(true)
    setErrorToastMsg(txt)

    setTimeout(()=>{
      setErrorToast(false)
      setErrorToastMsg("")
    }, 3000)
  }

  const getLoginInfo = (loginInfo) => {
    if(loginInfo.code){
      poptoast(loginInfo.msg)
      return;
    }

    wallet.setWalletInfo(loginInfo)
    walletDialogClose();
  }

  const goPresale = () => {
    history.push("/presale")
  }

  const fetchData = useCallback(async ({ pageIndex, pageSize }) => {
    if (!wallet.info || !wallet.info.address) {
      return
    }
    const { jwt, address } = wallet.info
    setLoading(true)
    // await new Promise((resolve) => setTimeout(resolve, 1000))
    try {
      const res = await axios({
        url: `${baseUrl}/trades`,
        method: 'post',
        data: {
          jwt,
          address,
          // address: '0xedfAa9fea4275dbaAc341Fd1EE9c782cb838818A',
        },
        // errorTitle: '',
      })
      const { code, data, message, success } = res.data
      console.log(res.data)
      if (res.data && res.data.data) {
        // const { list, total } = res.data.data
        const total = 13;
        const list = res.data.data
        setPageCount(total || 0)
        setData(list.map(({ created, id, price, product_name, status, tx, nft_id, p_id }) => ({
          id,
          date: created,
          product_name,
          domain: `${product_name}@dmail.ai`,
          price,
          hash: tx,
          status,
          number: nft_id,
          owner: p_id,
          expirationDate: 'Permanent',
        })))
      }
    } catch (error) {
      // console.log(error)      
    }
    const random = Math.random()
    // console.log(pageIndex, pageSize, random)
    // setPageCount(random > 0.8 ? 0 : 13)
    setData(testData)
    setLoading(false)
  }, [wallet.info])

  const [open, setOpen] = useState(false);
  const [inputErrorIndex, setInputErrorIndex] = useState(0);
  const receive = useCallback(async (id) => {
    console.log(id)
    if (!wallet.info || !wallet.info.address) {
      return
    }
    const { jwt, address } = wallet.info
    if (id) {
      try {
        const res = await axios({
          url: `${baseUrl}/lockdomain`,
          method: 'post',
          data: {
            jwt,
            address,
            // address: '0xedfAa9fea4275dbaAc341Fd1EE9c782cb838818A',
            product_name: id,
          },
          // errorTitle: '',
        })
        const { code, message, success } = res.data
        if (!success) {
          setOpen(false);
          setSuccessText('Received successfully');
          presale.triggerListReload()
        } else {
          setAlertInfo({
            title: message,
            isError: true,
          })
        }
      } catch (error) {
        setAlertInfo({
          title: 'Sorry, Receive failed!',
          isError: true,
        })
        // console.log(error)      
      }
    } else {
      setInputErrorIndex(inputErrorIndex+1)
    }
  }, [wallet.info])

  useEffect(async () => {
    const walleInfo = wallet.info
    if (!wallet.info) {
      setWalletDialog(true)
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
          <div className="right">
            {wallet.info && wallet.info.address ? <span>{wallet.info.address}</span> : <a onClick={() => setWalletDialog(true)}>Connect wallet</a>}
          </div>
        </ToolBar>
        <Content>
          <div className="tip">
            <i></i>
            <p>When the payment is done, please claim your NFT domain account.The Dmail NFT Domain Account will be sent to your Principal ID account in 24 hours. If you have any problem, please connect to our official email:contact@dmail.ai .</p>
          </div>
          <Table columns={columns} loading={loading} data={data} pageCount={pageCount} fetchData={fetchData} setOpen={setOpen} />
        </Content>
      </Wrapper>
      <WalletDialog
        open = {walletDialog}
        dialogClose = {walletDialogClose}
        getLoginInfo = {getLoginInfo}
        getWalletInstance = {getWalletInstance}
      ></WalletDialog>
      <Alert info={alertInfo} setInfo={setAlertInfo} />
      <Success text={successText} setText={setSuccessText} />
      <ReceiveDialog open={open} setOpen={setOpen} receive={receive} errorIndex={inputErrorIndex} />
    </>
  )
}

export default inject('store')(observer(App))

