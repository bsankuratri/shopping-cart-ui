import React, { useState } from "react";

import {ListItemText, IconButton, Select, MenuItem, FormControl, InputLabel  } from "@mui/material";

import DeleteIcon  from "@mui/icons-material/Delete";
import axios from "axios";

interface CartItemInput {
  item: any;
  updateQuantity: (quantity: number) => void
  deleteItem: () => void
}

const CartItem = ({item, updateQuantity, deleteItem} : CartItemInput) => {

  return (
    <React.Fragment>
      <ListItemText
        primary={item.title}
        secondary={item.description}
      />
      <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
        <InputLabel id="demo-select-small-label">Quantity</InputLabel>
        <Select
          value={item.quantity}
          label="Quantity"
          onChange={({target}) => updateQuantity(target.value)}
          sx={{
            width: 100,
            height: 50,
          }}
        >
          { Array.from(Array(10).keys()).map(i => (<MenuItem key={i} value={i+1}>{i+1}</MenuItem >))}
        </Select>
      </FormControl>
      <IconButton edge="end" aria-label="delete" onClick={() => deleteItem()}>
        <DeleteIcon />
      </IconButton>
    </React.Fragment>
  )

}


export default CartItem;