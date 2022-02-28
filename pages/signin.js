import SignUpView from '../components/signup/SignUpView';
import SignInView from '../components/signin/SignInView';
import { useState } from 'react';
import Head from 'next/head';

export default function SignIn() {
  const [signInView, setSignInView] = useState('signin');

  return (
    <div className={null}>
      <Head>
        <title>Scales</title>
        <meta name="description" content="Snake keeping made easy" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🐍</text></svg>"
        />
      </Head>
      {signInView === 'signin' && (
        <SignInView signInView={signInView} setSignInView={setSignInView} />
      )}
      {signInView === 'signup' && (
        <SignUpView signInView={signInView} setSignInView={setSignInView} />
      )}
    </div>
  );
}
