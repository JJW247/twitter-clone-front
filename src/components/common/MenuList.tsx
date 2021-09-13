import { FC } from 'react';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import {
  faBell as farBell,
  faEnvelope as farEnvelope,
  faUser as farUser,
} from '@fortawesome/free-regular-svg-icons';
import MenuButton from './MenuButton';

const MenuList: FC = () => {
  const menuConfig = [
    { id: 1, title: 'Home', icon: faHome, link: '/' },
    { id: 2, title: 'Notifications', icon: farBell, link: '/notifications' },
    { id: 3, title: 'Messages', icon: farEnvelope, link: '/messages' },
    { id: 4, title: 'Profile', icon: farUser, link: '/profile' },
  ];
  return (
    <nav>
      {menuConfig.map((v) => {
        return (
          <MenuButton key={v.id} title={v.title} icon={v.icon} link={v.link} />
        );
      })}
    </nav>
  );
};

export default MenuList;
