import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Layout from './components/common/Layout';
import Login from './components/login/Login';
import Main from './pages/main';

const App: FC = () => {
  const token = localStorage.getItem('token') || '';

  const [me, setMe] = useState<number | null>(null);

  useEffect(() => {
    const getMe = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BACK_URL}/users/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.statusText === 'OK') {
        setMe(response.data.userId);
      }
    };

    getMe();
  }, [token]);

  if (!me) return <Login />;

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
