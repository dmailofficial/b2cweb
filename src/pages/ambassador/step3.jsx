import {Step3} from './css'

import p1 from '@/static/images/p1.png'
import p2 from '@/static/images/p2.png'
import p3 from '@/static/images/p3.png'
import p4 from '@/static/images/p4.png'
import p5 from '@/static/images/p5.png'

const Step3Component = () => {
  

  return (
    <Step3>
      <div className="content">
        <h2>Thank you! Your response has been submitted.</h2>
        <p>Due to the high demand, we will endeavor to evaluate your application as soon as possible.</p>
        <p className="mt20">Best Regards,</p>
        <p><b>Dmail team</b></p>
        <div className="btnWrap"><span className="backBtn">Back</span></div>
      </div>
      

    </Step3>
  );
}

export default Step3Component;
