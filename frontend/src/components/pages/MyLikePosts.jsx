// List.jsx
import React, { useEffect, useState, useContext } from 'react';
import { getList, getId } from '../../api/users';
import { useHistory, withRouter, Link, } from 'react-router-dom';
import SpaceRow from '../commons/SpaceRow';
import { getMyLikedPosts } from '../../api/posts';

// context
import { AuthContext } from '../../App';

// commons
import BodyCard from '../commons/BodyCard';
// import Paginate from '../commons/Paginate';
// import Pagination from '@material-ui/lab/Pagination';

// style
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography, TextField, Card, CardContent,
  CardHeader, Button, Box, Input, Avatar, Grid,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

// functions
import { subString } from '../../styles/functions';
import { common } from '@material-ui/core/colors';
import { getCurrentUser } from '../../api/auth';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(6),
  },
  submitBtn: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
    textTransform: 'none',
  },
  header: {
    textAlign: 'center',
  },
  card: {
    padding: theme.spacing(2),
    maxWidth: 400,
  },
  box: {
    marginTop: '2rem',
  },
  link: {
    textDecoration: 'none',
  },

  avatarSize: {
    width: 64,
    height: 64,
  },

  pictureSize: {
    gap: 1,
    margin: 1,
  },

  grid: {
    margin: 'auto',
  },

}));

export const MyLikePosts = withRouter(() => {

  const classes = useStyles(); //react hocksのルールで追加

  // State 
  const [posts, setPosts] = useState([]);

  const { loading, isSignedIn, currentUser } = useContext(AuthContext);


  const handleGetData = async () => {
    try {
      const res = await getMyLikedPosts();

      // スプレッドで配列をばらした後もう一度まとめる。
      setPosts([...res.data].reverse());
      console.log(res.data.reverse());


    } catch (e) {
      console.log(e)
    }
  };

  // データを取得
  useEffect(() => {

    handleGetData();

  }, [])


  const getCardContent = getObj => {

    return (


      <Grid item xs={12} sm={3} key={getObj.id} className={classes.grid}>
        {/* <BodyCard {...getObj} */}
        <Box
          sx={{
            width: {
              xs: "300px",
              sm: "400px",
              md: "500px",
              lg: "600px",
              xl: "650px",
            },
            // p: 1,
          }}
        >
          <BodyCard
            pictureUrl={getObj.picture.url}
            postId={getObj.id}
          />
        </Box>
      </Grid>
    );
  };


  return (
    <>
      <form noValidate autoComplete='off'>

        <Grid container spacing={3} >
          {posts.map(contentObj => getCardContent(contentObj))}
        </Grid>

      </form>
    </>
  );

});
