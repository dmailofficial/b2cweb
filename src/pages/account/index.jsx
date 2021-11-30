import React, { useState, useCallback, useEffect, useRef } from 'react';
import Header from '@/components/header'
import styled, { createGlobalStyle, useTheme } from 'styled-components';
import Cookies from 'js-cookie'
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React, Web3ReactProvider } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { abi } from './abis'
import reportWebVitals from './reportWebVitals';


import { emailReg, Pop, metaMaskAuth, metaMaskSign, login, verifySign, setEmailRequest, searchEmail, getDetail, detectTransferIsSuccess } from './utils'
import axios from '@/utils/axios';

import logo from '@/static/images/logo-big.png'
import bg from '@/static/images/account-bg.png'
import tip from '@/static/images/tip.png'
import name from '@/static/images/name.png'
import countdown from '@/static/images/countdown.png'
import card from '@/static/images/card.png'
import close from '@/static/images/close.png'
import to from '@/static/images/to.png'

const injectedConnector = new InjectedConnector({
  // supportedChainIds: [256, 269],
  supportedChainIds: [3],
});

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
    margin: 0 auto;
  }

  .logo-big {
    width: 256.5px;
    height: 90px;
    background: url(${logo});
    background-size: 100%;
    margin: 18% auto 50px;
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
`

const Error = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 35px;
  display: flex;
  align-items: center;
  font-size: 24px;
  color: #D50202;
  transition: opacity .3s ease-out;
  opacity: 0;
  display: none;

  &.on {
    opacity: 1;
    display: block;
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
  top: 100%;
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
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  }

  div.name {
    font-size: 40px;
    margin-bottom: 28px;
    position: relative;
    left: -58px;

    i {
      width: 38px;
      height: 38px; 
      background: url(${name}) no-repeat;
      background-size: 100%;
      margin-right: 20px;
    }
  }

  div.left {
    color: #FF8C38;
    font-weight: 600;
    font-size: 30px;
    margin-bottom: 45px;

    i {
      width: 28px;
      height: 28px; 
      background: url(${countdown}) no-repeat;
      background-size: 100%;
      margin-right: 20px;
    }
  }

  .price {
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
    width: 330px;
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
  
    div.name {
      font-size: 50px;
      margin-bottom: 36px;
      left: -68px;
  
      i {
        width: 48px;
        height: 48px; 
        margin-right: 20px;
      }
    }
  
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
  
    div.name {
      font-size: 32px;
      margin-bottom: 20px;
      left: -50px;
  
      i {
        width: 30px;
        height: 30px; 
        margin-right: 20px;
      }
    }
  
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

  .connect-title {
    font-size: 36px;
    font-weight: bold;
    color: #1A071F;
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
    width: 300px;
    height: 100px;
    background: linear-gradient(to right, #FCA9A3 , #FEE1A8);
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    margin-bottom: 20px;
    border-radius: 20px;
    padding: 0 36px;
    cursor: pointer;

    &.wait {
      cursor: wait;
    }

    &:nth-child(2) {
      background: linear-gradient(to right, #B2C5FB , #DCECFE);
    }

    &:last-child {
      margin-bottom: 0;
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

const Input = styled.input`
  line-height: 40px;
  width: 300px;
  padding: 0 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 18px;
`

const UserEmail = ({ setuserEmail }) => {
  const [email, setEmail] = useState('')

  const onInput = (ev) => {
    const value = ev.target.value
    setEmail(value)
    setuserEmail(value)
  }

  return (
    <Input value={email} onInput={onInput} />
  )
}

const Account = () => {
  const { Contract, ethers } = require('ethers');

  const [loginInfo, setloginInfo] = useState(null)
  const loginInfoRef = useRef(null)

  const [email, setEmail] = useState('')
  const [selectedEmail, setSelectedEmail] = useState(null)
  const [emailList, setEmailList] = useState([])
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

  useEffect(() => {
    loginInfoRef.current = { ...loginInfo }
  }, [loginInfo])

  useEffect(() => {
    userEmailRef.current = userEmail
  }, [userEmail])

  useEffect(() => {
    setEmailList([])
    setErrorShow(false)
    setSelectedEmail(null)
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
      console.log('metaMaskAuth', res)
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
      showPop(<UserEmail userEmail={userEmail} setuserEmail={setuserEmail} />, 'SET', onSetEmail, 'set email', 'cancel')
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

  useEffect(() => {
    setpopDisabled(!emailReg.test(userEmail))
  }, [userEmail])


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
    const { success, msg, data } = await searchEmail(email)
    setsearching(false)
    if (!success) {
      showPop(msg)
      return
    } else if (!Array.isArray(data)) {
      showPop('something is error')
      return
    }
    setEmailList(data)
    if (!data.length) {
      setErrorShow(true)
    }
  }
  const onInput = (ev) => {
    setEmail(ev.target.value)
  }

  const chooseEmail = (o) => () => {
    setSelectedEmail(o)
    setEmailList([])
  }

  const toView = async () => {
    if (!selectedEmail) {
      return
    }
    const { success, msg, data } = await getDetail(selectedEmail.id)
    if (!success) {
      showPop(msg)
      return
    }
    const { id, name, price, exp_date, symbal } = data
    setpayShow(true)
    setcurrentDetail({
      id, name, price: `43320000`, exp_date, symbal
    })
  }

  const onAdd = async () => {
    if (!loginInfo || !loginInfo.jwt || !loginInfo.address || !loginInfo.userEmail) {
      await verifyLogin()
    }
    setconnectShow(true)
  }

  const contractAddress = '0x74F5B6802c2E3752255936B7546284FF1f66f945'; // contract address
  const toAddress = '0x868BF417E38f9264426ebA9f5e4F5ac274e0988e';
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new Contract(contractAddress, abi, provider);

  const toPay = async () => {
    const loginInfo = loginInfoRef.current
    if (!loginInfo || !loginInfo.jwt || !loginInfo.address || !loginInfo.userEmail) {
      await verifyLogin()
    }

    const signer = provider.getSigner();
    const daiWithSigner = contract.connect(signer);
    try {
      daiWithSigner.transfer(toAddress, currentDetail.price).then(async ({
        from,
        hash,
      }) => {
        const { success, msg, data } = await detectTransferIsSuccess(hash, from, currentDetail.price, currentDetail.name, loginInfo.jwt)
        showPop(success ? 'Congratulations! buy success' : msg)
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
              <input value={email} onInput={onInput} type="text" placeholder="www" />
              <a onClick={onSearch} className={searching ? 'waiting' : ''}>search</a>
            </div>
            <EmailList className={emailList.length ? 'on' : ''}>
              {emailList.map(({ id, name }) => (
                <li key={name} onClick={chooseEmail({ id, name })}>{name}@ic.dmail.ai</li>
              ))}
            </EmailList>
            <Generated className={selectedEmail ? 'on' : ''}>
              <span>{(selectedEmail && selectedEmail.name) || ''}@ic.dmail.ai has been generated！</span>
              <a onClick={toView}>Click to view</a>
            </Generated>
            <Error className={errorShow ? 'on' : ''}>
              <i></i>
              <span>Try another account. This account is not open for registration.</span>
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
                  <div className="name"><i /><span>{currentDetail.name}@ic.dmail.ai</span></div>
                  <div className="left"><i />{currentDetail.exp_date} days left!</div>
                  <div className="price">Current Price: &nbsp; {currentDetail.price} {currentDetail.symbal}</div>
                  {/* <div className="limit">
                  <span>Remaining limit:  &nbsp; 1800 USDT</span>
                  <span className="get-more">Get more</span>
                </div>
                <div className="offer">Add  Price:  &nbsp; 10 USDT</div> */}
                </div>
                <a className="pay-btn" onClick={onAdd}>Add auction</a>
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
          <div className="connect-list">
            <div className={`connect-item ${connectWait ? 'wait' : ''}`} onClick={toPay}><i></i></div>
            <div className="connect-item" onClick={switchNetwork}><i></i></div>
          </div>
        </Connect>
      </Wrapper>
    </Web3ReactProvider>
  )
}

export default Account