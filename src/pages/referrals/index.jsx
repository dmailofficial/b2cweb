import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useHistory } from "react-router-dom";
import { observer, inject } from 'mobx-react';

import Header from '@/components/newheader'
import { Wrapper, ToolBar, Content } from './css'
import Table from './table'
import ReceiveDialog, { Alert, Success } from './dialog'
import axios from '@/utils/axios';
import { baseUrl } from '@/pages/presale/utils'
import WalletDialog from '@/pages/presale/walletDialog'
import Toast from '@/pages/presale/toast'
import {connectWallet} from '@/pages/presale/utils'
import metamasktipIcon from '@/static/images/presale/metamasktip.png'
import { copyTextToClipboard } from '@/utils/index'

const columns = [
  {
    Header: 'NO.',
    accessor: 'no',
  },
  {
    Header: 'Invitees',
    accessor: 'invitees',
  },
  {
    Header: 'Order Quantity',
    accessor: 'quantity',
  },
  {
    Header: 'Total amount',
    accessor: 'total',
  },
] 
  
function App({ store: { wallet } }) {
  const address = wallet.info && wallet.info.address || ''
  const walletName = wallet.info && wallet.info.walletName || ''
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

  const [link, setLink] = useState('--')
  
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
      console.log(error)      
    }
    setLoading(false)
  }, [wallet.info])

  const onCopy = () => {
    copyTextToClipboard(link)
  }

  useEffect(async () => {
    if (!wallet.info) {
      setWalletDialog(true)
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
            <span>Referrals</span>
          </div>
          <div className="right">
            <a rel="noopener noreferrer"  onClick={() => setWalletDialog(true)}>{filterAddress  || 'Connect wallet'}</a>
          </div>
        </ToolBar>
        <Content>
          <div className="tip">
            <p>
              Get 5% commision by inviting your friends to purchase and successfully claim NFT. You may withdraw after the preslae event.<br /> Referral link:&nbsp;&nbsp;
              {
                link === '--' ? '--' : (
                  <>
                    <a rel="noopener noreferrer" href={link} target="_blank">{link}</a>
                    <i onClick={onCopy}></i>
                  </>
                )
              }
            </p>
          </div>
          <div className="tabel-wrapper">
            <div className="tokens">
              <div className='select'>
                <span>Tokens:</span>
                <p onClick={() => setWalletDialog(true)}>
                  <span className={`raInput ${walletName === 'metamask' ? 'checked' : ''}`}><span></span></span>
                  <span>USDT</span>
                </p>
                <p onClick={() => setWalletDialog(true)}>
                  <span className={`raInput ${walletName === 'plug' ? 'checked' : ''}`}><span></span></span>
                  <span>ICP</span>
                </p>
              </div>
              <span className='text'>Number of invites: 211</span>
              <span className='text'>Total orders: 32</span>
              <span className='text' style={{ marginRight: '62px' }}>Total amount: 3214.112</span>
              <span className='text'>Commission: 21321.22</span>
            </div>
            <Table columns={columns} loading={loading} data={data} pageCount={pageCount} fetchData={fetchData} />
          </div>
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

