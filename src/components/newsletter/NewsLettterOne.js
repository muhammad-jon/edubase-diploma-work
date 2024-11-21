import React, { useState } from 'react';
import SectionTitle from '../sectionTitle/SectionTitle';
import { toast } from 'react-hot-toast';

const NewsLettterOne = () => {
  const [email, setEmail] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    toast.success('Yangiliklarga obuna qabul qilindi!');
    setEmail('');
  };
  return (
    <div className="edu-newsletter-area newsletter-style-1 edu-section-gap">
      <div className="container eduvibe-animated-shape">
        <div className="row">
          <div className="col-lg-12">
            <div className="inner text-center">
              <SectionTitle
                classes="text-white text-center"
                slogan="Yangiliklarga obuna bo'ling"
                title="Eng so'ngi yangilikdan xabardor bo'ling"
              />
              <div className="newsletter-form newsletter-form-style-1 mt--60">
                <form className="input-box" onSubmit={handleSubmit}>
                  <input
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    required
                    placeholder="Elektron pochtangizni kiriting"
                  />
                  <div className="mail-icon">
                    <i className="icon-mail-open-line"></i>
                  </div>
                  <button className="send-button" type="submit">
                    <i className="icon-send-plane-fill"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="shape-dot-wrapper shape-wrapper d-xl-block d-none">
          <div className="shape-image shape-image-1">
            <img src="/images/shapes/shape-03-04.png" alt="Shape Thumb" />
          </div>
          <div className="shape-image shape-image-2">
            <img src="/images/shapes/shape-16.png" alt="Shape Thumb" />
          </div>
          <div className="shape-image shape-image-3">
            <img src="/images/shapes/shape-13-02.png" alt="Shape Thumb" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLettterOne;
