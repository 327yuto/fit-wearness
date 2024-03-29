import React, { useEffect, useState, useCallback, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect, useHistory, withRouter, useParams } from 'react-router-dom';
import { getPostsList, getPostShow, postDelete } from '../../api/posts';
import LikeButton from '../../components/commons/LikeButton';
import { likedCheck } from '../../api/likes';


import {
  CardMedia, Avatar, IconButton, CardHeader, Typography,
  Button, CardContent, CardActions, Card, CardActionArea, Box,
} from '@material-ui/core';

// javascriptの時間操作ができる
import Moment from 'react-moment';

// context
import { AuthContext } from '../../App';


const useStyles = makeStyles((theme) => ({
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },

  media: {
  },

  card: {
    padding: theme.spacing(3),
    maxHeight: 850,
    maxWidth: 400,
    backgroundColor: '#f0f8ff',
    marginBottom: 40,
  },

  box: {
    bgcolor: 'background.paper',
    m: 1,
    style: { width: '5rem', height: '5rem' },
    borderColor: 'text.primary',
    padding: 10,
  },

  createdAt: {
    textAlign: 'right',

  },

  codeInfo: {
    background: '#ffffff',
    marginTop: 15,
    margin: 10,

  },

  subTitleTextSize: {
    fontSize: '15px',
  },

  bodyText: {
    fontSize: '13px',
    wordBreak: 'break-word',
  },

  deleteButton: {
    marginTop: 2,
    marginBottom: 30,
  },




}));

export const PostShow = withRouter(() => {


  const classes = useStyles();
  const history = useHistory();
  const query = useParams();
  const { loading, isSignedIn, setIsSignedIn, currentUser } = useContext(AuthContext);
  const [likeCount, setLikeCount] = useState(0);

  const [value, setValue] = useState({
    picture: '',
    category: '',
    content: '',
    createdAt: '',
    userId: '',
  })

  const handleGetData = async (query) => {
    try {
      if (!loading) {
        if (isSignedIn) {
          const res = await getPostShow(query.id);

          setValue({
            picture: res.data.picture.url,
            category: res.data.category,
            content: res.data.content,
            createdAt: res.data.createdAt,
            userId: res.data.userId,

          });

        } else {
          console.log("error");
          <Redirect to='/signin' />;
        }
      }
    } catch (e) {
      console.log("error");
      history.push('/notfound404')
    }

  };

  const handleGetLike = async () => {

    const res = await likedCheck(query.id);
    setLikeCount(res.data.likeCount);

  }

  const handleDelete = async (post) => {

    try {

      const res = await postDelete(post.id);
      history.push(`/posts`)

    } catch (e) {
      console.log(e.response);
    }
  };



  // データを取得
  useEffect(() => {
    handleGetData(query);
    handleGetLike();
  }, [query])


  return (
    <>

      <form noValidate autoComplete='off'>
        <Card className={classes.card} variant="outlined">

          <CardHeader
            title={value.category}
          />

          {value.picture ? (
            <CardMedia className={classes.media}
              style={{ height: "450px", width: "350px" }}
              image={value.picture}
            />
          ) : (
            <></>
          )}

          <CardContent className={classes.codeInfo}>

            <Typography variant="subtitle1" component="p" className={classes.subTitleTextSize}>
              Code Information
            </Typography>

            <Box display="flex" className={classes.box} >
              <Typography variant="body1" component="p" className={classes.bodyText}>
                {value.content}
              </Typography>
            </Box>

            <Box className={classes.createdAt}>
              <Moment format="YYYY/MM/DD" >
                <Typography variant="body2">
                  {value.createdAt}
                </Typography>
              </Moment>
            </Box>

          </CardContent>


          <LikeButton
            postId={query.id}
            currentUser={currentUser}
            initialLikeCount={likeCount}
          />
        </Card>

        {value.userId == currentUser.id && (
          <Button
            className={classes.deleteButton}
            variant='contained'
            color='secondary'
            fullWidth
            onClick={() => handleDelete(query)}
          >
            削除
          </Button>
        )}
      </form>
    </>
  )
});

export default PostShow;
