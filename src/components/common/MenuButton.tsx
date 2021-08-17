import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';

interface MenuButtonProps {
  title: string;
}

const MenuButton: FC<MenuButtonProps> = ({ title }) => {
  return (
    <div className="flex items-center px-6 py-3 rounded-full hover:bg-gray-200 my-2">
      <FontAwesomeIcon className="text-2xl" icon={faHome} />
      <span className="ml-4 text-xl">{title}</span>
    </div>
  );
};

export default MenuButton;
