import React from 'react';
import { Link } from 'react-router-dom';
import { Link as ScrollTo } from 'react-scroll';

const BannerOne = () => {
  return (
    <div className="slider-area banner-style-1 bg-image height-940 d-flex align-items-center">
      <div className="container eduvibe-animated-shape">
        <div className="row g-5 row--40 align-items-center">
          <div className="order-2 order-xl-1 col-lg-12 col-xl-6">
            <div className="banner-left-content">
              <div className="inner">
                <div className="content">
                  <span className="pre-title">TBTA va DT</span>
                  <h1 className="title">
                    Ma'lumot almashish, aloqa xavfsizligi, ma'lumotlar himoyasi va texnologiyalarga
                    bag'ishlangan.
                  </h1>
                  <p className="description">
                    Telekommunikatsiya - aloqalarni kuchaytiruvchi va ma'lumotlarni almashuvchi.
                    <p></p>
                  </p>
                  <div className="read-more-btn">
                    <Link className="edu-btn" to="/lessons">
                      Bloglar <i className="icon-arrow-right-line-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 order-xl-2 col-lg-12 col-xl-6 banner-right-content">
            <div className="row g-5">
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="edu-card card-type-6 radius-small">
                  <div className="inner">
                    <div className="thumbnail">
                      <img
                        className="w-100"
                        src="https://i0.wp.com/www.integralchoice.com/wp-content/uploads/2021/04/Telecommunication-networks.jpg?w=1200&ssl=1"
                        alt="Course Meta"
                      />
                      <div className="top-position status-group left-top">
                        <span className="eduvibe-status status-01 bg-primary-color">
                          Telecommunication
                        </span>
                      </div>
                    </div>
                    <div className="content">
                      <h6 className="title">TBTA va DT </h6>
                      <div className="card-bottom">
                        <p>
                          Telekommunikatsiya, ma'lumotlarni uzoq masofaga uzatish va almashish uchun
                          ishlatiladi, qisqa degan qilib telefonlar, radio, televidenie va internet
                          kabi texnologiyalar bilan. Bu sohada davlatlar, korxonalar va insonlar
                          o'rtasida ma'lumot almashish, ko'rsatish va olqishning katta ahamiyatini
                          anglatadi.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-sm-6">
                <div className="video-thumbnail eduvibe-hero-one-video">
                  <div className="thumbnail">
                    <img
                      className="w-100"
                      src="https://images.pexels.com/photos/2415405/pexels-photo-2415405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      alt="Video Images"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="shape-dot-wrapper shape-wrapper d-xl-block d-none">
          <div className="shape shape-1">
            <img src="/images/shapes/shape-01.png" alt="Shape Thumb" />
          </div>
          <div className="shape shape-2">
            <img src="/images/shapes/shape-02.png" alt="Shape Thumb" />
          </div>
          <div className="shape shape-3">
            <img src="/images/shapes/shape-03.png" alt="Shape Thumb" />
          </div>
          <div className="shape shape-4">
            <img src="/images/shapes/shape-04.png" alt="Shape Thumb" />
          </div>
          <div className="shape shape-5">
            <img src="/images/shapes/shape-05.png" alt="Shape Thumb" />
          </div>
          <div className="shape shape-6">
            <img src="/images/shapes/shape-05-05.png" alt="Shape Thumb" />
          </div>
        </div>

        <div className="shape-round">
          <img src="/images/banner/banner-01/shape-27.png" alt="Shape Images" />
        </div>
      </div>

      <div className="scroll-down-btn">
        <ScrollTo className="round-btn" to="about-us" spy={true} smooth={true} duration={200}>
          <i className="icon-arrow-down-s-line"></i>
        </ScrollTo>
      </div>
    </div>
  );
};
export default BannerOne;
