import React from 'react';
import { useFirebase } from '../../providers/firebase/FirebaseProvider';
import useRequest from '../../hooks/useRequest';
import toast from 'react-hot-toast';

const LoginForm = () => {
  const { signIn } = useFirebase();
  const { isLoading, mutate, Spinner } = useRequest(signIn, {
    onError: err => {
      toast.error(`Kirishda xatolik yuz berdi: ${err.message}`);
    }
  });

  const handleSubmit = e => {
    e.preventDefault();
    const email = e.target.elements[0].value;
    const password = e.target.elements[1].value;
    mutate({ email, password });
  };

  return (
    <div className="login-form-box">
      <h3 className="mb-30">Kirish</h3>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="input-box mb--30">
          <input required type="email" placeholder="Electron pochta" />
        </div>
        <div className="input-box mb--30">
          <input required type="password" placeholder="Maxfiy so'z" />
        </div>
        {/* <div className="comment-form-consent input-box mb--30">
          <input id="checkbox-1" type="checkbox" />
          <label htmlFor="checkbox-1">Remember Me</label>
        </div> */}
        <button className="rn-btn edu-btn w-100 mb--30" type="submit">
          <span>{isLoading ? <Spinner /> : 'Tasdiqlash'}</span>
        </button>
        {/* <div className="input-box">
                    <a href="#" className="lost-password">Lost your password?</a>
                </div> */}
      </form>
    </div>
  );
};

export default LoginForm;
