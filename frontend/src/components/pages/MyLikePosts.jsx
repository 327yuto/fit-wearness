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

// style
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography, TextField, Card, CardContent,
  CardHeader, Button, Box, Input, Avatar, Grid,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { useDisclosure, Wrap, WrapItem, Spinner, Center, Heading, Flex } from '@chakra-ui/react';


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

      <WrapItem key={getObj.id} mx="auto" overflow="hidden" textAlign="center">

        <BodyCard
          pictureUrl={getObj.picture.url}
          postId={getObj.id}
        />

      </WrapItem>
    );
  };


  return (
    <>
      <form noValidate autoComplete='off'>

        <Heading as="h1" size="lg" textAlign="center">
          あなたが着てみたいコーデ
        </Heading>

        <Wrap p={{ base: 3, md: 10 }}>

          {posts.map(contentObj => getCardContent(contentObj))}

        </Wrap>

        {posts.length == 0 && (
          <Flex justify='center' align='center' >
            <Typography
            // className={classes.bodyComment}
            >
              投稿がありません
            </Typography>
          </Flex>
        )}

      </form>
    </>
  );

});
