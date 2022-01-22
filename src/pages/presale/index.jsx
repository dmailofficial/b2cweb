import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import Header from '@/components/newheader'
import { OperateBtn, ContentBox ,WalletWrap} from './css'
import Left from './left'
import Main from './mainpannel'
import ConfirmDetail from './orderConfirmDetail'
import Dialog from './Dialog'
import Toast from './toast'
import Wallet from '@/wallet/index'
import { loginAndGetLoginInfo } from './utils'

import metamask from '@/static/images/presale/metamask@2x.png'
import plug from '@/static/images/presale/plug-logo@2x.png'


const Index = () => {

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

    if(loginInfo && loginInfo.address) {
      walletDialogClose()

      return {
        ...loginInfo
      }
    }

    const _walletInstance = new Wallet(wallet);
    setWalletInstance(_walletInstance);

    const walletAccount = await _walletInstance.requestAccounts();
    console.log("walletAccount:::", walletAccount)
    setAccount(walletAccount)

    const _loginInfo = await loginAndGetLoginInfo(walletAccount, _walletInstance, wallet);
    setLoginInfo(_loginInfo)
    console.log("loginInfo:::-----",_loginInfo)
    walletDialogClose()

    return _loginInfo
  }

  const toOwn = () => {
    if(loginInfo && loginInfo.address){
      history.push({ pathname : "presale_list" , state : loginInfo})
    }else{
      walletDialogShow()
    }
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
                handleWallet = {handleWallet}
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
