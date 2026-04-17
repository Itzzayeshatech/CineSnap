import React, { useContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import FloatingCard from '../components/UI/FloatingCard';
import { Ticket, Film, Calendar, LogOut, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// Using api if backend was connected, but we will mock it for UI-only demonstration
import api from '../services/api'; 

const Profile = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate('/');
            return;
        }

        // Mocking a fetch for user's past bookings to showcase the UI design
        const fetchBookings = () => {
             setTimeout(() => {
                 setBookings([
                     {
                         id: 'BKG-99281',
                         movie: 'Interstellar Resurgence',
                         date: '2026-05-12T20:00:00Z',
                         seats: ['A4', 'A5'],
                         amount: 30,
                         status: 'confirmed',
                         poster: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=200&auto=format&fit=crop'
                     },
                     {
                         id: 'BKG-88124',
                         movie: 'Dune: Part Three',
                         date: '2026-04-01T18:30:00Z',
                         seats: ['F12'],
                         amount: 15,
                         status: 'past',
                         poster: 'https://images.unsplash.com/photo-1446776811953-b23d5732194f?q=80&w=200&auto=format&fit=crop'
                     }
                 ]);
                 setLoading(false);
             }, 1500);
        };

        fetchBookings();
    }, [user, navigate]);

    if (!user) return null;

    return (
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="pt-32 pb-20 px-6 min-h-screen text-white w-full max-w-5xl mx-auto"
        >
            <div className="flex flex-col md:flex-row gap-8">
                {/* Left Sidebar - Profile Summary */}
                <div className="w-full md:w-1/3 space-y-6">
                    <FloatingCard className="p-8 border border-white/10 flex flex-col items-center text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-neon/10 rounded-full blur-3xl"></div>
                        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-neon to-pink-neon mb-4 p-1">
                            <div className="w-full h-full bg-space-950 rounded-full flex items-center justify-center text-3xl font-orbitron font-bold">
                                {user.name.charAt(0)}
                            </div>
                        </div>
                        <h2 className="text-2xl font-orbitron font-bold mb-1">{user.name}</h2>
                        <p className="text-gray-400 text-sm mb-6">{user.email}</p>
                        
                        <div className="w-full h-[1px] bg-white/10 mb-6"></div>

                        <div className="w-full flex justify-between items-center text-sm mb-2">
                            <span className="text-gray-400 flex items-center gap-2"><Ticket className="w-4 h-4"/> Tickets</span>
                            <span className="font-bold text-cyan-neon">12</span>
                        </div>
                        <div className="w-full flex justify-between items-center text-sm mb-6">
                            <span className="text-gray-400 flex items-center gap-2"><Film className="w-4 h-4"/> Watched</span>
                            <span className="font-bold text-pink-neon">5</span>
                        </div>

                        <button 
                            onClick={logout}
                            className="w-full py-3 mt-4 text-red-400 hover:text-white hover:bg-red-500/20 rounded-lg flex items-center justify-center gap-2 transition-colors border border-transparent hover:border-red-500/30 cursor-pointer"
                        >
                            <LogOut className="w-4 h-4" /> Disconnect Sequence
                        </button>
                    </FloatingCard>
                </div>

                {/* Right Area - Booking History */}
                <div className="w-full md:w-2/3">
                    <h2 className="text-3xl font-orbitron font-bold mb-6 flex items-center gap-3">
                        <Ticket className="text-cyan-neon w-8 h-8"/> Flight Logs
                    </h2>

                    {loading ? (
                        <div className="glass p-10 rounded-2xl border border-white/10 flex flex-col items-center justify-center text-gray-400">
                            <Loader2 className="w-10 h-10 animate-spin text-cyan-neon mb-4" />
                            <p>Retrieving transaction archives...</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {bookings.map((booking, idx) => (
                                <motion.div 
                                    key={booking.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="glass p-5 rounded-2xl border border-white/10 flex flex-col sm:flex-row gap-5 hover:border-cyan-neon/30 transition-colors"
                                >
                                    <div className="w-full sm:w-24 shrink-0 aspect-[2/3] sm:aspect-square overflow-hidden rounded-lg">
                                        <img src={booking.poster} alt={booking.movie} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-bold text-xl font-orbitron text-white">{booking.movie}</h3>
                                                <span className={`text-xs font-bold uppercase px-3 py-1 rounded-full ${booking.status === 'confirmed' ? 'bg-cyan-neon/20 text-cyan-neon border border-cyan-neon/30' : 'bg-white/10 text-gray-400 border border-white/20'}`}>
                                                    {booking.status}
                                                </span>
                                            </div>
                                            <div className="text-sm text-gray-400 space-y-1">
                                                <p className="flex items-center gap-2"><Calendar className="w-4 h-4"/> {new Date(booking.date).toLocaleString()}</p>
                                                <p>ID: {booking.id} • Seats: {booking.seats.join(', ')}</p>
                                            </div>
                                        </div>
                                        <div className="mt-4 flex justify-between items-center border-t border-white/10 pt-3">
                                            <span className="font-bold text-pink-neon">${booking.amount}</span>
                                            {booking.status === 'confirmed' && (
                                                <button className="text-sm glass px-4 py-1.5 rounded hover:bg-white/10 transition-colors border border-white/20 cursor-pointer">
                                                    Download Pass
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default Profile;
