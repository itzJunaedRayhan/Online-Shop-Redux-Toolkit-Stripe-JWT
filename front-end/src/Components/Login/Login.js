import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../Redux-Toolkit/Features/AuthSlice';
import { StyledForm } from '../Register/StyledForm';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(user));
    }


    useEffect(() => {
        if (auth._id) {
            navigate("/cart");
        }
    }, [auth._id, navigate]);
    
    return (
        <>
           <StyledForm onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input type="text" placeholder='email' onChange={(e) => setUser({...user, email: e.target.value})} />
                <input type="text" placeholder='password' onChange={(e) => setUser({...user, password: e.target.value})} />

                <button>
                    {auth.loginStatus === "pending" ? "Submitting" : "Login"}
                </button>

                {auth.loginStatus === "rejected" ? (<p>{auth.loginError}</p>) : null}
            </StyledForm> 
        </>
    );
};

export default Login;