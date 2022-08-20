import React from 'react';
import { Link } from 'react-router-dom';
// style
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  TextField,
  Card,
  CardContent,
  CardHeader,
  Button,
  Box,
} from '@material-ui/core';

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

const SignForm = (props) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    signType,
    category,
    setCategory,
    passwordConfirmation,
    setPasswordConfirmation,
  } = props;
  const classes = useStyles();

  return (
    <>
      <form noValidate autoComplete='off'>
        <Card className={classes.card}>
          <CardHeader className={classes.header} title={signType} />
          <CardContent>
            <TextField
              variant='outlined'
              required
              fullWidth
              label='Email'
              value={email}
              margin='dense'
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              variant='outlined'
              required
              fullWidth
              label='Password'
              type='password'
              placeholder='At least 6 characters'
              value={password}
              margin='dense'
              autoComplete='current-password'
              onChange={(event) => setPassword(event.target.value)}
            />
            {signType === 'signUp' && (
              <TextField
                variant='outlined'
                required
                fullWidth
                label='Password Confirmation'
                type='password'
                value={passwordConfirmation}
                margin='dense'
                autoComplete='current-password'
                onChange={(event) =>
                  setPasswordConfirmation(event.target.value)
                }
              />
            )}
            {signType === 'signUp' && (
              <TextField
                variant='outlined'
                required
                fullWidth
                label='Category'
                value={category}
                margin='dense'
                onChange={(event) => setCategory(event.target.value)}
              />
            )}
            <Button
              type='submit'
              variant='contained'
              size='large'
              fullWidth
              color='default'
              disabled={!email || !password ? true : false}
              className={classes.submitBtn}
              onClick={handleSubmit}
            >
              Submit
            </Button>
            {signType === 'signIn' && (
              <Box textAlign='center' className={classes.box}>
                <Typography variant='body2'>
                  Don't have an account? &nbsp;
                  <Link to='/signup' className={classes.link}>
                    Sign Up now!
                  </Link>
                </Typography>
              </Box>
            )}
            {signType === 'signUp' && (
              <Box textAlign='center' className={classes.box}>
                <Typography variant='body1'>
                  Fit-wearness is waiting for you! &nbsp;
                </Typography>
                <Typography variant='body2'>
                  <Link to='/signin' className={classes.link}>
                    Already registered?
                  </Link>
                </Typography>
              </Box>
            )}

          </CardContent>
        </Card>
      </form>
    </>
  );
};
export default SignForm;
