import React, {useEffect, useState} from 'react';

import Header from '@/components/newheader'
import { OperateBtn, ContentBox } from './css'
import Left from './left'
import Main from './mainpannel'


const Index = () => {
  const [curId, setCurId] = useState(0)

  const presaleChange = (id) => {
    console.log("id:",id)
    setCurId(id)
  }

  return (
    <>
      <Header />
      <OperateBtn>
        <span className="connectBtn">Connect wallet</span>
        <span className="ownBtn">Own</span>
      </OperateBtn>
      <ContentBox>
          <div className="leftWrap">
              <Left presaleChange = {presaleChange}></Left>
          </div>
          <div className="main">
              <Main curId = {curId}></Main>
          </div>
      </ContentBox>
    </>
  );
}

export default Index;
