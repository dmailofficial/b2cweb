import {login, verifySign} from './request'
import Wallet from '@/wallet/index'
import { payBaseUrl } from '@/utils/index'

// export const baseUrl = 'https://pay.dmail.ai'
export const baseUrl = process.env.NODE_ENV === 'development' ? 'https://testmail.dmail.ai' : payBaseUrl

export const loginAndGetLoginInfo = async (account, wallInstance, walletName, walletStore, isfirst) => {

    const { success, msg, data } = await login(account);
    let loginInfo = null;

    if(!success){
      // console.error("login error!");
      // faildcallback && faildcallback(msg);
      return {
        code: 1,
        msg: msg
      };
    }
    loginInfo = data;
    if(walletName == "plug"){
      loginInfo = {
        success: true,
        address: account
      }
    }
    if(walletName == "metamask"){
      if(!isfirst){
        walletStore && walletStore.setWalletAccountChange(true)
      }
      const { signmessage } = data
      const signRes = await wallInstance.sign(signmessage)
      console.log("signRes:::",signRes)
      walletStore && walletStore.setWalletAccountChange(false)
      if(signRes.code){
        // faildcallback && faildcallback(signRes)
        return signRes;
      }
      const [signature, signer] = signRes
      const { success:vsuccess, msg:vmsg, data:vdata } = await verifySign(account, signature)
      if (!vsuccess) {
        console.error(vmsg)
        // faildcallback && faildcallback(vmsg)
        return {
          code: 1,
          msg: vmsg,
          data: vdata
        }
      }
      const { jwt } = vdata
      loginInfo = {...loginInfo, jwt}
    }

    // successCallback && successCallback(loginInfo);

    return loginInfo;
}

export const  connectWalletAndLogin = async (wallet, walletStore) => {
  wallet = wallet ? wallet : "metamask";
  // console.log("connectWalletAndLogin::21111::", wallet)
  const _walletInstance = new Wallet({walletName: wallet, accountChangeHandle});
  // console.log("connectWalletAndLogin:::222:", _walletInstance)
  let walletAccount = null
  try {
    walletAccount = await _walletInstance.requestAccounts();
    console.log("connectWalletAndLogin account:", walletAccount)
  } catch (error) {
    console.log("connectWalletAndLogin error:", error)
    return {
      code: 2,
      error: error
    }
  }
  //console.log("connectWalletAndLogin:", walletAccount)
  if(walletAccount.code){
      return walletAccount;
  }
  const userInfo = await accountChangeHandle(walletAccount, "first")
  // console.log("connectWalletAndLogin2222:", userInfo)
  return userInfo;

  async function accountChangeHandle(address, isfirst){
    // console.log("connectWalletAndLogin33333322222:", address)
    if(!address){return false}
    let _loginInfo = await loginAndGetLoginInfo(
        address, 
        _walletInstance,
        wallet,
        walletStore,
        isfirst
    );
    // console.log("connectWalletAndLogin333333:", _loginInfo)
    if(!_loginInfo.address){
        return _loginInfo;
    }
    _loginInfo = {
      ..._loginInfo,
      walletName : wallet
    }
    walletStore && walletStore.setWalletInfo(_loginInfo)
    walletStore && walletStore.setWalletName(wallet)
    return {
      account : walletAccount,
      loginInfo: _loginInfo, 
      walletName: wallet,
      instance: _walletInstance
    }
  }
}

export const  connectWallet = async (wallet, walletStore) => {
    wallet = wallet ? wallet : "metamask";
    const _walletInstance = new Wallet({walletName: wallet, accountChangeHandle});
    let walletAccount = null
    try {
      walletAccount = await _walletInstance.requestAccounts();
    } catch (error) {
      console.log("connectWallet:",walletAccount)
      return {
        code: 2,
        error: error
      }
    }
    if(walletAccount.code){
      return walletAccount;
    }

    return {
      account : walletAccount,
      walletName: wallet,
      instance: _walletInstance
    }

    async function accountChangeHandle(address){
      console.log("connectWalletAndLogin222222 no login:", address)
      if(!address){return false}
      let _loginInfo = await loginAndGetLoginInfo(
          address, 
          _walletInstance,
          wallet,
          walletStore
      );

      console.log("connectWalletAndLogin33333 no login:", walletAccount)
      if(_loginInfo.code){
          return _loginInfo;
      }
      _loginInfo = {
        ..._loginInfo,
        walletName : wallet
      }
      walletStore && walletStore.setWalletInfo(_loginInfo)
      walletStore && walletStore.setWalletName(wallet)
      return {
        account : walletAccount,
        loginInfo: _loginInfo, 
        walletName: wallet,
        instance: _walletInstance
      }
    }

}