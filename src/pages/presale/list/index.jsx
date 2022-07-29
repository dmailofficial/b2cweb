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
import Toast from '../toast'
import {connectWallet} from '../utils'
import metamasktipIcon from '@/static/images/presale/metamasktip.png'
import TronIcon from '@/static/images/presale/tronlink.jpeg'

const isPhone = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)
const columns = isPhone ? 
  [
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
      Header: 'Status',
      accessor: 'status',
    },
    {
      Header: 'Operation',
      accessor: 'operation',
    },
  ] 
  : 
  [
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

  const [vertip, setVertip] = useState(null)
  const [round, setRound] = useState(0)
  
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
    if (!wallet.info || !wallet.info.address || !wallet.info.walletName) {
      return
    }
    const { jwt, address, walletName } = wallet.info
    setLoading(true)
    const params = walletName === 'metamask' ? { jwt } : { is_verify: true }
    // await new Promise((resolve) => setTimeout(resolve, 1000))
    try {
      const res = await axios({
        url: `${baseUrl}/trades`,
        method: 'post',
        data: {
          address,
          page: pageIndex + 1,
          pageSize: pageSize,
          // address: '0xedfAa9fea4275dbaAc341Fd1EE9c782cb838818A',
          ...params,
        },
        // errorTitle: '',
      })
      const { code, data, totalPages, message, success } = res.data
      if (res.data) {
        const list = res.data.data || []
        setPageCount(totalPages || 0)
        setData(list.map(({ created, id, price, product_name, status, tx, nft_id, p_id, network }) => ({
          id,
          date: created,
          product_name,
          domain: `${product_name}@dmail.ai`,
          price: `${price} ${walletName === 'plug' ? 'ICP' : (network === '5656' ? 'BUSD' : 'USDT')}`,
          hash: tx,
          status,
          number: nft_id,
          owner: p_id,
          expirationDate: 'Permanent',
        })))
      }
    } catch (error) {
      console.log(error)      
    }
    setLoading(false)
  }, [wallet.info])

  const [receiveId, setReceiveId] = useState(0);
  const [inputErrorIndex, setInputErrorIndex] = useState(0);
  const receive = useCallback(async (plugAddress, id) => {
    if (!wallet.info || !wallet.info.address || !wallet.info.walletName) {
      return
    }
    const { jwt, walletName } = wallet.info
    const params = walletName === 'metamask' ? { jwt } : { is_verify: true }
    if (id) {
      try {
        const res = await axios({
          url: `${baseUrl}/receivenft`,
          method: 'post',
          data: {
            jwt,
            p_id: plugAddress,
            address,
            // address: '0xedfAa9fea4275dbaAc341Fd1EE9c782cb838818A',
            id,
            ...params,
          },
          // errorTitle: '',
        })
        const { code, message, success } = res.data
        if (success) {
          setReceiveId(0)
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
      // const sInfo = Cookies.get('account')
      // const swalletName = Cookies.get('walletname')
      // try {
      //   walletName = swalletName ? JSON.parse(decode(swalletName)) : ''
      // } catch (error) {
      //   // 
      // }
      // if (!sInfo) {
        setWalletDialog(true)
      // } else {
      //   try {
      //     const info = JSON.parse(decode(sInfo))
      //     info && wallet.setWalletInfo(info)

      //     setTimeout( async ()=>{
      //       const walletObj = await connectWallet(walletName, wallet)
      //       if(walletObj.code){
      //         if(walletObj.code == 3 && walletName == "tronlink"){
      //           setVertip(TronIcon)
      //         }else{
      //           setVertip(null)
      //         }
      //         poptoast(walletObj.msg.toString())
      //       }
      //       if(walletName !== "metamask"){
      //         wallet.setWalletInfo({
      //           ...info,
      //           address: walletObj.account
      //         })
      //       }
      //     }, 500)
      //   } catch (error) {
      //     //
      //   }
      // }
    } else{
      const walletObj = await connectWallet(wallet.walletName, wallet)
      if(walletObj.code){
        poptoast(walletObj.msg.toString())
      }
      if(wallet.walletName !== "metamask"){
        wallet.setWalletInfo({
          ...wallet.info,
          address: walletObj.account
        })
      }
    }

    // if(history.location.state?.round){
    //   setRound(history.location.state?.round)
    // }
    
    // if (history.location.state && history.location.state.round === 1 && wallet.walletName === 'plug') {
    //   Cookies.remove('account');
    //   Cookies.remove('walletname');
    // }
  }, [])

  useEffect(async () => {
    if(wallet.walletName == "metamask" &&  wallet.walletAccountChange){
      setVertip(metamasktipIcon)
      poptoast("Please verify the signature in metamask")
      setTimeout(()=>{
        setVertip(null)
      }, 3000)
    }
  }, [wallet.walletAccountChange])

  return (
    <>
      <Header />
      <Wrapper>
        <ToolBar>
          <div className="left" onClick={goPresale}>
            <i></i>
            <span>My orders</span>
          </div>
          <div className="right">
            <a rel="noopener noreferrer"  onClick={() => setWalletDialog(true)}>{filterAddress  || 'Connect wallet'}</a>
          </div>
        </ToolBar>
        <Content>
          <div className="tip">
            <i></i>
            <p>When the payment is done, please claim your NFT domain account. The Dmail NFT Domain Account will be sent to your Principal ID account in 48 hours. If you have any problem, please contact us via our Discord: <a rel="noopener noreferrer"  href="https://discord.com/invite/5HH4R5KTA3" target="_blank">https://discord.com/invite/5HH4R5KTA3</a></p>
          </div>
          <Table columns={columns} loading={loading} data={data} pageCount={pageCount} fetchData={fetchData} setReceiveId={setReceiveId} />
        </Content>
      </Wrapper>
      <WalletDialog
        open = {walletDialog}
        dialogClose = {walletDialogClose}
        getLoginInfo = {getLoginInfo}
        getWalletInstance = {getWalletInstance}
        walletStore = {wallet}
        round = {round}
      ></WalletDialog>
      <Alert info={alertInfo} setInfo={setAlertInfo} />
      <Success text={successText} setText={setSuccessText} />
      <ReceiveDialog receiveId={receiveId} setReceiveId={setReceiveId} receive={receive} errorIndex={inputErrorIndex} />
      <Toast
        open = {errorToast}
        type = "warn"
        txt = {errorToastMsg}
        tipimg = {vertip}
      ></Toast>
    </>
  )
}

export default inject('store')(observer(App))

