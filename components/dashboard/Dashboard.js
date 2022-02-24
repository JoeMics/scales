import { useState, useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Chart from './Chart';
import Events from './Events';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useAuth } from '../../providers/AuthUserContext';
import AddSnake from './AddSnake';
import AddEvent from './AddEvent';
import styles from '../../styles/Dashboard.module.css';
import SnakeStats from './SnakeStats';
import useFirestore from '../../hooks/useFirestore';
import DeleteSnake from './DeleteSnake';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  })
);

const mdTheme = createTheme();

function DashboardContent() {
  const [openAddSnake, setOpenAddSnake] = useState(false);
  const [openAddEvent, setOpenAddEvent] = useState(false);
  const [deleteSnake, setDeleteSnake] = useState(false);
  const [allSnakes, setAllSnakes] = useState([]);
  const [open, setOpen] = useState(true);
  const [snake, setSnake] = useState({ name: '', id: '' });
  const [eventsData, setEventsData] = useState([]);

  // Custom hooks
  const { fetchAllSnakes, fetchEvents } = useFirestore();
  const { handleSignOut, authUser } = useAuth();
  const toggleDrawer = () => {
    setOpen(!open);
  };

  // Get's the first snake on the list on render
  useEffect(() => {
    const getSnakes = async () => {
      const res = await fetchAllSnakes(authUser.uid);
      setSnake(res[0] || {});
      setAllSnakes(res || []);
    };

    getSnakes();
  }, []);

  useEffect(() => {
    async function getAllEvents() {
      if (snake.id) {
        const results = await fetchEvents(snake.id);
        setEventsData(results);
      }
    }

    getAllEvents();
  }, [snake]);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          sx={{ backgroundColor: 'black' }}
          className={styles.appbar}
          position="absolute"
          open={open}
        >
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
            <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
              {authUser && authUser.email}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <ListItemButton
              onClick={(e) => {
                setOpenAddSnake(true);
              }}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Add Snake" />
            </ListItemButton>
            <ListItemButton
              onClick={(e) => {
                setOpenAddEvent(true);
              }}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Add Event" />
            </ListItemButton>
            <Divider sx={{ my: 1 }} />
            <ListItemButton
              onClick={(e) => {
                handleSignOut();
              }}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="logout" />
            </ListItemButton>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* This is the Chart Component Stuff */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Chart eventsData={eventsData} snake={snake} />
                </Paper>
              </Grid>
              {/* Snake Stats */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <SnakeStats
                    allSnakes={allSnakes}
                    snake={snake}
                    setSnake={setSnake}
                    eventsData={eventsData}
                    setDeleteSnake={setDeleteSnake}
                    userID={authUser.uid}
                  />
                </Paper>
              </Grid>
              {/* Recent Orders */}

              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', overflowX: 'auto' }}>
                  <Events snake={snake} eventsData={eventsData} setEventsData={setEventsData} />
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
      {openAddSnake && (
        <AddSnake
          openAddSnake={openAddSnake}
          setOpenAddSnake={setOpenAddSnake}
          setSnake={setSnake}
          setAllSnakes={setAllSnakes}
        />
      )}
      {openAddEvent && (
        <AddEvent
          openAddEvent={openAddEvent}
          setOpenAddEvent={setOpenAddEvent}
          snake={snake}
          setSnake={setSnake}
          allSnakes={allSnakes}
          setEventsData={setEventsData}
        />
      )}
      {deleteSnake && (
        <DeleteSnake
          deleteSnake={deleteSnake}
          setDeleteSnake={setDeleteSnake}
          snake={snake}
          setSnake={setSnake}
          setAllSnakes={setAllSnakes}
          userID={authUser.uid}
        />
      )}
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
