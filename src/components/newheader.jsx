import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled, { createGlobalStyle, useTheme } from 'styled-components';
import hot from '@/static/images/hot.png'
import ava from '@/static/images/ava.png'

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
  background-color: #1D1D1F;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  position: relative;
  z-index: 20;
  .on{
    color: #E84118;
  }
  .nav_wrapper{
    background-color: #1D1D1F;
    top: 65px;
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
        <div className="logo"></div>
        <div className="nav">
          <span onClick={onShowNavs}><i></i></span>
          <div className="nav_wrapper">
            <div className="nav_item"><Link to="/" className={pathname === '/' ? 'on' : ''}>Home</Link></div>
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

