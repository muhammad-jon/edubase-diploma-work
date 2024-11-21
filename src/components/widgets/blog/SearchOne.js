import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchOne = props => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  return (
    <div
      className={`edu-blog-widget${props.style2 === 'enable' ? '-2' : ''} widget-search ${
        props.extraClass || ''
      }`}
    >
      <div className="inner">
        <h5 className="widget-title">Qidsirish</h5>
        <div className="content">
          <dov className="blog-search">
            <input type="text" placeholder="Search your Keyword..." />
            <button
              className="search-button"
              onClick={() => query && navigate(`/lessons?query=${query}`)}
            >
              <i className="icon-search-line"></i>
            </button>
          </dov>
        </div>
      </div>
    </div>
  );
};

export default SearchOne;
