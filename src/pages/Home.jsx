import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import FloatingCard from '../components/UI/FloatingCard';
import { Play } from 'lucide-react';

const MOCK_MOVIES = [
    {
        _id: 'm1',
        title: "Interstellar Resurgence",
        overview: "A team of explorers return through the wormhole.",
        posterPath: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=600&auto=format&fit=crop",
        backdropPath: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1200",
        releaseDate: "2026-11-05",
        voteAverage: 9.4
    },
    {
        _id: 'm2',
        title: "Nebula Raiders",
        overview: "Space pirates hijack a quantum freighter.",
        posterPath: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=600&auto=format&fit=crop",
        releaseDate: "2026-12-15",
        voteAverage: 8.1
    },
    {
        _id: 'm3',
        title: "Event Horizon: Origins",
        overview: "The secret creation of the first gravity drive.",
        posterPath: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop",
        releaseDate: "2026-10-31",
        voteAverage: 7.5
    },
    {
        _id: 'm4',
        title: "Solar Flare",
        overview: "Earth faces a devastating ejection.",
        posterPath: "https://images.unsplash.com/photo-1446776811953-b23d5732194f?q=80&w=600&auto=format&fit=crop",
        releaseDate: "2026-09-01",
        voteAverage: 8.8
    },
    {
        _id: 'm5',
        title: "Quantum Leap",
        overview: "Racing across dimensions to save humanity.",
        posterPath: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=600&auto=format&fit=crop",
        releaseDate: "2026-08-12",
        voteAverage: 9.0
    }
];

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate network delay for skeleton loaders
    const timer = setTimeout(() => {
        setMovies(MOCK_MOVIES);
        setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const heroMovie = movies[0];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="pt-32 pb-20 px-6 min-h-screen text-white w-full max-w-7xl mx-auto"
    >
      {/* Hero Section */}
      {!loading && heroMovie && (
        <section className="flex flex-col md:flex-row items-center justify-between gap-12 mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="flex-1 space-y-6"
          >
            <h1 className="text-5xl md:text-7xl font-orbitron font-bold leading-tight">
              Experience <br/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-neon to-pink-neon animate-pulse">
                Anti-Gravity
              </span><br/>
              Cinema.
            </h1>
            <p className="text-gray-300 text-lg max-w-md">
              Book tickets for the most immersive sci-fi and blockbuster experiences in the galaxy.
            </p>
            <div className="flex gap-4 pt-4 flex-wrap">
              <Link to={`/movie/${heroMovie._id}`} className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-gradient-to-r from-cyan-neon to-indigo-600 font-bold hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all cursor-pointer">
                Book Now
              </Link>
              <button className="inline-flex items-center justify-center px-8 py-3 rounded-full glass border border-white/20 font-bold hover:bg-white/10 transition-all cursor-pointer gap-2">
                <Play className="w-5 h-5" fill="currentColor" /> Watch Trailer
              </button>
            </div>
          </motion.div>

          <div className="flex-1 relative w-full aspect-[3/4] max-w-md hidden md:block">
             <FloatingCard className="w-full h-full p-2 border-2 border-pink-neon/50 ml-auto">
               <img 
                 src={heroMovie.posterPath} 
                 alt={heroMovie.title}
                 className="w-full h-full object-cover rounded-xl"
               />
               <div className="absolute bottom-6 left-6 right-6 glass p-4 rounded-xl border border-white/10 flex justify-between items-center">
                 <div className="w-[70%]">
                   <h3 className="font-bold text-lg truncate">{heroMovie.title}</h3>
                   <p className="text-xs text-gray-300 mt-1">{new Date(heroMovie.releaseDate).toDateString()}</p>
                 </div>
                 <div className="flex flex-col items-center justify-center bg-black/50 rounded-lg p-2 shrink-0">
                   <span className="text-yellow-400 text-sm font-bold">★ {heroMovie.voteAverage?.toFixed(1)}</span>
                 </div>
               </div>
             </FloatingCard>
          </div>
        </section>
      )}

      {/* Now Showing */}
      <section>
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex justify-between items-end mb-10"
        >
          <div>
            <h2 className="text-3xl font-orbitron font-bold">Now Showing</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-neon to-transparent mt-2 rounded"></div>
          </div>
          <Link to="/movies" className="text-cyan-neon hover:text-white transition-colors cursor-pointer">
            View All →
          </Link>
        </motion.div>

        {loading ? (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
               {[...Array(8)].map((_, i) => (
                   <div key={i} className="h-96 rounded-xl bg-white/5 animate-pulse border border-white/10"></div>
               ))}
           </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {movies.slice(1).map((movie, index) => (
              <Link to={`/movie/${movie._id}`} key={movie._id} className="block group">
                <FloatingCard delay={index * 0.1} className="h-96 relative overflow-hidden p-0 border border-white/10 group-hover:border-cyan-neon/50">
                  <img 
                    src={movie.posterPath} 
                    alt={movie.title}
                    className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-space-950 via-space-900/60 to-transparent rounded-xl" />
                  
                  <div className="absolute bottom-0 w-full p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg leading-tight w-[70%] truncate">{movie.title}</h3>
                      <div className="glass px-2 py-1 rounded text-xs text-yellow-400 font-bold border border-yellow-400/20 backdrop-blur-md shrink-0">
                        ★ {movie.voteAverage?.toFixed(1)}
                      </div>
                    </div>
                    <button className="w-full py-2 mt-2 bg-white/10 hover:bg-cyan-neon hover:text-black rounded-lg text-sm font-bold transition-all border border-white/20 hover:border-transparent opacity-0 group-hover:opacity-100 backdrop-blur cursor-pointer hidden md:block">
                      Get Tickets
                    </button>
                  </div>
                </FloatingCard>
              </Link>
            ))}
          </div>
        )}
      </section>
    </motion.div>
  );
};

export default Home;
