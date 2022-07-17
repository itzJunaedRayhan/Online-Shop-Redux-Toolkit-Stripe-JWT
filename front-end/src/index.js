import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import productsReducer, { productsFetch } from "./Redux-Toolkit/Features/ProductsSlice";
import { productsApi } from './Redux-Toolkit/Features/productsApi';

const root  = ReactDOM.createRoot(document.getElementById('root'));
const store = configureStore({
  reducer: {
    products: productsReducer,
    [productsApi.reducerPath] : productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(productsApi.middleware),
});

store.dispatch(productsFetch());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);