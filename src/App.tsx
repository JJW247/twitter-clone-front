import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from './components/common/Layout';
import { MeProvider } from './contexts/meContext';
import Main from './pages/main';
import Followers from './pages/profile/followers';
import Followings from './pages/profile/followings';
import Profile from './pages/profile/profile';

const App: FC = () => {
  return (
    <MeProvider>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/profile/:userId" component={Profile} />
            <Route path="/profile/:userId/followings" component={Followings} />
            <Route path="/profile/:userId/followers" component={Followers} />
          </Switch>
        </Layout>
      </Router>
      <ToastContainer />
    </MeProvider>
  );
};

export default App;
