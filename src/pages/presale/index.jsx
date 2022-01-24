import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import { observer, inject } from 'mobx-react';
import { encode, decode } from 'js-base64';
import Cookies from 'js-cookie'

import Header from '@/components/newheader'
import { OperateBtn, ContentBox ,WalletWrap} from './css'
import Left from './left'
import Main from './mainpannel'
import ConfirmDetail from './orderConfirmDetail'
import Dialog from './Dialog'
import Toast from './toast'
import Wallet from '@/wallet/index'
import WalletDialog from './walletDialog'
import { loginAndGetLoginInfo } from './utils'

const Index = ({ store }) => {
  const walletStore = store.wallet
  console.log('wallet.info', walletStore.info ? walletStore.info.address : walletStore.info)

  const history = useHistory();
  const [curId, setCurId] = useState(1)
  const [curItem, setCurItem] = useState({})
  const [step, setStep] = useState(2)
  const [walletDialog, setWalletDialog] = useState(false)
  const [email, setEmail] = useState("")
  const [walletInstance, setWalletInstance] = useState({})
  const [loginInfo, setLoginInfo] = useState({})
  const [account, setAccount] = useState('')
  const [errorToast, setErrorToast] = useState(false)
  const [errorToastMsg, setErrorToastMsg] = useState(false)
  const [toown, setToown] = useState(false)
  const [showName, setShowName] = useState('')

  const presaleChange = (item) => {
    let id = item.id;
    setCurItem(item)
    setCurId(id)
    if(id !== curId){
      setStep(1)
    }
  }

  const toNextStep = (email) => {
    setEmail(email)
    setCurId(curId)
    setStep(2)
  }
  const backStep1 = () => {
    setStep(1)
  }

  const walletDialogClose = () => {
    setWalletDialog(false);

    if(toown){
      setToown(false)
      toOwn()
    }
  }

  const walletDialogShow = (operate) => {
    if(operate == "search" && walletStore.info?.address){
      return
    }
    setWalletDialog(true);
  }

  const poptoast = (txt) => {
    setErrorToast(true)
    setErrorToastMsg(txt)

    setTimeout(()=>{
      setErrorToast(false)
      setErrorToastMsg("")
    }, 3000)
  }

  const formartShowName = (address = "") => {
    let _name = address.substr(0,6)+"***"+address.substr(address.length-4, address.length)
    console.log("formartShowName:", _name)
    setShowName(_name)
  }

  const getLoginInfo = (loginInfo) => {
    if(loginInfo.code){
      poptoast(loginInfo.msg)
      return;
    }
    setAccount(loginInfo.address)
    walletStore.setWalletInfo(loginInfo)
    setLoginInfo(loginInfo)
    
    formartShowName(loginInfo.address);
    walletDialogClose();
  }

  const getWalletInstance = (instance) => {
    setWalletInstance(instance)
  }

  useEffect(()=>{
    console.log("useEffect:",walletStore.info?.address)
    setLoginInfo(walletStore.info)
    formartShowName(walletStore.info?.address)

    // get info from cookie
    // if (!walletStore.info) {
    //   const sInfo = Cookies.get('account')
    //   if (sInfo) {
    //     try {
    //       const info = JSON.parse(decode(sInfo))
    //       info && walletStore.setWalletInfo(info)
    //     } catch (error) {
    //       //
    //     }
    //   }
    // }
  }, [])

  const toOwn = () => {
    if (walletStore.info) {
      history.push({ pathname : "presale_list" })
    } else {
      setToown(true)
      walletDialogShow()
    }
    // if(loginInfo && loginInfo.address){
    //   history.push({ pathname : "presale_list" , state : {walletName, loginInfo}})
    // }else{
    //   walletDialogShow()
    // }
  }

  return (
    <>
      <Header />
      <OperateBtn>
        <span className="connectBtn" onClick = {step == 1 ? walletDialogShow : null}>{loginInfo?.address ? showName : "Connect wallet"}</span>
        <span className="ownBtn" onClick={toOwn}>ORDERS</span>
      </OperateBtn>
      <ContentBox>
          <div className="leftWrap">
              <Left presaleChange = {presaleChange}></Left>
          </div>
          <div className="main">
            {step == 1 ?
              <Main 
                curId = {curId}
                toNextStep = {toNextStep}
                wallet = {walletInstance}
                handleWallet = {walletDialogShow}
                loginInfo = {loginInfo}
                account = {account}
                activity = {curItem}
                walletStore = {walletStore}
              ></Main> : null
            }
            {step == 2 ?
              <ConfirmDetail 
                curId = {curId}
                email = {email}
                back = {backStep1}
                wallet = {walletInstance}
                handleWallet = {walletDialogShow}
                loginInfo = {loginInfo}
                account = {account}
                toOwn = {toOwn}
                walletStore = {walletStore}
              ></ConfirmDetail> : null
            }
          </div>
      </ContentBox>
      <WalletDialog
        open = {walletDialog}
        dialogClose = {walletDialogClose}
        getLoginInfo = {getLoginInfo}
        getWalletInstance = {getWalletInstance}
        walletStore = {walletStore}
      ></WalletDialog>
      <Toast
        open = {errorToast}
        type = "warn"
        txt = {errorToastMsg}
        noHeader = {true}
      ></Toast>
    </>
  );
}

export default inject('store')(observer(Index))
