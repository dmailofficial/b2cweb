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
      <div className="bg"></div>
      <div className="header">
        <div className="logo"></div>
        <div className="nav">
          <span onClick={onShowNavs}><i></i></span>
          <div className="nav_wrapper">
            <div className="nav_item"><Link to="/" className={pathname === '/' ? 'on' : ''}>Home</Link></div>
            <div className="nav_item"><a rel="noopener noreferrer" target="_blank" href='https://xfed4-4yaaa-aaaak-aapya-cai.ic0.app/inbox'>Mail</a></div>
            <div className="nav_item"><a rel="noopener noreferrer" target="_blank" href='https://skeh5-daaaa-aaaai-aar4q-cai.raw.ic0.app/#/collection/ICDmail/items'>NFTs</a></div>
            <div className="nav_item dropdown">
              <a rel="noopener noreferrer"  style={{ marginRight: 0 }}>Resources</a>
              <ul>
                <li><a rel="noopener noreferrer"  href="https://github.com/dmailofficial">Github</a></li>
                <li><a rel="noopener noreferrer"  href="https://medium.com/@dmail_official">Medium</a></li>
                <li><a rel="noopener noreferrer"  href="https://dmail.ai/Dmail_litepaper.pdf">Litepaper</a></li>
              </ul>
            </div>
            <div className="nav_item"><Link to="/account" className={pathname === '/account' ? 'on account' : 'account'} >Account</Link></div>
          </div>
        </div>
        {pathname === '/' ? <div className="contact" onClick={onContactClick}></div> : (
          userEmail ? <Email onClick={onChangeEmail}>{userEmail}</Email> : <div>&nbsp;</div>
        )}
        {/* <Login onClick={toLogin}></Login> */}
      </div>
    </>
  )
}

export default withRouter(Header)

