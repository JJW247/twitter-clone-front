import React, { FC } from 'react';

interface HeaderProps {
  title: string;
}

const Header: FC<HeaderProps> = ({ title }) => {
  const onClickLogout = () => {
    localStorage.removeItem('token');

    window.location.reload();
  };

  return (
    <h1 className="font-bold text-xl p-4 border-b-1">
      {title}{' '}
      <button className="border-1 border-gray-500" onClick={onClickLogout}>
        로그아웃 임시
      </button>
    </h1>
  );
};

export default Header;
