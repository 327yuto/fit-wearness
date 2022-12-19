import React, { useEffect, useState, useCallback, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  useDisclosure, Wrap, WrapItem,
  Spinner, Center, Heading, Image, Box
} from '@chakra-ui/react';

import {
  CardMedia, Avatar, IconButton, CardHeader, Typography,
  Button, CardContent, CardActions, Card, CardActionArea,
} from '@material-ui/core';

import TopImage from '../../images/image-toppage.jpg';
import WorkoutImage from '../../images/image-workout-icon.jpg';
import RunImage from '../../images/image-run-icon.jpg';
import YogaImage from '../../images/image-yoga-icon.jpg';


const useStyles = makeStyles((theme) => ({

  heading: {
    marginTop: 20,
    color: '#192e43',
  },

  card: {
    padding: theme.spacing(1),

    backgroundColor: '#F5F5F5',
    maxWidth: '300px',
    h: 'auto',
  },

}));




export const Home = () => {

  //react hocksのルールで追加
  const classes = useStyles();

  return (
    <>

      <Box>

        <Image
          src={TopImage}
          alt='top-page-image'
        />
      </Box>

      <Heading className={classes.heading}
        as="h2" size="2xl" textAlign="center">
        Fitness × Fashion を楽しむあなたへ
      </Heading>

      <Wrap p={{ base: 3, md: 10 }} justify='center'>

        <WrapItem overflow="hidden" textAlign="center">
          <Center>
            <Card className={classes.card}>
              <Image
                src={WorkoutImage}
                alt='workout-image'
              />
              <CardContent>
                ワークアウト
              </CardContent>
            </Card>
          </Center>
        </WrapItem>

        <WrapItem overflow="hidden" textAlign="center">
          <Center>
            <Card className={classes.card}>
              <Image
                src={RunImage}
                alt='run-image'
              />
              <CardContent>
                ランニング
              </CardContent>
            </Card>
          </Center>
        </WrapItem>

        <WrapItem overflow="hidden" textAlign="center">
          <Center>
            <Card className={classes.card}>
              <Image
                src={YogaImage}
                alt='yoga-image'
              />
              <CardContent>
                ヨガ
              </CardContent>
            </Card>
          </Center>
        </WrapItem>





      </Wrap>



    </>
  )
};
