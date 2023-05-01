import React, { useState, useEffect } from "react";
import { Typography, CircularProgress, Fade, List, ListItem, Divider, Snackbar, Alert } from "@mui/material";

import axios from "axios";

import { useLocation } from "react-router-dom";

import CartItem from '../common/CartItem';


const Cart = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null)
  const location = useLocation();
  const [message, setMessage] = useState('')
  const [reload, setReload] = useState(false);

  const loadCartItems = () => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/users${location.pathname}`)
      .then((response) => response.data)
      .then((itemsPage) => setItems(itemsPage.content))
      .catch((e) => setError(e.message))
  }

  const updateQuantity = (item: any, quantity: number) => {
    const body = {
      id: item.id,
      quantity
    }
  
    axios.put(
      `${process.env.REACT_APP_API_BASE_URL}/users${location.pathname}`,
      body
    )
    .then((response) => response.data)
    .then((_) => {
      setMessage(`${item.title} quantity updated successfully.`);
      setReload(!reload);
    })
    .catch((e) => {
      setError(e.message);
      setMessage('Something went wrong while updating the cart.')
    })
  }

  const deleteItem = (item: any) => {
    axios.delete(
      `${process.env.REACT_APP_API_BASE_URL}/users${location.pathname}/${item.id}`,
    )
    .then((response) => response.data)
    .then((_) => {
      setMessage(`${item.title} delete item successfully.`);
      setReload(!reload);
    })
    .catch((e) => {
      setError(e.message);
      setMessage('Something went wrong while deleting the item from the cart.')
    })
  }

  useEffect(() => {
    loadCartItems();
  }, [reload])

  useEffect(() => {
    setLoading(false);
  }, [items, error]);

  return (
    <React.Fragment>
      <Fade
          in={loading}
          style={{
            transitionDelay: loading ? '800ms' : '0ms',
          }}
          unmountOnExit
        >
        <CircularProgress color="inherit" />
      </Fade>
      {items.length === 0 && !loading && <Typography>You'r cart is empty.</Typography>}
      {items.length > 0 && <List dense={true} style={{background: '#fff', width: '50%'}}>
        {items.map((item: any, index: number, {length}) => {
            return <React.Fragment key={index}>
                <ListItem style={{ padding: '1rem'}}>
                  <CartItem
                    item={item}
                    updateQuantity={(quantity) => updateQuantity(item, quantity)} 
                    deleteItem={() => deleteItem(item)}/>
                </ListItem>
                { index !== length - 1 && <Divider /> }
              </React.Fragment>
          })}
      </List>}
      <Snackbar open={!!message} autoHideDuration={6000}>
      <Alert severity={!!error ? "error" : 'success'} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
    </React.Fragment>
  );

}
export default Cart;
