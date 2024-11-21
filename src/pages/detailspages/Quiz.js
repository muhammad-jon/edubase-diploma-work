import React, { useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import SEO from '../../common/SEO';
import Layout from '../../common/Layout';
import BreadcrumbOne from '../../common/breadcrumb/BreadcrumbOne';
import { useQuery } from '@tanstack/react-query';
import { useFirebase } from '../../providers/firebase/FirebaseProvider';
import QuizQuestion from './QuizQuestion';
import useConfettiFirework from '../../hooks/useConfetti';
import { toast } from 'react-hot-toast';

const Quiz = () => {
  const { id } = useParams();
  const { getDocument, updateUser, userData, isAuthenticated } = useFirebase();
  const { data: quiz = {}, isLoading } = useQuery(['quizzes', id], () =>
    getDocument({
      collectionName: 'quizzes',
      id
    })
  );
  console.log('quiz', quiz);
  const numberOfQuestions = quiz?.questions?.length || 0;
  const { fire, confettiComponent } = useConfettiFirework();
  const navigate = useNavigate();
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleSubmit = e => {
    e.preventDefault();
    if (isSubmitted) {
      navigate('/profile');
      return;
    }

    const passingNumberOfQuestions = Math.round(numberOfQuestions * 0.8);
    const hasPassed = passingNumberOfQuestions <= correctAnswerCount;
    updateUser({
      quizzes: {
        ...userData.quizzes,
        [id]: {
          correctCount: correctAnswerCount,
          allCount: quiz.questions.length,
          submittedAt: new Date(),
          hasPassed
        }
      }
    });
    setIsSubmitted(true);
    if (hasPassed) {
      fire();
      toast.success("Sinov testidan muvaffaqiyatli o'tdingiz!");
    } else {
      toast.error("Sinov testidan o'ta olmadingiz, darsni qaytdan o'zlashtirishni tavsiya etamiz");
    }
  };

  const attempt = userData.quizzes?.[id];

  if (!isAuthenticated) {
    localStorage.setItem('savedPath', window.location.pathname);
    return <Navigate to="/login-register" />;
  }

  return (
    <>
      {confettiComponent}
      <SEO title={'Sinov testi'} />
      <Layout isLoading={isLoading}>
        <BreadcrumbOne title={'Sinov testi'} rootUrl="/" parentUrl="Asosiy sahifa" />
        <div className="edu-blog-details-area edu-section-gap bg-color-white">
          <form className="container" onSubmit={handleSubmit}>
            <div className="row g-5">
              <div className="col-lg-10 offset-lg-1">
                <div className="blog-details-1 style-variation3">
                  <div className="content-blog-top">
                    <div className="content-status-top d-flex justify-content-between mb--30 align-items-center">
                      <div className="status-group"></div>
                      <ul className="blog-meta">
                        <li>
                          <i className="icon-calendar-2-line"></i>
                          Oxirgi natijangiz:{' '}
                          {attempt
                            ? `${attempt.correctCount}/${quiz.questions?.length}`
                            : "urinish yo'q"}
                        </li>
                        <li>
                          <i className="icon-award-fill-solid"></i>
                          Savollar soni: {quiz.questions?.length}
                        </li>
                      </ul>
                    </div>

                    <h4 className="title">{quiz.lesson_title || quiz.title}</h4>
                  </div>

                  <div className="quiz-container">
                    {quiz.questions?.map((question, index) => (
                      <QuizQuestion
                        key={index}
                        isSubmitted={isSubmitted}
                        number={index + 1}
                        question={question}
                        setHasCorrectAnswer={isCorrect =>
                          setCorrectAnswerCount(old => (isCorrect ? old + 1 : old - 1))
                        }
                      />
                    ))}
                  </div>

                  <div className="blog-tag-and-share mt--50 d-flex justify-content-end">
                    <Link
                      to={`/lessons/${quiz?.lesson?.id}`}
                      className="edu-btn btn-transparent mr--10"
                      type={'submit'}
                    >
                      Blogga qaytish
                    </Link>
                    <button className="edu-btn btn-transparent " type={'submit'}>
                      {isSubmitted ? "Hisobga o'tish" : 'Yakunlash'}
                      <i className="icon-arrow-right-line-right"></i>
                    </button>
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
                </div>
              </div>
            </div>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Quiz;
