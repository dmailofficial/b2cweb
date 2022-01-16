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
      </HeaderWrap>
    </>
  )
}

export default withRouter(Header)

