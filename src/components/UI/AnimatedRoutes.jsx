import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from '../../pages/Home';
import MovieDetails from '../../pages/MovieDetails';
import Checkout from '../../pages/Checkout';
import AdminDashboard from '../../pages/AdminDashboard';
import Profile from '../../pages/Profile';

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/movie/:id" element={<MovieDetails />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/movies" element={<Home />} />
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;
