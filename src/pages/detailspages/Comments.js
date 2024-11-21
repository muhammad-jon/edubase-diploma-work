import React, { useMemo, useState } from 'react';
import { useFirebase } from '../../providers/firebase/FirebaseProvider';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../../components/spinner/Spinner';
import { queryClient } from '../../providers/react-query';
import useRequest from '../../hooks/useRequest';
import { formatTime } from '../../utils/date';

export default function Comments({ lessonId }) {
  const { createDocument, getDocuments, userData } = useFirebase();
  const [content, setContent] = useState('');
  const { data: comments = [], isLoading } = useQuery(
    ['comments', lessonId],
    () =>
      getDocuments({
        collectionName: 'comments',
        filters: [{ key: 'lessonId', operator: '==', value: lessonId }]
      }),
    { enabled: !!lessonId }
  );

  const { mutate, isLoading: isSaving } = useRequest(createDocument, {
    onSuccess() {
      setContent('');
      queryClient.invalidateQueries(['comments', lessonId]);
    }
  });

  const handleSave = () => {
    if (!content.trim()) {
      return;
    }
    const data = {
      avatar: userData.avatar,
      content,
      author: userData.fullname,
      lessonId
    };
    mutate(data, {
      collectionName: 'comments'
    });
  };

  const sortedComments = useMemo(() => {
    return (comments || [])
      .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
      .map(el => ({
        ...el,
        date: formatTime(el.createdAt.seconds * 1000)
      }));
  }, [comments]);

  return (
    <div className="container">
      <h4>Savol & Javob & Izohlar</h4>
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Izohni shu yerga yozing..."
        rows="4"
      />
      <div className=" d-flex justify-content-end mt--10">
        <button
          style={{ marginRight: 10 }}
          onClick={() => setContent('')}
          className="edu-btn btn-transparent"
        >
          Bekor qilish
        </button>
        <button onClick={handleSave} className="edu-btn btn-transparent">
          {isSaving ? <Spinner /> : 'Izoh qoldirish'}
        </button>
      </div>

      {sortedComments.length ? (
        sortedComments.map((comment, index) => (
          <div className="d-flex comment-container mt--20" key={index}>
            <div className="">
              <img
                style={{ minWidth: 60, width: 60, marginRight: 10 }}
                src={require(`../../assets/avatars/${comment.avatar || 1}.svg`)}
                alt="profile"
              />
            </div>
            <div>
              <h6 style={{ marginBottom: 10 }}>
                {comment.author || "Noma'lum"}{' '}
                <span style={{ fontSize: 14, fontWeight: 'normal' }}>{comment.date}</span>
              </h6>
              <p>{comment.content}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center mt--40">
          {isLoading ? <Spinner dark /> : "Hali hech qanday izoh yo'q"}
        </p>
      )}
    </div>
  );
}
