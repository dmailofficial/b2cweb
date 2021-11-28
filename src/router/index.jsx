import React, { Suspense } from 'react';
import { Switch, Router, Route, Redirect } from 'react-router-dom';
import Index from '@/pages/index/index'
import Account from '@/pages/account/index'
// import Loading from '@/components/Loading';

const Routes = () => (
  <Suspense fallback={'loading...'}>
    <Switch>
      < Route exact path='/' component={Index} />
      < Route exact path='/account' component={Account} />
      <Redirect from="*" to='/' />
    </Switch>
  </Suspense>
);

export default Routes;
