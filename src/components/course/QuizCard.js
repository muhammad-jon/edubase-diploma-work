import React from 'react';
import { Link } from 'react-router-dom';
import { useFirebase } from '../../providers/firebase/FirebaseProvider';
import { FiRefreshCcw } from 'react-icons/fi';

const QuizCard = ({ data, classes }) => {
  console.log('Data', data);
  const { userData } = useFirebase({});
  const isFinished = userData?.lessons?.[data.lesson.id]?.isFinished;
  const to = isFinished ? `/quizzes/${data.id}` : `/lessons/${data.lesson.id}`;
  const label = isFinished ? 'Sinov testini boshlash' : "Blogga o'tish";
  const attempt = userData?.quizzes?.[data.id];

  return (
    <div className={`edu-card card-type-5 radius-small ${classes ? classes : ''}`}>
      <div className="inner">
        <div className="thumbnail">
          <Link
            to={process.env.PUBLIC_URL + to}
            style={{
              maxHeight: 200,
              minHeight: 200
            }}
          >
            <img
              style={{ objectFit: 'cover', maxWidth: 400 }}
              src={data.cover_image}
              alt="Course Thumb"
            />
          </Link>
          <div className="top-position status-group left-top"></div>
          <div className="wishlist-top-right">
            <button className="wishlist-btn">
              <i className="icon-Heart"></i>
            </button>
          </div>
        </div>
        <div className="content">
          <h6 className="title">
            <Link to={process.env.PUBLIC_URL + to}>{data.title}</Link>
          </h6>
          <ul className="edu-meta meta-01">
            <li>
              <i className="icon-time-line"></i>
              {data.questions.length} savollar
            </li>
            <li>
              <FiRefreshCcw />
              &nbsp;
              {attempt ? `${attempt.correctCount}/${data.questions?.length}` : "urinish yo'q"}
            </li>
          </ul>
          <div className="card-bottom">
            <div className="read-more-btn">
              <Link className="btn-transparent" to={process.env.PUBLIC_URL + to}>
                {label} <i className="icon-arrow-right-line-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default QuizCard;
