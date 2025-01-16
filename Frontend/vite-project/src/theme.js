// src/theme.js
import { createTheme } from '@mui/material/styles';
import {red} from '@mui/material/colors';
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Customize your primary color
    },
    secondary: {
      main: '#dc004e', // Customize your secondary color
    },
    background: {
      default: '#f4f6f8', // Background color for the entire app
    },
    error:{
        main: red.A400,
    }
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    button: {
      textTransform: 'uppercase', // Prevents buttons from being all-uppercase by default
    },
    error:{
      fontWeight: 500,
      color:'red'
    }
  },
});

export default theme;
