import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Layout from './components/common/Layout';
import Login from './components/login/Login';
import { useGetMe } from './hooks';
import Main from './pages/main';
import Profile from './pages/profile';

const App: FC = () => {
  const { me } = useGetMe();

  if (!me) return <Login />;

  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/profile/:userId" component={Profile} />
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
