import React, {useEffect, useState} from 'react';

import Header from '@/components/newheader'
import { OperateBtn, ContentBox ,WalletWrap} from './css'
import Left from './left'
import Main from './mainpannel'
import ConfirmDetail from './orderConfirmDetail'
import Dialog from './Dialog'

import metamask from '@/static/images/presale/metamask@2x.png'
import plug from '@/static/images/presale/plug-logo@2x.png'


const Index = () => {
  const [curId, setCurId] = useState(1)
  const [step, setStep] = useState(1)
  const [walletDialog, setWalletDialog] = useState(false)

  const presaleChange = (id) => {
    setCurId(id)
    if(id !== curId){
      setStep(1)
    }
  }

  const backStep1 = () => {
    setStep(1)
  }

  const walletDialogClose = () => {
    setWalletDialog(false);
  }

  const walletDialogShow = () => {
    setWalletDialog(true);
  }

  return (
    <>
      <Header />
      <OperateBtn>
        <span className="connectBtn" onClick = {walletDialogShow}>Connect wallet</span>
        <span className="ownBtn">Own</span>
      </OperateBtn>
      <ContentBox>
          <div className="leftWrap">
              <Left presaleChange = {presaleChange}></Left>
          </div>
          <div className="main">
            {step == 1 ?
              <Main curId = {curId}></Main> : null
            }
            {step == 2 ?
              <ConfirmDetail 
                curId = {curId}
                back = {backStep1}
              ></ConfirmDetail> : null
            }
          </div>
      </ContentBox>
      <Dialog
        open = { walletDialog }
        dialogClose = { walletDialogClose }
      >
        <WalletWrap>
          <div className="walletItem">
            <span>Metamask</span>
            <span className="walletLogo">
              <img src={metamask}></img>
            </span>
          </div>
          <div className="walletItem">
            <span>Plug</span>
            <span className="walletLogo">
              <img src={plug}></img>
            </span>
          </div>
        </WalletWrap>
      </Dialog>
    </>
  );
}

export default Index;
