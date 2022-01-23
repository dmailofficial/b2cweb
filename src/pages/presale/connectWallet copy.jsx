import React , {useState} from 'react'
import Dialog from './Dialog'
import Toast from './toast'
import {ConnectWalletBtn} from './css'



function ConnectWallet(params) {
    const {open , type, txt} = params;
    const [walletDialog, setWalletDialog] = useState(false)
    const [toast, setToast] = useState(false)
    const [toastMsg, setToastMsg] = useState(false)

    const walletDialogClose = () => {
        console.log("walletDialogClose");
        setWalletDialog(false);
        console.log("walletDialogClose11111");
        if(toown){
          console.log("walletDialogClose2222");
          setToown(false)
          toOwn()
        }
      }
    
      const walletDialogShow = () => {
        setWalletDialog(true);
      }
    
      const poptoast = (txt) => {
        setToast(true)
        setToastMsg(txt)
    
          setTimeout(()=>{
            setToast(false)
            setToastMsg("")
          }, 3000)
      }

      const handleWallet = async (wallet) => {
        console.log("handle wallet: ", wallet)
        if(!wallet){
            wallet = walletName ? walletName : "metamask";
        }
        setWalletName(wallet)
    
        if(loginInfo && loginInfo.address && wallet == walletName) {
          walletDialogClose()
    
          return {
            ...loginInfo
          }
        }
    
        const _walletInstance = new Wallet(wallet);
        setWalletInstance(_walletInstance);
    
        const walletAccount = await _walletInstance.requestAccounts();
        console.log("walletAccount:::", walletAccount)
        if(walletAccount.code){
            poptoast(walletAccount.msg);
            return;
        }
    
        console.log("walletAccount:::", walletAccount)
        setAccount(walletAccount)
    
        const _loginInfo = await loginAndGetLoginInfo(
            walletAccount, 
            _walletInstance, 
            wallet, 
            successcallback, 
            faildCallback
        );
        setLoginInfo(_loginInfo)
        console.log("loginInfo:::-----", loginInfo)
        walletDialogClose()
    
        return _loginInfo
      }
    



    return (
        <ConnectWalletBtn>
            <span className="connectBtn" onClick = {walletDialogShow}>Connect wallet</span>
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
                open = {toast}
                type = "warn"
                txt = {toastMsg}
                noHeader = {true}
            ></Toast>
        </ConnectWalletBtn>
    )
}

export default ConnectWallet
