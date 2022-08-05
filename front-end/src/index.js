import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import productsReducer, { productsFetch } from "./Redux-Toolkit/Features/ProductsSlice";
import { productsApi } from './Redux-Toolkit/Features/productsApi';
import cartReducer, { getTotals } from './Redux-Toolkit/Features/cartSlice';

const root  = ReactDOM.createRoot(document.getElementById('root'));
const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    [productsApi.reducerPath] : productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(productsApi.middleware),
});

store.dispatch(productsFetch());
store.dispatch(getTotals());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);