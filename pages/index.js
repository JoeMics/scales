import Head from 'next/head';
import { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import LoggedIn from '../components/loggedin/LoggedIn';
import SignUp from '../components/signup/SignUp';
import SignIn from '../components/signin/SignIn';
import Dashboard from '../components/dashboard/Dashboard';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LoggedIn>
        <Dashboard />
      </LoggedIn>
    </div>
  );
}
