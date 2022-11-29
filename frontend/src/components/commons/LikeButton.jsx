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
    // margin: 50px auto,
    fontSize: '50px',
  },
  liked: {
    // color: '#f0f8ff',
    // fontSize: 20,
    width: 32,
    height: 32,
    margin: '5px',

    '&:hover': {
      cursor: 'pointer',
      transform: 'scale(1.1, 1.1)',
    }

  },

  like: {
    // color: '#f0f8ff',
    // backgroundColor: '#FF0000',
    // fontSize: 20,
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

  // いいねのボタンの色の状態をstate管理。
  const [liked, setLike] = useState(false);

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
    console.log(res.data.like)
    // console.log(res.data.likeCount)

    // if (res.data.likeCount > 0) {
    setLikeCount(res.data.likeCount);
    console.log(res.data.likeCount);
    // };

    if (res.data.like) {
      console.log(res.data.like)
      setLike(true);
    }

    console.log(liked)

  }

  // const className = liked ? 'liked' : 'like';


  const clickToLike = async () => {

    // 現在のlikedの状態と逆のboolean型をchangeに代入
    // setLikeの更新。画面が更新される。changeを代入
    const change = true;
    setLike(change);


    const res = await creatLike(postId, likeData);

    setLikeCount(likeCount + 1);
    // handleGetLike();

    console.log(res)
    console.log(liked)
  }

  const clickToUnLike = async () => {
    // 現在のlikedの状態と逆のboolean型をchangeに代入
    // setLikeの更新。画面が更新される。changeを代入
    const change = false;
    setLike(change);

    setLikeCount(likeCount - 1);

    // if (likeCount == 1) {
    //   // setLikeCount(0);
    // }
    // else {
    //   // setLikeCount(likeCount - 1);
    // };
    console.log(likeData)
    console.log(postId)

    const res = await deleteLike(postId);

    // handleGetLike();

    console.log(res)
    console.log(liked)
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

//  class App extends Component {
//   render(){
//     return (
//       <div>
//         <LikeButton/>
//       </div>
//     );
//   }
//  }
export default LikeButton
