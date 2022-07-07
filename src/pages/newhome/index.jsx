import React, {useEffect, useState, createRef} from 'react';
import TextField from '@mui/material/TextField';
import isMobile from 'ismobilejs';
import { Link, withRouter } from 'react-router-dom';
import { NewHome } from './css';
import ReactPageScroller from "./scroller/index";
import Header from '@/components/newheader';
import { subscribeNews } from './request';
import { emailLogin } from '@/utils/index'

import arrow from '@/static/images/home/banner/arrow@2x.png'
import rightArrow from '@/static/images/home/banner/arrow-right@2x.png'
import dmailEmail from '@/static/images/home/what_is_dmail/email@2x.png'
import dmailCloud from '@/static/images/home/what_is_dmail/decentralized_icon@2x.png'
import dmailAsset from '@/static/images/home/what_is_dmail/asset@2x.png'
import dmailDapp from '@/static/images/home/what_is_dmail/dapplibrary@2x.png'

import highlightIcon1 from '@/static/images/home/highlights/data_sovereign/icon@2x.png'
import highlightIcon2 from '@/static/images/home/highlights/decentralizedIdentity/icon@2x.png'
import highlightIcon3 from '@/static/images/home/highlights/encryptedPrivacy/icon@2x.png'
import highlightIcon4 from '@/static/images/home/highlights/multichain/icon@2x.png'
import highlightIcon5 from '@/static/images/home/highlights/dataStorage/icon@2x.png'
import highlightIcon6 from '@/static/images/home/highlights/exchangeableNFT/icon@2x.png'
import highlightIcon7 from '@/static/images/home/highlights/messageNotification/icon@2x.png'
import highlightIcon8 from '@/static/images/home/highlights/compatibleWeb2/icon@2x.png'
import highlightIcon9 from '@/static/images/home/highlights/messageSubscription/icon@2x.png'

import partnerIcon1 from '@/static/images/home/partner/logos/HASHKEY.png'
import partnerIcon2 from '@/static/images/home/partner/logos/CapAMINO.png'
import partnerIcon3 from '@/static/images/home/partner/logos/DraperDragon.png'
import partnerIcon4 from '@/static/images/home/partner/logos/outliers.png'
import partnerIcon5 from '@/static/images/home/partner/logos/parallelVentures.png'
import partnerIcon6 from '@/static/images/home/partner/logos/BlackVentures.png'
import partnerIcon7 from '@/static/images/home/partner/logos/paka.png'
import partnerIcon8 from '@/static/images/home/partner/logos/sparkCap.png'
import partnerIcon9 from '@/static/images/home/partner/logos/TsingTingCap.png'
import partnerIcon10 from '@/static/images/home/partner/logos/kretosVentures.png'
import partnerIcon11 from '@/static/images/home/partner/logos/HG-ventures.png'
import partnerIcon12 from '@/static/images/home/partner/logos/DfinityCommunity.png'

import footerlogo from '@/static/images/home/footer/logo.png'
import footericon1 from '@/static/images/home/footer/twitter.png'
import footericon2 from '@/static/images/home/footer/telegram.png'
import footericon3 from '@/static/images/home/footer/medium.png'
import footericon4 from '@/static/images/home/footer/discord.png'

import successIcon from '@/static/images/home/toast/success.png'
import faildIcon from '@/static/images/home/toast/faild@3x.png'

import rocketIcon from '@/static/images/home/toast/rocket@2x.png'
import toTopIcon from '@/static/images/home/totop.png'
import { ToastWrap } from '../presale/css';


console.log(isMobile(window.navigator).phone)


const Index = () => {
  const [curPage, setCurPage] = useState(0)
  const [haschange, setHaschange] = useState(false)
  const [scrolling, setScrolling] = useState(false)
  const [showFooter, setShowFooter] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [subMsg, setSubMsg] = useState('Subscription successfully!')
  const [toastIcon, setToastIcon] = useState(successIcon)
  const [comingToast, setComingToast] = useState(false)
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const [roadShow, setRoadShow] = useState(true)
  const isphone = true; // isMobile(window.navigator).phone
  let animation1 = null, 
      animation1s = null, 
      animation2 = null, 
      animation2s = null, 
      animation3 = null, 
      animation3s = null, 
      animation4 = null, 
      animation4s = null, 
      animation5 = null, 
      animation5s = null, 
      animation6 = null;
  if(!isphone){
    // animation1 = require('@/static/images/home/animationEffect/1.gif')
    // animation1s = require('@/static/images/home/animationEffect/1s.gif')
    // animation2 = require('@/static/images/home/animationEffect/2.gif')
    // animation2s = require('@/static/images/home/animationEffect/2s.gif')
    // animation3 = require('@/static/images/home/animationEffect/3.gif')
    // animation3s = require('@/static/images/home/animationEffect/3s.gif')
    // animation4 = require('@/static/images/home/animationEffect/4.gif')
    // animation4s = require('@/static/images/home/animationEffect/4s.gif')
    // animation5 = require('@/static/images/home/animationEffect/5.gif')
    // animation5s = require('@/static/images/home/animationEffect/5s.gif')
    // animation6 = require('@/static/images/home/animationEffect/6.gif')
    // console.log("animation6:::", animation1.default)
  }
  const [aniEffect1, setAniEffect1] = useState()
  const [aniEffect2, setAniEffect2] = useState()
  const [aniEffect3, setAniEffect3] = useState()
  const [aniEffect4, setAniEffect4] = useState()
  const [aniEffect5, setAniEffect5] = useState()

  const effectObj = {
    '0':{
      setfn: setAniEffect1,
      start: animation1?.default,
      end : animation1s?.default,
      transtion: 5000,
    },
    '1':{
      setfn: setAniEffect2,
      start: animation2?.default,
      end : animation2s?.default,
      transtion: 3700,
    },
    '2':{
      setfn: setAniEffect3,
      start: animation3?.default,
      end : animation3s?.default,
      transtion: 1600,
    },
    '3':{
      setfn: setAniEffect4,
      start: animation4?.default,
      end : animation4s?.default,
      transtion: 1300,
    },
    '4':{
      setfn: setAniEffect5,
      start: animation5?.default,
      end : animation5s?.default,
      transtion: 3100,
    }
  }

  const mapRef = createRef()

  const gotoPostion = (top) => {
    document.documentElement.scrollTo({left: 0, top: top, behavior: "smooth"});
    document.body.scrollTo({left: 0, top: top, behavior: "smooth"});
  }

const handleScrollUnavailable = (i) => {
  
  // if(curPage == 5 && !showFooter){
  //   setShowFooter(true);
  //   setTimeout(()=>{
  //     gotoPostion(700)
  //   },10)
  // }
}

const gotoPage = (number) => {
  console.log("gottopage::", number)
  
  setCurPage(number)
}

const resetAnimate = (num) => {
  console.log("resetAnimate:::111:", num)
  for(let i = 0; i < 5; i++){
    if(i != num){
      let _anobj = effectObj[i+'']
      console.log("resetAnimate::::", i)
      _anobj["setfn"]()
    }
  }
}

const handlePageChange = number => {
  console.log("handlePageChange:",number)
  let _num = number;
  if(_num < 0){
    _num = 0;
    gotoPage(0);
  }
  if(_num > 6){
    _num = 6;
    gotoPage(6);
  }
  if(curPage == number && haschange){
    return;
  }
  console.log("handlePageChange----:",_num)
  setCurPage(_num)
  
  if(_num < 5 && !isphone){
    setHaschange(true)
    setRoadShow(false)
    let _anobj = effectObj[_num+'']
    _anobj["setfn"](_anobj["start"])
    resetAnimate(_num)
    setTimeout(()=>{
      _anobj["setfn"](_anobj["end"])
      if(_num == 4){
        console.log("cut cut....", mapRef)
        setRoadShow(true)
      }
    }, _anobj["transtion"])

    
  }
  
  // if(showFooter && _num !== 7){
  //   setShowFooter(false);
  // }
  return false;
};

const onBeforePageScroll = () => {
  // setShowFooter(false);
}




const onSignClick = async () => {
  const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,6})$/;
  if(!reg.test(value)){
    setError(true)
    return;
  }

  const {success, msg} = await subscribeNews(value)
  if(!success){
    setSubMsg('Network Error!')
    setToastIcon(faildIcon)
    setShowToast(true)
    setTimeout(()=>{
      setShowToast(false)
    }, 3000)
    return
  }
  setSubMsg('Subscription successfully!')
  setToastIcon(successIcon)
  setShowToast(true)
  setTimeout(()=>{
    setShowToast(false)
  }, 3000)
  setValue('')
}

const handleChange = (e) => {
  let _v = e.target.value

  setError(false)
  setValue(_v)
}

const onhandleClose = () => {
  setShowToast(false)
  setComingToast(false)
}

const onComingSoon = () => {
  setComingToast(true)
  setTimeout(()=>{
    setComingToast(false)
  }, 3000)
  return;
}
  

  return (
    <NewHome>
      <Header
        comingSoonHandle = {onComingSoon}
      />
      <div className="topbar">
        Own your first Web 3.0 mailbox. 
        <Link to="/presale">Get Now</Link>
      </div>
      <ReactPageScroller
        handleScrollUnavailable = {handleScrollUnavailable}
        pageOnChange={handlePageChange}
        onBeforePageScroll = {onBeforePageScroll}
        customPageNumber={curPage}
        animationTimerBuffer = {300}
        animationTimer ={800}
      >
      <div className="pageWrap bannerBlock" style ={!isphone ? {backgroundImage: 'url('+aniEffect1+')'}:{}}>
        <div className="contentWrap bannerContent">
            {/* <div className="animation animation1">
              <img src={animation1}></img>
            </div> */}
            <div className="content">
              <h2 className='beta'>Dmail Network<span>Beta</span></h2>
              <p className="desc" style={{ marginTop: '15px' }}>Construct DID in Web3.0, Not Just an Email</p>
              <a rel="noopener noreferrer"  href={emailLogin} target="_blank" className="launchBtn" >Launch Dmail <img src={rightArrow}></img></a>
            </div>
            <div className="nextBtn" onClick={()=>{gotoPage(1)}}>
                <img src={arrow}></img>
                <span className="txt">Scroll down to explore more</span>
            </div>
        </div>
      </div>

      <div className="pageWrap dmailBlock"  style ={!isphone ? {backgroundImage: 'url('+aniEffect2+')'}:{}}>
        <div className="contentWrap dmailContent">
            <div className="content">
              <p>Introducing Dmail</p>
              <h2>What is Dmail?</h2>
              {/* <p className="desc">In Web 3.0, every user and application coexist in a frame of open standards and protocols, which can connected each other freely and form the internet of everything.</p> */}
              <p className="desc">Dmail Network is a Web 3.0-based collaborative platform which integrates the functions of message communication, asset management, data storage, workspace and etc. In the end, Dmail will be a fundamental infrastructure tool and DID for users to come into the Web 3.0 era and a bridge that links Web 2.0 users to easily use blockchain services. </p>
              
              <div className="dmailItem">
                  <div className="item item1">
                    <div>
                      <img src={dmailEmail}></img>
                    </div>
                    <span className="txt">Email </span>
                  </div>
                  <div className="item item2">
                    <div>
                      <img src={dmailCloud}></img>
                    </div>
                    <span className="txt">Decentralized cloud</span>
                  </div>
                  <div className="item item3">
                    <div>
                      <img src={dmailAsset}></img>
                    </div>
                    <span className="txt">Asset </span>
                  </div>
                  <div className="item item4">
                    <div>
                      <img src={dmailDapp}></img>
                    </div>
                    <span className="txt">DApp library</span>
                  </div>
              </div>
            </div>
            <div className="nextBtn" onClick={()=>{gotoPage(2)}}>
                <img src={arrow}></img>
                <span className="txt">Scroll down to explore more</span>
            </div>
        </div>
      </div>

      <div className="pageWrap workBlock"  style ={!isphone ? {backgroundImage: 'url('+aniEffect3+')'}:{}}>
        <div className="contentWrap workContent">
            <div className="content">
            <p>Introducing Dmail</p>
              <h2>How does Dmail work?</h2>
              <p className="desc">
              Dmail forms the fundamental decentralized identity (DID) and distributes a private "decentralized storage" for each mailbox correspondingly on chain. Users can access information, assets and DApps securely and seamlessly with Dmail.
              </p>
            </div>
            <div className="nextBtn" onClick={()=>{gotoPage(3)}}>
                <img src={arrow}></img>
                <span className="txt">Scroll down to explore more</span>
            </div>
        </div>
      </div>

      <div className="pageWrap highlightBlock"  style ={!isphone ? {backgroundImage: 'url('+aniEffect4+')'}:{}}>
        <div className="contentWrap highlightContent">
            <div className="title">
              <p>Introducing Dmail</p>
              <h2>What’s unique about Dmail?</h2>
            </div>
            <div className="content">
              <div className="highlightItem">
                  <div className="item item1">
                    {/* <img src={highlightIcon1}></img> */}
                    <div>
                      <img src={highlightIcon1}></img>
                    </div>
                    <h3>Data Sovereignty</h3>
                    <p>Decentralized storage keeps data sovereignty under user's control.</p>
                  </div>
                  <div className="item item2">
                    {/* <img src={highlightIcon2}></img> */}
                    <div>
                      <img src={highlightIcon2}></img>
                    </div>
                    <h3>Decentralized Identity</h3>
                    <p>The important component to form DID in Web 3.0</p>
                  </div>
                  <div className="item item3">
                    {/* <img src={highlightIcon3}></img> */}
                    <div>
                      <img src={highlightIcon3}></img>
                    </div>
                    <h3>Encrypted & Privacy</h3>
                    <p>VRF (measurable random function) + BLS (non-interactive threshold signature) + Container.</p>
                  </div>
              </div>
              <div className="highlightItem">
                  <div className="item item4">
                    {/* <img src={highlightIcon4}></img> */}
                    <div>
                      <img src={highlightIcon4}></img>
                    </div>
                    <h3>Multichain Assets</h3>
                    <p>Bind with multichain wallets, enables users to send & receive messages and assets seamlessly. </p>
                  </div>
                  <div className="item item5">
                    {/* <img src={highlightIcon5}></img> */}
                    <div>
                      <img src={highlightIcon5}></img>
                    </div>
                    <h3>Permanent Data Storage</h3>
                    <p>Dmail users' data is stored on chain permanently in a decentralized method.</p>
                  </div>
                  <div className="item item6">
                    {/* <img src={highlightIcon6}></img> */}
                    <div>
                      <img src={highlightIcon6}></img>
                    </div>
                    <h3>Tradable NFT Domain Account</h3>
                    <p>Dmail domain is a tradable asset in the NFT domain market.</p>
                  </div>
              </div>
              <div className="highlightItem">
                  <div className="item item7">
                    {/* <img src={highlightIcon7}></img> */}
                    <div>
                      <img src={highlightIcon7}></img>
                    </div>
                    <h3>Message Notification API</h3>
                    <p>Provide an API services for instant information transfer in Web 3.0 world.</p>
                  </div>
                  <div className="item item8">
                    {/* <img src={highlightIcon8}></img> */}
                    <div>
                      <img src={highlightIcon8}></img>
                    </div>
                    <h3>Integrating with Web 2.0 Emails</h3>
                    <p>Login through Web 2.0 email address is acceptable.</p>
                  </div>
                  <div className="item item9">
                    {/* <img src={highlightIcon9}></img> */}
                    <div>
                      <img src={highlightIcon9}></img>
                    </div>
                    <h3>Message Subscription</h3>
                    <p>Get updates from projects or addresses you are following.</p>
                  </div>
              </div>
            </div>
            <div className="nextBtn" onClick={()=>{gotoPage(4)}}>
                <img src={arrow}></img>
                <span className="txt">Scroll down to explore more</span>
            </div>
        </div>
      </div>

      <div className="pageWrap roadmapBlock" style ={!isphone ? {backgroundImage: 'url('+aniEffect5+')'}:{}}>
        <div className="contentWrap roadmapContent">
            <div className="content">
              <p>Introducing Dmail</p>
              <h2>Product Roadmap</h2>
            </div>
            <div className={roadShow ? "roadMap show" : "roadMap show"}>
                <div className="line"></div>
                <div className="item item1">
                    <h3>2021 Q4</h3>
                    <div><p>Website</p><p>Mailbox Base</p><p>Domain Account Pre-sale</p><p>Seed Funding</p></div>
                    <span className="line icon"></span>
                    <span className="circle icon"></span>
                 </div>
                 <div className="item item2 bottom">
                    <h3>2022 Q1</h3>
                    <div><p>Brand Update</p><p>Ambassadors</p><p>Partnerships</p><p>Strategic Funding</p></div>
                    <span className="line icon"></span>
                    <span className="circle icon"></span>
                 </div>
                 <div className="item item3">
                    <h3>2022 Q2</h3>
                    <div><p>Beta Network</p><p>Wallet Assets</p><p>Bulk Send</p><p>Message Alerts</p><p>Multiple logins</p></div>
                    <span className="line icon"></span>
                    <span className="circle icon"></span>
                 </div>
                 <div className="item item4 bottom">
                    <h3>2022 Q3</h3>
                    <div><p>SDK&API</p><p>DApp Library</p><p>Mainnet Release</p><p>Communication Protocol</p></div>
                    <span className="line icon"></span>
                    <span className="circle icon"></span>
                 </div>
                 <div className="item item5">
                    <h3>2022 Q4</h3>
                    <div><p>APP</p><p>Plugin</p><p>DAO</p><p>Enterprise workspace</p></div>
                    <span className="line icon"></span>
                    <span className="circle icon"></span>
                 </div>
                 <div className="item item6 bottom">
                    <h3>2023 Q1</h3>
                    <div><p>DID</p><p>EVM</p><p>Multi-chain</p></div>
                    <span className="line icon"></span>
                    <span className="circle icon"></span>
                 </div>
            </div>
            <div className="nextBtn" onClick={()=>{gotoPage(5)}}>
                <img src={arrow}></img>
                <span className="txt">Scroll down to explore more</span>
            </div>
        </div>
      </div>

      <div className="pageWrap partnerBlock"   style={!isphone ? {backgroundImage: 'url('+animation6.default+')'}:{}}>
        <div className="contentWrap partnerContent">
            <div className="content">
              <h2>Partners</h2>
              <div className="partners">
                <div className="pitem">
                  <img src={partnerIcon1} alt="HASHKEY"></img>
                </div>
                <div className="pitem">
                  <img src={partnerIcon2} alt="CapAMINO"></img>
                </div>
                <div className="pitem">
                  <img src={partnerIcon3} alt="DraperDragon"></img>
                </div>
                <div className="pitem">
                  <img src={partnerIcon4} alt="outliers"></img>
                </div>
                <div className="pitem">
                  <img src={partnerIcon5} alt="parallelVentures"></img>
                </div>
                <div className="pitem">
                  <img src={partnerIcon6} alt="BlackVentures"></img>
                </div>
                <div className="pitem">
                  <img src={partnerIcon7} alt="paka"></img>
                </div>
                <div className="pitem">
                  <img src={partnerIcon8} alt="sparkCap"></img>
                </div>
                <div className="pitem">
                  <img src={partnerIcon9} alt="TsingTingCap"></img>
                </div>
                <div className="pitem">
                  <img src={partnerIcon10} alt="kretosVentures"></img>
                </div>
                <div className="pitem">
                  <img src={partnerIcon11} alt="HG ventures"></img>
                </div>
                <div className="pitem">
                  <img src={partnerIcon12} alt="DfinityCommunity"></img>
                </div>
              </div>
            </div>
            <div className="nextBtn" onClick={()=>{gotoPage(6)}}>
                <img src={arrow}></img>
                <span className="txt">Scroll down to explore more</span>
            </div>
        </div>
      </div>

      <div className="pageWrap footBlock footWrap" >
          <div className="signWrap">
              <p>Subscribe to our newsletter</p>
              <div className="inputWrap">
                {/* <input placeholder="Your email address" oninput={handleChange} onporpertychange={handleChange}></input> */}
                <TextField
                  className="input" 
                  placeholder="Please enter email address" 
                  variant="outlined" 
                  value = {value}
                  error = {error}
                  onChange={handleChange}
                />
                <span className="signBtn" onClick={onSignClick}>Send</span>
              </div>
          </div>
          <div className="footerInfo">
            <div className="footerLogo">
              <img src={footerlogo} alt="Dmail"></img>
              <p>@Dmail Network Foundation LTD.</p>
            </div>
            <div className="bref">
              <p>Dmail guarantees a safe & private environment for your communication, storage, tokens & NFTs transfer on Web 3.0</p>
              <p>contact@mail.dmail.ai</p>
            </div>
            <div className="links">
              <ul>
                <li>Product</li>
                <li><a rel="noopener noreferrer" target="_blank" href={emailLogin}>Mailbox</a></li>
                <li><a rel="noopener noreferrer" target="_blank"  href="https://skeh5-daaaa-aaaai-aar4q-cai.raw.ic0.app/#/collection/ICDmail/items">NFTs</a></li>
                <li><a rel="noopener noreferrer"  href="javascript:;" onClick={onComingSoon}>DApps</a></li>
              </ul>
              <ul>
                <li>Support</li>
                <li><a rel="noopener noreferrer"  href="https://dmail.ai/Dmail_litepaper.pdf" target="_blank">Litepaper</a></li>
                <li><a rel="noopener noreferrer"  href="javascript:;" target="" onClick={onComingSoon}>Docs</a></li>
                <li><a rel="noopener noreferrer"  href="javascript:;" target="" onClick={onComingSoon}>API</a></li>
              </ul>
              <ul>
                <li>Community</li>
                <li><a rel="noopener noreferrer"  href="https://twitter.com/dmailofficial" target="_blank"><img src={footericon1}></img>Twitter</a></li>
                <li><a rel="noopener noreferrer"  href="https://t.me/dmailofficial" target="_blank"><img src={footericon2}></img>Telegram</a></li>
                <li><a rel="noopener noreferrer"  href="https://medium.com/@dmail_official" target="_blank"><img src={footericon3}></img>Medium</a></li>
                <li><a rel="noopener noreferrer"  href="https://discord.gg/QbvaeqwMFg" target="_blank"><img src={footericon4}></img>Discord</a></li>
              </ul>
            </div>
          </div>
        </div> 
        
      </ReactPageScroller>
        <div className="toTop" onClick={()=>gotoPage(0)}>
          <img src={toTopIcon}></img>
        </div>
        
        {showToast ? 
            <div className="toastWrap">
              {/* <span className="closeBtn" onClick={onhandleClose}>
                <span></span>
                <span></span>
              </span> */}
              <div className="content">
                <img src={toastIcon}></img>
                <span className="tip">{subMsg}</span>
              </div>
            </div>
          : null}
          <div className={comingToast ? "toastWrap show": "toastWrap hidden"}>
              <div className="content">
                <img src={rocketIcon}></img>
                <span className="tip">Coming soon!</span>
              </div>
            </div>
          
    </NewHome>
    
  );
}

export default Index;
