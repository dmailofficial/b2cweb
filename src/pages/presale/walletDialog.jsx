import React , {useState, useEffect} from 'react'
import Dialog from './Dialog'
import Toast from './toast'
import Wallet from '@/wallet/index'
import {WalletWrap} from './css'
import { loginAndGetLoginInfo } from './utils'

import metamaskIcon from '@/static/images/presale/metamask@2x.png'
import plugIcon from '@/static/images/presale/plug-logo@2x.png'
import loadingIcon from '@/static/images/presale/paying@3x.png'

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
    const {open , dialogClose, getLoginInfo, getWalletInstance, walletStore} = params;
    const [walletName, setWalletName] = useState('')
    // const [loginInfo, setLoginInfo] = useState({})
    // const [account, setAccount] = useState('')
    // const [toast, setToast] = useState(false)
    // const [toastType, setToastType] = useState("warn")
    // const [toastMsg, setToastMsg] = useState("")
    const [showloading, setShowloading] = useState(false)
  
    const walletDialogClose = () => {
        dialogClose()
    }

    const poptoast = (txt,type, isInfinite) => {
        setShowloading(true)
        // setToast(true)
        // setToastType(type || "warn")
        // setToastMsg(txt)

        // setTimeout(()=>{
        //     if(isInfinite){return}
        //     closePoptoast()
        // }, 3000)
    }
    const closePoptoast = () =>{
        setShowloading(false)
        // setToast(false)
        // setToastType("warn")
        // setToastMsg('')
    }


    const successcallback = async (data) => {
      console.log("success:", data);
    }
    
    const faildCallback = async (data, wallet) => {
      console.log("faildCallback::::", data)
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
      // setWalletName(wallet)
      const _walletInstance = new Wallet(wallet);

            getWalletInstance(_walletInstance)
            walletStore.setWalletName(wallet)
            setWalletName(wallet)
           
      let _address = walletStore.info?.address;
      
      if(_address && wallet == walletName) {
        walletDialogClose()
        getLoginInfo(walletStore.info)
        return 
      }
      
      poptoast("Connect processing", "loading", true)
      const walletAccount = await _walletInstance.requestAccounts();
      
      if(walletAccount.code){
          faildCallback(walletAccount, wallet)
          closePoptoast()
          return;
      }
      // setAccount(walletAccount)
      accountChangeHandle(walletAccount)

      _walletInstance.listenerAccountsChanged(accountChangeHandle)

      async function accountChangeHandle(address){
        if(!address){return}
        console.log("accountChangeHandle::_loginInfo:111:", address)
        let _loginInfo = await loginAndGetLoginInfo(
            address, 
            _walletInstance,
            wallet,
            successcallback,
            faildCallback
        );
        console.log("accountChangeHandle::_loginInfo::222222", _loginInfo)
        if(_loginInfo.code){
            faildCallback(_loginInfo, wallet)
            closePoptoast()
            return;
        }
        // console.log("accountChangeHandle::_loginInfo::3333333", _loginInfo, wallet)
        _loginInfo = {
          ..._loginInfo,
          walletName : wallet
        }
        closePoptoast()
        walletDialogClose()
        walletStore.setWalletInfo(_loginInfo)
        getLoginInfo(_loginInfo)
        return
      }
    }

    

    useEffect(()=>{
      setWalletName(walletStore?.walletName)
    },[open])
    
    return (
        <Dialog
            open = { open }
            title ={"Connect to a wallet"}
            dialogClose = { walletDialogClose }
            maxWidth={"xs"}
        >
            <WalletWrap>
              {
                walletList.map((wallet, i)=>{
                    return (
                      <div className="walletItem" onClick={()=>handleWallet(wallet.code)} key={wallet.name}>
                          <span>{wallet.name}</span>
                          {
                            showloading && walletName == wallet.code ?
                              <img src={loadingIcon} className="loading"></img>:null
                          }
                          <span className="walletLogo">
                            <img src={wallet.icon}></img>
                          </span>
                      </div>
                    )
                })
              }
            </WalletWrap>
            {/* <Toast
                open = {toast}
                type = {toastType}
                txt = {toastMsg}
                noHeader = {true}
            ></Toast> */}
        </Dialog>
    )
}

export default WalletDialog
