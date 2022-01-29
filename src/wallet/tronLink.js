import BigNumber from "bignumber.js";
import { setNumber } from './setByNumber'
import { TRC_abi } from './abis'
import { touchRippleClasses } from "@mui/material";

const TronAbiMap = {
  contractAddress: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
  abi: TRC_abi,
  toAddress: 'TGQeDqyZk4hW6FLjq8h6adZ9xaCMWPXozt',
  decimals: 6,
}

class TronLinkWallet {
    constructor(props){
      this.walletName = props?.walletName || ""
      this.accountChangeHandle = props?.accountChangeHandle || function(){}
    }

    getChainInfo = async () => {
      return TronAbiMap
    }

    requestAccounts = async () => {
        if (window.tronWeb && window.tronLink) {
            const res = await window.tronLink.request({ method: 'tron_requestAccounts' });
            console.log("tron link account::::res", res, window.tronWeb.defaultAddress.base58)
            if(!res && !window.tronWeb.defaultAddress.base58){
              console.log("tron link account22222::::res", res, window.tronWeb.defaultAddress.base58)
              return {
                code: 3,
                msg: 'Please unlock TronLink'
              }
            }
            if(res?.code == 200){
              const _account = window.tronWeb.defaultAddress.base58;
              console.log("tron link account::::", _account)
              this.listenerAccountsChanged(this.accountChangeHandle)
              return _account
            }
            if(res?.code == 4001){
              return {
                 code: 1,
                 msg: 'User rejected!'
               }
             }

            return {
              code: 3,
              msg: 'Please unlock TronLink'
            }
            
        }else {
          return {
            code: 2,
            msg: 'Please install TronLink!'
          }
      }
    }

    _install = () => {
        const install = 'https://chrome.google.com/webstore/detail/tronlink%EF%BC%88%E6%B3%A2%E5%AE%9D%E9%92%B1%E5%8C%85%EF%BC%89/ibnejdfjmmkpcnlpebklmnkoeoihofec';
        window.open(install)
    }

    initContract = async () => {
      const {abi, contractAddress} = await this.getChainInfo()
      try {
        const contract = await window.tronWeb.contract(abi, contractAddress);
        return contract;
      } catch (error) {
        console.log("tronlink init error")
      }
    }

    listenerAccountsChanged = (handleCallback) => {
      window.addEventListener('message', function (e) {
        // Tronlink chrome v3.22.0 & Tronlink APP v4.3.4 started to support 
        if (e.data.message && e.data.message.action == "accountsChanged") {
            // console.log("accountsChanged event", e.data.message)
            // console.log("current address:", e.data.message.data.address)
            handleCallback && handleCallback(e.data.message.data.address)
        }
      })
  }

    getBalanceOf = async (address) => {
      const {decimals } = this.getChainInfo()
      const contract = this.initContract()
      const balance = await contract.balanceOf(address).call();
      const _myBalance = (new BigNumber(balance._hex)).toNumber() / Math.pow(10, decimals)
      return {amount: _myBalance};
    }

    transfer = async (price, successcallback, failedcallback) => {
      const chainInfo = await this.getChainInfo();
      const contract = this.initContract()
      const { toAddress,decimals } = chainInfo
      const tokenAmount = setNumber(price, decimals)
      try {

        let result = await contract.transfer(
          toAddress, //address _to
          tokenAmount   //amount
        ).send().then(async output => {
          console.log('- Output:', output, '\n');
          successcallback && successcallback(toAddress, output)
          return result;
        });
      } catch (error) {
        failedcallback && failedcallback(error)
      }
      
    }
}

export default TronLinkWallet;