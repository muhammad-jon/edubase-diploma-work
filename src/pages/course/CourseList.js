import React, { useMemo } from 'react';
import SEO from '../../common/SEO';
import Layout from '../../common/Layout';
import BreadcrumbOne from '../../common/breadcrumb/BreadcrumbOne';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useFirebase } from '../../providers/firebase/FirebaseProvider';
import SectionTitle from '../../components/sectionTitle/SectionTitle';
import CourseCard from '../../components/course/CourseCard';
import Spinner from '../../components/spinner/Spinner';
import { useParams } from 'react-router-dom';

const CourseList = () => {
  const { getDocuments } = useFirebase();
  const { query } = useParams();
  const { data = [], isLoading } = useQuery(['lessons'], () =>
    getDocuments({
      collectionName: 'lessons'
    })
  );

  const filtered = (data || []).filter(
    el => el.title.includes(query) || el.content.includes(query)
  );

  return (
    <>
      <SEO title="Qidirish" />
      <Layout isLoading={isLoading}>
        <BreadcrumbOne
          title="Qidirish"
          rootUrl="/"
          parentUrl="Asosiy sahifa"
          currentUrl="Qidirish"
        />
        <div className="edu-course-area edu-section-gap bg-color-white">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <SectionTitle initiallyVisible classes="text-center" title={'Topilgan bloglar'} />
              </div>
            </div>
            <div className="row g-5 mt--10" style={{ minHeight: 500 }}>
              {isLoading ? (
                <Spinner />
              ) : filtered?.length ? (
                filtered.map(item => (
                  <div className="col-12 col-sm-6 col-lg-4" key={item.id}>
                    <CourseCard data={item} />
                  </div>
                ))
              ) : (
                <p
                  style={{
                    marginTop: 100,
                    textAlign: 'center'
                  }}
                >
                  Hech qanday kurs topilmadi
                </p>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CourseList;
