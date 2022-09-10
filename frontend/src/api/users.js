//mport { useContext, useState } from "react";
import client from "./client";
import Cookies from "js-cookie";


// // // id指定でユーザー情報を個別に取得
// export const getUser = (id ) => {
//   return client.get(`users/${id}`)
// }

// export const getDetailUser = () => {
//   client.get("/users/:id");
// };

// const [userProfile, setUserProfile] = useState({});
// const [userInfo, setUserInfo] = useState({});


// showアクションの呼び出し（現時点でリファクタリングレベル）
// export const getUserProfile = (id) => {
//   return client.get(`/users/${id}`, {
//     headers: {
//       'access-token': Cookies.get('_access_token'),
//       client: Cookies.get('_client'),
//       uid: Cookies.get('_uid'),
//     },
//   });
// };

// IDを取得 CurrentUser用
export const getId = (id) => {
  return client.get(`/users/${id}`)
};

// 全てのuserデータを取得
export const getList = () => {
  return client.get('/users')
};


