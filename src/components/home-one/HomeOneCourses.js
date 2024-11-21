import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import { Link } from 'react-router-dom';
import SectionTitle from '../../components/sectionTitle/SectionTitle';
import CourseTwo from '../../components/course/CourseTypeTwo';
import CourseData from '../../data/course/CourseData.json';
import { useQuery } from '@tanstack/react-query';
import { useFirebase } from '../../providers/firebase/FirebaseProvider';
import Spinner from '../spinner/Spinner';
import CourseCard from '../course/CourseCard';

const HomeOneCourses = () => {
  const { getDocuments } = useFirebase();
  const { data: lessons, isLoading } = useQuery(['lessons', 'featured'], () =>
    getDocuments({
      collectionName: 'lessons',
      filters: [
        {
          key: 'is_featured',
          operator: '==',
          value: true
        }
      ]
    })
  );
  console.log('lessons', lessons);
  return (
    <div className="edu-course-area eduvibe-home-one-course course-wrapper-1 edu-section-gap bg-color-white">
      <div className="container eduvibe-animated-shape">
        <div className="row">
          <div className="col-lg-12">
            <SectionTitle classes="text-center" title="Ko'p o'qilgan bloglar" />
          </div>
        </div>

        <div className="row g-5 mt--10">
          {isLoading ? (
            <Spinner />
          ) : (
            lessons?.map(item => (
              <ScrollAnimation
                animateIn="fadeInUp"
                animateOut="fadeInOut"
                className="col-12 col-sm-12 col-xl-4 col-md-6"
                animateOnce={true}
                key={item.id}
              >
                <CourseCard data={item} />
              </ScrollAnimation>
            ))
          )}
        </div>

        <div className="row mt--60">
          <div className="col-lg-12">
            <div className="load-more-btn text-center">
              <Link className="edu-btn" to="/lessons">
                Barcha bloglarni ko'rish<i className="icon-arrow-right-line-right"></i>
              </Link>
            </div>
          </div>
        </div>

        <div className="shape-dot-wrapper shape-wrapper d-xl-block d-none">
          <div className="shape-image shape-image-1">
            <img src="/images/shapes/shape-09.png" alt="Shape Thumb" />
          </div>
          <div className="shape-image shape-image-2">
            <img src="/images/shapes/shape-10.png" alt="Shape Thumb" />
          </div>
          <div className="shape-image shape-image-3">
            <img src="/images/shapes/shape-11.png" alt="Shape Thumb" />
          </div>
          <div className="shape-image shape-image-4">
            <img src="/images/shapes/shape-12.png" alt="Shape Thumb" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeOneCourses;
