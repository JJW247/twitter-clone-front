import React, { FC } from 'react';

import Follow from './Follow';
import Search from './Search';

const RightMenu: FC = () => {
  return (
    <div className="flex-auto ml-8 mt-2">
      <div className="sticky top-0 h-screen">
        <div className="mb-8">
          <Search />
        </div>
        <Follow />
      </div>
    </div>
  );
};

export default RightMenu;
