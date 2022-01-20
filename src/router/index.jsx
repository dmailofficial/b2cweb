import React, { Suspense } from 'react';
import { Switch, Router, Route, Redirect } from 'react-router-dom';
import Index from '@/pages/index/index'
import Account from '@/pages/account/index'
import Account2 from '@/pages/account2/index'
import Ambassador from '@/pages/ambassador/index'
import NewHome from '@/pages/newhome/index'
import Presale from '@/pages/presale/index'
// import Loading from '@/components/Loading';

const Routes = () => (
  <Suspense fallback={'loading...'}>
    <Switch>
      < Route exact path='/' component={NewHome} />
      < Route exact path='/account' component={Account2} />
      {/* < Route exact path='/accountTest' component={Account2} /> */}
      < Route exact path='/ambassador' component={Ambassador} />
      < Route exact path='/newhome' component={NewHome} />
      < Route exact path='/presale' component={Presale} />
      
      <Redirect from="*" to='/' />
    </Switch>
  </Suspense>
);

export default Routes;
