import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = () => {
        if (username === 'admin' && password === 'admin') {
            dispatch(login());
            navigate('/todos');
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
