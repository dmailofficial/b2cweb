import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useHistory } from "react-router-dom";
import { observer, inject } from 'mobx-react';

import Header from '@/components/newheader'
import { Wrapper, ToolBar, Content, Info } from './css'
import Table from './table'
import TopReferresDialog, { Alert, Success } from './dialog'
import axios from '@/utils/axios';
import { baseUrl } from '@/pages/presale/utils'
import WalletDialog from '@/pages/presale/walletDialog'
import Toast from '@/pages/presale/toast'
import {connectWallet} from '@/pages/presale/utils'
import { copyTextToClipboard } from '@/utils/index'
import { remainDecimalByString } from '@/utils/'
import Popover from './popover'
import metamasktipIcon from '@/static/images/presale/metamasktip.png'

const defaultInviteInfo = {
  channelId: '--',
  inviteNum: '--',
  totalOrders: '--',
  totalAmount: '--',
  commission: '--',
}
function App({ store: { wallet } }) {
  const address = wallet.info && wallet.info.address || ''
  const walletName = wallet.info && wallet.info.walletName || ''
  const filterAddress = typeof address === 'string' && address.length ?  address.substring(0,6)+"***"+address.substring(address.length-4, address.length) : ''

  const history = useHistory();
  const [tokenType, setTokenType] = useState('usdt')
  const [inviteInfo, setInviteInfo] = useState(defaultInviteInfo)
  const [data, setData] = useState([])
  const [topList, setTopList] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [alertInfo, setAlertInfo] = useState(null)
  const [topReferresVisible, setTopReferresVisible] = useState(false)
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
    if (tokenType === 'icp') {
      params.network = 998
    }
    try {
      const res = await axios({
        url: `${baseUrl}/usersrewards`,
        method: 'post',
        data: {
          address,
          page: pageIndex + 1,
          pageSize: pageSize,
          ...params,
        },
        // errorTitle: '',
      })
      const { data, toplist, totalPages, totalCount, totalValus, totalTx, totalcommission, user_channel_id, success } = res.data
      if (success && user_channel_id) {
        setInviteInfo({
          channelId: user_channel_id,
          inviteNum: totalCount || 0,
          totalOrders: totalTx || 0,
          totalAmount: totalValus || 0,
          commission: totalcommission || 0,
        })
      } else {
        setInviteInfo(defaultInviteInfo)
      }
      if (success && Array.isArray(data)) {
        setPageCount(totalPages || 0)
        setData(data.map(({ address, buy_count, price_value }, index) => ({
          index: index + 1,
          address: typeof address === 'string' && address.length ?  address.substring(0,6)+"***"+address.substring(address.length-4, address.length) : '',
          buyCount: buy_count, priceValue: price_value, tokenType
        })))
      } else {
        setPageCount(0)
        setData([])
      }
      if (success && Array.isArray(toplist)) {
        setTopList(toplist.slice(0, 20))
      } else {
        setTopList([])
      }
    } catch (error) {
      console.log(error)      
    }
    setLoading(false)
  }, [wallet.info, tokenType])

  const link = `https://dmail.ai/presale/${inviteInfo.channelId}`
  const onCopy = () => {
    copyTextToClipboard(link)
  }

  const viewTopReferres = () => {
    setTopReferresVisible(true)
  }

  const onWithdraw = () => {
    setAlertInfo({
      title: 'Your refferal rewards will be open for withdraw after the NFT presale.',
      isError: false,
    })
  }

  const twitterShare = link => `https://twitter.com/share?text=I am saying "Hi" to you by the global first decentralized mailbox Dmail Network! Come to choose your favorite Dmail Domain Account, surf with me in the Web3 era, it will be permanently available and absolutely safe: ${link}&url=`

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
          <Info>
            <ul>
              <li className='commission'>
                <div>
                  <span>Commission:</span>
                  {/* {topList.length ? <a className='view' onClick={viewTopReferres}>View top referres</a> : '--'} */}
                </div>
                <p className='usdt btns'>
                  <span className={inviteInfo.commission !== '--' ? 'coin' : ''}>
                    {remainDecimalByString(inviteInfo.commission, 4)}
                  </span>
                  <span className='unit'>{inviteInfo.commission !== '--' ? tokenType.toUpperCase() : null}</span>
                  {inviteInfo.channelId !== '--' ? <a className='withdraw disabled' onClick={onWithdraw}>withdraw</a> : null}
                </p>
                <p className='btns'>
                </p>
              </li>
              <li className='referral'>
                <div>
                  <span>Referral link:</span> 
                  {
                    inviteInfo.channelId === '--' ? '--' : (
                      <>
                        <span onClick={onCopy} className="copy">{link}</span>
                        <Popover />
                      </>
                    )
                  }
                </div>
                {inviteInfo.channelId === '--' ? null : (
                  <p className='btns'>
                    <a href={twitterShare(link)} target="_blank" className='share'><i></i>share</a>
                  </p>
                )}
              </li>
            </ul>
          </Info>
          <div className="table-wrapper">
            <div className="tokens">
              <div className='select'>
                <span>Payment:</span>
                <p onClick={() => setTokenType('usdt')}>
                  <span className={`raInput ${tokenType === 'usdt' ? 'checked' : ''}`}><span></span></span>
                  <span>USDT</span>
                </p>
                <p onClick={() => setTokenType('icp')}>
                  <span className={`raInput ${tokenType === 'icp' ? 'checked' : ''}`}><span></span></span>
                  <span>ICP</span>
                </p>
              </div>
              <div>
                <span className='text'>Number of invites: {inviteInfo.inviteNum}</span>
                <span className='text'>Total orders: {inviteInfo.totalOrders}</span>
                <span className='text' style={{ marginRight: '0' }}>Total amount: {remainDecimalByString(inviteInfo.totalAmount, 4)} {inviteInfo.totalAmount !== '--' ? tokenType.toUpperCase() : null}</span>
              </div>
            </div>
            <Table loading={loading} data={data} pageCount={pageCount} fetchData={fetchData} />
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
      />
      <Alert info={alertInfo} setInfo={setAlertInfo} />
      <Success text={successText} setText={setSuccessText} />
      <Toast
        open = {errorToast}
        type = "warn"
        txt = {errorToastMsg}
        tipimg = {vertip}
      />
      <TopReferresDialog
        data={topList}
        visible={topReferresVisible}
        setVisible={setTopReferresVisible}
      />
    </>
  )
}

export default inject('store')(observer(App))
