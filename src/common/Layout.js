import React from 'react';
import HeaderOne from './header/HeaderOne';
import FooterOne from './footer/FooterOne';
import Spinner from '../components/spinner/Spinner';

const Layout = ({ children, isLoading }) => {
  return (
    <>
      <main className="main-wrapper">
        <HeaderOne />
        {isLoading ? <Spinner dark center /> : children}
        <FooterOne />
      </main>
    </>
  );
};
export default Layout;
