import client from "./client";
import Cookies from "js-cookie";


// 全てのPostデータを取得 投稿リストページ
export const getPostsList = () => {
  return client.get('/posts')
};

export const getMyLikedPosts = () => {
  return client.get('/my_liked_posts', {

    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid'),
    },
  },
  );
};

// Postデータの詳細を取得 投稿詳細ページ
export const getPostShow = (id) => {
  return client.get(`/posts/${id}`)
};

// 新しいPostデータを作成
export const postCreat = (params) => {
  return client.post('/posts', params, {

    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid'),
      'content-type': 'multipart/form-data',
    },
  },
  );
};

// Postデータを削除
export const postDelete = (id) => {
  return client.delete(`/posts/${id}`, {

    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid'),
    },
  },
  );
};
