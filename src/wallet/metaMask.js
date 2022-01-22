import Web3 from "web3"
import { Contract, ethers } from 'ethers'
import { BSC_abi, ERC_abi } from './abis'
import { setNumber } from './setByNumber'

const MetaMaskChainAbiMap = {
    '1': {
      contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      abi: ERC_abi,
      toAddress: '0xe4F13c05FdBF3Fa8149b8980742f0E7e9E4749eC',
      decimals: 6,
    },
    '56': {
      contractAddress: '0x55d398326f99059fF775485246999027B3197955',
      abi: BSC_abi,
      toAddress: '0xe4F13c05FdBF3Fa8149b8980742f0E7e9E4749eC',
      decimals: 18,
    },
}

class MetaMaskWallet {
    constructor(){

    }

    _getChainId = () => {
        return new Promise((resolve, reject) => {
            // https://docs.metamask.io/guide/ethereum-provider.html#ethereum-networkversion-deprecated
            window.ethereum.request({ method: 'eth_chainId' }).then((chainId) => {
                resolve(Web3.utils.hexToNumber(chainId))
            })
        })
    }

    getChainInfo = async () => {
        let chainId = ''
        let chainInfo = null
          try {
            chainId = await this._getChainId()
            console.log('get chainId', chainId)
          } catch (error) {
              console.log("getChainId: ", error)
            return null
          }
          if (chainId && chainId in MetaMaskChainAbiMap) { // if the chain already has 
            console.log("MetaMaskChainAbiMap[chainId]: ", MetaMaskChainAbiMap[chainId])
            return MetaMaskChainAbiMap[chainId]
          } else {
            // help to switch chain
            try {
              if (window.ethereum) {
                window.ethereum
                  .request({
                    method: 'wallet_switchEthereumChain',
                    params: [
                      {
                        chainId: '0x1'
                      },
                    ],
                  })
                // need to click to pay again
                return null
              } else {
                return null
              }
            } catch (error) {
              console.log(error)
              return null
            }
          }
    }

    requestAccounts = async () => {
        if (window.ethereum) {
            try {
            // https://docs.metamask.io/guide/accessing-accounts.html
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            return accounts
            } catch (error) {
                return {
                    code: 1,
                    msg: 'User denied account access!'
                }
            }
        } else {
            this._install();
            return {
                code: 2,
                msg: 'Please install MetaMask!'
            }
        }
    }

    _install = () => {
        const install = 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'
        window.open(install)
    }

    initContract = async () => {
        const chainInfo = await this.getChainInfo();
        console.log("chainInfo222222::", chainInfo)
        const {abi, contractAddress} = chainInfo
        console.log("abi::", abi)
        try {  
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            console.log("window.ethereum111::", contractAddress, abi, signer)
            const contract = new Contract(contractAddress, abi, signer);
            return contract;
            
        } catch (error) {
            console.error("initContract: ", error)
        }
        
    }

    getBalanceOf = async (address) => {
        const contract = this.initContract();
        const balance = await contract.balanceOf(address);
        return balance;
    }

    transfer = async (price, sign) => {
        console.log("transfer::",price)
        const contract = await this.initContract();
        const chainInfo = await this.getChainInfo();
        console.log("contract222222---------::", contract)
        console.log("chainInfo::", chainInfo)
        const { toAddress, decimals } = chainInfo

        const signRes = await this.metaMaskSign(sign)
        console.log('signRes', signRes)
        // sign failed
        if (!Array.isArray(signRes)) {
            if (signRes && signRes.code === 2) {
                // showPop(signRes.msg)
                console.error(signRes.msg)
            }
            return false
        }
        try {
            return contract.transfer(toAddress, setNumber(+price, decimals))
        } catch (error) {
            console.error("transfer: ",error)
            return error
        }
    }
    metaMaskSign = async (sign) => {
        if (!sign) {
          return {
            code: 1,
            msg: 'The sign is missing!'
          }
        }
        if (window.ethereum) {
          // if (window.ethereum) {
          try {
            // https://codesandbox.io/s/react-eth-metamask-signatures-ibuxj?file=/src/SignMessage.js:42-74
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const signature = await signer.signMessage(sign);
            return [signature, signer]
          } catch (error) {
            return {
              code: 2,
              msg: error.message
            }
          }
        } else {
            this._install();
          return {
            code: 2,
            msg: 'Please install MetaMask!'
          }
        }
      }


}

export default new MetaMaskWallet();