import React from 'react';
import SEO from '../../common/SEO';
import Layout from '../../common/Layout';
import BreadcrumbOne from '../../common/breadcrumb/BreadcrumbOne';
import LoginForm from '../../components/form/LoginForm';
import RegisterForm from '../../components/form/RegisterForm';
import { useFirebase } from '../../providers/firebase/FirebaseProvider';
import { useNavigate } from 'react-router-dom';

const LoginRegister = () => {
  const { currentUser } = useFirebase();
  const navigate = useNavigate();
  if (currentUser) {
    const savedPath = localStorage.getItem('savedPath') || '/';
    localStorage.setItem('savedPath', '/');
    navigate(savedPath);
  }
  return (
    <>
      <SEO title="Kirish & Ro'yxatdan o'tish" />
      <Layout>
        <BreadcrumbOne
          title="Kirish & Ro'yxatdan o'tish"
          rootUrl="/"
          parentUrl="Asosiy sahifa"
          currentUrl="Kirish & Ro'yxatdan o'tish"
        />

        <div className="login-register-page-wrapper edu-section-gap bg-color-white">
          <div className="container checkout-page-style">
            <div className="row g-5">
              <div className="col-lg-6">
                <LoginForm />
              </div>
              <div className="col-lg-6">
                <RegisterForm />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default LoginRegister;
