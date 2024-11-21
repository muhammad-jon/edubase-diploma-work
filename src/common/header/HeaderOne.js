import { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import HeaderSticky from './HeaderSticky';
import ResponsiveMenu from './ResponsiveMenu';
import { useFirebase } from '../../providers/firebase/FirebaseProvider';

const HeaderOne = ({ styles, disableSticky }) => {
  const { isAuthenticated } = useFirebase();
  const [offcanvasShow, setOffcanvasShow] = useState(false);
  const [searchPopup, setSearchPopup] = useState(false);
  const onCanvasHandler = () => {
    setOffcanvasShow(prevState => !prevState);
  };

  const onSearchHandler = () => {
    setSearchPopup(prevState => !prevState);
  };

  if (searchPopup) {
    document.body.classList.add('search-popup-active');
  } else {
    document.body.classList.remove('search-popup-active');
  }

  const sticky = HeaderSticky(118);
  const classes = sticky ? 'sticky' : '';
  const stickyStatus = disableSticky ? '' : ' header-sticky';
  return (
    <>
      <header
        className={`edu-header disable-transparent ${stickyStatus} ${styles || ''} ${
          classes || ''
        }`}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-xl-2 col-md-6 col-6">
              <div className="logo">
                <Link to={process.env.PUBLIC_URL + '/'}>
                  <img className="logo-light" src="/images/logo/logo.png" alt="Main Logo" />
                </Link>
              </div>
            </div>

            <div className="col-lg-8 d-none d-xl-block">
              <nav className="mainmenu-nav d-none d-lg-block">
                <Nav />
              </nav>
            </div>

            <div className="col-lg-6 col-xl-2 col-md-6 col-6">
              <div className="header-right d-flex justify-content-end">
                <div className="header-quote">
                  <div className="quote-icon quote-search">
                    <button className="search-trigger" onClick={onSearchHandler}>
                      <i className="ri-search-line"></i>
                    </button>
                  </div>
                  <div className="quote-icon quote-user">
                    {isAuthenticated ? (
                      <Link
                        className={`edu-btn btn-medium left-icon header-button bg-color-white`}
                        to={process.env.PUBLIC_URL + '/profile'}
                      >
                        <i className="ri-user-line"></i>Profil
                      </Link>
                    ) : (
                      <Link
                        className={`edu-btn btn-medium left-icon header-button bg-color-white`}
                        to={process.env.PUBLIC_URL + '/login-register'}
                      >
                        <i className="ri-user-line"></i>Kirish
                      </Link>
                    )}
                  </div>
                  <div className="hamberger quote-icon d-block d-xl-none">
                    <button className="hamberger-button" onClick={onCanvasHandler}>
                      <i className="ri-menu-line"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <ResponsiveMenu
        show={offcanvasShow}
        onClose={onCanvasHandler}
        showSearch={searchPopup}
        onSearch={onSearchHandler}
      />
    </>
  );
};

export default HeaderOne;
