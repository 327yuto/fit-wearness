import React, { useContext, useState, useEffect } from 'react';
import { useHistory, Link, withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';
// style
import { createStyles, makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PublicIcon from '@material-ui/icons/Public';
import AddBoxIcon from '@material-ui/icons/AddBox';

// api
import { signOut } from '../../api/auth';

// context
import { AuthContext } from '../../App';

// component
import HeaderDrawer from './HeaderDrawer';

import TitleLogo from '../../images/logo-fit-wearness-5.jpg';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    titleArea: {
      flexGrow: 1,
    },
    linkBtn: {
      textTransform: 'none',
    },

    logoSize: {
      width: 100,
      height: 60,
      // flexGrow: 1,
    },

  })
);

export const Header = withRouter(() => {

  const drawerItem = [
    { label: 'TOP', path: '/' },
    { label: 'みんなのコーデ', path: '/posts' },
    { label: 'あなたの投稿', path: '/myposts' },
    { label: '着てみたいコーデ', path: '/mylikeposts' },
  ];


  // const Header = () => {
  const { loading, isSignedIn, setIsSignedIn, currentUser } =
    useContext(AuthContext);
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    // handleGetCurrentUser();
    // console.log(currentUser)
  }, [])




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
              color='inherit'
              className={classes.linkBtn}
              onClick={() => history.push('/create/post')}
            >
              投稿
              <AddBoxIcon />
            </Button>

            {/* <Button
              color='inherit'
              className={classes.linkBtn}
              onClick={() => history.push('/posts')}
            >
              Posts List
              <PublicIcon />
            </Button> */}
            <Button
              color='inherit'
              className={classes.linkBtn}
              onClick={() => history.push(`/users/${currentUser.id}`)}
            >
              アカウント
              <AccountCircleIcon />
            </Button>
            <Button
              color='inherit'
              className={classes.linkBtn}
              onClick={handleSignOut}
            >
              サインアウト
              <ExitToAppIcon />
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
              サインイン
            </Button>
            <Button
              component={Link}
              to='/signup'
              color='inherit'
              className={classes.linkBtn}
            >
              サインアップ
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
            <Box>
              <img className={classes.logoSize}
                src={TitleLogo}
              />
            </Box>

            <Typography className={classes.titleArea}>
            </Typography>


            <AuthButtons />
          </Toolbar>
        </AppBar>
      </div>
      <HeaderDrawer
        className={classes.drawerItem}
        open={open}
        setOpen={setOpen}
        handleDrawerToggle={handleDrawerToggle}
        drawerItem={drawerItem}
      />
    </>
  );
});
export default Header;
