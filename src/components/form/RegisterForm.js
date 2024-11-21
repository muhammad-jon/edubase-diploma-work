import React from 'react';
import { useFirebase } from '../../providers/firebase/FirebaseProvider';
import useRequest from '../../hooks/useRequest';
import { toast } from 'react-hot-toast';

const RegisterForm = () => {
  const { createUser } = useFirebase();
  const { isLoading, mutate, Spinner } = useRequest(createUser, {
    onError: err => {
      toast.error(`Ro'yxatdan o'tishda xatolik yuz berdi: ${err.message}`);
    }
  });

  const handleSubmit = e => {
    e.preventDefault();
    const fullname = e.target.elements[0].value;
    const email = e.target.elements[1].value;
    const password = e.target.elements[2].value;
    mutate({ email, password, fullname });
  };

  return (
    <div className="login-form-box">
      <h3 className="mb-30">Ro'yxatdan o'tish</h3>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="input-box mb--30">
          <input required type="text" placeholder="Ism/Familiya" />
        </div>
        <div className="input-box mb--30">
          <input required type="email" placeholder="Electron pochta" />
        </div>
        <div className="input-box mb--30">
          <input required type="password" placeholder="Maxfiy so'z" />
        </div>
        <button className="rn-btn edu-btn w-100 mb--30" type="submit">
          <span>{isLoading ? <Spinner /> : 'Tasdiqlash'}</span>
        </button>
        {/* <div className="input-box">
          <input id="checkbox-2" type="checkbox" />
          <label htmlFor="checkbox-2">I read & agree the terms & conditions.</label>
        </div> */}
      </form>
    </div>
  );
};

export default RegisterForm;
