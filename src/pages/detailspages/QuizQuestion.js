import React, { useState } from 'react';

export default function QuizQuestion({ question, number, setHasCorrectAnswer, isSubmitted }) {
  const { answers, title, cover_image } = question;
  const [checkedIndex, setCheckedIndex] = useState();

  return (
    <div className="quiz-question-container">
      <h5>
        {number}. {title}
      </h5>
      {cover_image && (
        <img
          className="radius-small w-100 mb--30"
          src={cover_image}
          alt="Blog Thumb"
          style={{
            maxHeight: 300
          }}
        />
      )}
      {answers.map((answer, index) => (
        <label className="quiz-question " htmlFor={answer.title} key={answer.title}>
          <input
            type="radio"
            name={'quiz-question' + number}
            required
            disabled={isSubmitted}
            checked={checkedIndex === index}
            onChange={e => {
              console.log(e.target.checked);
              if (e.target.checked) {
                setCheckedIndex(index);
                setHasCorrectAnswer(answer.is_correct);
              }
            }}
            id={answer.title}
          />
          <div
            className={`quiz-question-content ${
              isSubmitted && checkedIndex === index ? (answer.is_correct ? 'correct' : 'wrong') : ''
            }`}
          >
            <div className="quiz-question-details">
              <span>{answer.title}</span>
            </div>
          </div>
        </label>
      ))}
    </div>
  );
}
