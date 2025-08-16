import React, { useEffect, useState } from 'react'
import { FiLoader, FiRefreshCw, FiArrowLeft, FiArrowRight } from 'react-icons/fi'





export default function
  Quotetext() {

  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState("quote");


  async function fetchQuote() {
  setLoading(true);
    try {
      console.log('try-----')
      // Use AllOrigins proxy to bypass CORS
      const proxyUrl = "https://api.allorigins.win/raw?url=";
      const apiUrl = "https://favqs.com/api/qotd";
      const res = await fetch(proxyUrl + encodeURIComponent(apiUrl));

      if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
      console.log(res)
      const data = await res.json();
      console.log(data.quote)
      setQuote(data.quote.body);
    } catch (error) {
      console.log('catch error----------')
      console.error("Error fetching quote:", error);
      setQuote({ body: "Unable to load quote.", author: "Error" });
    }
    setLoading(false);
  }



  


  useEffect(() => {
    // fetchQuote();
  })




  return (
    <div>
      <h1 className=' text-3xl font-semibold my-8 '>
        "From Wisdom to Wit — A Quote for Every Mood"
      </h1>
      <div className='border rounded border-blue-200 min-h-40 mb-8 p-4 italic text-lg font-semibold text-blue-600 bg-emerald-100 '>

      { loading ? <div> <p className="text-gray-400 text-center">Fetching wisdom...</p>
          <FiLoader className=' text-3xl w-full h-12 text-center' /></div>
          : quote
          }

      </div>
      <div className='flex justify-evenly items-center'>
        <button onClick={fetchQuote}
         className='bg-gradient-to-r from-blue-700 to-fuchsia-700 p-2 rounded text-white font-semibold flex justify-center items-center gap-2 pr-4 cursor-pointer'> <FiRefreshCw className='inline' /> New Quote </button>
        <div className='flex gap-2'>
          <button className='bg-gradient-to-r from-blue-700 to-fuchsia-700 p-2 rounded-full text-white font-semibold flex justify-center items-center gap-2 px-4 cursor-pointer'> <FiArrowLeft /> Prev </button>
          <button className='bg-gradient-to-r from-blue-700 to-fuchsia-700 p-2 rounded-full text-white font-semibold flex justify-center items-center gap-2 px-4 cursor-pointer'> Next <FiArrowRight /> </button>
        </div>
        <button className='  bg-gradient-to-r from-blue-700 to-fuchsia-700 px-4 text-white font-semibold border rounded p-2 cursor-pointer hover:bg-gradient-to-r transition duration-40'>Add to Favorit</button>
      </div>

    </div>
  )
  }
