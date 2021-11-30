import React, { useState, useCallback, useEffect, useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import info from '@/static/images/account-info.png'
import axios from '@/utils/axios';

// import Web3 from "web3"
import { Contract, ethers } from "ethers"
import { useWeb3React, Web3ReactProvider } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';

import { abi } from './abis'

const baseUrl = 'http://pay.dmail.ai/api'
export const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/

const Info = styled.div`
  position: absolute;
  z-index: 101;
  width: 420px;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  background: #fff;
  border-radius: 10px;
  padding: 35px 30px;
  transition: opacity .3s ease-out;
  opacity: 0;
  display: none;

  &.on {
    display: block;
    opacity: 1;
  }

  .pop-title {
    display: flex;
    justify-content: center;
  }

  .pop-name {
    font-size: 36px;
    font-weight: bold;
    color: #1A071F;
  }

  .pop-info {
    width: 42px;
    height: 42px;
    background: url(${info}) no-repeat;
    background-size: 100%;
  }

  .pop-content {
    margin-top: 26px;
    font-size: 20px;
    font-weight: bold;
    color: #333;
    text-align: center;
  }

  .pop-footer {
    margin-top: 30px;
    display: flex;
    justify-content: center;
  }

  .pop-btn {
    background-color: #FA5F51;
    color: #fff;
    width: 120px;
    font-weight: bold;
    line-height: 36px;
    text-align: center;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color .3s ease-out;
    user-select: none;

    &:hover {
      background-color: #d85043;
    }
  }

  .disabled {
    background-color: #dbdbdb;
    cursor: not-allowed;

    &:hover {
      background-color: #dbdbdb;
    }
  }

  .pop-btn-cancel {
    background-color: #ffb3ac;
    margin-right: 15px;

    &:hover {
      background-color: #ffa097;
    }
  }
`

export const Pop = ({ show, setShow, name, text, okText, okCb, cancelText, disabled }) => {
  const onOk = () => {
    if (okCb) {
      okCb.then(async (cb) => {
        await cb(() => {
          setShow(false)
        })
      })
    } else {
      setShow(false)
    }
  }

  const onCancel = () => {
    setShow(false)
  }

  return (
    <Info className={show ? 'on' : ''}>
      <div className="pop-title">
        {name ? <div className="pop-name">{name}</div> : <i className="pop-info"></i>}
      </div>
      <div className="pop-content">
        {text}
      </div>
      <div className="pop-footer">
        {cancelText ? <div className="pop-btn pop-btn-cancel" onClick={onCancel}>{cancelText}</div> : null}
        <div className={`pop-btn ${disabled ? 'disabled' : ''}`} onClick={onOk}>{okText || 'OK'}</div>
      </div>
    </Info>
  )
}

export const searchEmail = async (key) => {
  return axios({
    url: `${baseUrl}/products`,
    dat: {
      key
    },
    method: 'post',
    // errorTitle: '',
  }).then((res) => {
    try {
      const { code, data, msg, success } = res.data
      return { success, msg, data }
    } catch (error) {
      return { success: false, msg: error, data: null }
    }
  })
}

export const login = async (address) => {
  return axios({
    url: `${baseUrl}/login`,
    method: 'post',
    data: {
      address,
    },
    // errorTitle: '',
  }).then((res) => {
    try {
      const { code, data, msg, success } = res.data
      return { success, msg, data }
    } catch (error) {
      return { success: false, msg: error, data: null }
    }
  })
}

export const verifySign = async (address, signature) => {
  return axios({
    url: `${baseUrl}/auth`,
    method: 'post',
    data: {
      address,
      signature,
    },
    // errorTitle: '',
  }).then((res) => {
    try {
      const { code, data, msg, success } = res.data
      return { success, msg, data }
    } catch (error) {
      return { success: false, msg: error, data: null }
    }
  })
}

export const setEmailRequest = async (address, jwt, email) => {
  return axios({
    url: `${baseUrl}/update`,
    method: 'post',
    data: {
      address,
      jwt,
      email
    },
    // errorTitle: '',
  }).then((res) => {
    try {
      const { code, data, msg, success } = res.data
      return { success, msg, data }
    } catch (error) {
      return { success: false, msg: error, data: null }
    }
  })
}

export const getDetail = async (id) => {
  return axios({
    url: `${baseUrl}/products/${id}`,
    method: 'get',
    // errorTitle: '',
  }).then((res) => {
    try {
      const { code, data, msg, success } = res.data
      return { success, msg, data }
    } catch (error) {
      return { success: false, msg: error, data: null }
    }
  })
}

export const detectTransferIsSuccess = async (hash, address, price, product_name, jwt, network = '3') => {
  return axios({
    url: `${baseUrl}/transfer`,
    method: 'post',
    data: {
      address, price, product_name, tx: hash, jwt, network
    }
    // errorTitle: '',
  }).then((res) => {
    try {
      const { code, data, msg, success } = res.data
      return { success, msg, data }
    } catch (error) {
      return { success: false, msg: error, data: null }
    }
  })
}

// export const sendTransaction = async (from, value) => {
//   console.log({
//     to: '0x868BF417E38f9264426ebA9f5e4F5ac274e0988e',
//     from,
//     value,
//     // gasPrice,
//     // gas,
//   })
//   if (window.ethereum) {
//     window.ethereum
//       .request({
//         method: 'eth_sendTransaction',
//         params: [
//           {
//             to: '0x868BF417E38f9264426ebA9f5e4F5ac274e0988e',
//             from,
//             // value: parseInt(Web3.utils.toWei(`${value}`, 'ether')).toString(16),

//             // value: '0x29a2241af62c0000',
//             // gasPrice: '0x09184e72a000',
//             // gas: '0x2710',
//           },
//         ],
//       })
//       .then((txHash) => console.log(txHash))
//       .catch((error) => console.error);
//   } else {
//     return {
//       code: 2,
//       msg: 'Please install MetaMask!'
//     }
//   }
// }

export const metaMaskAuth = async () => {
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
    return {
      code: 2,
      msg: 'Please install MetaMask!'
    }
  }
}

export const metaMaskSign = async (sign) => {
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
      console.log('metaMaskSign', signer, signature)
      return signature
    } catch (error) {
      return {
        code: 2,
        msg: error.message
      }
    }
  } else {
    return {
      code: 2,
      msg: 'Please install MetaMask!'
    }
  }
  // } else {
  //   return {
  //     code: 2,
  //     msg: 'Please install MetaMask!'
  //   }
  // }
}


function str2hex(str) {
  if (str === "") {
    return "";
  }
  var arr = [];
  arr.push("0x");
  for (var i = 0; i < str.length; i++) {
    arr.push(str.charCodeAt(i).toString(16));
  }
  return arr.join('');
}