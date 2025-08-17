import React, { useState } from 'react'







export default function Searchbar() {


  const obj = [
    { id: 0, name: "inspirational", selected: false },
    { id: 1, name: "life", selected: false },
    { id: 2, name: "love", selected: true },
    { id: 3, name: "happiness", selected: false },
    { id: 4, name: "motivation", selected: false },
    { id: 5, name: "funny", selected: true },
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


  const [tags, setTags] = useState(obj)







  function handleSelect(id) {

    setTags(
      tags =>
        tags.map(tag =>
          tag.id === id ?
            { ...tag, selected: !tag.selected } : tag))

            console.log(tags);

        }



  return (
    <div >
      <div className='flex mb-4 mt-4 gap-4 mr-4 justify-start items-center'>


        <div className='rounded-full min-w-xl bg-white border border-gray-300 flex  items-center  '>
          <input type="search" id='search-quote' placeholder='Search' className=' flex px-4 focus:outline-none  p-4 ' />
          <div className=' flex justify-center items-center ml-auto'>
            <button
              className='hover:scale-105 transition-all bg-gradient-to-r mr-4 from-blue-700 to-fuchsia-700 p-2 rounded-full text-white font-semibold flex justify-center items-center gap-2 pr-4 cursor-pointer'>Search Author</button>
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





