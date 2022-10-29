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
  CardHeader, Button, Box, Input, Avatar,
} from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit"

import IconImage from '../../man-839604_1280.jpg'
import axios from 'axios';


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
  const [imageUrl, setImageUrl] = useState()

  const history = useHistory();



  const query = useParams();
  // console.log(query.id);


  // データを取得
  useEffect(() => {
    handleGetUserProfile(query);

    // axios.get(userProfile.image)
    //   .then(res => {
    //     setImageUrl(res.data.image.url)
    // console.log(userProfile.image)
    // })

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




  return (
    <>

      <form noValidate autoComplete='off'>
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="Profile" />
          <CardContent>

            <Box textAlign='center' className={classes.box}>
              <Typography variant='body2'>
                <Link to={`/users/${accountId}`} className={classes.link}>
                  USER ID[ {query.id} ]
                </Link>
              </Typography>

              <Avatar
              // sx={{ width: 56, height: 56 }}
              // src={"https://joeschmoe.io/api/v1/random"}
              // src={userProfile ? URL.createObjectURL(userProfile) : ""} alt=""
              // src={imageUrl}
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

              {currentUser.id == query.id && (
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
