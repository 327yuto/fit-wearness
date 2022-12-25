import React, { useEffect, useState, useCallback, useContext } from 'react';
import { Link, useHistory } from "react-router-dom";
import Cookies from "js-cookie";

import { AuthContext } from "../../App";
import { getCurrentUser, signIn, getGuestUserSignIn } from "../../api/auth";

import { makeStyles } from '@material-ui/core/styles';

import {
  useDisclosure, Wrap, WrapItem,
  Spinner, Center, Heading, Image, Box, Flex
} from '@chakra-ui/react';

import {
  CardMedia, Avatar, IconButton, CardHeader, Typography,
  Button, CardContent, CardActions, Card, CardActionArea,
} from '@material-ui/core';

import TopImage from '../../images/image-toppage.jpg';
import WorkoutImage from '../../images/image-workout-icon.jpg';
import RunImage from '../../images/image-run-icon.jpg';
import YogaImage from '../../images/image-yoga-icon.jpg';


const useStyles = makeStyles((theme) => ({

  heading: {
    marginTop: 20,
    color: '#192e43',
  },

  card: {
    padding: theme.spacing(1),

    backgroundColor: '#F5F5F5',
    maxWidth: '300px',
    h: 'auto',
  },

  guestBtn: {

    marginTop: theme.spacing(7),
    color: '#FFFFFF',
    backgroundColor: '#2F4F4F',
  },

  bodyComment: {
    marginTop: theme.spacing(2),
  },

  postsBtn: {
    marginTop: theme.spacing(7),
    color: '#FFFFFF',
    backgroundColor: '#2F4F4F',
    width: 250,
    height: 50,
  },

}));




export const Home = () => {

  //react hocksのルールで追加
  const classes = useStyles();

  const { isSignedIn, setIsSignedIn, setCurrentUser } = useContext(AuthContext);

  const history = useHistory();


  const handleGuestSignIn = async (e) => {

    try {
      const res = await getGuestUserSignIn();
      console.log(res)

      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        // jsonを飛ばす用
        const sessions = await getCurrentUser();


        history.push("/posts");
      }
    } catch (e) {
      console.log(e);
      console.log("catch");
    }
  };


  // データを取得
  useEffect(() => {

    // handleGetData();

  }, []);


  return (
    <>

      <Box>
        <Image
          src={TopImage}
          alt='top-page-image'
        />
      </Box>

      <Heading className={classes.heading}
        as="h2" size="2xl" textAlign="center">
        Fitness × Fashion を楽しむあなたへ
      </Heading>

      {!isSignedIn && (
        <Flex justify='center' align='center' >
          <Button
            className={classes.guestBtn}
            // color='primary'
            variant='contained'
            onClick={handleGuestSignIn}
          >
            ゲストログイン
          </Button>
        </Flex>
      )}
      {!isSignedIn && (
        <Flex justify='center' align='center' >
          <Typography
            className={classes.bodyComment}
          >
            新しい世界を体験してみる
          </Typography>
        </Flex>
      )}

      {isSignedIn && (
        <Flex justify='center' align='center' >
          <Button
            className={classes.postsBtn}
            // color='primary'
            variant='contained'
            onClick={() => history.push('/posts')}
          >
            みんなのコーデを見る
          </Button>
        </Flex>
      )}
      {isSignedIn && (
        <Flex justify='center' align='center' >
          <Typography
            className={classes.bodyComment}
          >
            真似してみたいと思ったコーデにライクしよう👍
          </Typography>
        </Flex>
      )}


      <Wrap p={{ base: 3, md: 10 }} justify='center'>

        <WrapItem overflow="hidden" textAlign="center">
          <Center>
            <Card className={classes.card}>
              <Image
                src={WorkoutImage}
                alt='workout-image'
              />
              <CardContent>
                ワークアウト
              </CardContent>
            </Card>
          </Center>
        </WrapItem>

        <WrapItem overflow="hidden" textAlign="center">
          <Center>
            <Card className={classes.card}>
              <Image
                src={RunImage}
                alt='run-image'
              />
              <CardContent>
                ランニング
              </CardContent>
            </Card>
          </Center>
        </WrapItem>

        <WrapItem overflow="hidden" textAlign="center">
          <Center>
            <Card className={classes.card}>
              <Image
                src={YogaImage}
                alt='yoga-image'
              />
              <CardContent>
                ヨガ
              </CardContent>
            </Card>
          </Center>
        </WrapItem>
      </Wrap>

    </>
  )
};
