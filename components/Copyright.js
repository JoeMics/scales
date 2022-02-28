import { Link, Typography } from '@mui/material';

export default function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" target="_blank" href="https://alexreyne.me/">
        Alex Reyne
      </Link>{' '}
      <Link color="inherit" target="_blank" href="https://github.com/JoeMics">
        Joseph Micla,
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
