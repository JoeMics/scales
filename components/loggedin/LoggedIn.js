import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../providers/AuthUserContext';

// import {Container, Row, Col} from 'reactstrap';

const LoggedIn = (props) => {
  const { authUser, loading } = useAuth();
  const router = useRouter();

  // Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    if (!loading && !authUser) router.push('/signin');
  }, [authUser, loading]);

  return props.children;
};

export default LoggedIn;
