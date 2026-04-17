import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Film, User, Search, LogOut } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import Login from '../Auth/Login';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [showLogin, setShowLogin] = useState(false);
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 w-full z-50 p-4"
    >
      <div className="glass rounded-full px-6 py-3 max-w-7xl mx-auto flex justify-between items-center neon-border">
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
          >
            <Film className="w-8 h-8 text-cyan-neon" />
          </motion.div>
          <span className="font-orbitron font-bold text-xl tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-cyan-neon to-pink-neon">
            CineSnap
          </span>
        </Link>
        
        <div className="hidden md:flex gap-8 items-center font-semibold text-sm">
          <Link to="/" className="hover:text-cyan-neon transition-colors">Home</Link>
          <Link to="/movies" className="text-gray-300 hover:text-cyan-neon transition-colors">Movies</Link>
          <button className="text-gray-300 hover:text-cyan-neon transition-colors cursor-pointer">Theaters</button>
          {user && user.role === 'admin' && (
            <Link to="/admin" className="text-pink-neon hover:text-white font-bold transition-colors">Admin Panel</Link>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer text-gray-300 hover:text-white">
            <Search className="w-5 h-5" />
          </button>
          
          {user ? (
            <div className="flex items-center gap-3">
              <Link to="/profile" className="text-sm font-bold text-cyan-neon hidden sm:block hover:text-white transition-colors cursor-pointer">
                {user.name}
              </Link>
              <button onClick={logout} className="p-2 hover:bg-red-500/20 rounded-full transition-colors cursor-pointer text-gray-300 hover:text-red-400">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button onClick={() => setShowLogin(true)} className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer text-gray-300 hover:text-white">
              <User className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showLogin && <Login onClose={() => setShowLogin(false)} />}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
