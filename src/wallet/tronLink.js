const TronAbiMap = {
  contractAddress: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
  abi: TRC_abi,
  toAddress: 'TGQeDqyZk4hW6FLjq8h6adZ9xaCMWPXozt',
  decimals: 6,
}

class TronWallet {
    constructor(){

    }

    getChainInfo = async () => {
      return TronAbiMap
    }

    requestAccounts = async () => {
      if (window.tronWeb && window.tronLink) {
        const res = await window.tronLink.request({ method: 'tron_requestAccounts' });
        const account = window.tronWeb.defaultAddress.base58;
        return [account]
      } else {
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

    initContract = () => {
        return null;
    }

    listenerAccountsChanged = (handleCallback) => {
      handleCallback && handleCallback() 
      
  }

    getBalanceOf = async (address) => {
        const result = await window.ic.plug.requestBalance();
        let _icp = null;
        if(result.length > 0){
          result.map((item)=>{
            if(item.name == "ICP"){
              _icp = {...item}
            }
          })
        }else{
          _icp = {}
        }
        return _icp;
    }

    transfer = async (price, successcallback, failedcallback) => {
      const chainInfo = await this.getChainInfo();
      const { toAddress } = chainInfo
      try {
        const result = await window.ic.plug.requestTransfer({
          to: toAddress,
          // amount: 4000000 * price,
          amount: 100000000 * price,
          // opts: {
          //   fee: '',
          //   memo,
          //   from_subaccount: ''
          // }
        });
        successcallback && successcallback(toAddress, result.height)
        return result;
      } catch (error) {
        failedcallback && failedcallback(error)
      }
      
    }
}

export default PlugWallet;