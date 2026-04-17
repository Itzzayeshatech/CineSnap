import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock theater layout map: 0 = gap, 1 = available, 2 = booked
const THEATER_LAYOUT = [
  [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
  [1, 1, 1, 0, 1, 2, 2, 1, 0, 1, 1, 1],
  [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
  [1, 2, 1, 0, 2, 2, 1, 1, 0, 1, 1, 1],
  [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Aisle
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 2, 2, 1, 1, 1, 1, 2, 2, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

const SEAT_PRICE = 15;

const SeatGrid = ({ onSelectionChange, seatsData }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (rowIndex, colIndex) => {
    const seatId = `${String.fromCharCode(65 + rowIndex)}${colIndex + 1}`;
    
    // Check if already selected
    const isSelected = selectedSeats.some(s => s.id === seatId);
    let newSelection = [];
    
    if (isSelected) {
      newSelection = selectedSeats.filter(s => s.id !== seatId);
    } else {
      newSelection = [...selectedSeats, { id: seatId, price: SEAT_PRICE }];
    }
    
    setSelectedSeats(newSelection);
    if (onSelectionChange) {
      onSelectionChange(newSelection);
    }
  };

  return (
    <div className="w-full flex justify-center items-center flex-col perspective-1000">
      
      {/* Screen Curve representation */}
      <div className="relative w-full max-w-2xl mb-12 flex flex-col items-center">
        <div className="w-[80%] h-4 bg-gradient-to-r from-transparent via-cyan-neon to-transparent opacity-80 blur-[2px] rounded-[100%] shadow-[0_0_30px_rgb(6,182,212)]" />
        <p className="text-xs text-cyan-neon font-orbitron mt-4 tracking-[0.5em] opacity-70">SCREEN</p>
      </div>

      <div className="flex flex-col gap-3 rotate-x-[15deg]">
        {THEATER_LAYOUT.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="flex justify-center gap-2 sm:gap-3">
            {row.map((status, colIndex) => {
              if (status === 0) {
                return <div key={`empty-${rowIndex}-${colIndex}`} className="w-6 h-6 sm:w-8 sm:h-8" />;
              }

              const seatId = `${String.fromCharCode(65 + rowIndex)}${colIndex + 1}`;
              
              // Find seat status from backend data or rely on initial mock status
              const backendSeat = seatsData?.find(s => s.seatId === seatId);
              const isBooked = backendSeat ? (backendSeat.status === 'booked' || backendSeat.status === 'locked') : (status === 2);
              const isSelected = selectedSeats.some(s => s.id === seatId);


              return (
                <motion.button
                  key={seatId}
                  disabled={isBooked}
                  onClick={() => toggleSeat(rowIndex, colIndex)}
                  whileHover={!isBooked ? { scale: 1.2, z: 20 } : {}}
                  whileTap={!isBooked ? { scale: 0.9 } : {}}
                  animate={{
                    y: isSelected ? -5 : 0,
                    boxShadow: isSelected 
                      ? "0 10px 20px rgba(6,182,212,0.6)" 
                      : (isBooked ? "none" : "0 5px 10px rgba(255,255,255,0.1)"),
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className={`
                    w-6 h-6 sm:w-8 sm:h-8 rounded-t-lg rounded-b-sm border cursor-pointer relative
                    transition-colors duration-300 transform-style-3d
                    ${isBooked 
                      ? 'bg-gray-800 border-gray-700 cursor-not-allowed opacity-50' 
                      : isSelected 
                        ? 'bg-cyan-neon border-white text-black font-bold' 
                        : 'bg-white/10 border-white/20 hover:border-cyan-neon/70'}
                  `}
                >
                  <span className="sr-only">{seatId}</span>
                  {/* Subtle float indicator inside seat */}
                  {!isBooked && !isSelected && (
                    <div className="absolute inset-x-1 bottom-1 h-[2px] bg-white/20 rounded" />
                  )}
                </motion.button>
              );
            })}
          </div>
        ))}
      </div>
      
      {/* Legend */}
      <div className="flex justify-center gap-8 mt-12 bg-black/40 px-6 py-3 rounded-full border border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-t bg-white/10 border border-white/20" />
          <span className="text-xs text-gray-300">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-t bg-cyan-neon border border-white shadow-[0_0_10px_rgb(6,182,212)]" />
          <span className="text-xs text-gray-300">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-t bg-gray-800 border border-gray-700 opacity-50" />
          <span className="text-xs text-gray-300">Booked</span>
        </div>
      </div>
    </div>
  );
};

export default SeatGrid;
