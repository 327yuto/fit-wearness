import React, { useEffect, useState } from 'react';
import { useHistory, useParams, withRouter } from 'react-router-dom';

// api
import { getId, updateUserInfo } from '../../api/users';

// style
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography, TextField, Card, CardContent,
  CardHeader, Button, Box,
} from '@material-ui/core';
import UpdateIcon from "@material-ui/icons/Update"

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
}));


export const AccountEdit = withRouter(() => {
  // apiで取得したデータを管理する為のstate
  const [value, setValue] = useState({
    email: '',
    category: '',
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
      console.log(res.data.email)
      // 使う値のみstateにセットする
      setValue({
        email: res.data.email,
        category: res.data.category,
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

          <Box textAlign='center' className={classes.box}>
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
          </Box>
          <input type="submit" value={buttonType} onClick={(e) => handleSubmit(e)} />
        </Card>
      </form>
    </>
  )
});

export default AccountEdit;
