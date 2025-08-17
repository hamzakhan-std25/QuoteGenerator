import React from 'react'
import { FiMenu } from 'react-icons/fi'

export default function Topbar() {
    return (
        <div className='flex justify-start items-center gap-4 pb-2 mb-2 border-b border-gray-300  '>
            <div className='p-3 rounded-2xl 
            cursor-pointer bg-blue-300
            text-blue-900 transition-all hover:bg-blue-400
            '><FiMenu className='text-3xl' /></div>
            <h2 className=' font-bold 
            text-2xl text-transparent bg-clip-text bg-gradient-to-r to-indigo-600 from-violet-400'>Quote Generator</h2>
            <button className='hover:scale-105 transition-all ml-auto p-2 text-sm bg-gradient-to-r from-indigo-500 text-white to-purple-500 rounded-xl cursor-pointer font-bold '>My Favrite Quotes</button>


        </div>
    )
}
