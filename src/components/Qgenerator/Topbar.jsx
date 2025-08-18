import { useEffect, useState } from 'react'
import { FiMenu } from 'react-icons/fi'
import { useQuotes } from './QuoteContext'
import QuotesDialog from './QuotesDialog'
import Sidebar from './Sidebar'

// Topbar component for the Quote Generator



export default function Topbar() {
    const { showDialog, setShowDialog, isSidebarOpen, setIsSidebarOpen } = useQuotes()

    const [favorites, setFavorites] = useState();

    // account data 
    const account = { id: 2, name: "WisdomSeeker", avatar: "🧙" }



    useEffect(() => {
        let fav = JSON.parse(localStorage.getItem('favoriteQuotes')) || [];
        setFavorites(fav);
    }, []);

    return (
        <>
            <div
                className='flex justify-start items-center gap-4 pb-2 mb-2 border-b border-gray-300  '>
                <div onClick={() => setIsSidebarOpen(true)}
                    className='p-3 rounded-2xl 
            cursor-pointer bg-blue-300
            text-blue-900 transition-all hover:bg-blue-400
            '><FiMenu className='text-3xl' /></div>
                <h2 className=' font-bold 
            text-2xl text-transparent bg-clip-text bg-gradient-to-r to-indigo-600 from-violet-400'>Quote Generator</h2>
                <button onClick={() => setShowDialog(true)} className='hover:scale-105 transition-all ml-auto p-2 text-sm bg-gradient-to-r from-indigo-500 text-white to-purple-500 rounded-xl cursor-pointer font-bold '>My Favourite Quotes</button>

            </div>
            {
                showDialog && <QuotesDialog onClose={() => setShowDialog(false)} />

            }
            {
                isSidebarOpen && <Sidebar randomAccount={account}
                    favoritesCount={favorites.length}
                />

            }

        </>
    )
}
