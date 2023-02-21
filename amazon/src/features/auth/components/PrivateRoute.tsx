import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux/hooks';
import { verifyJwt } from '../authSlice';

export const PrivateRoute = ({ page }: { page: JSX.Element }) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isSuccess, jwt } = useAppSelector(
    (state) => state.auth,
  );
  useEffect(() => {
    if(!jwt || !jwt?.token) return;
    dispatch(verifyJwt(jwt.token))
  }, [jwt, isSuccess]);
  return isAuthenticated ? page : <Navigate replace to="/signin"/>;
};
