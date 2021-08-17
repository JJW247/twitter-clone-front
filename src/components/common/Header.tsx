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
    <h1 className="font-bold text-xl p-4 border-b-1 flex justify-between">
      {title}{' '}
      <div>
        <button
          className="border-1 border-gray-200 text-gray-200 text-xs py-1 px-2 rounded-full hover:border-red-500 hover:text-red-500"
          onClick={onClickLogout}
        >
          Log out
        </button>
      </div>
    </h1>
  );
};

export default Header;
