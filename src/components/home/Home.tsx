import React, { useState, useEffect } from "react";
import { CircularProgress, Fade, Grid, Link, IconButton } from "@mui/material";

import axios from "axios";

import ProductCard from '../common/ProductCard';

import { useLocation, useNavigate } from "react-router-dom";

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [error, setError] = useState(null)
  const location = useLocation();
  const navigate = useNavigate();

  const loadProducts = () => {
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/products`, filters)
      .then((response) => response.data)
      .then((productsPage) => setProducts(productsPage.content))
      .catch((e) => setError(e.message))
  }

  useEffect(() => {
    loadProducts();
  }, [filters])

  useEffect(() => {
    setLoading(false);
  }, [products, error]);

  const redirectToCart = () => navigate(`${location.pathname}/cart`)

  return (
    <React.Fragment>
      <IconButton style={{
        "margin": "2rem",
        "background": "#fff",
        "right": 0,
        "display": "flex",
        "alignSelf": "flex-end"
      }} aria-label="cart" onClick={redirectToCart}>
        <ShoppingCartIcon />
      </IconButton>
      <Fade
          in={loading}
          style={{
            transitionDelay: loading ? '800ms' : '0ms',
          }}
          unmountOnExit
        >
        <CircularProgress color="inherit" />
      </Fade>
      <Grid container spacing={2} margin={12}>   
        {products.map((product: any) => {
          return <Grid item key={product.id}>
            <ProductCard key={product.id} item={product}/>
            </Grid>
        })}
      </Grid>
    </React.Fragment>
  );
};

export default Home;
