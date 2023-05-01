import React, { useState } from "react";
import { Box, Card, CardContent, Typography, CardActions, Button, Snackbar, Alert } from "@mui/material";

import axios from "axios";

import { useLocation, useNavigate } from "react-router-dom";

const ProductCard = ({ item } : any) => {

  const location = useLocation();
  const navigate = useNavigate();

  const [error, setError] = useState(null)
  const [message, setMessage] = useState('')

  const addItemToCart = (item: any) => {
    const body = {
      id: item.id,
      quantity: 1
    };
    axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/users${location.pathname}/cart`,
        body
      )
      .then((response) => response.data)
      .then((_) => {
        setMessage(`${item.title} added successfully.`);
        redirectToCart();
      })
      .catch((e) => {
        setError(e.message);
        setMessage('Something went wrong while adding item to the cart.')
      })
  }

  const redirectToCart = () => navigate(`${location.pathname}/cart`)

  return <React.Fragment>
    <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined">
        <React.Fragment>
          <CardContent>
            <Typography variant="h5" component="div">
              {item.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              { item.description }
            </Typography>

            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              { item.price }
            </Typography>
          </CardContent>
          <CardActions >
            <Button variant="contained" size="small" onClick={() => addItemToCart(item)}>Add to Cart</Button>
          </CardActions>
        </React.Fragment>
        </Card>
      </Box>
      <Snackbar open={!!message} autoHideDuration={6000}>
      <Alert severity={!!error ? "error" : 'success'} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  </React.Fragment>
}

export default ProductCard;