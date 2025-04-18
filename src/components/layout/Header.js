import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-[#2ABBB6] text-white">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center">
        <Link to="/" className="text-xl font-bold">
          YuGangS
        </Link>
        <span className="ml-4 text-sm font-light">
          유연성 강화 스터디
        </span>
      </div>
    </header>
  );
};

export default Header;
