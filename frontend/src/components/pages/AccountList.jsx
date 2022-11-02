// List.jsx
import React, { useEffect, useState } from 'react';
import { getList, getId } from '../../api/users';
import { useHistory, withRouter, Link } from 'react-router-dom';
import SpaceRow from '../commons/SpaceRow';

// style
import {
  Button,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Paper,
  Avatar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// functions
import { subString } from '../../styles/functions';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  fontWeight: {
    fontWeight: 900,
  },
});

export const AccountList = withRouter(() => {
  const classes = useStyles();
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    handleGetList();
  }, []);

  const handleGetList = async () => {
    try {
      const res = await getList();
      console.log(res.data);
      setDataList(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const history = useHistory();

  // const handleDelete = async (item) => {
  //   console.log('click', item.id);
  //   try {
  //     const res = await deletePost(item.id);
  //     console.log(res.data);
  //     handleGetList();
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  return (
    <>
      <h1>HOME</h1>
      <Button
        variant='contained'
        color='primary'
        onClick={() => history.push('/new')}
      >
        新規作成
      </Button>
      {/* <SpaceRow height={20} /> */}
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='center' className={classes.fontWeight}>
                Email
              </TableCell>
              <TableCell align='center' className={classes.fontWeight}>
                Email
              </TableCell>
              <TableCell align='center' className={classes.fontWeight}>
                Category
              </TableCell>
              <TableCell align='center' className={classes.fontWeight}>
                Detail
              </TableCell>
              <TableCell align='center' className={classes.fontWeight}>
                Delete
              </TableCell>
              <TableCell align='center'></TableCell>
              <TableCell align='center'></TableCell>
              <TableCell align='center'></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {dataList.map((item, index) => (


              <TableRow key={index}>
                <TableCell align='center'>{subString(item.email, 15)}</TableCell>
                <TableCell align='center'>
                  {subString(item.email, 15)}
                </TableCell>
                <TableCell align='center'>
                  {subString(item.category, 15)}
                </TableCell>


                {/* <TableCell align='center'>
                  {subString(item.detailInfo.favoriteToy, 10)}
                </TableCell>
                <TableCell align='center'>
                  <Link to={`/edit/${item.id}`}>更新</Link>
                </TableCell> */}
                <TableCell align='center'>
                  <Button
                    variant='contained'
                    color='inherit'
                  >
                    <Link to={`/users/${item.id}`}>詳細ページ</Link>
                  </Button>
                </TableCell>
                <TableCell align='center'>
                  <Button
                    variant='contained'
                    color='secondary'
                  // onClick={() => handleDelete(item)}
                  >
                    削除
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>
    </>
  );
});
export default AccountList;
