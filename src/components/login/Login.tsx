import React from "react";

import { Paper, TextField, Typography, Button, Snackbar, Alert } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

import axios from "axios";
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
  const [userName, setUserName] = React.useState("");
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const canSubmit = () => userName.length > 2;

  const getUserByName = () => {
    const {REACT_APP_API_BASE_URL} = process.env;
    axios
      .get(`${REACT_APP_API_BASE_URL}/users/${userName}`)
      .then((user) => {
        navigate(`${userName}`);
      })
      .catch((e) => {
        setError(e.message);
      });
  };

  return (
    <div>
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "1rem",
          backgroundColor: "secondary.dark",
        }}
      >
        <AccountCircle sx={{ color: "action.active", mr: 1 }} />
        <TextField
          id="user-name"
          label="User Name"
          variant="standard"
          value={userName}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          sx={{ margin: "1rem 1rem" }}
          disabled={!canSubmit}
          onClick={getUserByName}
        >
          <Typography>LogIn</Typography>
        </Button>
      </Paper>
      <Snackbar open={!!error} autoHideDuration={6000}>
        <Alert severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
