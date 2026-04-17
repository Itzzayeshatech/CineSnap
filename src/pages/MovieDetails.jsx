import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, Star, Users } from 'lucide-react';

const MOCK_MOVIE_DB = {
    'm1': {
        _id: 'm1',
        title: "Interstellar Resurgence",
        overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival. When they return, they find the galaxy changed forever.",
        posterPath: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=600&auto=format&fit=crop",
        backdropPath: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1200",
        releaseDate: "2026-11-05",
        voteAverage: 9.4,
        runtime: 169,
        genres: ["Sci-Fi", "Adventure", "Drama"],
        director: "Christopher Nolan",
        cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"]
    },
    'm2': {
        _id: 'm2',
        title: "Nebula Raiders",
        overview: "Space pirates hijack a quantum freighter carrying the most valuable substance in the known universe.",
        posterPath: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=600&auto=format&fit=crop",
        backdropPath: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1200",
        releaseDate: "2026-12-15",
        voteAverage: 8.1,
        runtime: 122,
        genres: ["Action", "Sci-Fi", "Thriller"]
    }
};

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            const data = MOCK_MOVIE_DB[id] || MOCK_MOVIE_DB['m1']; // fallback if missing
            setMovie(data);
            setLoading(false);
        }, 600);
        return () => clearTimeout(timer);
    }, [id]);

    if (loading) return (
        <div className="pt-32 flex justify-center items-center min-h-screen">
            <div className="w-16 h-16 border-t-4 border-cyan-neon border-solid rounded-full animate-spin"></div>
        </div>
    );

    if (!movie) return <div className="pt-32 text-center text-white min-h-screen">Movie not found</div>;

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen w-full text-white relative pb-20"
        >
            {/* Massive Backdrop Hero */}
            <div className="relative w-full h-[60vh] md:h-[70vh]">
                <img 
                    src={movie.backdropPath || movie.posterPath} 
                    alt={movie.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-space-950 via-space-950/80 to-transparent"></div>
            </div>

            {/* Content Container positioned over backdrop */}
            <div className="max-w-7xl mx-auto px-6 relative -mt-32 md:-mt-48 z-10">
                <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                    
                    {/* Left: Poster */}
                    <motion.div 
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="w-full md:w-1/3 max-w-sm mx-auto md:mx-0 shrink-0"
                    >
                        <div className="rounded-2xl overflow-hidden glass border border-white/10 shadow-2xl shadow-cyan-neon/20">
                            <img src={movie.posterPath} alt={movie.title} className="w-full object-cover" />
                        </div>
                    </motion.div>

                    {/* Right: Info */}
                    <motion.div 
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex-1 pt-4 md:pt-12"
                    >
                        <h1 className="text-4xl md:text-6xl font-orbitron font-bold mb-4">{movie.title}</h1>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-gray-300 mb-6">
                            <span className="flex items-center gap-1 bg-black/50 px-3 py-1 rounded-full"><Star className="w-4 h-4 text-yellow-400"/> {movie.voteAverage?.toFixed(1)}</span>
                            <span className="flex items-center gap-1 bg-black/50 px-3 py-1 rounded-full"><Clock className="w-4 h-4 text-cyan-neon"/> {movie.runtime || 120} min</span>
                            <span className="flex items-center gap-1 bg-black/50 px-3 py-1 rounded-full"><Calendar className="w-4 h-4 text-pink-neon"/> {new Date(movie.releaseDate).getFullYear()}</span>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-8">
                            {movie.genres?.map(g => (
                                <span key={g} className="px-4 py-1 rounded border border-white/20 text-xs font-bold uppercase tracking-wider">{g}</span>
                            ))}
                        </div>

                        <h3 className="text-xl font-bold font-orbitron text-cyan-neon mb-2">Synopsis</h3>
                        <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-3xl">
                            {movie.overview}
                        </p>

                        <div className="mb-10">
                            {movie.director && <p className="mb-2"><span className="text-gray-500 font-bold">Director:</span> {movie.director}</p>}
                            {movie.cast && <p><span className="text-gray-500 font-bold">Cast:</span> {movie.cast.join(', ')}</p>}
                        </div>

                        <Link 
                            to="/checkout" 
                            state={{ showId: 'show_mock_123', mockMovie: movie }}
                            className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-gradient-to-r from-pink-neon to-purple-600 rounded-full font-bold text-lg hover:shadow-[0_0_30px_rgba(255,42,133,0.5)] transition-all cursor-pointer"
                        >
                            <Users className="w-5 h-5"/> Select Seats
                        </Link>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default MovieDetails;
