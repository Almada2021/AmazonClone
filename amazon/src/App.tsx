import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { theme } from "./shared/utils/theme";
import HomePage from "./pages/Home.page";
import RegisterPage from "./pages/Register.page";
import SignInPage from "./pages/Signin.page";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>

          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/register" element={<RegisterPage/>}></Route>
          <Route path="/signin" element={<SignInPage/>}></Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
