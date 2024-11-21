import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Nav from './Nav';

const ResponsiveMenu = ({ show, onClose, showSearch, onSearch }) => {
  var elements = document.querySelectorAll('.popup-mobile-menu .has-droupdown > a');
  var elementsTwo = document.querySelectorAll('.popup-mobile-menu .with-megamenu > a');
  for (var i in elements) {
    if (elements.hasOwnProperty(i)) {
      elements[i].onclick = function () {
        this.parentElement.querySelector('.submenu').classList.toggle('active');
        this.classList.toggle('open');
      };
    }
  }

  for (var j in elementsTwo) {
    if (elementsTwo.hasOwnProperty(i)) {
      elementsTwo[j].onclick = function () {
        this.parentElement.querySelector('.rn-megamenu').classList.toggle('active');
        this.classList.toggle('open');
      };
    }
  }
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/lessons/search/${query}`);
      onSearch();
    }
  };

  return (
    <>
      <div className={`popup-mobile-menu ${show ? 'active' : ''}`}>
        <div className="inner">
          <div className="header-top">
            <div className="logo">
              <Link to={process.env.PUBLIC_URL + '/'}>
                <img src="/images/logo/logo.png" alt="Main Logo" />
              </Link>
            </div>
            <div className="close-menu">
              <button className="close-button" onClick={onClose}>
                <i className="ri-close-line"></i>
              </button>
            </div>
          </div>
          <Nav />
        </div>
      </div>

      <div className={`edu-search-popup ${showSearch ? 'open' : ''}`}>
        <div className="close-button">
          <button className="close-trigger" onClick={onSearch}>
            <i className="ri-close-line"></i>
          </button>
        </div>
        <div className="inner">
          <form className="search-form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              name="query"
              className="eduvibe-search-popup-field"
              placeholder="Qidirish..."
            />
            <button className="submit-button">
              <i className="icon-search-line"></i>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResponsiveMenu;
