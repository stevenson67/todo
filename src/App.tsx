import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store';

import Login from './components/Login';
import TodoList from './components/TodoList';

function App() {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

    return (
        <Router>
            <Routes>
                <Route path="/" element={isLoggedIn ? <Navigate to="/todos" /> : <Navigate to="/login" />} />
                <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to="/todos" />} />
                <Route path="/todos" element={isLoggedIn ? <TodoList /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;
