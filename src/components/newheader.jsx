import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled, { createGlobalStyle, useTheme } from 'styled-components';
import hot from '@/static/images/hot.png'
import ava from '@/static/images/ava.png'
import logo from '@/static/images/logo@2x.png'

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
  height: 67px;
  width: 100%;
  background-color: #1D1D1F;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  z-index: 20;
  box-sizing: border-box;
  .on{
    color: #FF6633;
  }
  .nav_wrapper{
    top: 65px;
  }
  .logo{
    background-image: none;
    background: none;
    img{
      width: auto;
      height: 32px;
    }
  }
  .support{
    width: 152px;
    height: 32px;
    position: relative;
    border: 1px solid #888888;
    font-size: 14px;
    font-family: Roboto-Regular, Roboto;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 32px;
    text-align: center;
    cursor: pointer;
    ul{
      display: none;
      background-color: #1D1D1F;
      padding: 10px;
      border-radius: 4px;
      position: absolute;
      width: 152px;
      box-sizing: border-box;
      top: 32px;
      border: 1px solid #333;
      li{
        width: 100%;
        font-size: 14px;
        font-family: Roboto-Regular, Roboto;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 32px;
        border-bottom: 1px solid #666;
      }
      li:last-child{
        border-bottom: none;
      }
    }
  }
  .support:hover{
    ul{
      display: block;
    }
  }
  @media screen and (max-width: 1024px){
    .logo{
      width: auto;
      height: 32px;
    }
    .nav_wrapper{
      background-color: #1D1D1F;
      box-shadow: 0 3px 5px 3px #1D1D1F;
    }
  }
`

const Header = (props) => {
  const { location: { pathname }, userEmail, toLogin, onChangeEmail } = props

  const onCommingSoon = () => {
    alert('comming soon...')
  }

  const onShowNavs = () => {
    document.querySelector('.header').classList.toggle('show');
  }

  const onContactClick = () => {
    document.querySelector('.footer').scrollIntoView()
  }

  return (
    <>
      <HeaderWrap className="header">
        <div className="logo">
          <img src={logo} alt="Dmail logo"></img>
        </div>
        <div className="nav">
          <span onClick={onShowNavs}><i></i></span>
          <div className="nav_wrapper">
            <div className="nav_item"><Link to="/" className={(pathname === '/' || pathname === '/newhome') ? 'on' : ''}>Home</Link></div>
            <div className="nav_item"><a onClick={onCommingSoon}>Mail</a></div>
            <div className="nav_item"><a onClick={onCommingSoon}>NFTs</a></div>
            <div className="nav_item"><Link to="/ambassador" className={pathname === '/ambassador' ? 'on ' : ''} >Ambassador</Link></div>
          </div>
        </div>
        {pathname === '/' ? <div className="contact" onClick={onContactClick}></div> : (
          userEmail ? <Email onClick={onChangeEmail}>{userEmail}</Email> : <div>&nbsp;</div>
        )}
        {/* <Login onClick={toLogin}></Login> */}
        <div className="support">
          <span>support</span>
          <ul>
            <li>Demo</li>
            <li>litepaper</li>
            <li>Docs</li>
            <li>API</li>
          </ul>
        </div>
      </HeaderWrap>
    </>
  )
}

export default withRouter(Header)

