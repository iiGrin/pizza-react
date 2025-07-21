import { ICartPizza } from '@/types/apiTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calculateTotalCount, calculateTotalPrice } from '../../utils/cartUtils';

interface CartSliceState {
  totalPriceCart: number;
  pizzasCart: ICartPizza[];
  totalCountCart: number;
}

const initialState: CartSliceState = {
  totalPriceCart: 0,
  pizzasCart: [],
  totalCountCart: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addPizzaCart(state, action: PayloadAction<Omit<ICartPizza, 'count'>>) {
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
        } as ICartPizza);
      }
      state.totalPriceCart = calculateTotalPrice(state.pizzasCart);
      state.totalCountCart = calculateTotalCount(state.pizzasCart);
    },
    minusPizzaCart(state, action: PayloadAction<{ id: string; size: number; type: string }>) {
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
      state.totalCountCart = calculateTotalCount(state.pizzasCart);
    },
    removePizzaCart(state, action: PayloadAction<{ id: string; size: number; type: string }>) {
      const { id, size, type } = action.payload;
      state.pizzasCart = state.pizzasCart.filter(
        (item) => !(item.id === id && item.size === size && item.type === type)
      );
      state.totalPriceCart = calculateTotalPrice(state.pizzasCart);
      state.totalCountCart = calculateTotalCount(state.pizzasCart);
    },
    clearPizzaCart(state) {
      state.pizzasCart = [];
      state.totalPriceCart = 0;
      state.totalCountCart = 0;
    },
  },
});

export const { addPizzaCart, minusPizzaCart, removePizzaCart, clearPizzaCart } = cartSlice.actions;
export default cartSlice.reducer;
