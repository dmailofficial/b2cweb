import React, { useEffect, useState, useCallback, useRef } from 'react';
import styled from 'styled-components'
import { useHistory } from "react-router-dom";
import { observer, inject } from 'mobx-react';
import { encode, decode } from 'js-base64';
import Cookies from 'js-cookie'

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
    Header: 'Date (UTC)',
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

function App({ store: { wallet, presale } }) {
  const address = wallet.info && wallet.info.address || ''
  const filterAddress = typeof address === 'string' && address.length ?  address.substr(0,6)+"***"+address.substr(address.length-4, address.length) : ''

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
    console.log(wallet.info)
    if (!wallet.info || !wallet.info.address || !wallet.info.walletName) {
      return
    }
    const { jwt, address, walletName } = wallet.info
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
      const { code, data, totalPages, message, success } = res.data
      if (res.data) {
        const list = res.data.data || []
        setPageCount(totalPages || 0)
        setData(list.map(({ created, id, price, product_name, status, tx, nft_id, p_id }) => ({
          id,
          date: created,
          product_name,
          domain: `${product_name}@dmail.ai`,
          price: `${price} ${walletName === 'plug' ? 'ICP' : 'USDT'}`,
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
          // TODO: the url is wrong
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
    if (!wallet.info) {
      const sInfo = Cookies.get('account')
      if (!sInfo) {
        setWalletDialog(true)
      } else {
        try {
          const info = JSON.parse(decode(sInfo))
          info && wallet.setWalletInfo(info)
        } catch (error) {
          //
        }
      }
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
            <a onClick={() => setWalletDialog(true)}>{filterAddress  || 'Connect wallet'}</a>
          </div>
        </ToolBar>
        <Content>
          <div className="tip">
            <i></i>
            <p>When the payment is done, please claim your NFT domain account.The Dmail NFT Domain Account will be sent to your Principal ID account in 24 hours. If you have any problem, please contact to our official email: contact@dmail.ai .</p>
          </div>
          <Table columns={columns} loading={loading} data={data} pageCount={pageCount} fetchData={fetchData} setOpen={setOpen} />
        </Content>
      </Wrapper>
      <WalletDialog
        open = {walletDialog}
        dialogClose = {walletDialogClose}
        getLoginInfo = {getLoginInfo}
        getWalletInstance = {getWalletInstance}
        walletStore = {wallet}
      ></WalletDialog>
      <Alert info={alertInfo} setInfo={setAlertInfo} />
      <Success text={successText} setText={setSuccessText} />
      <ReceiveDialog open={open} setOpen={setOpen} receive={receive} errorIndex={inputErrorIndex} />
    </>
  )
}

export default inject('store')(observer(App))

