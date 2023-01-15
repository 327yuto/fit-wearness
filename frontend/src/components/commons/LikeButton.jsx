import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import FavoriteIcon from "@material-ui/icons/Favorite"
import FavoriteBorder from "@material-ui/icons/FavoriteBorder"
import { creatLike, deleteLike, likedCheck } from '../../api/likes';



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
    height: 250,
    width: 300,
    // paddingTop: '82.25%',
  },

  button: {
    background: '#ffffff',
    display: 'inline-block',
    fontSize: '50px',
  },
  liked: {
    width: 32,
    height: 32,
    margin: '5px',

    '&:hover': {
      cursor: 'pointer',
      transform: 'scale(1.1, 1.1)',
    }

  },

  like: {
    width: 32,
    height: 32,
    margin: '5px',
    '&:hover': {
      cursor: 'pointer',
      transform: 'scale(1.1, 1.2)',
    }
  },

  icon: {
    main: '#64748B',
    contrastText: '#fff',
  },



}));



function LikeButton(props) {

  const { postId, currentUser, initialLikeCount } = props;

  // css
  const classes = useStyles();

  // いいねボタンの色を管理
  const [liked, setLike] = useState(false);

  // いいねの数を管理
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  const [likeData, setLikeData] = useState({
    userId: '',
    postId: '',
  });


  const handleGetLike = async () => {

    setLikeData({
      userId: String(currentUser.id),
      postId: postId,

    });

    const res = await likedCheck(postId);

    setLikeCount(res.data.likeCount);

    if (res.data.like) {
      setLike(true);
    }

  }


  const clickToLike = async () => {

    // 現在のlikedの状態と逆のboolean型をchangeに代入
    // setLikeの更新。画面が更新される。changeを代入
    const change = true;
    setLike(change);

    const res = await creatLike(postId, likeData);

    setLikeCount(likeCount + 1);

  }

  const clickToUnLike = async () => {

    // 現在のlikedの状態と逆のboolean型をchangeに代入
    // setLikeの更新。画面が更新される。changeを代入
    const change = false;
    setLike(change);

    const res = await deleteLike(postId);

    setLikeCount(likeCount - 1);

  }


  useEffect(() => {
    handleGetLike();
  }, [currentUser])



  return (
    <>
      {liked == false && (
        <FavoriteBorder
          className={classes.like}
          onClick={() => clickToLike()} />
      )}

      {liked == true && (
        <FavoriteIcon
          color="secondary"
          className={classes.liked}
          onClick={() => clickToUnLike()} />
      )}

      <Typography>
        真似してみたい！{likeCount}件
      </Typography>

    </>
  );
}

export default LikeButton
