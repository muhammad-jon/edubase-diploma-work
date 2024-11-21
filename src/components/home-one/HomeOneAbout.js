import React from 'react';
import { Link } from 'react-router-dom';
import { Element } from 'react-scroll';
import ScrollAnimation from 'react-animate-on-scroll';
import SectionTitle from '../sectionTitle/SectionTitle';

const items = [
  {
    title: 'Moslashuvchanlik',
    info: 'istalgan joyda, istalgan qurilmada, kirish va undan osongina foydalanish va boshqarish mumkin',
    icon: 'icon-Hand---Book'
  },
  {
    title: 'Qulay deviceda o`qish',
    info: "Barcha qurilmalarga moslashuvchanligi tufayli, istalgan mavjud qurilmada ko'rish va boshqarish mumkin",
    icon: 'icon-Campus'
  }
];

const HomeOneAbout = () => {
  return (
    <Element
      name="about-us"
      className="edu-about-area about-style-1 edu-section-gap bg-color-white"
    >
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-6">
            <div className="about-image-gallery">
              <img
                className="image-1"
                src="https://media.licdn.com/dms/image/D4D12AQGWXzlQELaBaA/article-cover_image-shrink_720_1280/0/1697999743896?e=2147483647&v=beta&t=ef06vhe4b5zSXmjuqxkOzSGyLZjlN_ee8YZjIPIA0qE"
                alt="About Main Thumb"
              />
              <div className="image-2">
                <img
                  style={{ float: 'right' }}
                  width={'50%'}
                  src="https://blog-assets.shawacademy.com/uploads/2016/09/blog2.jpg"
                  alt="About Parallax Thumb"
                />
              </div>
              <div className="badge-inner"></div>
              <div className="shape-image shape-image-1">
                <img src="/images/shapes/shape-04-01.png" alt="Shape Thumb" />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="inner">
              <SectionTitle slogan="About Us" title="Bloglaringizni qulay bo'lishing" />
              <ScrollAnimation animateIn="fadeInUp" animateOut="fadeInOut" animateOnce={true}>
                <p className="description">
                  Bu site orqali, blog yaratish, ularni oson o'qish, tarqatish, va eng asosiysi har
                  bir blog uchun test bajarib ishlab o'z bilimlaringizni mustahkamlashingiz mumkin
                </p>
              </ScrollAnimation>
              {items && items.length > 0 && (
                <div className="about-feature-list">
                  {items.map((data, i) => (
                    <ScrollAnimation
                      animateIn="fadeInUp"
                      animateOut="fadeInOut"
                      className="our-feature"
                      animateOnce={true}
                      key={i}
                    >
                      <div className="our-feature">
                        <div className="icon">
                          <i className={data.icon}></i>
                        </div>
                        <div className="feature-content">
                          <h6 className="feature-title">{data.title}</h6>
                          <p className="feature-description">{data.info}</p>
                        </div>
                      </div>
                    </ScrollAnimation>
                  ))}
                </div>
              )}
              <ScrollAnimation
                animateIn="fadeInUp"
                animateOut="fadeInOut"
                className="read-more-btn"
                animateOnce={true}
              >
                <Link className="edu-btn" to="/about-us">
                  Biz haqimizda <i className="icon-arrow-right-line-right"></i>
                </Link>
              </ScrollAnimation>
              <div className="shape shape-6 about-parallax-2 d-xl-block d-none">
                <img src="/images/shapes/shape-07.png" alt="Shape Thumb" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Element>
  );
};

export default HomeOneAbout;
