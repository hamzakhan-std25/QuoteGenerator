import React from 'react'
import { FiX } from 'react-icons/fi'


export default function Searchbar() {
  return (
    <div className='grid grid-cols-[1fr_150px] mb-4 mt-4 gap-4 mr-4'>

      <input type="search" placeholder='Search' className='rounded-full bg-white border border-gray-300 mr-8 flex px-4 focus:border-gray-500 focus:outline-none max-w-lg p-4 ' />

      <div className='ml-auto max-w-sm'>
        <select name="dropdown" id="dropdown" className='w-full p-2 border rounded focus:outline-none border-blue-600 text-lg ' >
          <option value="filter1" >filter1</option>
          <option value="filter2" selected>Filter2</option>
          <option value="filter3">filter3</option>
          <option value="filter4">filter4</option>
        </select>
      </div>

      <div className='flex gap-4 flex-wrap'>
        <Tag tag="smoth" />
        <Tag tag="normal" />
        <Tag tag="normal" />
  
      </div>
      <div className='border rounded-2xl'>
        <select name="tags" id="tags" className='w-full p-2 rounded-2xl focus: outline-none   text-center'>
          <option selected value="">Add Tag</option>
          <option value="tag1">tag1</option>
          <option value="tag1">tag1</option>
        </select>
      </div>

    </div>
  )
}

const Tag = ({ tag }) => {
  return (
    <span className='bg-gray-300 p-2 text-sm rounded-full w-fit px-3 h-fit '>
      <span className='capitalize'>{tag}</span>
      <button className=' pl-2' ><FiX className=' inline ' /></button>
    </span>
  )
}
