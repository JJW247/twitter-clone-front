import React, { FC } from 'react';

interface HeaderProps {
  title: string;
}

const Header: FC<HeaderProps> = ({ title }) => {
  return <h1 className="font-bold text-xl p-4 border-b-1">{title}</h1>;
};

export default Header;
