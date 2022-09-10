import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import productsReducer, { productsFetch } from "./Redux-Toolkit/Features/ProductsSlice";
import { productsApi } from './Redux-Toolkit/Features/productsApi';
import cartReducer, { getTotals } from './Redux-Toolkit/Features/cartSlice';
import AuthReducer, { loadUser } from './Redux-Toolkit/Features/AuthSlice';

const root  = ReactDOM.createRoot(document.getElementById('root'));
const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    auth: AuthReducer,
    [productsApi.reducerPath] : productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(productsApi.middleware),
});

store.dispatch(productsFetch());
store.dispatch(getTotals());
store.dispatch(loadUser(null));


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);