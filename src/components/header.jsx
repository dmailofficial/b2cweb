import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled, { createGlobalStyle, useTheme } from 'styled-components';

const Email = styled.div`
  color: #fff;
  font-size: 18px;
`

const Login = styled.div`
  cursor: pointer;
  color: #fff;
  font-size: 24px;
`

const Header = (props) => {
  const { location: { pathname }, userEmail, toLogin } = props

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
      <div className="bg"></div>
      <div className="header">
        <div className="logo"></div>
        <div className="nav">
          <span onClick={onShowNavs}><i></i></span>
          <div className="nav_wrapper">
            <div className="nav_item"><Link to="/" className={pathname === '/' ? 'on' : ''}>Home</Link></div>
            <div className="nav_item"><a onClick={onCommingSoon}>Mail</a></div>
            <div className="nav_item"><a onClick={onCommingSoon}>NFTs</a></div>
            <div className="nav_item dropdown">
              <a style={{ marginRight: 0 }}>Resources</a>
              <ul>
                <li><a href="https://github.com/dmailofficial">Github</a></li>
                <li><a href="https://medium.com/@dmail_official">Medium</a></li>
                <li><a href="https://pyr3m-ciaaa-aaaai-qasua-cai.ic0.app/">Demo</a></li>
                <li><a href="https://dmail.ai/Dmail_litepaper.pdf">Litepaper</a></li>
              </ul>
            </div>
            <div className="nav_item"><Link to="/account" className={pathname === '/account' ? 'on' : ''} >Account</Link></div>
          </div>
        </div>
        {pathname === '/' ? <div className="contact" onClick={onContactClick}></div> : (
          userEmail ? <Email>{userEmail}</Email> : <Login onClick={toLogin}>login</Login>
        )}
      </div>
    </>
  )
}

export default withRouter(Header)

