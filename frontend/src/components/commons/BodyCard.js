import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';


import {
  CardMedia, Avatar, IconButton, CardHeader, Typography,
  Button, CardContent, CardActions, Card, CardActionArea, Box,
} from '@material-ui/core';
// import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';

const useStyles = makeStyles({
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },

  media: {
    width: 280,
    // width: '0 auto',
    height: 350,


    // paddingTop: '82.25%',
  },

  mediaArea: {
    // margin: '0 auto',
    // width: '80%',
  },

});


function BodyCard(props) {
  const { avatarUrl, title, subheader, text, pictureUrl, postId } = props;
  const classes = useStyles();
  const history = useHistory();

  const bull = <span className={classes.bullet}>•</span>;

  return (



    <Card variant="outlined">
      {/* <CardHeader
        // avatar={<Avatar src={avatarUrl} />}
        action={
          <IconButton aria-label="settings">

          </IconButton>
        }
      // title={title}
      // subheader={subheader}
      /> */}
      <CardActionArea className={classes.mediaArea}>
        <CardMedia className={classes.media}
          // style={{ height: "250px", width: "250px" }} 
          image={pictureUrl}
          onClick={() => history.push(`/posts/${postId}`)}
        />
      </CardActionArea>
      {/* <CardContent>
        <Typography variant="body2" component="p">
          {text}
        </Typography>
      </CardContent> */}
      {/* <CardActions>
        <Button size="small">詳細をみる</Button>
      </CardActions> */}
    </Card>
  );
}
export default BodyCard
