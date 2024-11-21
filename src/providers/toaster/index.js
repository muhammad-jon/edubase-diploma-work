import React from 'react';
import { Toaster } from 'react-hot-toast';

const config = {
  duration: 5000,
  success: {
    duration: 3000
  }
};

export default function ToasterProvider() {
  return <Toaster position="top-center" reverseOrder={false} gutter={8} toastOptions={config} />;
}
