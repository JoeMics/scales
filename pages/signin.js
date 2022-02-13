import SignUp from '../components/signup/SignUp';
import { useState } from 'react';
import Head from 'next/head';

export default function SignIn() {
  const [signInView, setSignInView] = useState('signup');

  return (
    <div className={null}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {signInView === 'signin' && <SignIn signInView={signInView} setSignInView={setSignInView} />}
      {signInView === 'signup' && <SignUp signInView={signInView} setSignInView={setSignInView} />}
    </div>
  );
}
