import React, { useEffect, useState, useCallback, useContext } from 'react';
import { useHistory, useParams, withRouter } from 'react-router-dom';

// api
import { getId, updateUserInfo, updateUserImage } from '../../api/users';
import { postCreat, postDelete } from '../../api/posts';
import { getCurrentUser } from '../../api/auth';

// context
import { AuthContext } from '../../App';
import CanNotPostToastButton from '../commons/CanNotPostToastButton';

// style
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography, TextField, Card, CardContent,
  CardHeader, Button, Box, Avatar, CardMedia,
} from '@material-ui/core';
import UpdateIcon from "@material-ui/icons/Update"

import IconImage from '../../man-839604_1280.jpg';
import addPicIcon from '../../images/add-picture-icon.jpeg';



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
    padding: theme.spacing(4),
    marginBottom: theme.spacing(4),
    maxheight: 800,
    maxWidth: 400,
    backgroundColor: '#f0f8ff',

  },
  box: {
    marginTop: '0.5rem',
  },
  link: {
    textDecoration: 'none',
  },

  uploadLabel: {
    display: 'inline-block',
    cursor: 'pointer', /* カーソルを指に */
    margin: '0em 0', /* まわりの余白 */
    padding: '.7em 1em', /* 文字まわりの余白 */
    lineHeight: '1.4', /* 行間 */
    // background: '#3e8bff', /* 背景色 */
    // color: '#FFF', /* 文字色 */
    fontSize: '0.95em', /* フォントサイズ */
    borderRadius: '2.5em', /* 角の丸み */
    transition: '0.2s', /* ホバーをなめらかに */

  },
  input: {
    display: 'none',
  },

  picture: {
    width: 310,
    height: 'auto',
    // maxheight: 'auto',
    // background: '#3e8bff', /* 背景色 */
  },

  content: {
    background: '#ffffff',
  },

  category: {
    background: '#ffffff',
    margin: '1em 0',
  },


}));


export const CreatePost = withRouter(() => {

  // apiで取得したデータを管理する為のstate
  const [value, setValue] = useState({
    category: '',
    content: '',
    picture: '',
    user_id: '',
  });


  // apiから取得したimageカラムのデータを管理
  const [imageUrl, setImageUrl] = useState();

  // 更新したい画像を管理・プレビューするstate
  const [image, setImage] = useState(null);


  //react hocksのルールで追加
  const classes = useStyles();
  const { loading, isSignedIn, currentUser } = useContext(AuthContext);
  // const guestToast = GuestToast();


  // 一覧からreact-router-domを使ってidを取得
  const query = useParams();

  // 画面が描画された時、queryが更新された時に関数を実行
  const history = useHistory();

  const reader = new FileReader();


  // テキストフィールドの変更を検知し値を書き換えstateで管理
  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value
    })
    console.log(value)
  }


  // 更新ボタン押下後、idとparameterをapiクライアントに渡しリクエストを投げる
  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   try {
  //     const res = await updateUserInfo(query.id, (value))

  //     // リクエストが成功したら'/'にリダイレクトさせる
  //     history.push(`/users/${query.id}`)
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }


  const handleFileSend = async (e) => {

    if (image != null && value.category != undefined) {

      const file = new FormData()
      file.append("picture", image);
      file.append("category", value.category);
      file.append("content", value.content);
      file.append("user_id", value.user_id);

      console.log(file.get('picture'));

      const res = await postCreat(file)


        .then(response => {
          console.log(response);
        })
      history.push('/posts');
    }
  }

  useEffect(() => {
    // handleGetData(query)
    // console.log(currentUser.id)
    setValue({ user_id: currentUser.id })
  }, [currentUser])

  // const Form = (props) => {
  //   const { handleChange, handleSubmit, value, buttonType } = props
  // }

  return (
    <>
      <form noValidate autoComplete='off'>
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="新しいコーデを投稿" />


          <label className={classes.uploadLabel}>
            <img className={classes.picture}
              src={image ? URL.createObjectURL(image) : addPicIcon} alt=""
            />
            <input
              type="file"
              id='image'
              name="image"
              accept="image/png,image/jpeg"
              onChange={e => setImage(e.target.files[0])}
              className={classes.input} />
          </label>

          <Box className={classes.box}>

            <TextField className={classes.category}
              id="category"
              label="Category"
              name="category"
              // fullWidth
              // multiline
              minRows={1}
              defaultValue=""

              variant="outlined"
              onChange={(e) => handleChange(e)}
            />


            <TextField className={classes.content}
              id="content"
              label="Content"
              name="content"
              fullWidth
              multiline
              minRows={4}
              maxRows={4}
              // defaultValue=""
              variant="outlined"
              onChange={(e) => handleChange(e)}
            />
          </Box>

          {currentUser.email != "guest@example.com" && (
            <Button
              variant='outlined'
              color='primary'
              fullWidth
              style={{ marginTop: "1rem" }}
              onClick={(e) => handleFileSend(e)}
            >
              投稿
            </Button>
          )}

          {currentUser.email == "guest@example.com" && (
            <CanNotPostToastButton />
          )}

        </Card>
      </form>
    </>
  )
});

export default CreatePost;
