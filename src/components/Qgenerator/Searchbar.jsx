import React, { useEffect, useState } from 'react'
import {useQuotes} from './QuoteContext'
import { tr } from 'framer-motion/client';


export default function Searchbar() {

  
  
  const obj = [
    { id: 0, name: "inspirational", selected: false },
    { id: 1, name: "life", selected: false },
    { id: 2, name: "love", selected: false },
    { id: 3, name: "happiness", selected: false },
    { id: 4, name: "motivation", selected: false },
    { id: 5, name: "funny", selected: false },
    { id: 6, name: "success", selected: false },
    { id: 7, name: "friendship", selected: false },
    { id: 8, name: "wisdom", selected: false },
    { id: 9, name: "philosophy", selected: false },
    { id: 10, name: "art", selected: false },
    { id: 11, name: "faith", selected: false },
    { id: 12, name: "education", selected: false },
    { id: 13, name: "politics", selected: false },
    { id: 14, name: "sports", selected: false }
  ];


  const [input, setInput] = useState(''); // State for search input 
  const [keyword, setKeyword] = useState('keyword');  
  const {tags, setTags, quotes, setQuotes} = useQuotes();



  

    useEffect(() => {
      console.log('useEffect in search bar ---------------');
      setTags(obj); // add tags object to state that use in quotext/ search component

    }, []);



    const handleSearch = async() => {
      console.log('search input : ', input.toLocaleLowerCase());
      if (input.trim() === '') {
        setQuotes(quotes);  // If input is empty, reset to original quotes
        return;
      }

      const page=  Math.ceil(Math.random() * 12);

      try {
        const url =`http://localhost:5000/api/quotes?filter=${input}&type=${keyword}&page=${page}`
        const response = await fetch(url);
        console.log('search url : ', url);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        } 
        const data = await response.json();
        console.log('search quotes : ', data.quotes); 
        alert('Quotes fetched successfully! for keyword : ' + input, ' and type : ' + keyword + ' page : ' + page );
        if (data.quotes && data.quotes.length > 0) {
          setQuotes(data.quotes);
        }
        else {
          setQuotes([{ body: "No quotes found.", author: "Api" }]);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
        setQuotes([{ body: "Error fetching quotes.", author: "Api" }]);
      }
      setInput(''); // Clear input after search
    
    }
















  function handleSelect(id) {

    setTags(
      tags =>
        tags.map(tag =>
          tag.id === id ?
            { ...tag, selected: !tag.selected } : tag))      
            // update selected key for tags object that handle filtering in quotext componet    
        }


  return (
    <div >
      <div className='flex mb-4 mt-4 gap-4 mr-4 justify-start items-center'>


        <div className='rounded-full w-full bg-white border border-gray-300 flex  items-center  '>
          <input type="search" id='search-quote'
            onChange={(e) => setInput(e.target.value)}  
           value={input} placeholder='Search'
            className='w-full flex px-4 focus:outline-none  p-4' />
          <div className='shrink-0 flex justify-center items-center ml-auto pr-2'>
            <button onClick={handleSearch}
              type='button'
              id='search-btn'
              className=' hover:scale-105 transition-all bg-gradient-to-r from-blue-700 to-fuchsia-700 p-2 rounded-full text-white font-semibold flex justify-center items-center gap-2 pr-4 cursor-pointer'>Search </button>
          </div>

        </div>


      </div>

      <div className='flex gap-4 flex-wrap'>
        <span className=' capitalize bg-white p-2 text-sm rounded-full w-fit px-6 h-fit border-gray-400 border  transition-colors cursor-pointer'>Filter by tags
        </span>
        {tags.map((tag) => {
          return (
            <span onClick={() => handleSelect(tag.id)}
              key={tag.id}
              className={`capitalize  p-2 text-sm rounded-full w-fit px-6 h-fit  transition-colors cursor-pointer ${tag.selected ? ' bg-green-300 hover:bg-green-200 ' : ' bg-gray-300 hover:bg-green-200'}`}>{tag.name}
            </span>
          )
        })}

      </div>


    </div>

  );
}





