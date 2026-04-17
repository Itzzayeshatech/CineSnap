import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../../context/AuthContext';
import FloatingCard from '../UI/FloatingCard';

const Login = ({ onClose }) => {
    const { login, register } = useContext(AuthContext);
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            if (isLogin) {
                await login(email, password);
            } else {
                await register(name, email, password);
            }
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || 'Authentication failed');
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
            >
                <FloatingCard className="w-full max-w-md p-8 border border-white/20 bg-space-950/80">
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">✕</button>
                    <h2 className="text-3xl font-orbitron font-bold text-center mb-6">
                        {isLogin ? 'Access Portal' : 'Join Fleet'}
                    </h2>

                    {error && <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded mb-4 text-sm">{error}</div>}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Name</label>
                                <input 
                                    type="text" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    required 
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-neon"
                                />
                            </div>
                        )}
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Coordinates (Email)</label>
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-neon"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Passkey (Password)</label>
                            <input 
                                type="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-neon"
                            />
                        </div>
                        <button type="submit" className="w-full py-3 mt-4 bg-gradient-to-r from-cyan-neon to-pink-neon rounded-lg font-bold text-black hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all">
                            {isLogin ? 'Initiate Link' : 'Register Signature'}
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-400 mt-6 cursor-pointer hover:text-white" onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? "Need a clearance code? Sign up." : "Already in the database? Login."}
                    </p>
                </FloatingCard>
            </motion.div>
        </div>
    );
};

export default Login;
