import React , {useState, useEffect} from 'react'
import Dialog from './Dialog'
import Toast from './toast'
import Wallet from '@/wallet/index'
import {WalletWrap} from './css'
import { loginAndGetLoginInfo, connectWalletAndLogin } from './utils'

import metamaskIcon from '@/static/images/presale/metamask@2x.png'
import plugIcon from '@/static/images/presale/plug-logo@2x.png'
import TronIcon from '@/static/images/presale/tronlink.jpeg'
import loadingIcon from '@/static/images/presale/paying@3x.png'

const walletList = [
  {
    code: "metamask",
    name: "MetaMask",
    icon: metamaskIcon,
    specify:false,
  },
  {
    code: "plug",
    name: "Plug",
    icon: plugIcon,
    specify: true,
    include: [],
    exclude: [1],
  },
  {
    code: "tronlink",
    name: "TronLink",
    icon: TronIcon,
    specify: true,
    include: [1],
    exclude: [],
  }
  
]

function WalletDialog(params) {
  // console.log("WalletDialog::", params)
    const {open , dialogClose, getLoginInfo, getWalletInstance, walletStore, channel} = params;
    const [walletName, setWalletName] = useState('')
    const [toast, setToast] = useState(false)
    const [toastType, setToastType] = useState("warn")
    const [toastMsg, setToastMsg] = useState("")
    const [showloading, setShowloading] = useState(false)
    const [vertip, setVertip] = useState(null)
  
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
      // console.log("faildCallback::::", data)
      let _msg = null;
       _msg = data.msg ? data.msg.toString() : data.message;
      
      getLoginInfo({
        code: data.code,
        msg: _msg
      })
    }

    const handleWallet = async (wallet, callback) => {
      if(!wallet){
          wallet = walletName ? walletName : "metamask";
      }
      setWalletName(wallet)

      let _address = walletStore.info?.address;
      
      if(_address && wallet == walletName) {
        walletDialogClose()
        getLoginInfo(walletStore.info)
        return 
      }

      setShowloading(true)
      const connectObj = await connectWalletAndLogin(wallet, walletStore);
      // console.log("connectObj:::", connectObj);
      if(!connectObj.account){
          if(connectObj.code == 3 && wallet == "tronlink"){
            setVertip(TronIcon)
          }else{
            setVertip(null)
          }
          poptoast(connectObj.msg.toString());
          // faildCallback(connectObj)
          setShowloading(false)
          return;
      }
      // account : walletAccount,
      // loginInfo: _loginInfo, 
      // walletName: wallet,
      // instance: _walletInstance
      //-------up backup
      // setShowloading(false)
      setWalletName(connectObj.walletName)
      getWalletInstance(connectObj.instance)
      getLoginInfo(connectObj.loginInfo)
      walletDialogClose()

    }

    

    useEffect(()=>{
      setWalletName(walletStore?.walletName)
      setShowloading(false)
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
                  // if(!wallet.specify || (wallet.specify && ((wallet.include.length>0 && wallet.include.indexOf(round) > -1) || (wallet.exclude.length > 0 && wallet.exclude.indexOf(round) < 0))) )
                  if((channel == "buy" && wallet.code !== "tronlink") || channel != "buy")
                    return (
                      <div className="walletItem" onClick={()=>handleWallet(wallet.code)} key={wallet.name}>
                          <span>{wallet.name}</span>
                          {
                            showloading && walletName == wallet.code ?
                              <img src={loadingIcon} className="loading"></img>:null
                          }
                          <span className="walletLogo">
                            <img className={wallet.code} src={wallet.icon}></img>
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
                tipimg = {vertip}
            ></Toast>
        </Dialog>
    )
}

export default WalletDialog
