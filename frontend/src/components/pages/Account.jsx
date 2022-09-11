import React, { useContext, useState, useEffect } from 'react';
import { Redirect, useHistory, Link, withRouter, useParams } from 'react-router-dom';
import client from "../../api/client";

// api
import { getId } from '../../api/users';
// import { deletePost } from '../../lib/api/post';

// context
import { AuthContext } from '../../App';

// component
// import SpaceRow from '../commons/SpaceRow';
// import ListTable from '../commons/ListTable';

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


export const Account = withRouter(() => {

  const classes = useStyles(); //react hocksのルールで追加
  const { loading, isSignedIn, currentUser } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState({});
  const [accountId, setAccountId] = useState([]);

  const history = useHistory();



  const query = useParams();
  // console.log(query.id);


  // データを取得
  useEffect(() => {
    handleGetUserProfile(query);
  }, [query])


  const handleGetUserProfile = async (query) => {
    if (!loading) {
      if (isSignedIn) {
        const res = await getId(query.id);
        console.log(res.data);
        setUserProfile(res.data);

        console.log(res.data.id);
        setAccountId(res.data.id);
      } else {
        console.log("else");
        <Redirect to='/signin' />;
      }
    }
  };

  // const handleDelete = async (item) => {
  //   console.log('click', item.id);
  //   try {
  //     const res = await deletePost(item.id);
  //     console.log(res.data);
  //     handleGetUserPosts();
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  // const UserTable = () => {
  //   if (userPosts.length >= 1) {
  //     return (
  //       <ListTable
  //         dataList={userPosts}
  //         handleDelete={handleDelete}
  //         currentUser={currentUser}
  //       />
  //     );
  //   } else {
  //     return <h2>投稿はありません。</h2>;
  //   }
  // };




  return (
    <>
      {/* <h1>{currentUser.name}投稿一覧</h1> */}
      {/* <h1>My page</h1> */}

      <form noValidate autoComplete='off'>
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="Profile" />
          <CardContent>

            <Box textAlign='center' className={classes.box}>
              <Typography variant='body1'>
                メールアドレス：{userProfile?.email} &nbsp;
              </Typography>

              <Typography variant='body1'>
                {/* <tbody>
                  {accountId.map(user => (
                    <tr key={user.id}>
                      <td>
                        <Link to={{ // ★１解説します
                          pathname: "/users" + user.id,
                          state: { id: user.id },
                        }}>{user.email}</Link>
                      </td>
                    </tr>
                  ))}
                </tbody> */}
              </Typography>

              <Typography variant='body1'>
                カテゴリー：{userProfile?.category}&nbsp;
              </Typography>

              <Typography variant='body2'>
                <Link to={`/users/${accountId}`} className={classes.link}>
                  アクセス users/:id " {accountId} "
                </Link>
              </Typography>

              <Button
                variant='outlined'
                color='primary'
                fullWidth
                startIcon={<UpdateIcon />}
                style={{ marginTop: "1rem" }}
                onClick={() => history.push('/')}
              >
                更新
              </Button>


            </Box>


          </CardContent>
        </Card>
      </form>

      <Button
        variant='contained'
        color='primary'
        onClick={() => history.push('/')}
      >
        戻る
      </Button>
      {/* <SpaceRow height={20} />
      <UserTable /> */}
    </>
  );
});
// };
export default Account;
