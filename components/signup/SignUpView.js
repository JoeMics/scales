import * as React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../providers/AuthUserContext';
import useFirestore from '../../hooks/useFirestore';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert } from '@mui/material';
import Copyright from '../Copyright';

const theme = createTheme();

export default function SignUpView(props) {
  const { signInView, setSignInView } = props;

  const [email, setEmail] = useState('');
  const [passwordOne, setPasswordOne] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');
  const router = useRouter();
  const [error, setError] = useState(null);

  const { createEmail } = useAuth();
  const { updateUser } = useFirestore();

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);

    if (passwordOne === passwordTwo) {
      return createEmail(email, passwordOne)
        .then(async (authUser) => {
          const { uid, email } = authUser.user;
          await updateUser(uid, email);
          router.push('/');
        })
        .catch((error) => setError(error.message));
    }

    setError('Password do not match');
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={passwordOne}
                  onChange={(event) => setPasswordOne(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password-confirm"
                  label="Confirm Password"
                  type="password"
                  id="password-confirm"
                  autoComplete="new-password"
                  value={passwordTwo}
                  onChange={(event) => setPasswordTwo(event.target.value)}
                />
                {error && <Alert severity="error">{error}</Alert>}
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2" onClick={(e) => setSignInView('signin')}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
