import React, { FC, useContext } from 'react';

import RightMenu from './RightMenu';
import LeftMenu from './LeftMenu';

import Login from '../login/Login';
import { MeContext } from '../../contexts';

const Layout: FC = ({ children }) => {
  const { me } = useContext(MeContext);

  if (!me) return <Login />;

  return (
    <div className="min-h-screen flex font-noto">
      <LeftMenu />
      <div className="max-w-screen-sm flex-auto border-l-1 border-r-1">
        {children}
      </div>
      <RightMenu />
    </div>
  );
};

export default Layout;
