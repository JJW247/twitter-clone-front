import React, { FC } from 'react';

import RightMenu from './RightMenu';
import LeftMenu from './LeftMenu';

const Layout: FC = ({ children }) => {
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
