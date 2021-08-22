import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Link } from 'react-router-dom';
import { useGetMe } from '../../hooks';

interface MenuButtonProps {
  title: string;
  icon: IconProp;
  link: string;
}

const MenuButton: FC<MenuButtonProps> = ({ title, icon, link }) => {
  const { me } = useGetMe();

  return (
    <Link
      className="flex items-center px-6 py-3 rounded-full hover:bg-gray-200 my-2"
      to={link === '/profile' ? link + '/' + me : link}
    >
      <FontAwesomeIcon className="text-2xl" icon={icon} />
      <span className="ml-4 text-xl">{title}</span>
    </Link>
  );
};

export default MenuButton;
