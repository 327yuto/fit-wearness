import client from "./client";
import Cookies from "js-cookie";


// Likeする
export const creatLike = (id, params) => {
  return client.post(`/posts/${id}/likes`, params, {

    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid'),
    },
  },
  );
};

// Likeを解除する
export const deleteLike = (id) => {
  return client.delete(`/posts/${id}/likes`, {

    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid'),
    },
  },
  );
};

// すでにLikeしているか確認する
export const likedCheck = (id) => {
  return client.get(`/posts/${id}/likes`, {

    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid'),
    },
  },
  );
};




