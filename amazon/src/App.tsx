import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from './shared/utils/theme';
import HomePage from './pages/Home.page';
import RegisterPage from './pages/Register.page';
import SignInPage from './pages/Signin.page';
import CartPage from './pages/Cart.page';
import { PrivateRoute } from './features/auth/components/PrivateRoute';
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute page={<HomePage></HomePage>} />}></Route>
          <Route path='/cart' element={<PrivateRoute page={<CartPage />} />} />
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/signin" element={<SignInPage />}></Route>
          <Route path="*" element={<Navigate replace to="/"/>}></Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
