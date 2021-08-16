import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Layout from './components/common/Layout';
import Login from './components/login/Login';
import Main from './pages/main';

const App: FC = () => {
  const token = localStorage.getItem('token') || '';

  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    const getAuth = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACK_URL}/auth`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log(response.data);

        if (response.data.ok) {
          setIsLogin(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getAuth();
  }, [token]);

  if (!isLogin) return <Login />;

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
