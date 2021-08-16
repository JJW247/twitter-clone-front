import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './components/common/Layout';

import Main from './pages/main';

const App: FC = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={Main} />
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
