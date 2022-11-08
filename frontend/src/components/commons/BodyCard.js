import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  CardMedia, Avatar, IconButton, CardHeader, Typography,
  Button, CardContent, CardActions, Card,
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
    height: 0,
    paddingTop: '82.25%',
  },
});


function BodyCard(props) {
  const { avatarUrl, title, subheader, text, pictureUrl } = props;
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  return (
    <Card variant="outlined">
      <CardHeader
        avatar={<Avatar src={avatarUrl} />}
        action={
          <IconButton aria-label="settings">
            {/* <StarBorderOutlinedIcon /> */}
          </IconButton>
        }
        title={title}
        subheader={subheader}
      />

      <CardMedia className={classes.media}
        // style={{ height: "250px", width: "250px" }} 
        image={pictureUrl}
      />

      <CardContent>
        <Typography variant="body2" component="p">
          {text}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">詳細をみる</Button>
      </CardActions> */}
    </Card>
  );
}
export default BodyCard
