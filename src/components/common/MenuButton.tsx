import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface MenuButtonProps {
  title: string;
  icon: IconProp;
}

const MenuButton: FC<MenuButtonProps> = ({ title, icon }) => {
  return (
    <div className="flex items-center px-6 py-3 rounded-full hover:bg-gray-200 my-2">
      <FontAwesomeIcon className="text-2xl" icon={icon} />
      <span className="ml-4 text-xl">{title}</span>
    </div>
  );
};

export default MenuButton;
