import React, {useEffect, useState} from 'react';
import { useHistory, useParams } from "react-router-dom";
import { observer, inject } from 'mobx-react';
import { encode, decode } from 'js-base64';
import Cookies from 'js-cookie'

import Header from '@/components/newheader'
import { OperateBtn, ContentBox} from './css'
import Left from './left'
import Main from './mainpannel'
import ConfirmDetail from './orderConfirmDetail'
import Toast from './toast'
import WalletDialog from './walletDialog'
import {connectWallet} from './utils'
import metamasktipIcon from '@/static/images/presale/metamasktip.png'

const Index = ({ store }) => {
  const walletStore = store.wallet
  const presaleStore = store.presale
  // console.log('wallet.info', walletStore.info ? walletStore.info.address : walletStore.info)

  const history = useHistory();
  const [curId, setCurId] = useState(1)
  const [curItem, setCurItem] = useState({})
  const [step, setStep] = useState(1)
  const [walletDialog, setWalletDialog] = useState(false)
  const [email, setEmail] = useState("")
  const [walletInstance, setWalletInstance] = useState({})
  const [loginInfo, setLoginInfo] = useState({})
  const [account, setAccount] = useState('')
  const [errorToast, setErrorToast] = useState(false)
  const [errorToastMsg, setErrorToastMsg] = useState(false)
  const [toown, setToown] = useState(false)
  const [showName, setShowName] = useState('')
  const [payaction, setPayaction] =  useState(false)
  const [payOrderChild, setPayOrderChild] = useState(null)
  const [vertip, setVertip] = useState(null)

  const {channel_id} = useParams()

  const presaleChange = (item) => {
    // console.log("item:::", item)
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
    // if(operate == "search" && walletStore.info?.address){
    //   return
    // }

    if(operate == "orderpay"){
       setPayaction(true)
    }
    setWalletDialog(true);
  }

  const onRef = (ref) => {
    // console.log("onRef-----:", ref)
    // payOrderChild = ref
    setPayOrderChild(ref)
  }

  const topay = () => {
    // console.log("topay:::=======", payOrderChild)
      payOrderChild.toPay()
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
    // console.log("formartShowName::", address)
    if(!address){return}
    let _name = address.substr(0,5)+"***"+address.substr(address.length-3, address.length)
    // console.log("formartShowName:", _name)
    setShowName(_name)
  }

  const getLoginInfo = (loginInfo) => {
    // console.log("getLoginInfo:::", loginInfo)
    if(loginInfo.code){
      poptoast(loginInfo.msg)
      return;
    }
    setAccount(loginInfo.address)
    walletStore.setWalletInfo(loginInfo)
    setLoginInfo(loginInfo)
    
    formartShowName(loginInfo.address);
    walletDialogClose();
      if(payaction){
        payOrderChild.toPay()
      }
  }

  const getWalletInstance = (instance) => {
    setWalletInstance(instance)
  }

  // useEffect(()=>{
  //   console.log("useEffect:",walletStore.info?.address)
  //   setLoginInfo(walletStore.info)
  //   formartShowName(walletStore.info?.address)

  //   // get info from cookie
  //   // if (!walletStore.info) {
  //   //   const sInfo = Cookies.get('account')
  //   //   if (sInfo) {
  //   //     try {
  //   //       const info = JSON.parse(decode(sInfo))
  //   //       info && walletStore.setWalletInfo(info)
  //   //     } catch (error) {
  //   //       //
  //   //     }
  //   //   }
  //   // }
  // }, [])

  

  const toOwn = () => {
    history.push({ pathname : "/presale_list" ,state : {round: curItem.round}})
    // if (walletStore.info) {
    //   history.push({ pathname : "presale_list" })
    // } else {
    //   setToown(true)
    //   walletDialogShow()
    // }

    // if(loginInfo && loginInfo.address){
    //   history.push({ pathname : "presale_list" , state : {walletName, loginInfo}})
    // }else{
    //   walletDialogShow()
    // }
  }

  const toReferrals = () => { 
    history.push({ pathname : "/referrals" ,state : {round: curItem.round}})
  }


  useEffect(async () => {
    walletStore.info && setLoginInfo(walletStore.info)
    // console.log("presalse effect:::",walletStore.info?.address)
    formartShowName(walletStore.info?.address)
  }, [walletStore.info])

  useEffect(async () => {
    if(walletStore.walletName == "metamask" && step == 2 && walletStore.walletAccountChange){
      setVertip(metamasktipIcon)
      poptoast("Please verify the signature in metamask")
      setTimeout(()=>{
        setVertip(null)
      }, 3000)
    }
  }, [walletStore.walletAccountChange])

  useEffect(async () => {

    if(channel_id){
      presaleStore.setChannelId(channel_id)
    }else{
      const channelId = Cookies.get('channelId')
      channelId && presaleStore.setChannelId(channelId)
    }

    if(walletStore.walletName == "tronlink"){
      walletStore.setWalletInfo({})
      walletStore.setWalletName('')
      Cookies.remove('walletname')
      Cookies.remove('account')
    }
    // if (!walletStore.info) {
    //   const sInfo = Cookies.get('account')
    //   const swalletName = Cookies.get('walletname')
    //   try {
    //     const info = JSON.parse(decode(sInfo))
    //     info && walletStore.setWalletInfo(info)
    //     getLoginInfo(info)
    //     console.log("useEffect------  wallet  info::::: ",info)
    //     const walletName = JSON.parse(decode(swalletName))
    //     walletName && walletStore.setWalletName(walletName)

    //     if(walletName == "tronlink"){
    //       walletStore.setWalletInfo({})
    //       walletStore.setWalletName('')
    //       Cookies.remove('walletname')
    //       Cookies.remove('account')
    //     }
    //   } catch (error) {
    //     //
    //   }
    // }else{
    //   if(walletStore.walletName == "tronlink"){
    //     walletStore.setWalletInfo({})
    //     walletStore.setWalletName('')
    //     Cookies.remove('walletname')
    //     Cookies.remove('account')
    //   }
    // }
  }, [])

  // useEffect(async () => {
    // if(step == 1){return }
    // const swalletName = Cookies.get('walletname')
    // const sInfo = Cookies.get('account')
    // try {
    //   const walletName = JSON.parse(decode(swalletName))
    //   const info = JSON.parse(decode(sInfo))
    //   const walletObj = await connectWallet(walletName, walletStore)
    //   console.log("presale use effect connect wallet::::: ",walletObj)
    //   if(walletObj.code){
    //     console.log("connect wallet error: ", walletObj.msg);
    //     poptoast(walletObj.msg.toString())
    //   }
    //   if(walletName == "plug"){
    //     walletStore.setWalletInfo({
    //       ...info,
    //       address: walletObj.account
    //     })
    //   }
    //   setWalletInstance(walletObj.instance)
    // } catch (error) {
    //     //
    // }
  // }, [step])

  return (
    <>
      <Header />
      <OperateBtn>
        {step == 2 ?
          <span className="connectBtn" 
            onClick = {step == 2 ? walletDialogShow : null}
          >
            {loginInfo?.address ? showName : "Connect wallet"}
          </span>
          : null
        }
        {step == 1 && <span className="ownBtn" onClick={toReferrals}>Referrals</span>}
        <span className="ownBtn" onClick={toOwn}>My orders</span>
      </OperateBtn>
      <ContentBox>
          <div className="leftWrap">
              <Left presaleChange = {presaleChange}  presaleStore = {presaleStore} ></Left>
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
                presaleStore = {presaleStore}
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
                presaleStore = {presaleStore}
                onRef = {onRef}
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
        topay = {topay}
        payaction = {payaction}
        channel = {"buy"}
      ></WalletDialog>
      <Toast
        open = {errorToast}
        type = "warn"
        txt = {errorToastMsg}
        tipimg = {vertip}
      ></Toast>
    </>
  );
}

export default inject('store')(observer(Index))
