import {login, verifySign} from './request'

export const baseUrl = 'https://pay.dmail.ai'

export const loginAndGetLoginInfo = async (account, wallInstance, walletName, successCallback, faildcallback) => {

    const { success, msg, data } = await login(account);
    let loginInfo = null;

    if(!success){
      console.error("login error!");
      faildcallback && faildcallback();
      return false;
    }
    loginInfo = data;
    if(walletName == "plug"){
      loginInfo = {
        address: account
      }
    }
    if(walletName == "metamask"){
      const { signmessage } = data
      const signRes = await wallInstance.sign(signmessage)
      const [signature, signer] = signRes
      const { success:vsuccess, msg:vmsg, data:vdata } = await verifySign(account, signature)
      if (!vsuccess) {
        console.error(vmsg)
        return false
      }
      const { jwt } = vdata
      loginInfo = {...loginInfo, jwt}
    }
    successCallback && successCallback();

    return loginInfo;
}
