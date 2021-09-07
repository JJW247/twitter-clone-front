import React, { FC } from 'react';

import FollowerList from './FollowerList';
import FollowingList from './FollowingList';
import Search from './Search';

const RightMenu: FC = () => {
  return (
    <div className="flex-auto ml-8 mt-2">
      <div className="sticky top-0 h-screen">
        <div className="mb-8">
          <Search />
        </div>
        <div className="mb-8">
          <FollowerList />
        </div>
        <div>
          <FollowingList />
        </div>
      </div>
    </div>
  );
};

export default RightMenu;
