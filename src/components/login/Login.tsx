import React from 'react';

import {
  Box,
  Paper,
  TextField,
  Button,
  Snackbar,
  Alert
} from "@mui/material";
import { AccountCircle } from '@mui/icons-material';

import axios from 'axios';
import { useNavigate } from "react-router-dom";

interface Account {
  name: string;
  valid: boolean;
}

interface State {
  value: string;
  disabled: boolean;
  account: Account;
}


const Login = () => {

  const [state, setState] = React.useState<State>({
    value: '',
    disabled: true,
    account: null as unknown as Account,
  });

  const navigate = useNavigate();

  React.useEffect(() => {
    if (!!state && !!state.account && state.account.valid) {
      navigate(`${state.value}/products`);
    }
  });
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setState({
      value,
      disabled: !!value && value.length > 2 ? false : true,
      account: null as unknown as Account,
    })
  };

  const getUserByName = () => {
      axios.get(`http://localhost:8080/users/${state.value}`).then(() => {
        setState({
          ...state,
          account: {
            name: state.value,
            valid: true
          }
        })
      }).catch((e) => {
        setState({
          ...state,
          account: {
            name: state.value,
            valid: false
          }
        })
      })
  }
  
  
  return (
      <div>
      <Box
        height='100vh'
        display='flex'
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
        sx = {{ background: 'rgb(40, 44, 52)'}}
      >
        <Paper
          elevation={3}
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '1rem',
            backgroundColor: 'secondary.dark'
          }}
        >
        <AccountCircle sx={{ color: 'action.active', mr: 1 }} />
        <TextField id='user-name' label='User Name' variant='standard'
            value={state.value}
            onChange= {handleChange}/>
        <Button variant='contained' sx={{margin: '1rem 1rem'}} 
          disabled={state.disabled}
          onClick={getUserByName}
        >
          LogIn
        </Button>
        </Paper>
      </Box>
      <Snackbar open={!!state && !!state.account && !state.account.valid} autoHideDuration={6000}>
        <Alert severity="error" sx={{ width: '100%' }}>
          User doesn't exists!
        </Alert>
      </Snackbar>
      </div>
    
  )
}

export default Login;