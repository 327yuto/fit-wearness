import React, { useEffect, useState } from 'react';
import { useHistory, useParams, withRouter } from 'react-router-dom';

// api
import { getId, updateUserInfo } from '../../api/users';

// style
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography, TextField, Card, CardContent,
  CardHeader, Button, Box, Avatar,
} from '@material-ui/core';
import UpdateIcon from "@material-ui/icons/Update"

import IconImage from '../../man-839604_1280.jpg'

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
    background: '#3e8bff', /* 背景色 */
    color: '#FFF', /* 文字色 */
    fontSize: '0.95em', /* フォントサイズ */
    borderRadius: '2.5em', /* 角の丸み */
    transition: '0.2s', /* ホバーをなめらかに */

  },
  input: {
    display: 'none',
  },


}));


export const AccountEdit = withRouter(() => {
  // apiで取得したデータを管理する為のstate
  const [value, setValue] = useState({
    email: '',
    name: '',
    category: '',
    metadata: '',
  })

  //react hocksのルールで追加
  const classes = useStyles();

  // 一覧からreact-router-domを使ってidを取得
  const query = useParams();

  // 画面が描画された時、queryが更新された時に関数を実行
  const history = useHistory();


  useEffect(() => {
    handleGetData(query)
  }, [query])

  // idをapiクライアントに渡し、/api/v1/posts/:idのエンドポイントからデータ取得
  const handleGetData = async (query) => {
    try {
      const res = await getId(query.id)
      console.log(res.data.name)
      // 使う値のみstateにセットする
      setValue({
        email: res.data.email,
        name: res.data.name,
        category: res.data.category,
        metadata: res.data.metadata,
      })
      console.log(value)
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
      console.log(query.id)
      const res = await updateUserInfo(query.id, value)
      console.log(res)
      // リクエストが成功したら'/'にリダイレクトさせる
      history.push(`/users/${query.id}`)
    } catch (e) {
      console.log(e)
    }
  }

  const Form = (props) => {
    const { handleChange, handleSubmit, value, buttonType } = props
  }


  // handleChange = { handleChange }
  // handleSubmit = { handleSubmit }
  // value = { value }
  const buttonType = '更新'


  return (
    <>
      <form noValidate autoComplete='off'>
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="Edit" />

          <Avatar
            src={IconImage}
          />

          <label className={classes.uploadLabel}>
            プロフィール画像を変更
            <input type="file" className={classes.input} />
          </label>

          <Box className={classes.box}>
            <TextField
              variant='outlined'
              required
              fullWidth
              id='email'
              label='Email'
              name='email'
              type='text'
              margin='dense'
              onChange={(e) => handleChange(e)}
              value={value.email}
            />
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
          >
            更新
          </Button>
        </Card>
      </form>
    </>
  )
});

export default AccountEdit;
