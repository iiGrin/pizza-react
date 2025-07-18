import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPriceCart: 0,
  pizzasCart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addPizzaCart(state, action) {
      const { id, size, type } = action.payload;
      const findPizza = state.pizzasCart.find(
        (item) => item.id === id && item.size === size && item.type === type
      );
      if (findPizza) {
        findPizza.count++;
      } else {
        state.pizzasCart.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPriceCart = state.pizzasCart.reduce((sum, item) => item.price * item.count + sum, 0);
    },
    minusPizzaCart(state, action) {
      const { id, size, type } = action.payload;
      const findPizza = state.pizzasCart.find(
        (item) => item.id === id && item.size === size && item.type === type
      );
      if (findPizza) {
        findPizza.count--;
        if (findPizza.count === 0) {
          state.pizzasCart = state.pizzasCart.filter(
            (item) => !(item.id === id && item.size === size && item.type === type)
          );
        }
      }
      state.totalPriceCart = calculateTotalPrice(state.pizzasCart);
    },
    removePizzaCart(state, action) {
      const { id, size, type } = action.payload;
      state.pizzasCart = state.pizzasCart.filter(
        (item) => !(item.id === id && item.size === size && item.type === type)
      );
      state.totalPriceCart = calculateTotalPrice(state.pizzasCart);
    },
    clearPizzaCart(state) {
      state.pizzasCart = [];
      state.totalPriceCart = 0;
    },
  },
});

function calculateTotalPrice(pizzas) {
  return pizzas.reduce((sum, item) => sum + item.price * item.count, 0);
}

export const { addPizzaCart, minusPizzaCart, removePizzaCart, clearPizzaCart } = cartSlice.actions;
export default cartSlice.reducer;