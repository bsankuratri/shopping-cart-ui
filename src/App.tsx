import React from 'react';

import {
  Box,
  CssBaseline,
  Paper,
  ThemeProvider,
  Typography,
  TextField,
  Button
} from "@mui/material";
import { AccountCircle } from '@mui/icons-material';
import { createTheme } from "@mui/material/styles";

import {
  useRoutes
} from 'react-router-dom'

import Login  from './components/login/Login';
import Products  from './components/products/Products';

const App = () => (
  useRoutes([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: ':user/products',
      element: <Products />
    }
  ])
)

export default App;
