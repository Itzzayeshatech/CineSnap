import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import FloatingCard from '../components/UI/FloatingCard';
import { BarChart3, Film, Calendar, Users, PlusCircle, Activity } from 'lucide-react';

const MOCK_STATS = {
    totalRevenue: 34500,
    totalBookings: 1205,
    totalMovies: 12,
    totalShows: 48
};

const MOCK_BOOKINGS = [
    { _id: 'b1', user: { name: "Alice Void", email: "alice@space.com" }, show: { movie: { title: "Interstellar Resurgence" } }, seats: ["A1", "A2"], totalAmount: 30, status: "confirmed" },
    { _id: 'b2', user: { name: "Bob Quazar", email: "bob@nova.net" }, show: { movie: { title: "Solar Flare" } }, seats: ["C5"], totalAmount: 18, status: "pending" },
    { _id: 'b3', user: { name: "Charlie Orbit", email: "char@link.co" }, show: { movie: { title: "Nebula Raiders" } }, seats: ["B1", "B2", "B3"], totalAmount: 45, status: "confirmed" }
];

const AdminDashboard = () => {
    // Force admin role for the UI prototype regardless of who logs in
    const { user } = useContext(AuthContext); 
    const isMockAdmin = user !== null;

    const [stats, setStats] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('stats');

    useEffect(() => {
        if (isMockAdmin) {
            setTimeout(() => {
                setStats(MOCK_STATS);
                setBookings(MOCK_BOOKINGS);
                setLoading(false);
            }, 800);
        }
    }, [isMockAdmin]);

    if (!user) {
        return (
            <div className="pt-40 text-center">
                <h1 className="text-3xl font-orbitron text-red-500">ACCESS DENIED</h1>
                <p className="text-gray-400 mt-4">Please log in to view the mock prototype dashboard.</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="pt-40 flex justify-center items-center gap-2">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-cyan-neon"></div>
                <span>Syncing Admin Portal...</span>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-20 px-6 w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full md:w-64 space-y-4">
                <div className="glass p-6 rounded-2xl border border-white/10 space-y-2">
                    <button 
                        onClick={() => setActiveTab('stats')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'stats' ? 'bg-cyan-neon text-black' : 'hover:bg-white/5'}`}
                    >
                        <BarChart3 className="w-5 h-5" /> Analytics
                    </button>
                    <button 
                        onClick={() => setActiveTab('bookings')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'bookings' ? 'bg-cyan-neon text-black' : 'hover:bg-white/5'}`}
                    >
                        <Activity className="w-5 h-5" /> Bookings
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all text-gray-500 cursor-not-allowed">
                        <PlusCircle className="w-5 h-5" /> Add Movie
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 space-y-8">
                {activeTab === 'stats' && stats && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard icon={<BarChart3 className="text-cyan-neon"/>} label="Revenue" value={`$${stats.totalRevenue}`} />
                        <StatCard icon={<Users className="text-pink-neon"/>} label="Tickets" value={stats.totalBookings} />
                        <StatCard icon={<Film className="text-purple-400"/>} label="Movies" value={stats.totalMovies} />
                        <StatCard icon={<Calendar className="text-blue-400"/>} label="Shows" value={stats.totalShows} />
                    </motion.div>
                )}

                {activeTab === 'bookings' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-3xl border border-white/10 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[600px]">
                                <thead className="bg-white/5 border-b border-white/10">
                                    <tr>
                                        <th className="px-6 py-4 text-sm font-orbitron">User</th>
                                        <th className="px-6 py-4 text-sm font-orbitron">Movie</th>
                                        <th className="px-6 py-4 text-sm font-orbitron">Seats</th>
                                        <th className="px-6 py-4 text-sm font-orbitron">Amount</th>
                                        <th className="px-6 py-4 text-sm font-orbitron">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.map(booking => (
                                        <tr key={booking._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-bold">{booking.user?.name}</div>
                                                <div className="text-xs text-gray-500">{booking.user?.email}</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm">{booking.show?.movie?.title}</td>
                                            <td className="px-6 py-4 text-sm">{booking.seats.join(', ')}</td>
                                            <td className="px-6 py-4 text-sm font-bold text-cyan-neon">${booking.totalAmount}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${booking.status === 'confirmed' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'}`}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

const StatCard = ({ icon, label, value }) => (
    <FloatingCard className="p-6 border border-white/10">
        <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-white/10">{icon}</div>
            <div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">{label}</div>
                <div className="text-2xl font-bold font-orbitron mt-1">{value}</div>
            </div>
        </div>
    </FloatingCard>
);

export default AdminDashboard;
