import React, { useEffect, useState, useCallback, useContext } from 'react';
import { useHistory, useParams, withRouter } from 'react-router-dom';

// api
import { getId, updateUserInfo, updateUserImage } from '../../api/users';
import client from '../../api/client';
import axios from "axios"
import Cookies from "js-cookie";
import { getCurrentUser } from '../../api/auth';

// context
import { AuthContext } from '../../App';

// style
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography, TextField, Card, CardContent,
  CardHeader, Button, Box, Avatar,
} from '@material-ui/core';
import UpdateIcon from "@material-ui/icons/Update"
import IconImage from '../../man-839604_1280.jpg'
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';




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

  uploadLabel: {
    display: 'inline-block',
    cursor: 'pointer', /* カーソルを指に */
    margin: '1em 0', /* まわりの余白 */
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

  avatarSize: {
    width: 64,
    height: 64,
  },

}));


export const AccountEdit = withRouter(() => {

  // apiで取得したデータを管理する為のstate
  const [value, setValue] = useState({
    email: '',
    name: '',
    category: '',
    metadata: '',
    image: '',
  })
  // apiから取得したimageカラムのデータを管理
  const [imageUrl, setImageUrl] = useState()

  // 更新したい画像を管理・プレビューするstate
  const [image, setImage] = useState(null);


  //react hocksのルールで追加
  const classes = useStyles();
  const { loading, isSignedIn, currentUser } = useContext(AuthContext);


  // 一覧からreact-router-domを使ってidを取得
  const query = useParams();

  // 画面が描画された時、queryが更新された時に関数を実行
  const history = useHistory();

  const reader = new FileReader();


  useEffect(() => {
    handleGetData(query)
    console.log(currentUser)
  }, [])

  // idをapiクライアントに渡し、/api/v1/users/:idのエンドポイントからデータ取得
  const handleGetData = async (query) => {
    try {
      const res = await getId(query.id)

      if (query.id == currentUser.id) {


        // 使う値のみstateにセットする
        setValue({
          email: res.data.email,
          name: res.data.name,
          category: res.data.category,
          metadata: res.data.metadata,
        });

        setImageUrl(res.data.image.url)
      } else {
        history.push('/')
      }

    } catch (e) {
      console.log(e)
    }
  }
  // テキストフィールドの変更を検知し値を書き換えstateで管理
  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value
    })
  }
  // 更新ボタン押下後、idとparameterをapiクライアントに渡しリクエストを投げる
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await updateUserInfo(query.id, (value))

      // リクエストが成功したらリダイレクトさせる
      history.push(`/users/${query.id}`)
    } catch (e) {
      console.log(e)
    }
  }


  const handleFileSend = async (e) => {
    if (image != null && query.id == currentUser.id) {

      const file = new FormData()
      file.append("image", image);

      const res = await updateUserImage(query.id, (file))

        .then(response => {
          console.log(response);
        })
    }
  }



  const Form = (props) => {
    const { handleChange, handleSubmit, value, buttonType } = props
  }

  return (
    <>
      <form noValidate autoComplete='off'>
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="Edit" />


          <label className={classes.uploadLabel}>
            <Avatar className={classes.avatarSize}
              src={image ? URL.createObjectURL(image) : imageUrl} alt=""
            />
            <input
              type="file"
              id='image'
              name="image"
              accept="image/png,image/jpeg"
              onChange={e => setImage(e.target.files[0])}
              className={classes.input} />
          </label>

          <Button
            variant='outlined'
            color='primary'
            style={{ marginTop: "2rem" }}
            onClick={(e) => handleFileSend(e)}
          >
            アイコンの更新
          </Button>

          <Box className={classes.box}>

            <TextField
              variant='outlined'
              fullWidth
              id='name'
              label='Name'
              name='name'
              type='text'
              margin='dense'
              onChange={(e) => handleChange(e)}
              value={value.name}
            />
            <TextField
              variant='outlined'
              required
              fullWidth
              id='category'
              label='Category'
              name='category'
              type='text'
              margin='dense'
              onChange={(e) => handleChange(e)}
              value={value.category}
            />
            <TextField
              variant='outlined'
              fullWidth
              multiline
              maxRows={4}
              id='metadata'
              label='Info'
              name='metadata'
              type='text'
              margin='dense'
              onChange={(e) => handleChange(e)}
              value={value.metadata}
            />
          </Box>
          {/* <input type="submit" value={buttonType} onClick={(e) => handleSubmit(e)} /> */}
          <Button
            variant='outlined'
            color='primary'
            fullWidth
            startIcon={<UpdateIcon />}
            style={{ marginTop: "2rem" }}
            onClick={(e) => handleSubmit(e)}
          // onClick={(e) => sendFormData(e)}
          >
            更新
          </Button>
        </Card>
      </form>
      <Button
        variant='contained'
        color='primary'
        // onClick={() => history.push('/')}
        onClick={() => history.push(`/users/${currentUser.id}`)}
      >
        <CancelPresentationIcon />
      </Button>
    </>
  )
});

export default AccountEdit;
