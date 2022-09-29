import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useHistory } from "react-router-dom";
import { observer, inject } from 'mobx-react';

import Header from '@/components/newheader'
import { Wrapper, ToolBar, Content, Info } from './css'
import Table from './table'
import TopReferresDialog, { Alert, Success, WithdrawalsRecordDialog } from './dialog'
import WithdrawDialog from './withdrawDialog'
import axios from '@/utils/axios';
import { baseUrl } from '@/pages/presale/utils'
import WalletDialog from '@/pages/presale/walletDialog'
import Toast from '@/pages/presale/toast'
import {connectWallet} from '@/pages/presale/utils'
import { copyTextToClipboard } from '@/utils/index'
import { remainDecimalByString } from '@/utils/'
import Popover from './popover'
import metamasktipIcon from '@/static/images/presale/metamasktip.png'
import { getChannelPrice } from './api'
import { getNetwork } from './utils'

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
  const [withdrawVisible, setWithdrawVisible] = useState(false)
  const [showWithdrawalsRecordPop, setShowWithdrawalsRecordPop] = useState(false)

  const [walletInstance, setWalletInstance] = useState({})
  const [walletDialog, setWalletDialog] = useState(false)

  const [vertip, setVertip] = useState(null)
  const [round, setRound] = useState(0)
  
  const onSelect = (type) => () => setTokenType(type)

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

  const [currentCoin, setCurrentCoin] = useState(0)
  const fetchCurrentCoin = useCallback(async (payType, channelId) => {
    if (!channelId) {
      return
    }
    const balance = await getChannelPrice(getNetwork(payType), channelId)
    setCurrentCoin(balance)
  }, [])

  const pageIndexRef = useRef(0)
  const pageSizeRef = useRef(0)
  const fetchData = useCallback(async ({ pageIndex, pageSize }) => {
    if (!wallet.info || !wallet.info.address || !wallet.info.walletName) {
      return
    }
    pageIndexRef.current = pageIndex
    pageSizeRef.current = pageSize
    const { jwt, address, walletName } = wallet.info
    setLoading(true)
    const params = walletName === 'metamask' ? { jwt } : { is_verify: true }
    if (tokenType === 'icp') {
      params.network = 998
    } else if (tokenType === 'busd') {
      params.network = 5656
    }
    const _address = process.env.NODE_ENV === "development" ? '0xBAB174033c9e8B8a129e8fce58495F2Cfa4A5A3b' : address
    try {
      const res = await axios({
        url: `${baseUrl}/usersrewards`,
        method: 'post',
        data: {
          address: _address,
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
          // commission: totalcommission || 0,
        })
        fetchCurrentCoin(tokenType, user_channel_id)
      } else {
        setInviteInfo(defaultInviteInfo)
      }
      if (success && Array.isArray(data)) {
        setPageCount(totalPages || 0)
        setData(data.map(({ address, buy_count, price_value }, index) => ({
          index: index + 1,
          address: typeof address === 'string' && address.length ?  address.substring(0,6)+"***"+address.substring(address.length-4, address.length) : '',
          buyCount: buy_count,
          priceValue: price_value,
          tokenType
        })))
      } else {
        setPageCount(0)
        setData([])
      }
      if (success && Array.isArray(toplist)) {
        const fToplist = toplist.filter(({ address }) => !!address)
        setTopList(fToplist.slice(0, 20))
      } else {
        setTopList([])
      }
    } catch (error) {
      console.log(error)      
    }
    setLoading(false)
  }, [wallet.info, tokenType])
  const reFetchData = () => {
    fetchData(pageIndexRef.current, pageSizeRef.current)
  }

  const link = `https://dmail.ai/presale/${inviteInfo.channelId}`
  const onCopy = () => {
    copyTextToClipboard(link)
  }

  const viewTopReferres = () => {
    setTopReferresVisible(true)
  }

  const onWithdraw = () => {
    if (inviteInfo.channelId === '--') {
      return
    }

    setWithdrawVisible(true)
    // setAlertInfo({
    //   title: 'Your refferal rewards will be open for withdraw after the NFT presale.',
    //   isError: false,
    // })
  }

  const twitterShare = link => `https://twitter.com/share?text=I am saying "Hi" to you via global 1st Decentralized Mailbox Dmail Network!%0A%0ACome to pick your favorite Dmail NFT Domain Account, permanent %26 safer, surf with me in the Web3 era: ${link}%0A%0A%23DmailNetwork %23Web3 %23DID %23NFT %23Domain&url=`

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
                {/* <div>
                  <span>Commission:</span>
                  {topList.length ? <a className='view' onClick={viewTopReferres}>View top referres</a> : '--'}
                </div> */}
                <p className='usdt btns'>
                  <span className={'coin'}>
                    {remainDecimalByString(currentCoin, 4)}
                  </span>
                  <span className='unit'>{tokenType.toUpperCase()}</span>
                </p>
                <p className='btns'>
                {inviteInfo.channelId !== '--' ? <a className='withdraw' onClick={onWithdraw}>withdraw</a> : null}
                </p>
                {inviteInfo.channelId !== '--' ? <p className="text" style={{ cursor: 'pointer' }} onClick={() => setShowWithdrawalsRecordPop(true)}>Withdraw record</p> : null}
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
                <p onClick={() => setTokenType('busd')}>
                  <span className={`raInput ${tokenType === 'busd' ? 'checked' : ''}`}><span></span></span>
                  <span>BUSD</span>
                </p>
                <p onClick={() => setTokenType('icp')}>
                  <span className={`raInput ${tokenType === 'icp' ? 'checked' : ''}`}><span></span></span>
                  <span>ICP</span>
                </p>
              </div>
              <div>
                <span className='text'>Number of invitees: {inviteInfo.inviteNum}</span>
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
      <WithdrawDialog
        loginAddress={address}
        loading={loading}
        available={currentCoin}
        tokenType={tokenType}
        payTypeSelect={onSelect}
        channelId={inviteInfo.channelId}
        reFetchData={reFetchData}
        visible={withdrawVisible}
        setVisible={setWithdrawVisible}
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
      <WithdrawalsRecordDialog
        tokenType={tokenType}
        channelId={inviteInfo.channelId}
        visible={showWithdrawalsRecordPop}
        setVisible={setShowWithdrawalsRecordPop}
      />
    </>
  )
}

export default inject('store')(observer(App))

