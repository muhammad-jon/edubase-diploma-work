import React, { useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import SEO from '../../common/SEO';
import Layout from '../../common/Layout';
import BreadcrumbOne from '../../common/breadcrumb/BreadcrumbOne';
import { useQuery } from '@tanstack/react-query';
import { useFirebase } from '../../providers/firebase/FirebaseProvider';
import { formatDate } from '../../utils/date';
import { useCountdown } from '../../hooks/useCountdown';
import Comments from './Comments';

export const FinishValidation = ({ lesson, oldStayDuration }) => {
  const [formattedTime, count] = useCountdown((lesson.duration || 0) * 60 - oldStayDuration);
  const navigate = useNavigate();
  return (
    <div
      className="row"
      style={{
        maxWidth: 400
      }}
    >
      <div className="row">
        <p>
          {!count ? (
            "Blogni yaxshilab o'qidim deb o'ylaysizmi?"
          ) : (
            <>Blog yuzasidan test boshlash uchun blogni o'qib yaxshilab o'qib chiqing: </>
          )}
          <button
            className="edu-btn btn-transparent"
            style={{
              background: count !== 0 && 'grey',
              marginTop: 10
            }}
            disabled={count !== 0}
            onClick={() => {
              if (count === 0) {
                navigate(`/quizzes/${lesson.quiz?.id}`);
              }
            }}
          >
            {count ? formattedTime : ''} Sinov testiga o'tish
            <i className="icon-arrow-right-line-right"></i>
          </button>
        </p>
      </div>
    </div>
  );
};
const CourseCreate = () => {
  const { id } = useParams();
  const { getDocument, isAuthenticated, userData, updateUser, updateDocument } = useFirebase();
  let { data: lesson = {}, isLoading } = useQuery(['lessons', id], () =>
    getDocument({ collectionName: 'lessons', id })
  );
  const viewersCount = Object.keys(lesson?.viewers || {}).length;

  useEffect(() => {
    if (!userData || !lesson || userData?.lessons?.[id]?.stayDuration === lesson.duration * 60) {
      return;
    }

    const timeout = setTimeout(() => {
      if (!document.hasFocus()) {
        return;
      }
      let newStayDuration = (userData.lessons[id]?.stayDuration || 0) + 10;
      let isFinished = false;
      if (newStayDuration >= lesson.duration * 60) {
        newStayDuration = lesson.duration * 60;
        isFinished = true;
      }
      updateUser({
        lessons: {
          ...userData.lessons,
          [id]: {
            ...userData.lessons[id],
            stayDuration: newStayDuration,
            updatedAt: new Date(),
            isFinished
          }
        }
      });
    }, 10000);
    return () => {
      clearTimeout(timeout);
    };
  }, [userData]);

  useEffect(() => {
    if (lesson?.id && userData?.uid) {
      updateDocument(
        {
          viewers: {
            ...lesson.viewers,
            [userData?.uid]: true
          }
        },
        {
          collectionName: 'lessons',
          id: lesson.id
        }
      );
    }
  }, [lesson, userData?.uid]);

  if (!isAuthenticated) {
    localStorage.setItem('savedPath', window.location.pathname);
    return <Navigate to="/login-register" />;
  }

  return (
    <>
      <SEO title={lesson?.title || 'Dars'} />
      <Layout isLoading={isLoading}>
        <BreadcrumbOne
          title={lesson?.title || 'Dars'}
          rootUrl="/"
          parentUrl="Asosiy sahifa"
          currentUrl="Dars"
        />
        {userData?.isAdmin && lesson?.id && (
          <div className="container pt--30 d-flex justify-content-end">
            <a
              href={`https://admin-edubase-lexical-playground.vercel.app/?id=${lesson?.id}`}
              target="_blank"
              className="edu-btn"
              rel="noreferrer"
            >
              Blogni tahrirlash
            </a>

            <a
              href={`https://admin-edubase-lexical-playground.vercel.app/quiz?id=${
                lesson?.quiz?.id || ''
              }`}
              target="_blank"
              className="edu-btn ml--10"
              rel="noreferrer"
            >
              Sinov testini {lesson?.quiz?.id ? 'tahrirlash' : 'yaratish'}
            </a>
          </div>
        )}
        <div className="edu-blog-details-area edu-section-gap bg-color-white">
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-10 offset-lg-1">
                <div className="blog-details-1 style-variation3">
                  <div className="content-blog-top">
                    <div className="content-status-top d-flex justify-content-between mb--30 align-items-center">
                      <div className="status-group"></div>
                      <ul className="blog-meta">
                        <li>
                          <i className="icon-calendar-2-line"></i>
                          {formatDate(lesson?.createdAt?.seconds * 1000)}
                        </li>
                        <li>
                          <i className="icon-group-line"></i>
                          {viewersCount} o'quvchi
                        </li>
                        <li>
                          <i className="icon-time-line"></i>
                          {lesson?.duration} daqiqa
                        </li>
                      </ul>
                    </div>

                    {/* <h4 className="title">{lesson.title}</h4> */}

                    <div className="thumbnail block-alignwide">
                      <img
                        className="radius-small w-100 mb--30"
                        src={lesson?.cover_image}
                        alt="Blog Thumb"
                        style={{
                          maxHeight: 600
                        }}
                      />
                    </div>
                  </div>
                  <div
                    className="blog-main-content"
                    dangerouslySetInnerHTML={{
                      __html: lesson?.content || ''
                    }}
                  ></div>

                  <div className="blog-tag-and-share mt--50 d-flex justify-content-end">
                    {/* {data.tags && data.tags.length > 0 && (
                      <div className="blog-tag">
                        <div className="tag-list bg-shade">
                          {data.tags.map((tag, i) => {
                            return (
                              <Link key={i} to={process.env.PUBLIC_URL + `/tag/${slugify(tag)}`}>
                                {tag}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )} */}
                    {/* <div className="eduvibe-post-share">
                      <span>Share: </span>
                      <a className="linkedin" href="#">
                        <i className="icon-linkedin"></i>
                      </a>
                      <a className="facebook" href="#">
                        <i className="icon-Fb"></i>
                      </a>
                      <a className="twitter" href="#">
                        <i className="icon-Twitter"></i>
                      </a>
                      <a className="youtube" href="#">
                        <i className="icon-youtube"></i>
                      </a>
                    </div> */}
                    {lesson && (
                      <FinishValidation
                        lesson={lesson}
                        oldStayDuration={userData?.lessons?.[id]?.stayDuration || 0}
                      />
                    )}
                  </div>
                  {/*
                  <div className="blog-author-wrapper">
                    <div className="thumbnail">
                      <img
                        src="/images/blog/author/author-medium/author-02.jpg"
                        alt="Author Images"
                      />
                    </div>
                    <div className="author-content">
                      <h6 className="title">John Smith</h6>
                      <p>
                        Jhon Smith is an author, blogger, and designer living in a suburb of
                        Washington, DC. When she’s not designing, blogging, or writing, Owen can be
                        found with her head in a book or pinning like a madman.
                      </p>
                      <ul className="social-share icon-transparent">
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

                  <div className="blog-pagination">
                    <div className="row g-5">
                      <div className="col-lg-6">
                        <div className="blog-pagination-list style-variation-2">
                          <a href="#">
                            <i className="ri-arrow-left-s-line"></i>
                            <span>
                              Nam libero justo laoreet sit amet. Lacus sed viverra tellus in hac
                            </span>
                          </a>
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="blog-pagination-list style-variation-2 next-post">
                          <a href="#">
                            <span>
                              Tempus imperdiet nulla malesuada pellentesque elit eget gravida
                            </span>
                            <i className="ri-arrow-right-s-line"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div> */}

                  {/* <div className="edu-comment-form mt--50">
                    <Comment url="" id={id} title={lesson.title} />
                  </div> */}
                  <Comments lessonId={id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CourseCreate;
