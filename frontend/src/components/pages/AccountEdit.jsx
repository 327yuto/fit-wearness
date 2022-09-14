import React, { useEffect, useState } from 'react';
import { useHistory, useParams, withRouter } from 'react-router-dom';
import { getId } from '../../api/users';

export const AccountEdit = withRouter(() => {
  // apiで取得したデータを管理する為のstate
  const [value, setValue] = useState({
    email: '',
    category: '',
  })
  // 一覧からreact-router-domを使ってidを取得
  const query = useParams();

  const history = useHistory();
  // 画面が描画された時、queryが更新された時に関数を実行
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
      // const res = await updatePost(query.id, value)
      // console.log(res)
      // // リクエストが成功したら'/'にリダイレクトさせる
      // history.push('/')
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
  // buttonType = '更新'


  return (
    <>
      <h1>Edit</h1>
      <form>
        <div>
          <label htmlFor="name">Email:</label>
          <input type="text" name="email" id="email" onChange={(e) => handleChange(e)} value={value.email} />
        </div>
        <div>
          <label htmlFor="nekoType">category:</label>
          <input type="text" name="category" id="category" onChange={(e) => handleChange(e)} value={value.category} />
        </div>
        {/* <input type="submit" value={buttonType} onClick={(e) => handleSubmit(e)} /> */}
      </form>
    </>
  )
});

export default AccountEdit;
