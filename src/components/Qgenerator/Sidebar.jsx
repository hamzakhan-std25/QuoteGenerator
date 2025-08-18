import { useState, useEffect } from 'react';
import { FiX, FiHeart, FiMenu, FiUser, FiHome, FiStar, FiSettings } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuotes } from './QuoteContext'





export default function Sidebar({ randomAccount, favoritesCount }) {

     const { setShowDialog,setIsSidebarOpen } = useQuotes()


  return (
    <motion.div
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl z-40"
    >
      {/* Close Button */}
      <button
        onClick={()=>setIsSidebarOpen(false)}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        <FiX size={24} />
      </button>

      {/* Random Account Section */}
      <div className="p-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{randomAccount?.avatar}</div>
          <div>
            <p className="font-medium">{randomAccount?.name}</p>
            <p className="text-sm text-gray-500">Random Account</p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <button className="flex items-center space-x-3 w-full p-2 rounded hover:bg-gray-100">
              <FiHome className="text-gray-500" />
              <span>Home</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => {

                setIsSidebarOpen(false);
                setShowDialog(true);
              }}
              className="flex items-center space-x-3 w-full p-2 rounded hover:bg-gray-100"
            >
              <FiStar className="text-gray-500" />
              <span>Favorites</span>
              <span className="ml-auto bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                {favoritesCount}
              </span>
            </button>
          </li>
          <li>
            <button className="flex items-center space-x-3 w-full p-2 rounded hover:bg-gray-100">
              <FiUser className="text-gray-500" />
              <span>Profile</span>
            </button>
          </li>
          <li>
            <button className="flex items-center space-x-3 w-full p-2 rounded hover:bg-gray-100">
              <FiSettings className="text-gray-500" />
              <span>Settings</span>
            </button>
          </li>
        </ul>
      </nav>
    </motion.div>
  );
};