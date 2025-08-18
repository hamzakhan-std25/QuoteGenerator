import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

 export default function QuotesDialog ({ onClose }){
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const storedQuotes = JSON.parse(localStorage.getItem('favoriteQuotes')) || [];
    console.log(storedQuotes)
    setQuotes(storedQuotes);
  }, []);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-gray-300 bg-opacity-50 flex items-center justify-center z-50"
        onClick={handleBackdropClick}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-white rounded-lg w-[80vw] h-[80vh] p-6 flex flex-col"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Favorite Quotes</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition"
            >
              <FiX size={24} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {quotes.length > 0 ? (
              <ul className="space-y-4">
                {quotes.map((quote, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 bg-gray-50 rounded"
                  >
                    <blockquote className="italic">"{quote.body}"</blockquote>
                    {quote.author && (
                      <p className="mt-2 text-right font-medium">— {quote.author}</p>
                    )}
                  </motion.li>
                ))}
              </ul>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="h-full flex items-center justify-center text-gray-500"
              >
                <p>No favorite quotes saved yet</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};