import Head from 'next/head';
import styles from '../styles/Home.module.css';
import LoggedIn from '../components/loggedin/LoggedIn';
import Dashboard from '../components/dashboard/Dashboard';
import { useAuth } from '../providers/AuthUserContext';

export default function Home() {
  const { loading } = useAuth();

  return (
    <div className={styles.container}>
      <Head>
        <title>Scales</title>
        <meta name="description" content="Snake keeping made easy" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🐍</text></svg>"
        />{' '}
      </Head>

      <LoggedIn>{!loading && <Dashboard />}</LoggedIn>
    </div>
  );
}
