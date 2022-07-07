import React, {useState}from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled, { createGlobalStyle, useTheme } from 'styled-components';
import hot from '@/static/images/hot.png'
import ava from '@/static/images/ava.png'
import logo from '@/static/images/logo@2x.png'
import { emailLogin } from '@/utils/index'

import rocketIcon from '@/static/images/home/toast/rocket@2x.png'

const Email = styled.div`
  color: #fff;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    color: #FA5F51;
  }
`

const Login = styled.div`
  width: 44px;
  height: 44px;
  background: url(${ava}) no-repeat;
  background-size: cover;
  cursor: pointer;
`
const HeaderWrap = styled.div`
  height: 60px;
  width: 100%;
  background-color: #1D1D1F;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  border-bottom: 1px solid #979797;
  z-index: 20;
  box-sizing: border-box;
  .on{
    color: #FF6633;
  }
  .nav_wrapper{
    top: 65px;
    flex: auto;
    display: flex;
    justify-content: space-around;
    padding: 0 80px;
  }
  .logo{
    background-image: none;
    background: none;
    img{
      width: auto;
      height: 32px;
    }
  }
  .nav{
    width: ${560*100/1440}vw;
    margin-left: ${160*100/1440}vw;
    .nav_item{
      a{
        font-size: 14px;
        font-family: Roboto-Bold, Roboto, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";;
        font-weight: normal;
        color: #ffffff;
      }
      a.on{
        font-weight: bold;
        color: #FF6633;
      }
    }
  }
  .support{
    width: 152px;
    height: 32px;
    position: relative;
    border: 1px solid #888888;
    font-size: 14px;
    font-family: Roboto-Regular, Roboto, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 32px;
    text-align: center;
    cursor: pointer;
    ul{
      display: none;
      background-color: #232323;
      padding: 10px 0;
      border-radius: 4px;
      position: absolute;
      width: 152px;
      box-sizing: border-box;
      top: 33px;
      li{
        width: 100%;
        font-size: 14px;
        font-family: Roboto-Regular, Roboto, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";;
        font-weight: bold;
        color: #FFFFFF;
        line-height: 32px;
        height: 32px;
        text-align: left;
        padding-left: 16px;
        a{
          color: #FFFFFF;
        }
      }
      li:last-child{
        border-bottom: none;
      }
      li:hover{
        background-color: #FF6633;
      }
    }
  }
  .support:hover{
    ul{
      display: block;
    }
  }
  .toastWrap{
    position: fixed;
    // width: 60px;
    // height: 50px;
    // background: #FFFFFF;
    text-align: center;
    top: 90px;
    left:0;
    right:0;
    margin: 0 auto;
    
    box-sizing: border-box;
    
    .closeBtn{
        width: 16px;
        height: 16px;
        display: block;
        position: relative;
        float: right;
        margin-bottom: 16px;
        cursor: pointer;
        span{
            position: absolute;
            top: 8px;
            height:1px;
            width:16px;
            display: block;
            background: #888888;
            transform: rotate(45deg);
        }
        span:nth-child(2){
            transform: rotate(-45deg);
        }
    }
    .content{
        padding: 0;
        display: inline-block;
        text-align: center;
        background-color: #1D1D1F;
        opacity: .8;
        padding: 20px;
        border : 1px solid rgba(255,255,255, .4);
        border-radius: 6px;
        box-shadow:0 0 10px rgba(255, 255, 255, 0.2);
    }
    img{
        width: 30px;
        height: 30px;
        display: inline-block;
        vertical-align: middle;
        margin: 0 20px 0px 0;
    }
    span.tip{
        display: inline-block;
        font-size: 20px;
        font-family: Roboto-Regular, Roboto, PingFangSC-Medium, PingFang SC, "Microsoft YaHei";
        font-weight: 400;
        // color: #111111;
        color: #ffffff;
        height: 24px;
        line-height: 24px;
    }
  }
  .toastWrap.hidden{display:none;}
  .toastWrap.show{display:block}
  @media screen and (max-width: 1024px){
      padding: 0 5px;
      .logo{
          order: 1;
      }
      .nav{
          margin-left: 0px;
          order: 0;
      }
      .support{
          width: auto;
          padding: 0 15px;
          order: 2;
          ul{
              width: 100%;
              left: 0;
          }
      }
    .logo{
      width: auto;
      height: 32px;
    }
    .nav_wrapper{
      display: none;
    }
    &.show{
      .nav_wrapper{
        display: block;
        background-color: #1D1D1F;
        box-shadow: 0 3px 5px 3px #1D1D1F;
        padding: 0 25px;
        .nav_item{
          width: 100%;
          a{
            display: block;
            width: 100%;
          }
        }
      }
    }
    .toastWrap{
      width: 280px;
      height: auto;
      border-radius: 6px;
      left: 50%;
      padding: 16px 16px 32px;
      margin-left: -140px;
      .content{
          padding: 32px 20px 0;
      }
      img{
          width: 45px;
          height: 46px;
      }
      span.tip{
          font-size: 16px;
          height: 46px;
          line-height: 46px;
      }
    }
  }
  @media screen and (max-width: 750px){
    padding: 0 5px;
    .logo{
        order: 1;
    }
    .nav{
        order: 0;
    }
    .support{
        width: auto;
        padding: 0 15px;
        order: 2;
        ul{
            width: 100%;
            left: 0;
        }
    }
  }
`

const Header = (props) => {
  const { location: { pathname }, userEmail, toLogin, onChangeEmail, comingSoonHandle } = props
  // const [showToast, setShowToast] = useState(false)
  const [comingToast, setComingToast] = useState(false)

 


  // const onhandleClose = () => {
  //   setShowToast(false)
  // }

  const onShowNavs = () => {
    document.querySelector('.header').classList.toggle('show');
  }

  const onContactClick = () => {
    document.querySelector('.footer').scrollIntoView()
  }

  const onComingSoon = () => {
    setComingToast(true)
    setTimeout(()=>{
      setComingToast(false)
    }, 3000)
    return;
  }

  return (
    <>
      <HeaderWrap className="header">
        <div className="logo">
          <a href='/'><img src={logo} alt="Dmail logo"></img></a>
        </div>
        <div className="nav">
          <span onClick={onShowNavs}><i></i></span>
          <div className="nav_wrapper">
            <div className="nav_item"><Link to="/" className={(pathname === '/' || pathname === '/newhome') ? 'on' : ''}>Home</Link></div>
            <div className="nav_item"><a rel="noopener noreferrer" target="_blank" href={emailLogin}>Mail</a></div>
            <div className="nav_item"><a rel="noopener noreferrer" target="_blank" href='https://skeh5-daaaa-aaaai-aar4q-cai.raw.ic0.app/#/collection/ICDmail/items'>NFTs</a></div>
            {/* <div className="nav_item"><a rel="noopener noreferrer"  onClick={onComingSoon}>Events</a></div> */}
            <div className="nav_item"><Link to="/presale" className={pathname === '/presale' ? 'on ' : ''} >Presale</Link></div>
            <div className="nav_item"><Link to="/ambassador" className={pathname === '/ambassador' ? 'on ' : ''} >Ambassador</Link></div>
          </div>
        </div>
        {/* {pathname === '/' ? <div className="contact" onClick={onContactClick}></div> : (
          userEmail ? <Email onClick={onChangeEmail}>{userEmail}</Email> : null
        )} */}
        {/* <Login onClick={toLogin}></Login> */}
        <div className="support">
          <span>Support</span>
          <ul>
            <li><a rel="noopener noreferrer"  href="https://dmail.ai/Dmail_litepaper.pdf" target="_blank">Litepaper</a></li>
            <li onClick={onComingSoon} >Docs</li>
            <li onClick={onComingSoon}>API</li>
          </ul>
        </div>
        <div className={comingToast ? "toastWrap show": "toastWrap hidden"}>
          <div className="content">
            <img src={rocketIcon}></img>
            <span className="tip">Coming soon!</span>
          </div>
        </div>
        
      </HeaderWrap>
    </>
  )
}

export default withRouter(Header)

