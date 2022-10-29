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

// 指定したIDデータを取得 アカウント詳細ページ
export const getId = (id) => {
  return client.get(`/users/${id}`)
};

// 全てのuserデータを取得 アカウントリストページ
export const getList = () => {
  return client.get('/users')
};

// 更新
export const updateUserInfo = (id, params) => {
  return client.patch(`/users/${id}`, params, {
    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid'),
    },
  });
};

export const updateUserImage = (id, params) => {
  return client.patch(`/users/${id}`, params, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
};



// export const updateUserImage = (params) => {
//   return client.post(`/users/post_file`, params, {
//     headers: {
//       'access-token': Cookies.get('_access_token'),
//       client: Cookies.get('_client'),
//       uid: Cookies.get('_uid'),
//       'content-type': 'multipart/form-data',
//     },
//   });
// };

