import {
  Box,
  Grid,
  TextField,
  InputLabel,
  Typography,
  Button,
  Divider,
  CircularProgress,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import useInput from '../../../hooks/input/use-input';
import { validateEmail } from '../../../shared/utils/validation/email';
import { validatePasswordLength } from '../../../shared/utils/validation/length';
import { FC, FormEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux/hooks';
import { login, reset } from '../authSlice';
import { LoginUser } from '../models/LoginUser.interface';

const SigninFormComponent: FC = () => {
  const {
    text: email,
    shouldDisplayError: emailHasError,
    textChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    clearHandler: emailClearHandler,
  } = useInput(validateEmail);

  const {
    text: password,
    shouldDisplayError: passwordHasError,
    textChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    clearHandler: passwordClearHandler,
  } = useInput(validatePasswordLength);

  const clearForm = () => {
    emailClearHandler();
    passwordClearHandler();
  };

  const dispatch = useAppDispatch();

  const { isLoading, isSuccess, isAuthenticated, user } = useAppSelector(
    (state) => state.auth,
  );

  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      clearForm();
    }
  }, [isSuccess, dispatch]);

  useEffect(() => {
    
    if (!isAuthenticated) return;
    navigate('/');
  }, [isAuthenticated]);

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (emailHasError || passwordHasError) return;

    if (email.length === 0 || password.length === 0) return;

    const loginUser: LoginUser = { email, password };

    dispatch(login(loginUser));
  };

  if (isLoading)
    return <CircularProgress sx={{ marginTop: '64px' }} color="primary" />;

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
