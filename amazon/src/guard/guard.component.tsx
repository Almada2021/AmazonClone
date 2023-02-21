import { Children, FC } from 'react';
import { Routes, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux/hooks';

type Props = {
  children: JSX.Element[];
};
const GuardComponent = ({ children }: Props) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  if (isAuthenticated) {
    navigate('/');
  }
  return <Routes>{...children}</Routes>;
};

export default GuardComponent;
