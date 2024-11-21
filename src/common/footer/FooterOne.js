import React from 'react';
import { Link } from 'react-router-dom';
import ScrollTopButton from './ScrollTopButton';

const FooterOne = () => {
  return (
    <>
      <footer className="eduvibe-footer-one edu-footer footer-style-default">
        <div className="footer-top">
          <div className="container eduvibe-animated-shape">
            <div className="row g-5">
              <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                <div className="edu-footer-widget">
                  <div className="logo">
                    <Link to={process.env.PUBLIC_URL + '/'}>
                      <img
                        style={{
                          maxWidth: 150
                        }}
                        className="logo-light"
                        src="/images/logo/logo-white.png"
                        alt="Footer Logo"
                      />
                    </Link>
                  </div>
                  <p className="description">
                    EduBase - bu "TBTA va DT" kafedrasi faoliyati uchun zamonaviy tizim. Bu yerda
                    kafedraga taa'luqli ma'lumotlaridan tortib, o'qituvchilar tomonidan qo'yilgan
                    foydali bloglarni o'qib o'rganishingiz mumkin
                  </p>
                  <ul className="social-share">
                    <li>
                      <a href="#">
                        <i className="icon-Fb"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="icon-linkedin"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="icon-Pinterest"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="icon-Twitter"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                <div className="edu-footer-widget explore-widget">
                  <h5 className="widget-title">Sahifalar</h5>
                  <div className="inner">
                    <ul className="footer-link link-hover">
                      <li>
                        <Link to="/">
                          <i className="icon-Double-arrow"></i>Asosiy sahifa
                        </Link>
                      </li>
                      <li>
                        <Link to="/lessons">
                          <i className="icon-Double-arrow"></i>Bloglar
                        </Link>
                      </li>
                      <li>
                        <Link to="/quizzes">
                          <i className="icon-Double-arrow"></i>Testlar
                        </Link>
                      </li>
                      <li>
                        <Link to="/about-us">
                          <i className="icon-Double-arrow"></i>Biz haqimizda
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-lg-5 col-md-6 col-sm-6 col-12">
                <div className="edu-footer-widget">
                  <h5 className="widget-title">Bo'glanish</h5>
                  <div className="inner">
                    <div className="widget-information">
                      <ul className="information-list">
                        <li>
                          <i className="icon-map-pin-line"></i>
                          <a
                            href="https://www.google.com/maps?ll=41.34093,69.286729&z=15&t=m&hl=uz&gl=US&mapclient=embed&cid=5956285218696080088"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Toshkent shahri, Amir Temur shox ko‘chasi 108 uy
                          </a>
                        </li>
                        <li>
                          <i className="icon-phone-fill"></i>
                          <a href="+998903747483">+998 90 3747483</a>
                        </li>

                        <li>
                          <i className="icon-mail-line-2"></i>
                          <a target="_blank" href="mailto:muhammad_jon@tuit.uz" rel="noreferrer">
                            muhammad_jon@tuit.uz
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="shape-dot-wrapper shape-wrapper d-md-block d-none">
              <div className="shape-image shape-image-1">
                <img src="/images/shapes/shape-21-01.png" alt="Shape Thumb" />
              </div>
              <div className="shape-image shape-image-2">
                <img src="/images/shapes/shape-35.png" alt="Shape Thumb" />
              </div>
            </div>
          </div>
        </div>
        <div className="copyright-area copyright-default">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="inner text-center">
                  <p>
                    {new Date().getFullYear()} |{' '}
                    <a href="#"> TBTA va DT | made with ❤️ by Muhammad</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* <ScrollTopButton /> */}
    </>
  );
};

export default FooterOne;
