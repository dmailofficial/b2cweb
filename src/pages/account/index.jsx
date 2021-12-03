import React, { useState, useCallback, useEffect, useRef } from 'react';
import Header from '@/components/header'
import styled, { createGlobalStyle, useTheme } from 'styled-components';
import Cookies from 'js-cookie'
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React, Web3ReactProvider } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { BSC_abi, ERC_abi, TRC_abi } from './abis'
import reportWebVitals from './reportWebVitals';
import BigNumber from "bignumber.js";
import { setByNumber } from './setByNumber'
import Web3 from "web3"

import { emailReg, Pop, metaMaskAuth, metaMaskSign, login, verifySign, setEmailRequest, searchEmail, getDetail, detectTransferIsSuccess } from './utils'
import axios from '@/utils/axios';

import logo from '@/static/images/logo-big.png'
import bg from '@/static/images/account-bg.png'
import tip from '@/static/images/tip.png'
import name from '@/static/images/name.png'
import countdown from '@/static/images/countdown.png'
import card from '@/static/images/card3.png'
import close from '@/static/images/close.png'
import to from '@/static/images/to.png'
import metamask from '@/static/images/metamask.png'
import tronlink from '@/static/images/tronlink.png'
import plug from '@/static/images/plug.png'

// const injectedConnector = new InjectedConnector({
//   // supportedChainIds: [256, 269],
//   supportedChainIds: [3],
// });

const getLibrary = (provider) => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
};

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
`
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const Content = styled.div`
  margin-top: 18px;
  flex: 1;
  background: url(${bg}) no-repeat;
  background-size: cover;
  transition: all .3s ease-out;
  transform: rotate(-45deg);
  transform-origin: right bottom;
  opacity: 0;

  &.on {
    transform: rotate(0);
    opacity: 1;
  }

  .account-chunk {
    position: relative;
    z-index: 100;
    width: 909px;
    margin: 50px auto;
    padding-bottom: 100px;
  }

  @media screen and (min-width: 1600px) {
    .account-chunk {
      margin-top:  100px;
    }
  }

  @media screen and (min-width: 1920px) {
    .account-chunk {
      margin-top: 10%;
    }
  }

  .logo-big {
    width: 256.5px;
    height: 90px;
    background: url(${logo});
    background-size: 100%;
    margin: 0 auto 50px;
  }

  .input-wrap {
    height: 64px;
    padding: 0 7px 0 22px;
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, .1);
    border: 1px solid rgba(255, 255, 255, .1);
    box-shadow: 0 0 2px 0 inset rgb(255, 255, 255, 0.2);
    border-radius: 20px;
    margin: 0 auto;

    span {
      width: 26px;
      height: 26px;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAAXNSR0IArs4c6QAAAWVQTFRFAAAA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Df5iYgAAAHd0Uk5TAAECAwQFBgcICQsMDQ4PEBESExQVFhcZGhwdHh8gISIjJSYnKCkrLC0uLzAxMzQ2ODo7PT9AQkNFR0lKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn+AgYKDhIWPp6l/AAACq0lEQVQYGZ3BiUPTdRzH4TdYoAQOTcWyRAdMw80Oa7qcjUPcPQ45gxgUR4TWBvL6+/t8Nwcbu34/n0ctfRmJ5Xf2Do8O93ZysSc35N1IrEijzee35cn4Eq3MB9VVaJN2NsbV0XCGmvJmPvEyFk8Utk6oSQ6qvckyVQe/TQyqZmhi6h+q3k+onVdULUz0qlHfk2WqomotQ8XCV2rl27dUvFYr6zjvHqudSAknq2aLOMuDam94DWdalyVwkuoshxNVo0c4M+omjfNA9QbOMBl1t4Ap9avOAmZVHvQcYFK6MIb5r19eBMqYb3TuL8y4vAljtlQTxKzIqy3M1/poDXNHXt3DzKvqJmZJ3v2OGVBFDDMq7x5hnqniT+BIPlz5F9iQE8C8kh9vgA8DMhFMUH6EMSGZOFDqlx9DZ8AvMgVgW/7sA1MyO0BO/iwB8zL7QEL+JIE1mUPgpfyZBbZljoCY/EkAezKHQFz+zAK7MvtAQv6kgD9kdoCc/FkB3srkgaJ86T0GpmV+BcrX5MdtzDOZMGZMfkQwozLXMQn5kQZOr8opAu965V3fCbCoiigmJO9+wIRVEcCsy7tD4KRPVcuYEXk1iZnRRw8w6/Ko5xhzSzW7mEl5E8ekdW4UU/pCXtzHGdSFLGZTHlx9j4mqzrUyJqeuPitiDtQgiJNSNynMhxE1eo5T+FwdDeOEdNkczu5NdRLAiatJBqcUUSezOCk1SVCxGlQHBZykmkSpWv6uX23lcVJqMnZM1fFcONCrqr67T6fm7upcDielJgOvqTnbX0zPTKUXN44xpzd0LoeTVLOHK7T0vS5kcVJq4WHmlGa3VCeLk1Ir139aLVPv7+x9NcjgpNTaUOjn6fxacW97tfDmx3tXdFkG54U66VE7acyJPlEa2NWnerG/PvI/g8BcnUc5d1kAAAAASUVORK5CYII=);
      background-size: 100%;
      margin-right: 25px;
    }

    input {
      background: transparent;
      border: none;
      flex: 1;
      color: rgba(255, 255, 255, .85);
      font-size: 26px;
    }
    
    a {
      padding: 0 30px;
      height: 50px;
      line-height: 50px;
      background: #FF5C53;
      border-radius: 14px;
      font-size: 26px;
      color: #fff;
      margin-left: 30px;
      text-align: center;
      cursor: pointer;

      &.waiting {
        cursor: wait;
      }
    }
  }

  .desc {
    padding-left: 20px;
    margin-top: 90px;
    color: rgba(255, 255, 255, .7);
    line-height: 36px;
    font-size: 20px;

    p:first-child {
      margin-bottom: 10px;
    }

    a {
      color: #5581FF;
    }
  }
`

const Error = styled.div`
  position: absolute;
  top: 205px;
  left: 0;
  margin-top: 20px;
  display: flex;
  align-items: center;
  font-size: 24px;
  color: #D50202;
  transition: opacity .3s ease-out;
  opacity: 0;
  display: none;

  &.on {
    opacity: 1;
    display: flex;
  }

  i {
    width: 24px;
    height: 24px;
    background: url(${tip}) no-repeat;
    background-size: 100%;
    margin-right: 10px;
  }
`
const EmailList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #fff;
  border-radius: 5px;
  padding: 5px 0;
  transition: all .3s ease-out;
  transform: translateY(50px);
  transform-origin: center;
  opacity: 0;
  display: none;

  &.on {
    transform: translateY(12px);
    opacity: 1;
    display: block;
  }

  li {
    padding: 15px 20px;
    font-size: 20px;
    cursor: pointer;
    
    &:hover {
      background: #ffdfdd;
    }
  }
`

const Generated = styled.div`
  position: absolute;
  top: 196px;
  left: 0;
  right: 0;
  background: #fff;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 15px;
  padding: 0 12px 0 24px;
  transition: all .3s ease-out;
  transform: translateY(105px);
  transform-origin: center;
  opacity: 0;
  display: none;

  &.on {
    transform: translateY(45px);
    opacity: 1;
    display: flex;
  }

  span {
    font-size: 30px;
    color: #1A0B42;
    flex: 1;
  }

  a {
    background: #63C68B;
    height: 66px;
    line-height: 66px;
    padding: 0 25px;
    font-size: 24px;
    color: #FFFFFF;
    border-radius: 12px;
    cursor: pointer;
  }

  &::before {
    position: absolute;
    top: -10px;
    left: 84px;
    content: '';
    width: 0;
    height: 0;
    border-bottom: 10px solid #fff;
    border-right: 10px solid transparent;
    border-left: 10px solid transparent;
  }
`
const PayWrap = styled.div`
  position: absolute;
  left: 72px;
  right: 72px;
  top: 202px;
  padding: 80px 0;
  background: rgba(88, 67, 97, 0.37);
  border-radius: 24px;
  display: flex;
  justify-content: center;

  transition: all .5s ease-out;
  transform: translateX(150%) translateY(-200%) rotate(90deg);
  transform-origin: left bottom;
  opacity: 0;

  &.on {
    transform: translateX(0) translateY(0) rotate(0deg);
    opacity: 1;
  }

  .pay-img {
    margin-right: 140px;
    
    img {
      width: 540px;
    }
  }

  .pay-chunk {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: 500px;
    position: relative;
    top: -5px;
    color: #fff;
    font-weight: bold;
    font-size: 24px;
  }

  .pay-info > div {
    display: flex;
    align-items: center;
  }

  .name {
    font-size: 64px;
    position: relative;
    margin-bottom: 2px;

    // i {
    //   width: 38px;
    //   height: 38px; 
    //   background: url(${name}) no-repeat;
    //   background-size: 100%;
    //   margin-right: 20px;
    // }
  }

  .tips {
    margin-top: -2px;
    font-weight: 600;
    font-size: 28px;

    // i {
    //   width: 28px;
    //   height: 28px; 
    //   background: url(${countdown}) no-repeat;
    //   background-size: 100%;
    //   margin-right: 20px;
    // }
  }

  .price-tip {
    font-size: 34px;
    margin-top: 48px;
    font-weight: 600;
  }

  .price {
    margin-top: -5px;
    color: #FF8C38;
    font-size: 48px;
    text-transform: uppercase;
    font-weight: bold;
  }

  .limit {
  }

  .offer {
    color: #FF6A5D;
  }

  .get-more {
    display: inline-block;
    margin-left: 30px;
    background-color: rgba(255, 255, 255, .25);
    line-height: 38px;
    padding: 0 15px;
    border-radius: 8px;
    color: #fff;
    cursor: pointer;
    font-size: 20px;
    transition: background-color .3s ease-out;

    &:hover {
      background-color: rgba(255, 255, 255, .5);
    }
  }

  .pay-btn {
    background-color: #FA5F51;
    color: #fff;
    width: 400px;
    height: 52px;
    line-height: 52px;
    text-align: center;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color .3s ease-out;

    &:hover {
      background-color: #d85043;
    }
  }

  @media screen and (min-width: 2000px) {
    // top: 242px;
    // padding: 120p x 0;
    // left: 120px;
    // right: 120px;

    .pay-img {
      margin-right: 200px;

      img {
        width: 680px;
      }
    }

    .pay-chunk {
      font-size: 30px;
    }

    .pay-info > div {
      margin-bottom: 30px;
    }
  
    // div.name {
    //   font-size: 50px;
    //   margin-bottom: 36px;
  
    //   i {
    //     width: 48px;
    //     height: 48px; 
    //     margin-right: 20px;
    //   }
    // }
  
    div.left {
      font-size: 36px;
      margin-bottom: 56px;
  
      i {
        width: 35px;
        height: 35px; 
        margin-right: 20px;
      }
    }
  }

  @media screen and (max-width: 1440px) {
    top: 172px;
    padding: 60px 0;

    .pay-img img {
      width: 440px;
    }

    .pay-chunk {
      font-size: 20px;
    }

    .pay-info > div {
      margin-bottom: 10px;
    }
  
    // div.name {
    //   font-size: 32px;
    //   margin-bottom: 20px;
    //   left: -50px;
  
    //   i {
    //     width: 30px;
    //     height: 30px; 
    //     margin-right: 20px;
    //   }
    // }
  
    div.left {
      font-size: 26px;
      margin-bottom: 30px;
  
      i {
        width: 24px;
        height: 24px; 
        margin-right: 20px;
      }
    }
  }
`

const Connect = styled.div`
  position: absolute;
  z-index: 100;
  left: 50%;
  top: 50%;
  width: 390px;
  background: #fff;
  border-radius: 25px;
  padding: 22px 35px 35px;
  transform: translateX(-50%) translateY(-50%);
  transition: opacity .3s ease-out;
  opacity: 0;
  display: none;
  color: #1A071F;

  &.on {
    display: block;
    opacity: 1;
  }

  .connect-title {
    font-size: 36px;
    font-weight: bold;
    line-height: 1;
  }

  .connect-desc {
    margin-top: 20px;
    margin-bottom: 24px;
    font-size: 20px;
    line-height: 24px;
  }

  .pop-close {
    position: absolute;
    top: 30px;
    right: 30px;
    width: 35px;
    height: 35px;
    background: url(${close});
    background-size: 100%;
    cursor: pointer;
  }

  .connect-list {
    margin-top: 30px;
  }

  .connect-item {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 26px;
    margin-bottom: 20px;
    border-radius: 20px;
    padding: 0 36px;
    cursor: pointer;
    border-radius: 25px;

    strong {
      font-weight: 500; 
    }

    &.wait {
      cursor: wait;
    }

    &:nth-child(1) {
      background: linear-gradient(to right, #FCA9A3 , #FEE1A8);
    }

    &:nth-child(2) {
      background: linear-gradient(to right, #B2C5FB , #DCECFE);
    }

    &:nth-child(3) {
      background: linear-gradient(to right, #CBAEFB , #EDE3FE );
    }

    &:last-child {
      margin-bottom: 0;
    }

    .item-left {
      display: flex;
      align-items: center;
    }

    span {
      display: inline-block;
      background-size: 100%;
      margin-right: 20px;
    }

    .MetaMask {
      width: 50px;
      height: 46px;
      background-image: url(${metamask});
    }

    .TronLink {
      width: 45px;
      height: 45px;
      background-image: url(${tronlink});
    }

    .Plug {
      width: 50px;
      height: 46px;
      background-image: url(${plug});
    }
    

    i {
      display: inline-block;
      width: 15px;
      height: 26px;
      background: url(${to});
      background-size: 100%;
    }
  }
`

const UserEmailSet = styled.div`
  position: absolute;
  z-index: 100;
  left: 50%;
  top: 50%;
  background: #fff;
  border-radius: 25px;
  padding: 50px 35px 50px;
  transform: translateX(-50%) translateY(-50%);
  transition: opacity .3s ease-out;
  opacity: 0;
  display: none;

  &.on {
    display: block;
    opacity: 1;
  }
`

const Text = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
`

const Input = styled.input`
  line-height: 40px;
  width: 300px;
  padding: 0 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 18px;
`

const UserEmail = ({ setuserEmail, setpopDisabled }) => {
  const [email, setEmail] = useState('')

  const onInput = (ev) => {
    const value = ev.target.value
    setEmail(value)
    setuserEmail(value)
    setpopDisabled(!emailReg.test(value))
  }

  return (
    <>
      <Text>Please enter your email address and the Dmail team will notify you when it is time to collect</Text>
      <Input value={email} onInput={onInput} />
    </>
  )
}

const Account = () => {
  const { Contract, ethers } = require('ethers');

  const MetaMaskChainAbiMap = {
    '1': {
      contractAddress: '0x74F5B6802c2E3752255936B7546284FF1f66f945',
      abi: ERC_abi,
      toAddress: '0xe4F13c05FdBF3Fa8149b8980742f0E7e9E4749eC'
    },
    '56': {
      contractAddress: '0x55d398326f99059fF775485246999027B3197955',
      abi: BSC_abi,
      toAddress: '0xe4F13c05FdBF3Fa8149b8980742f0E7e9E4749eC'
    },
  }

  const TronAbiMap = {
    contractAddress: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
    abi: TRC_abi,
    toAddress: 'TGQeDqyZk4hW6FLjq8h6adZ9xaCMWPXozt'
  }

  const ChainNames = ['MetaMask', 'TronLink']
  // const ChainNames = ['MetaMask', 'TronLink', 'Plug']

  const [loginInfo, setloginInfo] = useState(null)
  const loginInfoRef = useRef(null)

  const [email, setEmail] = useState('')
  // const [selectedEmail, setSelectedEmail] = useState(null)
  const [emailData, setEmailData] = useState(null)
  const [searching, setsearching] = useState(false)
  const [userEmail, setuserEmail] = useState('')
  const userEmailRef = useRef('')

  const [currentDetail, setcurrentDetail] = useState(null)

  const [userEmailShow, setuserEmailShow] = useState(true)
  const [generatedShow, setGeneratedShow] = useState(false)
  const [errorShow, setErrorShow] = useState(false)
  const [payShow, setpayShow] = useState(false)
  const [connectShow, setconnectShow] = useState(false)
  const [connectWait, setconnectWait] = useState(false)

  const [popText, setpopText] = useState('')
  const [popShow, setpopShow] = useState(false)
  const [popName, setpopName] = useState('')
  const [popOkText, setpopOkText] = useState('')
  const [popDisabled, setpopDisabled] = useState(false)
  const [popOkCallback, setpopOkCallback] = useState(null)
  const [cancelText, setcancelText] = useState('')

  // record chainId when chain changed
  // const [currentChainId, setcurrentChainId] = useState('')
  // const currentChainIdRef = useRef('')
  // useEffect(() => {
  //   window.ethereum && window.ethereum.on('chainChanged', (chainId) => {
  //     // https://docs.metamask.io/guide/ethereum-provider.html#ethereum-networkversion-deprecated
  //     window.ethereum.request({ method: 'net_version' }).then((chainId) => {
  //       // console.log(chainId, typeof chainId)
  //       currentChainIdRef.current = chainId
  //     })
  //   });
  // }, [])

  useEffect(() => {
    loginInfoRef.current = { ...loginInfo }
  }, [loginInfo])

  useEffect(() => {
    userEmailRef.current = userEmail
  }, [userEmail])

  useEffect(() => {
    setEmailData(null)
    setErrorShow(false)
    // setSelectedEmail(null)
  }, [email])

  useEffect(() => {
    if (!popShow) {
      setpopName('')
      setpopOkText('')
      setuserEmail('')
      setpopDisabled(false)
      setcancelText('')
    }
  }, [popShow])

  const showPop = (text = '', okText = '', okCb = null, name = '', cancelText = '') => {
    setpopText(text)
    setpopOkText(okText)
    setpopOkCallback(okCb)
    setpopShow(true)
    setpopName(name)
    setcancelText(cancelText)
  }

  const loginSteps = {
    async auth() {
      // metaMask auth
      const res = await metaMaskAuth();
      // get accounts failed
      if (!Array.isArray(res) || !res.length) {
        setconnectWait(false)
        if (res && res.code === 2) {
          showPop(res.msg, 'install', () => Promise.resolve(() => {
            window.open('https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn')
          }))
        }

        return false
      }
      return res[0]
    },
    async login(address) {
      const { success, msg, data } = await login(address)
      if (!success) {
        setconnectWait(false)
        showPop(msg)
        return false
      }

      const { id, nonce, signmessage } = data

      return { id, nonce, address, sign: signmessage }
    },
    async sign({ id, nonce, address, sign }) {
      // sign
      const signRes = await metaMaskSign(sign)
      // sign failed
      if (typeof signRes !== 'string') {
        if (signRes && signRes.code === 2) {
          showPop(signRes.msg)
        }
        return false
      }
      return {
        id, nonce, address, sign: signRes
      }
    },
    async verifySign({ id, nonce, address, sign }) {
      const { success, msg, data } = await verifySign(address, sign)
      if (!success) {
        setconnectWait(false)
        showPop(msg)
        return false
      }
      const { jwt } = data
      setloginInfo({
        id, nonce, address, sign, jwt
      })
      Cookies.set('jwt', jwt, { expires: 1 })
      Cookies.set('address', address, { expires: 1 })
      return { id, nonce, sign, jwt, address }
    },
    async updateEmail(obj) {
      // setpopDisabled(!emailReg.test(userEmail))
      showPop(<UserEmail userEmail={userEmail} setuserEmail={setuserEmail} setpopDisabled={setpopDisabled} />, 'Set', onSetEmail, 'Set Email', 'Cancel')
    }
  }

  const onSetEmail = useCallback(() => Promise.resolve(async (close) => {
    const loginInfo = loginInfoRef.current
    const userEmail = userEmailRef.current
    console.log(loginInfo, userEmail)
    if (!loginInfo || !loginInfo.jwt || !loginInfo.address) {
      await verifyLogin(true)
    } else if (emailReg.test(userEmail)) {
      const { address, jwt } = loginInfo
      const { success, msg, data } = await setEmailRequest(address, jwt, userEmail)
      close()
      if (!success) {
        setconnectWait(false)
        showPop(msg)
        return false
      }
      setloginInfo({
        ...loginInfo,
        ...{ userEmail }
      })
      Cookies.set('userEmail', userEmail, { expires: 1 })
    }
  }), [userEmail])

  // useEffect(() => {
  //   loginSteps.updateEmail()
  // }, [])

  // useEffect(() => {
  //   // setpopDisabled(!emailReg.test(userEmail))
  // }, [userEmail])


  const verifyLogin = async (ignoreEmail = false) => {
    console.log('verifyLogin', loginInfo && loginInfo.jwt)
    if (loginInfo && loginInfo.jwt, loginInfo && loginInfo.jwt) {
      if (!ignoreEmail && !loginInfo.userEmail) {
        loginSteps.updateEmail()
      }
      return
    }

    setconnectWait(true)

    const steps = Object.values(loginSteps)
    let res = false
    while (steps.length) {
      res = await steps.shift()(res)
      if (!res) {
        return
      }
    }

    setconnectWait(false)
  }

  const onSearch = async () => {
    if (!email.trim().length) {
      return
    }

    setsearching(true)
    const { code, success, msg, data } = await searchEmail(email)
    setsearching(false)
    if (code === 90) {
      setErrorShow(true)
      return
    }
    if (!success) {
      showPop(msg)
      return
    } else if (!data || !data.name) {
      showPop('something is error')
      return
    }
    setEmailData(data)
  }
  const onInput = (ev) => {
    setEmail(ev.target.value)
  }

  // const chooseEmail = (o) => () => {
  //   // setSelectedEmail(o)
  //   setEmailData(null)
  // }

  const toView = async () => {
    // if (!selectedEmail) {
    //   return
    // }
    const { success, msg, data } = await getDetail(email)
    if (!success) {
      showPop(msg)
      return
    }
    const { id, name, price, exp_date, symbal } = data
    setpayShow(true)
    setcurrentDetail({
      id, name, price, exp_date, symbal
    })
  }

  const onAdd = async () => {
    if (!loginInfo || !loginInfo.jwt || !loginInfo.address || !loginInfo.userEmail) {
      await verifyLogin()
    }
    setconnectShow(true)
  }

  // const contractAddress = '0x74F5B6802c2E3752255936B7546284FF1f66f945'; // contract address
  // const toAddress = '0xe4F13c05FdBF3Fa8149b8980742f0E7e9E4749eC';

  const getChainId = () => {
    return new Promise((resolve, reject) => {
      // https://docs.metamask.io/guide/ethereum-provider.html#ethereum-networkversion-deprecated
      window.ethereum.request({ method: 'net_version' }).then((chainId) => {
        console.log('get chainId', chainId)
        resolve(chainId)
      })
    })
  }

  const toPay = async (name) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    let chainId = ''
    let chainInfo = null
    if (name === 'MetaMask') {
      try {
        chainId = await getChainId()
      } catch (error) {
        return
      }
      if (chainId && chainId in MetaMaskChainAbiMap) { // if the chain already has 
        chainInfo = MetaMaskChainAbiMap[chainId]
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
            return
          } else {
            return
          }
        } catch (error) {
          console.log(error)
          return false
        }
      }
    } else {    // comming soon
      return
    }
    const { abi, contractAddress, toAddress } = chainInfo
    const contract = new Contract(contractAddress, abi, provider);
    console.log('getChainId', chainId, contractAddress, toAddress)

    const loginInfo = loginInfoRef.current
    if (!loginInfo || !loginInfo.jwt || !loginInfo.address || !loginInfo.userEmail) {
      await verifyLogin()
    }

    const signer = provider.getSigner();
    const daiWithSigner = contract.connect(signer);
    try {
      console.log(1, currentDetail.price)
      // const primitiveValue = new BigNumber(currentDetail.price);
      // const tokenAmount = primitiveValue.times(18).decimalPlaces(0).toFixed();
      // console.log(2, tokenAmount)

      // let primitiveValue = new BigNumber(currentDetail.price);
      // let decimals = 6; // TRC20 USDT decimals 为6  https://tronscan.org/#/contract/TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t/code
      // let assetScale = new BigNumber(10).pow(decimals).toFixed();
      // let tokenAmount = primitiveValue.times(assetScale).decimalPlaces(0).toFixed();
      // daiWithSigner.transfer(toAddress, tokenAmount).then(async ({


      daiWithSigner.transfer(toAddress, setByNumber(+currentDetail.price, 6)).then(async ({
        from,
        hash,
      }) => {
        const { success, msg, data } = await detectTransferIsSuccess(hash, from, currentDetail.price, currentDetail.name, loginInfo.jwt, chainId)
        showPop(success ? 'Congratulation！' : msg, '', () => {
          success && window.location.reload()
        })
      })
    } catch (error) {
      console.log('error', error)
    }
  }

  const switchNetwork = () => {
    // showPop('Please switch your wallet to the Ethereum primary network before connecting')
    showPop('Coming soon')
  }

  useEffect(() => {
    const jwt = Cookies.get('jwt')
    const address = Cookies.get('address')

    const userEmail = Cookies.get('userEmail')
    if (jwt && address) {
      setloginInfo({
        jwt,
        address,
      })
      if (!userEmail) {
        // loginSteps.updateEmail({
        //   jwt,
        //   address,
        // })
      } else {
        setloginInfo({
          jwt,
          address,
          userEmail
        })
      }
    }
  }, [])

  const toLogin = async () => {
    await verifyLogin()
  }

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Wrapper>
        <GlobalStyle />
        <Header toLogin={toLogin} userEmail={loginInfo ? loginInfo.userEmail : ''} />
        {/* <Wallet /> */}
        <Content className={payShow ? '' : 'on'}>
          <div className="account-chunk">
            <div className="logo-big"></div>
            <div className="input-wrap">
              <span></span>
              <input value={email} onInput={onInput} type="text" placeholder="Check the domain account of your choice" />
              <a onClick={onSearch} className={searching ? 'waiting' : ''}>search</a>
            </div>
            <div className="desc">
              <p>Current opening progress:</p>
              <p>1-3 bits awaiting auction.</p>
              <p>4-7 bits partially open.</p>
              <p>8 bits and above, not open yet.</p>
              <p>Follow <a href="https://twitter.com/dmailofficial" target="_blank">twitter</a> to be the first to get the latest notifications about the release.</p>
              <p>What is DMAIL? Click to jump to Medium article <a href="https://medium.com/@dmail_official" target="_blank">https://medium.com/@dmail_official</a></p>
            </div>
            {/* <EmailList className={emailList ? 'on' : ''}>
              {emailList.map(({ id, name }) => (
                <li key={name} onClick={chooseEmail({ id, name })}>{name}@ic.dmail.ai</li>
              ))} 
            </EmailList> */}
            <Generated className={emailData ? 'on' : ''}>
              {/* <span>{(selectedEmail && selectedEmail.name) || ''}@ic.dmail.ai has been generated！</span> */}
              <span>Congratulations, this domain account is open!</span>
              <a onClick={toView}>Click to view</a>
            </Generated>
            <Error className={errorShow ? 'on' : ''}>
              <i></i>
              <span>Try another one, this domain account is not open for registration yet.</span>
            </Error>
          </div>
        </Content>
        <PayWrap className={payShow ? 'on' : ''}>
          <div className="pay-img">
            <img src={card} />
          </div>
          <div className="pay-chunk">
            {currentDetail ? (
              <>
                <div className="pay-info">
                  <div className="name"><span>{currentDetail.name}@dmail.ai</span></div>
                  {/* <div className="left">{currentDetail.exp_date} days left!</div> */}
                  <div className="tips">Owner: None</div>
                  <div className="tips">Registiation Period: Permanent</div>
                  <div className="price-tip">Registiation price to pay</div>
                  <div className="price">{currentDetail.price} {currentDetail.symbal}</div>
                  {/* <div className="limit">
                  <span>Remaining limit:  &nbsp; 1800 USDT</span>
                  <span className="get-more">Get more</span>
                </div>
                <div className="offer">Add  Price:  &nbsp; 10 USDT</div> */}
                </div>
                <a className="pay-btn" onClick={onAdd}>Sign Up</a>
              </>
            ) : null}
          </div>
        </PayWrap>
        <Pop show={popShow} disabled={popDisabled} setShow={setpopShow} text={popText} name={popName} okText={popOkText} okCb={popOkCallback} cancelText={cancelText} />
        <Connect className={connectShow ? 'on' : ''}>
          <div className="connect-title">
            <strong>Connect Wallet</strong>
            <i className="pop-close" onClick={() => setconnectShow(false)}></i>
          </div>
          <div className="connect-desc">Own your first identity in the Web3 era, <br />Please select the payment network you are currently using.</div>
          <div className="connect-list">
            {ChainNames.map((name) => (
              <div className={`connect-item  ${connectWait ? 'wait' : ''}`} key={name} onClick={() => toPay(name)}>
                <div className="item-left">
                  <span className={name}></span>
                  <strong>{name}</strong>
                </div>
                <i></i>
              </div>
            ))}
            {/* <div className="connect-item" onClick={switchNetwork}><i></i></div> */}
          </div>
        </Connect>
      </Wrapper>
    </Web3ReactProvider>
  )
}

export default Account