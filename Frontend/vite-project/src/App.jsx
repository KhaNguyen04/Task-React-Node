import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from './pages/LogInPage';
import RegisterPage from './pages/RegisterPage';
import TodoPage from './pages/TodoPage';
import { useSelector } from 'react-redux';
import { selectToken } from './store/userSlice/user.selectors';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
function App() {
  const token = useSelector(selectToken);
  return (
    <>
    <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/register" 
              element={token ? <Navigate to="/todos" replace /> : <RegisterPage />}
            />
            <Route
              path="/login"
              element={token ? <Navigate to="/todos" replace /> : <LoginPage />}
            />
            <Route
              path="/todos"
              element={token ? <TodoPage /> : <Navigate to="/login" replace />}
            />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </BrowserRouter>
    </ThemeProvider>
    </>
  )
}

export default App
