import React, {useEffect, useState} from 'react';

import Header from '@/components/header'
import Step1 from './step1'
import Step2 from './step2'
import Step3 from './step3'
import p1 from '@/static/images/p1.png'

const Index = () => {
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(true);
  const [step3, setStep3] = useState(true);


  return (
    <>
      {/* <Header /> */}
      { step1 ?  <Step1></Step1> : null }
      { step2 ?  <Step2></Step2> : null }
      { step3 ?  <Step3></Step3> : null }
    </>
  );
}

export default Index;
