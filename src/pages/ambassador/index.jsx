import React, {useEffect, useState} from 'react';

import Header from '@/components/newheader'
import Step1 from './step1'
import Step2 from './step2'
import Step3 from './step3'

const Index = () => {
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);

  const gotoTop = () => {
    console.log("gotoTop")
    document.documentElement.scrollTo({left: 0, top: 0,});
  }
  const toStep1 = () => {
    setStep3(false)
    setStep2(false)
    setStep1(true)
    gotoTop()
  }

  const toStep2 = (direction) => {
    if(direction == "next"){
      setStep1(false)
      setStep2(true)
    }else{
      setStep3(false)
      setStep2(true)
    }
    gotoTop()
  }

  const toStep3 = () => {
    setStep2(false)
    setStep3(true)
    gotoTop()
  }

  return (
    <>
      <Header />
      { step1 ?  <Step1 nextStep={toStep2} ></Step1> : null }
      { step2 ?  <Step2 nextStep={toStep3} preStep={toStep1}></Step2> : null }
      { step3 ?  <Step3 preStep={toStep1}></Step3> : null }
    </>
  );
}

export default Index;
