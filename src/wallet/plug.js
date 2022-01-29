const PlugAbiMap = {
  toAddress: '567to-2ufhs-rzv5c-2wnbb-6y34z-kzi7q-nvwcv-ulekn-2esk4-kyggc-iae',
}

class PlugWallet {
    constructor(props){
      this.walletName = props?.walletName || ""
      this.accountChangeHandle = props?.accountChangeHandle || function(){}
    }

    getChainInfo = async () => {
      return PlugAbiMap
    }

    requestAccounts = async () => {
      if (window.ic && window.ic.plug) {
        try {
          // Canister Ids
          const nnsCanisterId = 'pyr3m-ciaaa-aaaai-qasua-cai'
          // Whitelist
          const whitelist = [
            nnsCanisterId,
        ];
          const res = await window.ic.plug.requestConnect({
              whitelist,
              // host: 'http://localhost:3000',
          });

          const principalId = await window.ic.plug.agent.getPrincipal();
          const sIndentity = principalId.toString();
          return sIndentity
        } catch (error) {
          // denied
          return {
            code: 1,
            msg:  error
          }
        }
      } else {
        this._install();
        return {
          code: 2,
          msg: 'Please install Plug!'
        }
      }
    }

    _install = () => {
        const install = 'https://chrome.google.com/webstore/detail/plug/cfbfdhimifdmdehjmkdobpcjfefblkjm'
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

    transfer = async (address, price, successcallback, failedcallback) => {
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
        successcallback && successcallback(address, result.height)
        return result;
      } catch (error) {
        failedcallback && failedcallback(error)
      }
      
    }
}

export default PlugWallet;