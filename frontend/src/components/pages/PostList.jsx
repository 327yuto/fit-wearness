// List.jsx
import React, { useEffect, useState } from 'react';
import { getList, getId } from '../../api/users';
import { useHistory, withRouter, Link } from 'react-router-dom';
import SpaceRow from '../commons/SpaceRow';
import defaultPicture from '../../man-839604_1280.jpg';

import { getpostsList } from '../../api/posts';

// commons
import BodyCard from '../commons/BodyCard';

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



}));

export const PostList = withRouter(() => {

  const classes = useStyles(); //react hocksのルールで追加

  const urls = [defaultPicture, defaultPicture, defaultPicture];
  // console.log(urls);


  const [posts, setPosts] = useState([]);
  const [pictureUrl, setPictureUrl] = useState([]);

  // apiで取得したデータを管理する為のstate
  // const [value, setValue] = useState({
  //   pictureUrl: '',
  // })

  const handleGetData = async () => {
    try {
      const res = await getpostsList();
      // const urls = res.data
      // console.log(urls.map((url) => setPictureUrl(url)));

      setPosts(res.data);
      console.log(res.data);
      // const image = (res.data).map((u) => console.log(u.picture.url));
      // console.log(image)

      // setValue({
      //   pictureUrl: urls[0].picture.url,
      // });
      // console.log(value)

      // urls.map((url) => console.log(url.picture.url));
      // console.log(urls.map((url) => setPictureUrl(url.picture.url)));
      // console.log(pictureUrl)


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
      <Grid item xs={12} sm={3} key={getObj.id}>
        {/* <BodyCard {...getObj} */}
        <BodyCard
          pictureUrl={getObj.picture.url}
        />
      </Grid>
    );
  };


  return (
    <>
      <form noValidate autoComplete='off'>

        <Grid container spacing={2}>
          {posts.map(contentObj => getCardContent(contentObj))}
        </Grid>
      </form>
    </>
  );

});
