import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from './pages/LogInPage';
import RegisterPage from './pages/RegisterPage';
import TodoPage from './pages/TodoPage';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from './store/userSlice/user.selectors';
import { ThemeProvider } from '@mui/material/styles';
import AuthGuard from './guard/AuthGuard';
import theme from './theme';
function App() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return (
    <>
    <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/register" 
              element={isAuthenticated? <Navigate to="/todos" replace /> : <RegisterPage />}
            />
            <Route
              path="/login"
              element={isAuthenticated ? <Navigate to="/todos" replace /> : <LoginPage />}
            />
            <Route
              path="/todos"
              element={
                <AuthGuard>
                  <TodoPage />
                </AuthGuard>
              }             
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </BrowserRouter>
    </ThemeProvider>
    </>
  )
}

export default App
