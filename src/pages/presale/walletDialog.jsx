import React , {useState} from 'react'
import Dialog from './Dialog'
import Toast from './toast'
import Wallet from '@/wallet/index'
import {WalletWrap} from './css'
import { loginAndGetLoginInfo } from './utils'

import metamaskIcon from '@/static/images/presale/metamask@2x.png'
import plugIcon from '@/static/images/presale/plug-logo@2x.png'

const walletList = [
  {
    code: "metamask",
    name: "MetaMask",
    icon: metamaskIcon
  },
  {
    code: "plug",
    name: "Plug",
    icon: plugIcon
  }
]

function WalletDialog(params) {
    const {open , dialogClose, getLoginInfo, getWalletInstance} = params;
    const [walletName, setWalletName] = useState('')
    const [loginInfo, setLoginInfo] = useState({})
    const [account, setAccount] = useState('')
    const [toast, setToast] = useState(false)
    const [toastType, setToastType] = useState("warn")
    const [toastMsg, setToastMsg] = useState("")
  
    const walletDialogClose = () => {
        dialogClose()
    }

    const poptoast = (txt,type, isInfinite) => {
        setToast(true)
        setToastType(type || "warn")
        setToastMsg(txt)

        setTimeout(()=>{
            if(isInfinite){return}
            closePoptoast()
        }, 3000)
    }
    const closePoptoast = () =>{
        setToast(false)
        setToastType("warn")
        setToastMsg('')
    }


    const successcallback = async (data) => {
      console.log("success:", data);
    }
    
    const faildCallback = async (data, wallet) => {
      let _msg = null;
       _msg = data.msg ? data.msg.toString() : data.message;
      
      getLoginInfo({
        code: 1,
        msg: _msg
      })
    }

    const handleWallet = async (wallet) => {
      if(!wallet){
          wallet = walletName ? walletName : "metamask";
      }
      setWalletName(wallet)
  
      if(loginInfo && loginInfo.address && wallet == walletName) {
        loginInfo.walletName = wallet
        walletDialogClose()
        getLoginInfo(loginInfo)
        return {
          ...loginInfo
        }
      }
  
      const _walletInstance = new Wallet(wallet);
      getWalletInstance(_walletInstance)
      poptoast("Connect processing", "loading", true)
      const walletAccount = await _walletInstance.requestAccounts();
      
      if(walletAccount.code){
          faildCallback(walletAccount, wallet)
          closePoptoast()
          return;
      }
  
      setAccount(walletAccount)
  
      const _loginInfo = await loginAndGetLoginInfo(
          walletAccount, 
          _walletInstance, 
          wallet, 
          successcallback, 
          faildCallback
      );
      if(_loginInfo.code){
          faildCallback(_loginInfo, wallet)
          closePoptoast()
          return;
      }
      _loginInfo.walletName = wallet
      setLoginInfo(_loginInfo)
      closePoptoast()
      walletDialogClose()
      getLoginInfo(_loginInfo)
      return null
    }
    
    return (
        <Dialog
            open = { open }
            dialogClose = { walletDialogClose }
        >
            <WalletWrap>
              {
                walletList.map((wallet, i)=>{
                    return (
                      <div className="walletItem" onClick={()=>handleWallet(wallet.code)} key={wallet.name}>
                          <span>{wallet.name}</span>
                          <span className="walletLogo">
                          <img src={wallet.icon}></img>
                          </span>
                      </div>
                    )
                })
              }
            </WalletWrap>
            <Toast
                open = {toast}
                type = {toastType}
                txt = {toastMsg}
                noHeader = {true}
            ></Toast>
        </Dialog>
    )
}

export default WalletDialog
