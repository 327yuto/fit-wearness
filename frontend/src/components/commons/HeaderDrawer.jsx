import React from 'react';
import { Link } from 'react-router-dom';
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {
  IconButton,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemText,
} from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles((theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    drawerItem: {
      '&:hover': {
        cursor: 'pointer',
        transform: 'scale(1.1, 1.1)',
        backgroundColor: '#2F4F4F',
        color: '#FFFFFF',
      },
    },

  })
);


const closeWithClickOutSideMethod = (e, setter) => {

  setter(false);

};


const HeaderDrawer = (props) => {
  const { open, setOpen, handleDrawerToggle, drawerItem } = props;
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Drawer
      className={classes.drawer}
      variant='temporary'
      anchor='left'
      open={open}
      classes={{ paper: classes.drawerPaper }}
      onClick={(e) => {
        closeWithClickOutSideMethod(e, setOpen);
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerToggle}>
          {theme.direction === 'ltr' ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <List>
        {drawerItem.map((item, index) => (
          <ListItem
            component={Link}
            to={item.path}
            key={index}
            onClick={handleDrawerToggle}
            className={classes.drawerItem}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
export default HeaderDrawer;
