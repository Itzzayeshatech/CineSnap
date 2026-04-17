import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingCard from '../components/UI/FloatingCard';
import { CheckCircle2, User, Loader2 } from 'lucide-react';
import api from '../services/api';

const MOCK_SHOW = {
    _id: 'show_mock_123',
    price: 15,
    movie: {
        title: "Interstellar Resurgence"
    },
    seats: [
        { seatId: "A1", status: "available" }, { seatId: "A2", status: "booked" }, { seatId: "A3", status: "available" }, { seatId: "A4", status: "available" },
        { seatId: "A5", status: "available" }, { seatId: "B1", status: "available" }, { seatId: "B2", status: "locked" }, { seatId: "B3", status: "locked" },
        { seatId: "B4", status: "available" }, { seatId: "B5", status: "available" }, { seatId: "C1", status: "available" }, { seatId: "C2", status: "available" },
        { seatId: "C3", status: "available" }, { seatId: "C4", status: "available" }, { seatId: "C5", status: "available" }
    ]
};

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const passedMovie = location.state?.mockMovie;
    
    // Override the show's movie title if we navigated from a specific movie
    if (passedMovie && MOCK_SHOW.movie.title !== passedMovie.title) {
        MOCK_SHOW.movie.title = passedMovie.title;
    }

    const [show, setShow] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        // Mock loading the show layout
        const timer = setTimeout(() => {
            setShow(MOCK_SHOW);
            setLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    const toggleSeat = (seatId, status) => {
        if (status !== 'available') return;
        if (selectedSeats.includes(seatId)) {
            setSelectedSeats(selectedSeats.filter(s => s !== seatId));
        } else {
            if (selectedSeats.length < 6) { // Max 6 seats
                setSelectedSeats([...selectedSeats, seatId]);
            }
        }
    };

    const handleMockCheckout = async () => {
        if (selectedSeats.length === 0) return;
        setProcessing(true);

        // Simulate Razorpay/Backend Processing delay
        setTimeout(() => {
            setProcessing(false);
            setSuccess(true);
            
            // Navigate away after showing success
            setTimeout(() => {
                navigate('/profile');
            }, 2500);
            
        }, 2000);
    };

    if (loading) return (
        <div className="pt-32 flex justify-center items-center min-h-screen">
            <div className="w-16 h-16 border-t-4 border-pink-neon border-solid rounded-full animate-spin"></div>
        </div>
    );

    const totalAmount = selectedSeats.length * show.price;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="pt-32 pb-20 px-6 min-h-screen text-white w-full max-w-4xl mx-auto"
        >
            <h1 className="text-3xl font-orbitron font-bold text-center mb-10">
                Reserving: <span className="text-cyan-neon">{show.movie.title}</span>
            </h1>

            {!success ? (
                <div className="flex flex-col md:flex-row gap-12">
                    {/* Seat Map */}
                    <div className="flex-1">
                        <FloatingCard className="p-8 border border-white/10">
                            {/* Screen Graphic */}
                            <div className="w-full h-12 bg-gradient-to-t from-cyan-neon/40 to-transparent rounded-t-3xl border-b-[3px] border-cyan-neon mb-16 shadow-[0_10px_40px_rgba(6,182,212,0.3)] relative">
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-sm font-bold text-gray-400 tracking-[0.3em] uppercase">Stage</span>
                            </div>

                            {/* Seats Grid */}
                            <div className="grid grid-cols-5 gap-3 max-w-sm mx-auto">
                                {show.seats.map(seat => {
                                    let baseClass = "w-10 h-10 rounded-t-lg rounded-b-sm border-2 flex items-center justify-center text-xs font-bold transition-all cursor-pointer ";
                                    
                                    if (seat.status === 'booked') {
                                        baseClass += "bg-white/10 border-white/5 text-transparent cursor-not-allowed overflow-hidden relative";
                                        baseClass += " after:content-[''] after:absolute after:inset-0 after:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjM3I0MTUxIiBzdHJva2Utd2lkdGg9IjIiPjxsaW5lIHgxPSIxOCIgeTE9IjYiIHgyPSI2IiB5Mj0iMTgiPjwvbGluZT48bGluZSB4MT0iNiIgeTE9IjYiIHgyPSIxOCIgeTI9IjE4Ij48L2xpbmU+PC9zdmc+')] after:bg-center after:bg-no-repeat after:opacity-30";
                                    } else if (seat.status === 'locked') {
                                        baseClass += "bg-yellow-500/20 border-yellow-500/50 text-yellow-500 cursor-not-allowed";
                                    } else if (selectedSeats.includes(seat.seatId)) {
                                        baseClass += "bg-pink-neon border-pink-neon text-white shadow-[0_0_15px_rgba(255,42,133,0.6)] scale-110";
                                    } else {
                                        baseClass += "bg-transparent border-cyan-neon/30 text-gray-300 hover:border-cyan-neon hover:bg-cyan-neon/10";
                                    }

                                    return (
                                        <div 
                                            key={seat.seatId} 
                                            className={baseClass}
                                            onClick={() => toggleSeat(seat.seatId, seat.status)}
                                        >
                                            {seat.status !== 'booked' && seat.seatId}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Legend */}
                            <div className="flex justify-center gap-6 mt-12 text-sm text-gray-400">
                                <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-t border-2 border-cyan-neon/30"></div> Available</div>
                                <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-t bg-pink-neon border-2 border-pink-neon"></div> Selected</div>
                                <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-t bg-white/10 border-2 border-white/5 relative after:content-[''] after:absolute after:inset-0 after:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjM3I0MTUxIiBzdHJva2Utd2lkdGg9IjIiPjxsaW5lIHgxPSIxOCIgeTE9IjYiIHgyPSI2IiB5Mj0iMTgiPjwvbGluZT48bGluZSB4MT0iNiIgeTE9IjYiIHgyPSIxOCIgeTI9IjE4Ij48L2xpbmU+PC9zdmc+')] after:bg-center after:bg-no-repeat after:opacity-30"></div> Taken</div>
                            </div>
                        </FloatingCard>
                    </div>

                    {/* Summary Sidebar */}
                    <div className="w-full md:w-80 shrink-0">
                        <FloatingCard className="p-6 border border-white/10 sticky top-32">
                            <h3 className="text-xl font-orbitron font-bold border-b border-white/10 pb-4 mb-4">Transaction</h3>
                            
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-gray-300">
                                    <span>Selected Seats</span>
                                    <span className="font-bold text-white">{selectedSeats.length > 0 ? selectedSeats.join(', ') : '-'}</span>
                                </div>
                                <div className="flex justify-between text-gray-300">
                                    <span>Price per unit</span>
                                    <span>${show.price}</span>
                                </div>
                                <div className="w-full h-[1px] bg-white/10 my-2"></div>
                                <div className="flex justify-between text-lg">
                                    <span className="font-bold">Total</span>
                                    <span className="font-bold text-pink-neon">${totalAmount}</span>
                                </div>
                            </div>

                            <button 
                                onClick={handleMockCheckout}
                                disabled={selectedSeats.length === 0 || processing}
                                className={`w-full py-4 rounded-xl font-bold text-lg flex justify-center items-center gap-2 transition-all ${
                                    selectedSeats.length === 0 
                                    ? 'bg-white/5 text-gray-500 cursor-not-allowed' 
                                    : 'bg-cyan-neon text-black hover:bg-cyan-400 box-glow cursor-pointer'
                                }`}
                            >
                                {processing ? <><Loader2 className="animate-spin w-5 h-5"/> Uplinking...</> : 'Confirm Payment'}
                            </button>
                        </FloatingCard>
                    </div>
                </div>
            ) : (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                >
                    <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6 border border-green-500/50">
                        <CheckCircle2 className="w-12 h-12 text-green-400" />
                    </div>
                    <h2 className="text-4xl font-orbitron font-bold text-green-400 mb-4">Booking Secured!</h2>
                    <p className="text-xl text-gray-300">Your anti-gravity pass is locked in.</p>
                    <p className="text-sm text-gray-500 mt-2">Redirecting to flight logs...</p>
                </motion.div>
            )}
        </motion.div>
    );
};

export default Checkout;
