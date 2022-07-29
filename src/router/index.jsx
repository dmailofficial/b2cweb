import React, { Suspense, lazy } from 'react';
import { Switch, Router, Route, Redirect } from 'react-router-dom';

const Home = lazy(() => import('@/pages/newhome/index'));
const Ambassador = lazy(() => import('@/pages/ambassador/index'));
const Presale = lazy(() => import('@/pages/presale/index'));
const PresaleList = lazy(() => import('@/pages/presale/list/index'));
const Referrals = lazy(() => import('@/pages/referrals/index'));

const Routes = () => (
  <Suspense fallback={'loading...'}>
    <Switch>
      < Route exact path='/' component={Home} />
      < Route exact path='/ambassador' component={Ambassador} />
      < Route exact path='/newhome' component={Home} />
      < Route exact path='/presale' component={Presale} />
      < Route exact path='/presale/:channel_id' component={Presale} />
      < Route exact path='/presale_list' name="presale_list" component={PresaleList} />
      < Route exact path='/referrals' name="referrals" component={Referrals} />
      
      <Redirect from="*" to='/' />
    </Switch>
  </Suspense>
);

export default Routes;
