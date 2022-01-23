import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import { observer, inject } from 'mobx-react';

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
  const [step, setStep] = useState(1)
  const [walletDialog, setWalletDialog] = useState(false)
  const [email, setEmail] = useState("")
  const [walletName, setWalletName] = useState('')
  const [walletInstance, setWalletInstance] = useState({})
  const [loginInfo, setLoginInfo] = useState({})
  const [account, setAccount] = useState('')
  const [errorToast, setErrorToast] = useState(false)
  const [errorToastMsg, setErrorToastMsg] = useState(false)
  const [toown, setToown] = useState(false)

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

  const walletDialogShow = () => {
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

  const getLoginInfo = (loginInfo) => {
    if(loginInfo.code){
      poptoast(loginInfo.msg)
      return;
    }
    walletStore.setWalletInfo(loginInfo)
    setLoginInfo(loginInfo)
    walletDialogClose();
  }

  useEffect(()=>{
    walletDialogClose()
  }, [loginInfo])

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
        <span className="connectBtn" onClick = {walletDialogShow}>Connect wallet</span>
        <span className="ownBtn" onClick={toOwn}>Own</span>
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
                walletName = {walletName}
                // handleWallet = {handleWallet}
                loginInfo = {loginInfo}
                account = {account}
                activity = {curItem}
              ></Main> : null
            }
            {step == 2 ?
              <ConfirmDetail 
                curId = {curId}
                email = {email}
                back = {backStep1}
                wallet = {walletInstance}
                walletName = {walletName}
                // handleWallet = {handleWallet}
                loginInfo = {loginInfo}
                account = {account}
                toOwn = {toOwn}
              ></ConfirmDetail> : null
            }
          </div>
      </ContentBox>
      <WalletDialog
        open = {walletDialog}
        dialogClose = {walletDialogClose}
        getLoginInfo = {getLoginInfo}
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
