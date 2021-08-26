import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';

const Search: FC = () => {
  return (
    <form className="relative">
      <FontAwesomeIcon className="absolute top-4 left-4" icon={faSearch} />
      <input
        className="border-1 border-white rounded-full px-12 py-3 focus:outline-none focus:border-green-500 bg-gray-100 focus:bg-white"
        placeholder="Search Twitter"
      />
    </form>
  );
};

export default Search;
