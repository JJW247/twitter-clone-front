import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import {
  faBell as farBell,
  faEnvelope as farEnvelope,
  faUser as farUser,
} from '@fortawesome/free-regular-svg-icons';
import React, { FC } from 'react';

import MenuButton from './MenuButton';

const menuConfig = [
  { id: 1, title: 'Home', icon: faHome },
  { id: 2, title: 'Notifications', icon: farBell },
  { id: 3, title: 'Messages', icon: farEnvelope },
  { id: 4, title: 'Profile', icon: farUser },
];

const LeftMenu: FC = () => {
  return (
    <div className="flex-auto flex justify-end mr-8">
      <div className="sticky top-0 h-screen">
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-white hover:bg-green-100 mb-8 ml-4">
          <FontAwesomeIcon
            className="text-3xl text-green-500"
            icon={faTwitter}
          />
        </div>
        <nav>
          {menuConfig.map((v) => {
            return <MenuButton key={v.id} title={v.title} icon={v.icon} />;
          })}
        </nav>
        <button className="bg-green-500 hover:bg-green-600 text-white font-black text-lg px-24 py-4 rounded-full mt-8">
          Tweet
        </button>
      </div>
    </div>
  );
};

export default LeftMenu;
