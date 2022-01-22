import React, {useEffect, useState} from 'react';

import Header from '@/components/newheader'
import { OperateBtn, ContentBox ,WalletWrap} from './css'
import Left from './left'
import Main from './mainpannel'
import ConfirmDetail from './orderConfirmDetail'
import Dialog from './Dialog'
import Wallet from '@/wallet/index'
import {login } from './request'

import metamask from '@/static/images/presale/metamask@2x.png'
import plug from '@/static/images/presale/plug-logo@2x.png'
import Account from '../account2';


const Index = () => {
  const [curId, setCurId] = useState(1)
  const [step, setStep] = useState(1)
  const [walletDialog, setWalletDialog] = useState(false)
  const [address, setAddress] = useState("")
  const [wallet, setWallet] = useState({})
  const [loginInfo, setLoginInfo] = useState({})
  const [account, setAccount] = useState('')

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

  const handleWallet = async (wallet) => {
    const _wallet = new Wallet(wallet);
    setWallet(_wallet);
    const account = await _wallet.requestAccounts();
    console.log("account: ", account)
    setAccount(account)

    const { success, msg, data } = await login(account);
    console.log("login info: ", loginInfo)
    if(!success){
      alert("login error!")
      return false;
    }
    setLoginInfo(data);
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
                wallet = {wallet}
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
                wallet = {wallet}
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
          <div className="walletItem">
            <span>Plug</span>
            <span className="walletLogo">
              <img src={plug}></img>
            </span>
          </div>
        </WalletWrap>
      </Dialog>
    </>
  );
}

export default Index;
