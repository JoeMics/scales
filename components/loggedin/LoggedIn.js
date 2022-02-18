import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../providers/AuthUserContext';

const LoggedIn = (props) => {
  const { authUser, loading } = useAuth();
  const router = useRouter();

  // Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    if (!loading && !authUser) router.push('/signin');
  }, [authUser, loading]);

  return <>{authUser && props.children}</>;
};

export default LoggedIn;
