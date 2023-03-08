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
import { FC, FormEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useInput from '../../../hooks/input/use-input';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux/hooks';
import { validateEmail } from '../../../shared/utils/validation/email';
import {
  validateNameLength,
  validatePasswordLength,
} from '../../../shared/utils/validation/length';
import { register, reset } from '../authSlice';
import { NewUser } from '../models/NewUser';
const RegistrationFormComponents: FC = () => {
  const {
    text: name,
    shouldDisplayError: nameHasError,
    textChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    clearHandler: nameClearHandler,
  } = useInput(validateNameLength);
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
  const {
    text: confirmPassword,
    shouldDisplayError: confirmPasswordHasError,
    textChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    clearHandler: confirmPasswordClearHandler,
  } = useInput(validatePasswordLength);
  const dispatch = useAppDispatch();
  const { isSuccess, isLoading } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const clearForm = () => {
    nameClearHandler();
    emailClearHandler();
    passwordClearHandler();
    confirmPasswordClearHandler();
  };
  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = [
      nameHasError,
      emailHasError,
      passwordHasError,
      confirmPasswordHasError,
    ].every(Boolean);
    const lengthConditions = [
      name.length === 0,
      email.length === 0,
      password.length === 0,
      confirmPassword.length === 0,
    ].every(Boolean);
    if (password !== confirmPassword) return;
    if (errors) return;
    if (lengthConditions) return;
    const newUser: NewUser = {
      name,
      email,
      password,
    };
    dispatch(register(newUser));
  };
  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      clearForm();
      navigate('/signin');
    }
  }, [isSuccess]);
  if (isLoading)
    return <CircularProgress sx={{ marginTop: '64px' }} color="primary" />;

  return (
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
            Create Account
          </Typography>
          <InputLabel
            sx={{ fontWeight: 500, marginTop: 1, color: '#000000' }}
            htmlFor="name"
          >
            Your name
          </InputLabel>
          <TextField
            type="text"
            value={name}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            error={nameHasError}
            helperText={nameHasError ? 'Enter your name' : ''}
            name="name"
            id="name"
            variant="outlined"
            size="small"
          />
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
            error={nameHasError}
            helperText={emailHasError ? 'Enter your email' : ''}
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
            type="password"
            value={password}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            error={passwordHasError}
            helperText={passwordHasError ? 'Minimun 6 characters required' : ''}
            name="password"
            id="password"
            variant="outlined"
            size="small"
            placeholder="Minimun 6 characters required"
          />
          <InputLabel
            sx={{ fontWeight: 500, marginTop: 1, color: '#000000' }}
            htmlFor="confirmPassword"
          >
            Re-enter password
          </InputLabel>
          <TextField
            value={confirmPassword}
            onChange={confirmPasswordChangeHandler}
            onBlur={confirmPasswordBlurHandler}
            error={confirmPassword.length > 0 && password !== confirmPassword}
            helperText={
              confirmPassword !== password && confirmPassword.length > 0
                ? 'Enter your password'
                : ''
            }
            type="password"
            name="password"
            id="password"
            variant="outlined"
            size="small"
            placeholder="Minimun 6 characters required"
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
            Register
          </Button>
        </Grid>
      </form>
      <Divider sx={{ marginTop: '36px', marginBotton: '36px' }}>
        <small>
          Already have an account?{' '}
          <Link
            to="/signin"
            style={{ textDecoration: 'none', color: '#0000ee' }}
          >
            Sign-in
          </Link>
        </small>
      </Divider>
      <div style={{ marginTop: '30px' }}>
        <small>
          <span>By creating an account, you agree to Amazon&apos;s</span>
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
  );
};

export default RegistrationFormComponents;
