import {
  Box,
  Grid,
  TextField,
  InputLabel,
  Typography,
  Button,
  Divider,
} from '@mui/material';
import { Link } from 'react-router-dom';
import useInput from '../../../hooks/input/use-input';
import { validateEmail } from '../../../shared/utils/validation/email';
import { validatePasswordLength } from '../../../shared/utils/validation/length';
import { FC, FormEvent } from 'react';

const SigninFormComponent = () => {
  const {
    text: email,
    textChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    clearHandler: emailClearHandler,
    shouldDisplayError: emailHasError,
  } = useInput(validateEmail);
  const {
    text: password,
    textChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    clearHandler: passwordClearHandler,
    shouldDisplayError: passwordHasError,
  } = useInput(validatePasswordLength);
  const clearForm = () => {
    emailClearHandler();
    passwordClearHandler();
  };
  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Clicked');
    const errors = [emailHasError, passwordHasError].every(Boolean);
    const lengthConditions = [email.length === 0, password.length === 0].every(
      Boolean,
    );
    if (errors) return;
    if (lengthConditions) return;
    console.log('USER :', email, password);
    clearForm();
  };
  return (
    <>
      <Box
        sx={{
          border: 1,
          padding: 2,
          borderColor: '#cccccc',
          width: '350px',
          marginTop: 2,
        }}
      >
        <form onSubmit={onSubmitHandler}>
          <Grid container direction="column" justifyContent="flex-start">
            <Typography variant="h4" component="h1">
              Sign-In
            </Typography>

            {/*  */}
            <InputLabel
              sx={{ fontWeight: 500, marginTop: 1, color: '#000000' }}
              htmlFor="email"
            >
              Your email
            </InputLabel>
            <TextField
              value={email}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              error={emailHasError}
              helperText={emailHasError ? 'Enter a valid email' : ''}
              type="email"
              name="email"
              id="email"
              variant="outlined"
              size="small"
            />

            <InputLabel
              sx={{ fontWeight: 500, marginTop: 1, color: '#000000' }}
              htmlFor="password"
            >
              Your password
            </InputLabel>
            <TextField
              value={password}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              error={passwordHasError}
              helperText={passwordHasError ? 'Enter a valid password' : ''}
              type="password"
              name="password"
              id="password"
              variant="outlined"
              size="small"
              placeholder="Enter your password"
            />

            <Button
              variant="contained"
              style={{
                marginTop: '16px',
                height: '31px',
                backgroundColor: '#f0c14b',
                borderColor: '#a88734 #9c7e31 #846a29',
                textTransform: 'none',
              }}
              type="submit"
            >
              Sign-in
            </Button>
          </Grid>
        </form>

        <div style={{ marginTop: '30px' }}>
          <small>
            <span>By continuing an account, you agree to Amazon's</span>
            <a href="#" style={{ textDecoration: 'none' }}>
              {' '}
              Conditions of use{' '}
            </a>{' '}
            and{' '}
            <a href="#" style={{ textDecoration: 'none' }}>
              Privacy policy
            </a>
          </small>
        </div>
        <Divider sx={{ marginTop: '36px', marginBotton: '36px' }} />
        <small>
          <div style={{ marginTop: '16px' }}> </div>
          You don't have an account?{' '}
          <Link
            to="/register"
            style={{ textDecoration: 'none', color: '#0000ee' }}
          >
            register
          </Link>
        </small>
        <div style={{ marginTop: '30px' }}>
          <small>
            Buying for work?
            <a href="#" style={{ textDecoration: 'none' }}>
              {' '}
              Create a free business account
            </a>{' '}
          </small>
        </div>
      </Box>
    </>
  );
};

export default SigninFormComponent;
