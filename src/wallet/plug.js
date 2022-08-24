import BigNumber from "bignumber.js";
const PlugAbiMap = {
  toAddress: "xfswd-bjcfb-msaly-acbm7-po2xy-fsaez-loanv-a7drf-yebdn-6kbtq-lqe",
};

class PlugWallet {
  constructor(props) {
    this.walletName = props?.walletName || "";
    this.accountChangeHandle = props?.accountChangeHandle || function () {};
  }

  getChainInfo = async () => {
    return PlugAbiMap;
  };

  requestAccounts = async () => {
    if (window.ic && window.ic.plug) {
      try {
        // Canister Ids
        const nnsCanisterId = "pyr3m-ciaaa-aaaai-qasua-cai";
        // Whitelist
        const whitelist = [nnsCanisterId];
        const res = await window.ic.plug.requestConnect({
          whitelist,
          // host: 'http://localhost:3000',
        });

        const principalId = await window.ic.plug.agent.getPrincipal();
        const sIndentity = principalId.toString();
        return sIndentity;
      } catch (error) {
        // denied
        return {
          code: 1,
          msg: error,
        };
      }
    } else {
      this._install();
      return {
        code: 2,
        msg: "Please install Plug!",
      };
    }
  };

  _install = () => {
    const install =
      "https://chrome.google.com/webstore/detail/plug/cfbfdhimifdmdehjmkdobpcjfefblkjm";
    window.open(install);
  };

  initContract = () => {
    return null;
  };

  listenerAccountsChanged = (handleCallback) => {
    handleCallback && handleCallback();
  };

  getBalanceOf = async (address) => {
    const result = await window.ic.plug.requestBalance();
    let _icp = null;
    if (result.length > 0) {
      result.map((item) => {
        if (item.name == "ICP") {
          _icp = { ...item };
        }
      });
    } else {
      _icp = {};
    }
    return _icp;
  };

  transfer = async (
    toAddress,
    address,
    price,
    successcallback,
    failedcallback
  ) => {
    const chainInfo = await this.getChainInfo();
    // const { toAddress } = chainInfo
    // console.log("100000000 * price:::",price, new BigNumber(100000000).times(price).toString());
    try {
      const result = await window.ic.plug.requestTransfer({
        to: toAddress || chainInfo.toAddress,
        amount: Number(new BigNumber(100000000).times(price).toString()),
        // opts: {
        //   fee: '',
        //   memo,
        //   from_subaccount: ''
        // }
      });
      successcallback && successcallback(address, result.height);
      return result;
    } catch (error) {
      console.error('plug transfer', error)
      failedcallback && failedcallback(error);
    }
  };
}

export default PlugWallet;
