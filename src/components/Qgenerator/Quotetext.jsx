import React, { useEffect, useState } from 'react'
import { FiX, FiLoader, FiRefreshCw, FiArrowLeft, FiArrowRight } from 'react-icons/fi'




export default function
  Quotetext() {


  const [loading, setLoading] = useState(true);
  const [quotes, setQuotes] = useState([]);
  const [idx, setIdx] = useState(0);
  const [quoteLen, setQuoteLen] = useState(0);
  const [page, setPage] = useState(8);




  async function fetchQuote() {
    setLoading(true);

    try {
      const url="http://localhost:5000/api/quotes?page="+page;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const data = await res.json();
      console.log(data)
      console.log('quotes.data is updating..')

      setQuotes(data.quotes);
      setQuoteLen(quotes.length);
    }
     catch (error) {

      console.error("Error fetching quote:", error);
      setQuotes([{ body: "Unable to fetch quote.", author: "API Error" }]);

    }

    setIdx(0)
    setLoading(false);



    console.log(quotes)
  }







  useEffect(() => {

console.log(quotes)
console.log(quoteLen)

  },[quotes]);




  return (
    <div>
      <h1 className=' text-3xl font-semibold my-8 '>
        "From Wisdom to Wit — A Quote for Every Mood"
      </h1>
      <div className='flex justify-between'>  <button onClick={fetchQuote}
        className='bg-gradient-to-r mb-4 from-blue-700 to-fuchsia-700  p-2 rounded-xl text-white font-semibold flex justify-center items-center gap-2 pr-4 cursor-pointer hover:scale-105 transition-all'> <FiRefreshCw className='inline' /> Random Quotes </button>
        <span className='bg-gray-300 p-2 text-sm rounded-xl w-fit px-3 h-fit font-semibold '>
          {`${idx} / ${quoteLen}`}
        </span>
      </div>
      <div className='border rounded border-blue-200 min-h-40 mb-8 p-4 italic text-lg font-semibold text-blue-600 bg-emerald-100 '>

        {loading ? <div> <p className="text-gray-400 text-center">Fetching wisdom...</p>
          <FiLoader className=' text-3xl w-full h-12 text-center' /></div>
          : <div>
            <div>{quotes[idx].body}</div>
            <span className='font-normal text-gray-600 block'>{quotes[idx].author}--</span>
          </div>

        }


      </div>
      <div className='flex justify-between items-center'>
        <div className='flex gap-2'>
          <button onClick={changeQuote} value={-1} className=' hover:scale-105 transition-all bg-gradient-to-r from-blue-700 to-fuchsia-700 p-2 rounded-full text-white font-semibold flex justify-center items-center gap-2 px-4 cursor-pointer'> <FiArrowLeft /> Prev </button>
          <button onClick={changeQuote} value={+1} className=' hover:scale-105 transition-all bg-gradient-to-r from-blue-700 to-fuchsia-700 p-2 rounded-full text-white font-semibold flex justify-center items-center gap-2 px-4 cursor-pointer'> Next <FiArrowRight /> </button>
        </div>
        <button className='  hover:scale-105  bg-gradient-to-r from-blue-700 to-fuchsia-700 px-4 text-white font-semibold border rounded p-2 cursor-pointer hover:bg-gradient-to-r transition duration-40'>Add to Favorit</button>
      </div>

    </div>
  )






  function changeQuote(e) {
    let val = Number(e.target.value)

    if (val == -1 && idx == 0) {
      setIdx(quoteLen - 1);
      return;

    }
    if (val == +1 && idx == quoteLen - 1) {
      setIdx(0);
      return;
    }


    setIdx(idx + val);

  }
}




