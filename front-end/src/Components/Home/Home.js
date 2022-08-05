import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Redux-Toolkit/Features/cartSlice';
import { useGetAllProductsQuery } from '../../Redux-Toolkit/Features/productsApi';
import {useNavigate} from 'react-router-dom';

const Home = () => {
    const {data, error, isLoading} = useGetAllProductsQuery();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        navigate('/cart')   
    }
    return (
        <div className='home-container'>
            {
            isLoading ? (
                <p>isLoading...</p>
            ) : error ? (
                <p>An Error Occured..!</p>
            ) : (
                <>
                <h2>New Arrivals</h2>
                <div className='products'>
                    {data?.map((product) => (
                        <div key={product.id} className="product">
                            <h3>{product.name}</h3>
                            <img src={product.image} alt={product.name} />
                            <div className='details'>
                                <span>{product.desc}</span>
                                <span className='price'>${product.price}</span>
                            </div>
                            <button onClick={() => handleAddToCart(product)}>Add To Cart</button>
                        </div>
                    ))}
                </div>
                </>
            )
        }
        </div>
    );
};

export default Home;