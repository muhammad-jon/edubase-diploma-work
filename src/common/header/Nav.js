import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <ul className="mainmenu">
      <li>
        <Link to="/">Bosh sahifa</Link>
      </li>

      <li>
        <Link to="/lessons">Bloglar</Link>
      </li>

      <li>
        <Link to="/quizzes"> Testlar</Link>
      </li>

      <li>
        <Link to="/about-us">Biz haqimizda</Link>
      </li>
    </ul>
  );
};
export default Nav;
