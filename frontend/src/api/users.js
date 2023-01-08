import client from "./client";
import Cookies from "js-cookie";


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

// アイコン画像の更新
export const updateUserImage = (id, params) => {
  return client.patch(`/users/${id}`, params, {
    headers: {
      'content-type': 'multipart/form-data',
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid'),
    },
  });
};
