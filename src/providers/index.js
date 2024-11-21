import React from 'react';
import FirebaseProvider from './firebase/FirebaseProvider';
import { ParallaxProvider } from 'react-scroll-parallax';
import ToasterProvider from './toaster';
import ReactQueryProvider from './react-query';

export default function Providers({ children }) {
  return (
    <FirebaseProvider>
      <ReactQueryProvider>
        <ToasterProvider />
        <ParallaxProvider>{children}</ParallaxProvider>
      </ReactQueryProvider>
    </FirebaseProvider>
  );
}
