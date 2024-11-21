import React, { useMemo } from 'react';
import SEO from '../../common/SEO';
import Layout from '../../common/Layout';
import BreadcrumbOne from '../../common/breadcrumb/BreadcrumbOne';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useFirebase } from '../../providers/firebase/FirebaseProvider';
import SectionTitle from '../../components/sectionTitle/SectionTitle';
import CourseCard from '../../components/course/CourseCard';
import Spinner from '../../components/spinner/Spinner';

const CourseOne = () => {
  const { getDocuments, getReference, userData } = useFirebase();
  const { data = [], isLoading } = useQuery(['categories'], () =>
    getDocuments({ collectionName: 'categories' })
  );
  const sortedCategories = useMemo(() => data.sort((a, b) => a - b), [data]);

  const queries = sortedCategories.map(category => ({
    queryKey: ['lessons', { categoryId: category.id }],
    queryFn: () =>
      getDocuments({
        collectionName: 'lessons',
        filters: [
          {
            key: 'category',
            operator: '==',
            value: getReference({ collectionName: 'categories', id: category.id })
          }
        ]
      })
  }));
  const results = useQueries({ queries });

  return (
    <>
      <SEO title="Bloglar" />
      <Layout isLoading={isLoading}>
        <BreadcrumbOne title="Bloglar" rootUrl="/" parentUrl="Asosiy sahifa" currentUrl="Bloglar" />
        <div className="edu-course-area edu-section-gap bg-color-white">
          {userData?.isAdmin && (
            <div className="container d-flex justify-content-end">
              <a
                href="https://admin-edubase-lexical-playground.vercel.app/"
                target="_blank"
                className="edu-btn"
                rel="noreferrer"
              >
                Blog qo'shish
              </a>
            </div>
          )}
          {sortedCategories.map((category, index) => (
            <div className="container" key={category.id}>
              <div className="row">
                <div className="col-lg-12">
                  <SectionTitle initiallyVisible classes="text-center" title={category.title} />
                </div>
              </div>
              <div className="row g-5 mt--10" style={{ minHeight: 500 }}>
                {results[index].isLoading ? (
                  <Spinner />
                ) : (
                  results[index].data.map(item => (
                    <div className="col-12 col-sm-6 col-lg-4" key={item.id}>
                      <CourseCard data={item} />
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </Layout>
    </>
  );
};

export default CourseOne;
