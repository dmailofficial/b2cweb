import React, { useState, useCallback, useEffect, useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import info from '@/static/images/account-info.png'
import axios from '@/utils/axios';

// import Web3 from "web3"
import { Contract, ethers } from "ethers"
import { useWeb3React, Web3ReactProvider } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';

import { abi } from './abis'

const baseUrl = 'https://pay.dmail.ai'
export const emailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/

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

  &.end-pop {
    width: 520px;
    padding: 45px 30px;

    .pop-name {
      font-size: 28px;
    }
  }
`

export const Pop = ({ show, setShow, name, text, okText, okCb, cancelCb, cancelText, disabled, wrapperClass }) => {
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
    if (cancelCb) {
      cancelCb()
    }
    setShow(false)
  }

  return (
    <Info className={`${show ? 'on' : ''} ${wrapperClass || ''}`}>
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
  try {
    return axios({
      url: `${baseUrl}/products`,
      data: {
        key
      },
      method: 'post',
      // errorTitle: '',
    }).then((res) => {
      const { code, data, message, success } = res.data
      return { code, success, msg: message, data }
    })
  } catch (error) {
    return { success: false, msg: error, data: null }
  }
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
      const { code, data, message, success } = res.data
      return { success, msg: message, data }
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
      const { code, data, message, success } = res.data
      return { success, msg: message, data }
    } catch (error) {
      return { success: false, msg: error, data: null }
    }
  })
}

export const setEmailRequest = async (address, jwt, email, tron = false) => {
  return axios({
    url: `${baseUrl}/update`,
    method: 'post',
    data: {
      address,
      jwt,
      email,
      tron
    },
    // errorTitle: '',
  }).then((res) => {
    try {
      const { code, data, message, success } = res.data
      return { success, msg: message, data }
    } catch (error) {
      return { success: false, msg: error, data: null }
    }
  })
}

export const getDetail = async (name) => {
  return axios({
    url: `${baseUrl}/products/${name}`,
    method: 'get',
    // errorTitle: '',
  }).then((res) => {
    try {
      const { code, data, message, success } = res.data
      return { success, msg: message, data }
    } catch (error) {
      return { success: false, msg: error, data: null }
    }
  })
}

export const detectTransferIsSuccess = async (hash, address, price, product_name, jwt, network = '3', tron = false) => {
  return axios({
    url: `${baseUrl}/transfer`,
    method: 'post',
    data: {
      address, price, product_name, tx: hash, jwt, network, tron
    }
    // errorTitle: '',
  }).then((res) => {
    try {
      const { code, data, message, success } = res.data
      return { success, msg: message, data }
    } catch (error) {
      return { success: false, msg: error, data: null }
    }
  })
}

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

export const tronLinkAuth = async () => {
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

export const plugAuth = async () => {
  if (window.ic && window.ic.plug) {
    try {
      const res = await window.ic.plug.requestConnect();
      console.log(res)
      // const connectionState = res ? "allowed" : "denied";
      return [true]
    } catch (error) {
      // denied
      console.log('plugAuth', error)
      return {
        code: 1,
        msg:  error
      }
    }
  } else {
    return {
      code: 2,
      msg: 'Please install TronLink!'
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
      return [signature, signer]
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
}