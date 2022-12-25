import React, { useContext, useState, useEffect } from 'react';
import { Redirect, useHistory, Link, withRouter, useParams } from 'react-router-dom';


// api
import { getId } from '../../api/users';
import client from "../../api/client";
import axios from 'axios';
// import { deletePost } from '../../lib/api/post';

// context
import { AuthContext } from '../../App';
import CanNotUserEditToastButton from '../commons/CanNotUserEditToastButton';


// component
// import SpaceRow from '../commons/SpaceRow';
// import ListTable from '../commons/ListTable';

// style
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography, TextField, Card, CardContent,
  CardHeader, Button, Box, Input, Avatar,
} from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit"




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
    // backgroundColor: '#115293',
    // backgroundColor: '#1976d2',
    backgroundColor: '#192e43',

    color: 'white',
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

  avatarSize: {
    width: 64,
    height: 64,
  },

}));



export const Account = withRouter(() => {

  const classes = useStyles(); //react hocksのルールで追加
  const { loading, isSignedIn, currentUser } = useContext(AuthContext);

  // useState
  const [userProfile, setUserProfile] = useState({});
  const [accountId, setAccountId] = useState();
  const [imageUrl, setImageUrl] = useState()

  const history = useHistory();
  const query = useParams();


  // データを取得
  useEffect(() => {
    handleGetUserProfile(query);
  }, [query])

  const handleGetUserProfile = async (query) => {
    if (!loading) {
      if (isSignedIn) {
        const res = await getId(query.id);
        // console.log(res.data);
        setUserProfile(res.data);
        setAccountId(res.data.id);
        setImageUrl(res.data.image.url);
      } else {
        console.log("else");
        // <Redirect to='/signin' />;
      }
    }
  };




  return (
    <>

      <form noValidate autoComplete='off'>
        <Card className={classes.card}>
          <CardHeader
            className={classes.header}
            title={`${userProfile?.name}`} />
          <CardContent>

            <Box textAlign='center' className={classes.box}>
              {/* <Typography variant='body2'>
                <Link to={`/users/${accountId}`} className={classes.link}>
                  USER ID[ {query.id} ]
                </Link>
              </Typography> */}

              <Avatar className={classes.avatarSize}
                src={imageUrl ? imageUrl : ""} alt=""
              />

              <TextField
                variant='standard'
                fullWidth
                id='name'
                label='Name'
                name='name'
                type='text'
                margin='dense'
                value={`${userProfile?.name}`}
              />
              <TextField
                variant='standard'
                fullWidth
                id='category'
                label='Category'
                name='category'
                type='text'
                margin='dense'
                value={`${userProfile?.category}`}
              />
              <TextField
                variant='standard'
                fullWidth
                multiline
                maxRows={4}
                id='metadata'
                label='Info'
                name='metadata'
                type='text'
                margin='dense'
                value={`${userProfile?.metadata}`}
              />

              {currentUser.id == query.id && currentUser.email != "guest@example.com" && (
                <Button
                  variant='outlined'
                  color='primary'
                  fullWidth
                  startIcon={<EditIcon />}
                  style={{ marginTop: "1rem" }}
                  onClick={() => history.push(`/edit/${accountId}`)}
                >
                  編集
                </Button>
              )}

              {currentUser.email == "guest@example.com" && (
                <CanNotUserEditToastButton />
              )}


            </Box>
          </CardContent>
        </Card>
      </form>

      <Button
        variant='contained'
        color='primary'
        onClick={() => history.push('/posts')}
      >
        ＜＜  みんなのコーデページ
      </Button>

    </>
  );
});

// };
export default Account;
