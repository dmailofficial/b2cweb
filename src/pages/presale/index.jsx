import React, {useEffect, useState} from 'react';

import Header from '@/components/newheader'
import { OperateBtn, ContentBox ,WalletWrap} from './css'
import Left from './left'
import Main from './mainpannel'
import ConfirmDetail from './orderConfirmDetail'
import Dialog from './Dialog'
import Toast from './toast'
import Wallet from '@/wallet/index'
import {login, verifySign} from './request'
import { loginAndGetLoginInfo } from './utils'

import metamask from '@/static/images/presale/metamask@2x.png'
import plug from '@/static/images/presale/plug-logo@2x.png'


const Index = () => {
  const [curId, setCurId] = useState(1)
  const [step, setStep] = useState(2)
  const [walletDialog, setWalletDialog] = useState(false)
  const [address, setAddress] = useState("")
  const [walletName, setWalletName] = useState('')
  const [walletInstance, setWalletInstance] = useState({})
  const [loginInfo, setLoginInfo] = useState({})
  const [account, setAccount] = useState('')
  const [errorToast, setErrorToast] = useState(false)
  const [errorToastMsg, setErrorToastMsg] = useState(false)

  const presaleChange = (id) => {
    setCurId(id)
    if(id !== curId){
      setStep(1)
    }
  }

  const toNextStep = (address) => {
    setAddress(address)
    setCurId(curId)
    setStep(2)
  }
  const backStep1 = () => {
    setStep(1)
  }

  const walletDialogClose = () => {
    setWalletDialog(false);
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

  const handleWallet = async (wallet) => {
    console.log("handle wallet: ", wallet)
    if(!wallet){
        wallet = walletName ? walletName : "metamask";
    }
    setWalletName(wallet)
    const _walletInstance = new Wallet(wallet);
    setWalletInstance(_walletInstance);

    const walletAccount = await _walletInstance.requestAccounts();
    console.log("walletAccount:::", walletAccount)
    setAccount(walletAccount)

    const loginInfo = await loginAndGetLoginInfo(walletAccount, _walletInstance, wallet);
    
    console.log("loginInfo:::-----",loginInfo)

    walletDialogClose()
    
  }

  return (
    <>
      <Header />
      <OperateBtn>
        <span className="connectBtn" onClick = {walletDialogShow}>Connect wallet</span>
        <span className="ownBtn">Own</span>
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
                handleWallet = {handleWallet}
                loginInfo = {loginInfo}
                account = {account}
              ></Main> : null
            }
            {step == 2 ?
              <ConfirmDetail 
                curId = {curId}
                address = {address}
                back = {backStep1}
                wallet = {walletInstance}
                handleWallet = {handleWallet}
                loginInfo = {loginInfo}
                account = {account}
              ></ConfirmDetail> : null
            }
          </div>
      </ContentBox>
      <Dialog
        open = { walletDialog }
        dialogClose = { walletDialogClose }
      >
        <WalletWrap>
          <div className="walletItem" onClick={()=>handleWallet("metamask")}>
            <span>Metamask</span>
            <span className="walletLogo">
              <img src={metamask}></img>
            </span>
          </div>
          <div className="walletItem" onClick={()=>handleWallet("plug")}>
            <span>Plug</span>
            <span className="walletLogo">
              <img src={plug}></img>
            </span>
          </div>
        </WalletWrap>
      </Dialog>
      <Toast
        open = {errorToast}
        type = "warn"
        txt = {errorToastMsg}
        noHeader = {true}
      ></Toast>
    </>
  );
}

export default Index;
