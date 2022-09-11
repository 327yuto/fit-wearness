import React, { useContext, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
// style
import { createStyles, makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
// api
import { signOut } from '../../api/auth';
// context
import { AuthContext } from '../../App';
// component
import HeaderDrawer from './HeaderDrawer';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    linkBtn: {
      textTransform: 'none',
    },
  })
);

const drawerItem = [
  { label: 'HOME', path: '/' },
  { label: '新規作成', path: '/new' },
  { label: '自分の投稿', path: '#' },
];

const Header = () => {
  const { loading, isSignedIn, setIsSignedIn, currentUser } =
    useContext(AuthContext);
  const classes = useStyles();
  const history = useHistory();

  const handleSignOut = async (e) => {
    try {
      const res = await signOut();

      if (res.data.success === true) {
        Cookies.remove('_access_token');
        Cookies.remove('_client');
        Cookies.remove('_uid');

        setIsSignedIn(false);
        history.push('/signin');
        console.log('succeeded in sign out');
      } else {
        console.log('failed in sign out');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const AuthButtons = () => {
    if (!loading) {
      if (isSignedIn) {
        return (
          <>
            <Button
              component={Link}
              to={`/users/${currentUser.id}`}
              color='inherit'
              className={classes.linkBtn}
            >
              Account
            </Button>
            <Button
              color='inherit'
              className={classes.linkBtn}
              onClick={handleSignOut}
            >
              Sign out
            </Button>
          </>
        );
      } else {
        return (
          <>
            <Button
              component={Link}
              to='/signin'
              color='inherit'
              className={classes.linkBtn}
            >
              Sign in
            </Button>
            <Button
              component={Link}
              to='/signup'
              color='inherit'
              className={classes.linkBtn}
            >
              Sign Up
            </Button>
          </>
        );
      }
    } else {
      return <></>;
    }
  };

  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className={classes.root}>
        <AppBar position='static'>
          <Toolbar>
            {isSignedIn && currentUser && (
              <IconButton
                edge='start'
                className={classes.menuButton}
                color='inherit'
                aria-label='menu'
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant='h6' className={classes.title}>
              Fit-wearness
            </Typography>
            <AuthButtons />
          </Toolbar>
        </AppBar>
      </div>
      <HeaderDrawer
        open={open}
        handleDrawerToggle={handleDrawerToggle}
        drawerItem={drawerItem}
      />
    </>
  );
};
export default Header;
