import { Link } from 'react-router-dom';
import { logout, selectedUser } from '../features/auth/authSlice';
import { useAppDispatch } from '../hooks/redux/hooks';
import { useAppSelector } from '../hooks/redux/hooks';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectedUser);
  const auth = useAppSelector((state) => state.auth);
  const logoutHandler = async () => {
    dispatch(logout());
  };
  console.log(1,user)
  console.log(2,auth)
  return (
    <div>
      <h1>Home Page</h1>
      <a
        onClick={logoutHandler}
        style={{ backgroundColor: 'yellow', cursor: 'pointer' }}
      >logout</a>
      <Link to="/signin">Sign-In</Link>
      { user?.email }
    </div>
  );
};

export default HomePage;
