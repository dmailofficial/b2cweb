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
import { setByNumber, setNumber } from './setByNumber'
import Web3 from "web3"
// https://github.com/GoogleChromeLabs/jsbi
import JSBI from 'jsbi';

import { emailReg, Pop, metaMaskAuth, tronLinkAuth, plugAuth, metaMaskSign, login, verifySign, setEmailRequest, searchEmail, getDetail, detectTransferIsSuccess } from './utils'
import axios from '@/utils/axios';

import logo from '@/static/images/logo-big.png'
import bg from '@/static/images/account-bg.png'
import tip from '@/static/images/tip.png'
import name from '@/static/images/name.png'
import countdown from '@/static/images/countdown.png'
import card from '@/static/images/card4.png'
import close from '@/static/images/close.png'
import to from '@/static/images/to.png'
import metamask from '@/static/images/metamask.png'
import tronlink from '@/static/images/tronlink.png'
import plug from '@/static/images/plug.png'
import success from '@/static/images/success.png'
import back from '@/static/images/back.png'

const successMsg = 'Congratulations, you have successfully participated in the DMAIL NFT Domain Account pre-sale!'

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
  // transition: all .3s ease-out;
  // transform: rotate(-45deg);
  // transform-origin: right bottom;
  opacity: 0;
  display: none;

  &.on {
    // transform: rotate(0);
    opacity: 1;
    display: block;
  }

  .account-chunk {
    position: relative;
    z-index: 100;
    width: 909px;
    margin: 20px auto;
    padding-bottom: 100px;
  }

  .note {
    color: #fff;
    text-align: center;
    margin-bottom: 40px;

    h1 {
      font-size: 26px;
      margin-bottom: 20px;
    }

    p {
      font-size: 18px;
      color: rgba(255, 255, 255, .6);
    }
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
    width: 228px;
    height: 80px;
    background: url(${logo});
    background-size: 100%;
    margin: 0 auto 15px;
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
    padding-left: 80px;
    margin-top: 60px;
    color: rgba(255, 255, 255, .7);
    line-height: 26px;
    font-size: 16px;

    p:first-child {
      margin-bottom: 10px;
    }

    ul {
      margin-left: 3em;
    }

    li {
      list-style: circle;
      margin-left: -10px;
    }

    a {
      color: #5581FF;
    }
  }
`

const Error = styled.div`
  position: absolute;
  top: 295px;
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
  top: 295px;
  left: 0;
  right: 0;
  background: #fff;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 15px;
  padding: 0 8px 0 24px;
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
    font-size: 20px;
    color: #1A0B42;
    flex: 1;
  }

  a {
    background: #63C68B;
    height: 56px;
    line-height: 56px;
    padding: 0 20px;
    font-size: 22px;
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
  justify-content: center;

  // transition: all .5s ease-out;
  // transform: translateX(150%) translateY(-200%) rotate(90deg);
  // transform-origin: left bottom;
  // opacity: 0;
  display: none;

  &.on {
    // transform: translateX(0) translateY(0) rotate(0deg);
    // opacity: 1;
    display: flex;
  }

  .pay-img {
    position: relative;
    margin-right: 140px;
    
    img {
      width: 540px;
    }

    .back {
      color: #fff;
      position: absolute;
      top: -44px;
      left: 25px;
      cursor: pointer;
      width: 28px;
      height: 28px;
      background: url(${back}) no-repeat;
      background-size: 28px;
      line-height: 28px;
      padding-left: 38px;
      font-size: 20px;
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
      position: relative;
      margin-right: 200px;

      .back {
        top: -60px;
      }

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
      margin-bottom: 6px;
    }

    .pay-info .name {
      font-size: 42px;
      margin-bottom: 25px;
    }

    .pay-info .tips {
      font-size: 20px;
    }

    .pay-info .price-tip {
      font-size: 24px;
      margin-top: 40px;
    }

    .pay-info .price {
      font-size: 28px;
    }

    .pay-info .pay-btn {
      font-size: 28px;
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
  transform-origin: center bottom;

  @keyframes shake {
    0% {transform: rotate(0deg) translateX(-50%) translateY(-50%);}
    25% {transform: rotate(8eg) translateX(-50%) translateY(-50%);}
    50% {transform: rotate(0deg) translateX(-50%) translateY(-50%);}
    75% {transform: rotate(-8eg) translateX(-50%) translateY(-50%);}
    100% {transform: rotate(0deg) translateX(-50%) translateY(-50%);}
  }

  &.shake {
    animation: shake 2s 1;
  }

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
    top: 24px;
    right: 24px;
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
  margin-bottom: 25px;
  font-size: 14px;
  background: #e6f7ff;
  border: 1px solid #b9e9ff;
  text-align: left;
  padding-left: 20px;
  line-height: 30px;
  border-radius: 5px;
  display: flex;
  align-items: center;

  i {
    width: 16px;
    height: 16px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAABw9JREFUeF7tW22IVGUUfs4MKmiKic5dXfpW0AhCKNLQTPyCyEJ/lFpUfmRB6rzXDyL9nUGmc0fth5V9Uan9SFIJ3G0rU1CpHwWVgpl9re47KyWpQdbcE+96Z/bO3Xvnfs8KuxeGhZ1zzvuc5773nHPfc4bQxy/q4/6jn4D+HdAgBpoKfD8TbgNwK9D1t/JRCE7bPj8R43SHTl80Alpqj8CoLTw2m8VUZswC8CCAoSEdugjgABFay2Uc7lxNP4bUDySeOAG5Aj9GhBUAJgVCEFzoGDO2l3R6P7iKv2RiBIwyeEoGWA1gnv+ysST2msCWTkFHYlmxlGMTMGYz31DOdjkufAC1gdHGhHYitGczaL8yGO1KZ+DfaC6baGZGMzGaQZgBdH3qXUa2jC1n19BvcYiIRYBW4IUgvAjgFlcQhP0MHDBN7D+v07kwQEcWeHQmg7mk4gdjrofuGTA2SJ12hbFtl41MgFZgA4S8x8J7kIEhV9GxqMDsetpWngSza4c96mqPUZQ6+e1Aj3sUAaFmsHLsHqcqA1+CYJTytDeCWV+VXJHngSEIuM9F+LgUFDrwht4BmsHshpQIz3fk6WVfLxIQ0Ar8Aggb3UxJQaF8CiWsGayetQWOhVUge1YKOpCAb4FNNBX4KQZ2gDDQobRbCloY1FBgAjSDnwbwWo1hwn6Zp4eCLpa0nLaJh2AAvgNws8P2cino9SDrBSIgZ/AsAlocBndKQcuCLJK2jGbwDwAm2NdhYHZJUKvf2r4EWHm+DcA4m7HvpaA7/Ix7fT+qyOMyJraDMLtLhtFiZrCiM0+notgcXuDhgwglAANs+qeyZczwqxN8CdAMLjiLHJMxsVOnb6KAVTpagQ9Wna8YYbRIneZEtdlU5OnM+Myhb0hBej2bdQmwytvDNQYYutTJiAq0iwCPTBI2gjsx5AxeQ8Ar9v+bwNR6ZXNdAjSDP7LX9irPlwRNi+N8HQJMKSgb13bO4EOOOmGvFDTfy64nAdZb3Xs1gYUwP4kiJ41HoIJTFUvEUDeuejHjca+3SE8CXKq9PVKQswaIdMMcQdAE49M4QdAJQjN4t6Ns9qwSXQkYXeAJJkGllu4rg8lJ1faRWAuhZL07HK2Bz7j9nE4nnGZcCdAMXgWgWBUmtMh89AgdAntiolqRD4KtNHvVal4K2hqUgI8BVCs8Zqwr6VQTXRNDmpKhXIHXEmGTzfw+KejhoARcAjCkIpwBbjon6NeUsKZidrTBN5rALzbjl6Wg63wJsE5vP68IEnCkQ9DUpFHmNvOdlIUKVuAyFpTW0LdJr9Fk8GEGplR9YUx3njb3iAGawUsBvNGdQ7Be6vRS0uA0g1VAGm/ZPSkF1dTySazn8tq8TAraabftRoA64lpfEWLgyZKgd5MAZLfhrAbjVoFu+HIGP0HAO7bvNkpBG/wIqM2hhJkyT+plKNGrEQRoRZ6hagwb8B61jNsO+ArAXRWlbBYTzq6kk4l67/I+kMYOGLONx5fLsOf+r6Wgu/12wB8Arq8IlYdi2PmlpLo0iV6N2AEjd/LQ7EX8ZQP+pxQ0op8AGwP9j4BzX/d4keiDQbDPp8FGFUI1/YU0skCkQshZCgNok4JmJpoCGpQGNYNVDVBtslKQUlg5qhmsUkd1oKHMGBO2uelHWNppUDVXs4SzNhwXpaBhTlxe5wEfAKh2V5jwTClPtU0RPw99vk+bgFyRlxNjhw3GLiloUSACmoq8mBlvVoVT6AClTYBW5H32tjoRlnTk6a1ABKj5nkwGtU2KhI/E0iTA7UjMNDHObc6o3qGoOlOzt5sTOxS14kxqWcDlUPSYFDTZ7anslWPxNAlI7FjcAplKYyRVApJqjCiQHq2xRE6I0ogBmsHqIEdVstUrVmvMulM9mqPEWNyh09txMmHSR2JagZeAUHPcBSBec1Q5aLXHD9VMgjGu4D+MkOvoclQSkjwUtYoeNS5n7y2eyZYxLXZ7vGsXXB2HU8WR/fpZCnIfj4vKSkQ9zeDfATTXqDMWBRmf850PqBj1GIs78Q/j3gs6XYiIPZba2K086JKJowxMdDgfeGwuMAFWPHAbj/uXCHM68lTtJcTyKqCyFaAPAhjsUAk1LheKALf0VVmcgbUlQZsD4o8llivwaiK4rhX2tTo0ARYJbuNy6OVByVDjcZU7EIkAi4SeY3Pd97Wxo7JA4LE459aLTIAyZI3PveqYIOteg9DCJlqzhA/DNldVc7PMeIQymOVoc9t9OMXAc0HG4byeuVgE2OoE33F51WRlxidBxuWJ8IC9qekBvvfH5e3A+uwPJpx3xxquWuk2TR4r9APHmbHtmv3JjNM5a85I/WCq8uuP6sBFQCJUma2asm0ZRqvbfE9AO3XFYseAoCD63M/mghLT23IN2wG97WhqafBadSworj6/A/4HSeg1biBoxEcAAAAASUVORK5CYII=);
    background-size: 100%;
    margin-right: 10px;
  }
`
const SetEmail = styled.div`
  .set-item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    span {
      width: 130px;
      font-size: 14px;
      text-align: left;
    }

    input {
      line-height: 40px;
      flex: 1;
      padding: 0 15px;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-size: 14px;
    }
  }
`

const UserEmailComponent = ({ defaultEmail, showTrigger, setuserEmail, setpopDisabled }) => {
  const [email, setEmail] = useState('')
  const [email2, setEmail2] = useState('')
  const emailRef = useRef('')
  const email2Ref = useRef('')

  const setDisabled = () => {
    setpopDisabled(!emailReg.test(emailRef.current) || emailRef.current !== email2Ref.current)
  }

  const onInput = (ev) => {
    const value = ev.target.value
    setEmail(value)
    setuserEmail(value)
    emailRef.current = value
    setDisabled()
  }

  const onInput2 = (ev) => {
    const value = ev.target.value
    setEmail2(value)
    email2Ref.current = value
    setDisabled()
  }

  useEffect(() => {
    setpopDisabled(true)
    setEmail(defaultEmail)
    setEmail2(defaultEmail)
    emailRef.current = defaultEmail
    email2Ref.current = defaultEmail
  }, [showTrigger])

  useEffect(() => {
    setEmail(defaultEmail)
    setEmail2(defaultEmail)
    emailRef.current = defaultEmail
    email2Ref.current = defaultEmail
  }, [defaultEmail])

  return (
    <SetEmail>
      <Text>
        <i></i>
        <span>Please make sure you can be reached</span>
      </Text>
      <div className="set-item">
        <span>Contact email *</span>
        <input placeholder="Please make sure you can be reached" value={email} onInput={onInput} />
      </div>
      <div className="set-item">
        <span>Confirm email *</span>
        <input placeholder="Please make sure you can be reached" value={email2} onInput={onInput2} />
      </div>
    </SetEmail>
  )
}

const Account = () => {
  const { Contract, ethers } = require('ethers');

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

  const TronAbiMap = {
    contractAddress: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
    abi: TRC_abi,
    toAddress: 'TGQeDqyZk4hW6FLjq8h6adZ9xaCMWPXozt',
    decimals: 6,
  }

  const PlugAbiMap = {
    toAddress: '567to-2ufhs-rzv5c-2wnbb-6y34z-kzi7q-nvwcv-ulekn-2esk4-kyggc-iae',
  }

  const ChainNames = ['MetaMask', 'TronLink']
  // const ChainNames = ['MetaMask', 'TronLink', 'Plug']

  const [loginInfo, setloginInfo] = useState(null)
  const loginInfoRef = useRef({})

  const [email, setEmail] = useState('')
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
  const [popDisabled, setpopDisabled] = useState(true)
  const [popOkCallback, setpopOkCallback] = useState(null)
  const [cancelCallback, setcancelCallback] = useState(null)
  const [cancelText, setcancelText] = useState('')

  const goBack = () => {
    setpayShow(false)
  }

  const popDisabledRef = useRef(popDisabled)
  useEffect(() => {
    popDisabledRef.current = popDisabled
  }, [popDisabled])

  const [shakeChanger, setshakeChanger] = useState(false)

  // sign up show connect pop
  const isSignUpRef = useRef(false)
  // set email show connect pop
  const isChangeEmailRef = useRef(false)
  useEffect(() => {
    !connectShow && (isChangeEmailRef.current = false)
    !connectShow && (isSignUpRef.current = false)
    !connectShow && setTimeout(() => {
      setshakeChanger(false)
    }, 300);
  }, [connectShow])

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

  // useEffect(() => {
  //   loginInfoRef.current = { ...loginInfo }
  // }, [loginInfo])

  useEffect(() => {
    userEmailRef.current = userEmail
  }, [userEmail])

  useEffect(() => {
    setEmailData(null)
    setErrorShow(false)
    // setSelectedEmail(null)
  }, [email])

  const popShowRef = useRef(popShow)
  useEffect(() => {
    popShowRef.current = popShow
    if (!popShow) {
      setpopName('')
      setpopOkText('')
      // setuserEmail('')
      setpopDisabled(false)
      setcancelText('')
      setcancelCallback(null)
    }
  }, [popShow])

  const showPop = (text = '', okText = '', okCb = null, name = '', cancelText = '', cancelCb = null) => {
    setpopText(text)
    setpopOkText(okText)
    setpopOkCallback(okCb)
    setcancelCallback(cancelCb)
    setpopShow(true)
    setpopName(name)
    setcancelText(cancelText)
  }


  const onChangeEmail = async () => {
    isChangeEmailRef.current = true
    setconnectShow(true)
    if (isSignUpRef.current) {
      setshakeChanger(true)
    }
  }

  const showTrigger = useRef(0)

  const loginSteps = {
    async auth(name) {
      // metaMask auth
      let res = null
      if (name === 'MetaMask') {
        res = await metaMaskAuth();
      } else if (name === 'TronLink') {
        res = await tronLinkAuth();
      } else if (name === 'Plug') {
        res = await plugAuth();
      }
      // console.log('auth', res)
      // get accounts failed
      if (!Array.isArray(res) || !res.length) {
        setconnectWait(false)
        if (res && res.code === 2) {
          showPop(res.msg, 'install', () => Promise.resolve((close) => {
            close()
            const install = ''
            if (name === 'MetaMask') {
              install = 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'
            } else if (name === 'TronLink') {
              install = 'https://chrome.google.com/webstore/detail/tronlink%EF%BC%88%E6%B3%A2%E5%AE%9D%E9%92%B1%E5%8C%85%EF%BC%89/ibnejdfjmmkpcnlpebklmnkoeoihofec';
            } else if (name === 'Plug') {
              install = 'https://chrome.google.com/webstore/detail/plug/cfbfdhimifdmdehjmkdobpcjfefblkjm'
            }
            window.open(install)
          }))
        }

        return false
      }
      // setloginInfo({
      //   address: res[0]
      // })
      loginInfoRef.current = {
        ...loginInfoRef.current,
        ...{
          address: res[0]
        }
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

      const { id, nonce, signmessage, email } = data

      if (email) {
        Cookies.set('userEmail', email, { expires: 30 })
      }

      return { address, sign: signmessage, email }
    },
    async sign({ id, address, sign, email }, name) {
      if (name !== 'MetaMask') {
        return { 
          // address, sign, 
          email
        }
      }
      // sign
      const signRes = await metaMaskSign(sign)
      console.log('signRes', signRes)
      // sign failed
      if (!Array.isArray(signRes)) {
        if (signRes && signRes.code === 2) {
          showPop(signRes.msg)
        }
        return false
      }
      const [signature, signer] = signRes
      return {
        address, sign: signature, signer, email
      }
    },
    async verifySign({ address, sign, signer, email }, name) {
      if (name !== 'MetaMask') {
        return { 
          // address, sign, 
          email
        }
      }
      // if has jwt, no need to auth
      const loginInfo = loginInfoRef.current
      if (loginInfo && loginInfo.jwt && loginInfo.address) {
        return {
          ...loginInfo
        }
      }
      const { success, msg, data } = await verifySign(address, sign)
      if (!success) {
        setconnectWait(false)
        showPop(msg)
        return false
      }
      const { jwt } = data
      loginInfoRef.current = {
        ...loginInfoRef.current,  
        ...{
          address, sign, signer, jwt, userEmail: email
        }
      }
      
      return { 
        // sign, signer, jwt, address, 
        email 
      }
    },
    async updateEmail({ email }, name) {
      const userEmail = email || Cookies.get('userEmail') || ''
      showTrigger.current += 1
      if (isChangeEmailRef.current || !userEmail) {
        showPop(<UserEmailComponent showTrigger={showTrigger.current} defaultEmail={userEmail} setuserEmail={setuserEmail} setpopDisabled={setpopDisabled} />, 'Set', () => Promise.resolve(async (close) => {
          await onSetEmail(close, name)
          isChangeEmailRef.current && setconnectShow(false)
        }), 'Set Contact Email', 'Cancel', () => {
          setconnectWait(false)
        })
        return false
      }
      return true
    }
  }

  const getChainInfo = async (name) => {
    // console.log('name', name)
    let chainId = ''
    let chainInfo = null
    if (name === 'MetaMask') {
      try {
        chainId = await getChainId()
        console.log('get chainId', chainId)
      } catch (error) {
        return null
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
            return null
          } else {
            return null
          }
        } catch (error) {
          console.log(error)
          return null
        }
      }
    } else if (name === 'TronLink') {    // comming soon
      chainInfo = TronAbiMap
    } else {
      chainInfo = PlugAbiMap
    }

    return {
      chainId,
      ...chainInfo
    }
  }

  const toPay = async (name) => {
    if (isChangeEmailRef.current) {
      await verifyLogin(name)
      return
    }
    const chainInfo = await getChainInfo(name)
    if (!chainInfo) {
      return  false
    }

    let loginInfo = loginInfoRef.current
    // console.log('loginInfo', name, loginInfo, chainInfo)
    // if (!loginInfo || !loginInfo.jwt || !loginInfo.address || !loginInfo.userEmail) {
    if (!loginInfo || !loginInfo.userEmail ||  (name !== 'TronLink' && !loginInfo.address)) {
      if (!await verifyLogin(name)) {
        return
      }
    }
    loginInfo = loginInfoRef.current

    const { chainId, abi, contractAddress, toAddress, decimals } = chainInfo
    // console.log(name, contractAddress, toAddress, loginInfo)
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    let contract = null
    if (name === 'MetaMask') {
      const signer = provider.getSigner();
      contract = new Contract(contractAddress, abi, signer);
      try {
        const balance = await contract.balanceOf(loginInfo.address)
      } catch (error) {
        showPop('Confirm your wallet is properly connected! Confirm your assist is enough!')
      }
      // console.log('contract', `address: ${loginInfo.address}`, balance._hex, Web3.utils.hexToNumberString(balance._hex), balance)
    } else if (name === 'TronLink') {
      contract = await window.tronWeb.contract(abi, contractAddress);
      // console.log('window.tronWeb.defaultAddress.base58', window.tronWeb.defaultAddress.base58)
    }

    // console.log('getChainId', chainId, contractAddress, toAddress)
    try {
      // console.log(1, currentDetail.price)
      if (name === 'MetaMask') {
        // const signer = provider.getSigner();
        // const daiWithSigner = contract.connect(signer);
        // console.log(`price: ${setByNumber(+currentDetail.price, 6)}`)
        contract.transfer(toAddress, setByNumber(+currentDetail.price, decimals)).then(async (res) => {
          const {
            from,
            hash,
          } = res
          const { success, msg, data } = await detectTransferIsSuccess(hash, from, currentDetail.price, currentDetail.name, loginInfo.jwt, chainId)
          console.log('success', success, res)
          showPop(success ? successMsg : msg, '', () => Promise.resolve((close) => {
            close()
            if (success) {
              setEmailData(false)
              setconnectShow(false)
              goBack()
            }
          }))
        }).then((val) => {
          // console.log('resolve', val)
        }).catch((error) => {
          console.log('error', error)
          showPop('Confirm your wallet is properly connected! Confirm your assist is enough!')
        })
      } else if (name === 'TronLink') {
        const tokenAmount = setNumber(currentDetail.price, decimals)
        // console.log(`contractAddress => ${contractAddress}, from => ${window.tronWeb.defaultAddress.base58}, toAddress => ${toAddress}, amount => ${tokenAmount}`);
        let result = await contract.transfer(
          toAddress, //address _to
          tokenAmount   //amount
        ).send().then(async output => {
          console.log('- Output:', output, '\n');
          const { success, msg, data } = await detectTransferIsSuccess(output, loginInfo.address, currentDetail.price, currentDetail.name, '', '999', true)
          showPop(success ? successMsg : msg, '', () => Promise.resolve((close) => {
            close()
            if (success) {
              setEmailData(false)
              setconnectShow(false)
              goBack()
            }
          }))
          // const { success, msg, data } = await detectTransferIsSuccess(hash, from, currentDetail.price, currentDetail.name, loginInfo.jwt, chainId)
          // showPop(success ? 'Congratulation！' : msg, '', () => {
          //   success && window.location.reload()
          // })
        });
      } else if (name === 'Plug') {
        console.log('JSBI.BigInt(currentDetail.price)', setNumber(currentDetail.price, 2), currentDetail.price)
        // https://docs.plugwallet.ooo/getting-started/connect-to-plug/#requesttransferrequesttransferparams
        const result = await window.ic.plug.requestTransfer({
          to: toAddress,
          amount: 4000000 * currentDetail.price,
          // opts: {
          //   fee: '',
          //   memo,
          //   from_subaccount: ''
          // }
        });
        console.log('requestTransfer', result);
      }
    } catch (error) {
      showPop('Confirm your wallet is properly connected! Confirm your assist is enough!')
      console.log('error', error)
    }
  }

  const onSetEmail = async (close, name) => {
    if (popDisabledRef.current) {
      return;
    }
    const loginInfo = loginInfoRef.current
    const userEmail = userEmailRef.current
    if (emailReg.test(userEmail)) {
      const { address, jwt } = loginInfo
      const { success, msg, data } = await setEmailRequest(address, jwt, userEmail, name === 'TronLink')
      close()
      if (!success) {
        setconnectWait(false)
        showPop(msg)
        return false
      }
      loginInfoRef.current = {
        ...loginInfo,
        userEmail,
      }
      setloginInfo({
        userEmail,
      })
      Cookies.set('userEmail', userEmail, { expires: 1 })
      !isChangeEmailRef.current && toPay(name)
    }
  }

  const verifyLogin = async (name) => {
    setconnectWait(true)

    const steps = Object.values(loginSteps)
    let res = name
    while (steps.length) {
      res = await steps.shift()(res, name)
      if (!res) {
        return
      }
    }

    setconnectWait(false)
    return !!res
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

  const toView = async () => {
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
    isSignUpRef.current = true
    setconnectShow(true)
  }

  const getChainId = () => {
    return new Promise((resolve, reject) => {
      // https://docs.metamask.io/guide/ethereum-provider.html#ethereum-networkversion-deprecated
      window.ethereum.request({ method: 'eth_chainId' }).then((chainId) => {
        resolve(Web3.utils.hexToNumber(chainId))
      })

    })
  }

  const switchNetwork = () => {
    // showPop('Please switch your wallet to the Ethereum primary network before connecting')
    showPop('Coming soon')
  }

  useEffect(() => {
    // const jwt = Cookies.get('jwt')
    // const address = Cookies.get('address')
    // console.log((new BigNumber('0x022e069df552750000')).toNumber())
    // console.log((new BigNumber('0x012a05f200')).toNumber())
    // console.log((new BigNumber('0x00')).toNumber())
    // console.log((new BigNumber('0x8d13')).toNumber())

    const userEmail = Cookies.get('userEmail')
    if (userEmail) {
      setloginInfo({
        // jwt,
        userEmail,
      })
      loginInfoRef.current = {
        ...loginInfoRef.current,
        userEmail
      }
    }
  }, [])

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Wrapper>
        <GlobalStyle />
        <Header userEmail={loginInfo ? loginInfo.userEmail : ''} onChangeEmail={onChangeEmail} />
        {/* <Wallet /> */}
        <Content className={payShow ? '' : 'on'}>
          <div className="account-chunk">
            <div className="logo-big"></div>
            <div className="note">
              <h1>Dmail NFT Domain Account</h1>
              <p>Master your mailbox data sovereignty</p>
              <p>Each mail is NFT</p>
            </div>
            <div className="input-wrap">
              <span></span>
              <input value={email} onInput={onInput} type="text" placeholder="Check the NFT domain account of your choice" />
              <a onClick={onSearch} className={searching ? 'waiting' : ''}>Search</a>
            </div>
            <div className="desc">
              <p>Current opening progress:</p>
              <ul>
                <li>1-3 bits will open in NFT domain accounts auction;</li>
                <li>4-7 bits partially open;</li>
                <li>8 bits and above, will open after mainnet releases.</li>
              </ul>
              <p>Follow <a href="https://twitter.com/dmailofficial" target="_blank">twitter</a> to be the first to get the latest notifications about the release.</p>
              <p>What is DMAIL?  </p>
              <p>Click to learn more from Medium articles</p>
              <p><a href="https://medium.com/@dmail_official" target="_blank">https://medium.com/@dmail_official</a></p>
            </div>
            <Generated className={emailData ? 'on' : ''}>
              <span>Congratulations, this NFT domain account is open!</span>
              <a onClick={toView}>Click to view</a>
            </Generated>
            <Error className={errorShow ? 'on' : ''}>
              <i></i>
              <span>Try another one, this NFT domain account is not open for registration yet.</span>
            </Error>
          </div>
        </Content>
        <PayWrap className={payShow ? 'on' : ''}>
          <div className="pay-img">
            <div className="back" onClick={goBack}>Back</div>
            <img src={card} />
          </div>
          <div className="pay-chunk">
            {currentDetail ? (
              <>
                <div className="pay-info">
                  <div className="name"><span>{currentDetail.name}@dmail.ai</span></div>
                  <div className="tips">Owner: None</div>
                  <div className="tips">Expiration Date: Permanent</div>
                  <div className="price-tip">Registiation price to pay</div>
                  <div className="price">{currentDetail.price} {currentDetail.symbal}</div>
                </div>
                <a className="pay-btn" onClick={onAdd}>Sign Up</a>
              </>
            ) : null}
          </div>
        </PayWrap>
        <Pop show={popShow} disabled={popDisabled} setShow={setpopShow} text={popText} name={popName} okText={popOkText} okCb={popOkCallback} cancelCb={cancelCallback} cancelText={cancelText} />
        <Connect className={`${connectShow ? 'on' : ''} ${shakeChanger ? 'shake' : ''}`}>
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
          </div>
        </Connect>
      </Wrapper>
    </Web3ReactProvider>
  )
}

export default Account