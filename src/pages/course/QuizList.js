import React from 'react';
import SEO from '../../common/SEO';
import Layout from '../../common/Layout';
import BreadcrumbOne from '../../common/breadcrumb/BreadcrumbOne';
import { useQuery } from '@tanstack/react-query';
import { useFirebase } from '../../providers/firebase/FirebaseProvider';
import SectionTitle from '../../components/sectionTitle/SectionTitle';
import Spinner from '../../components/spinner/Spinner';
import QuizCard from '../../components/course/QuizCard';
import { Link } from 'react-router-dom';

const QuizList = () => {
  const { userData } = useFirebase();
  const { getDocuments } = useFirebase();
  const { data = [], isLoading } = useQuery(['quizzes'], () =>
    getDocuments({
      collectionName: 'quizzes'
    })
  );

  return (
    <>
      <SEO title="Sinov testlari" />
      <Layout isLoading={isLoading}>
        <BreadcrumbOne
          title="Sinov testlari"
          rootUrl="/"
          parentUrl="Asosiy sahifa"
          currentUrl="Sinov testlari"
        />
        <div className="edu-course-area edu-section-gap bg-color-white">
          <div className="container">
            <div className="row">
              <div className="text-end">
                {userData?.isAdmin && (
                  <div className="container d-flex justify-content-end">
                    <a
                      href="https://admin-edubase-lexical-playground.vercel.app/quiz"
                      target="_blank"
                      className="edu-btn"
                      rel="noreferrer"
                    >
                      Test qo'shish
                    </a>
                  </div>
                )}
              </div>
              <div className="col-lg-12">
                <SectionTitle
                  initiallyVisible
                  classes="text-center"
                  title={'Barcha sinov testlari'}
                />
              </div>
            </div>
            <div className="row g-5 mt--10" style={{ minHeight: 500 }}>
              {isLoading ? (
                <Spinner />
              ) : data?.length ? (
                data.map(item => (
                  <div className="col-12 col-sm-6 col-lg-4" key={item.id}>
                    <QuizCard data={item} />
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

export default QuizList;
