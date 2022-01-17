import React, {useEffect, useState} from 'react';

import Header from '@/components/newheader'
import { OperateBtn, ContentBox } from './css'

const Index = () => {

  

  return (
    <>
      <Header />
      <OperateBtn>
        <span className="connectBtn">Connect wallet</span>
        <span className="ownBtn">Own</span>
      </OperateBtn>
      <ContentBox>
          <div className="leftWrap">
              
          </div>
      </ContentBox>
    </>
  );
}

export default Index;
