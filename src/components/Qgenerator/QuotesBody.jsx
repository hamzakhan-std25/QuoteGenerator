import React, { useEffect, useState, useRef } from 'react'
import { FiLoader, FiRefreshCw, FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import { useQuotes } from './QuoteContext'



export default function
  QuotesBody() {

  const [loading, setLoading] = useState(false);
  const [idx, setIdx] = useState(0);
  const EXPIRY_TIME = 24 * 60 * 60 * 1000; // 24 hours
  const [filterQuotes, setFilterQuotes] = useState([{ body: "--", author: "--" }]);

  const { tags, quotes, setQuotes } = useQuotes();


  const touchStartX = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // swipe left → next
        changeQuote(1);
      } else {
        // swipe right → prev
        changeQuote(-1);
      }
    }

    touchStartX.current = null;
  };









  // filter quotes based on selected tags

  function quotesFilter() {
    const selectedTags = Array.isArray(tags)
      ? tags.filter(tag => tag.selected).map(tag => tag.name)
      : [];
    if (!selectedTags.length) return quotes;
    const filQuotes = Array.isArray(quotes)
      ? quotes.filter(quote => Array.isArray(quote.tags) && quote.tags.some(tag => selectedTags.includes(tag)))
      : [];
    return filQuotes.length ? filQuotes : [{ body: "No quotes found for the selected tags.", author: "API" }];
  }





  useEffect(() => {
    console.log('useEffect  in quote area ------');

    const stored = localStorage.getItem("quotes");

    if (stored) {
      const parsed = JSON.parse(stored);

      if (Date.now() < parsed.expiry) {
        // Still valid
        console.log("Loaded quotes from localStorage (not expired)");
        console.log('quotes : ', parsed.data);
        setQuotes(parsed.data);
        setFilterQuotes(parsed.data);
        setIdx(0);
        return;

      } else {
        // Expired → remove it
        console.log("Quotes expired, clearing storage");
        localStorage.removeItem("quotes");
      }
    }
    else {

      console.log('body of store else part .....')

      let msg = [{
        body: "Click Random Quotes button to load Random Quoutes!",
        author: "Api"
      }]
      setFilterQuotes(msg);
      setIdx(0);
    }


  }, []);




  // useeffect for working on when ever tags or quotes change
  useEffect(() => {
    setFilterQuotes(quotesFilter());
    setIdx(0);
  }, [tags, quotes]);





  async function fetchQuote() {

    let page = Math.ceil(Math.random() * 12)

    setLoading(true);

    try {
      console.log('fething quotes...')

      const url = `https://quotegenerator-backend-production.up.railway.app/api/quotes?page=${page}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const data = await res.json();
      console.log(data)
      alert('Quotes fetched successfully! page : ' + page);

      if (data.quotes) {
        setQuotes(data.quotes);
        saveQuotes(data.quotes);
        quotesFilter(); // filter quotes based on selected tags
      }
    }
    catch (error) {
      console.error("Error fetching quote:", error);
      setQuotes([{ body: "Unable to fetch quote.", author: "API Error" }]);
    }

    setIdx(0)
    setLoading(false);

  }




  // Save quotes with expiry
  const saveQuotes = (quotesArray) => {
    const item = {
      data: quotesArray,
      expiry: Date.now() + EXPIRY_TIME
    };
    localStorage.setItem("quotes", JSON.stringify(item));
  };








  return (
    <div>
      <h1 className=' text-3xl font-semibold my-8 '>
        "From Wisdom to Wit — A Quote for Every Mood"
      </h1>
      <div className='flex justify-between'>  <button onClick={fetchQuote}
        className='btn'> <FiRefreshCw className='inline' />Generate New Quotes </button>
        <span className='bg-gray-300 p-2 text-sm rounded-xl w-fit px-3 h-fit font-semibold '>
          {`${idx + 1} / ${filterQuotes.length}`}
        </span>
      </div>
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className=' border rounded border-blue-200 min-h-40 mb-8 p-4 italic text-lg font-semibold text-blue-600 bg-emerald-100 '>

        {loading ?
          <div> <p className="text-gray-400 text-center">Fetching wisdom...</p>
            <FiLoader className=' text-3xl w-full h-12 text-center' /></div>

          : <div className='flex justify-between flex-col '>

            <div>
              <div>{filterQuotes[idx] ? filterQuotes[idx].body : "--"}</div>
              <span className='font-normal text-gray-600 block'>{filterQuotes[idx] ? filterQuotes[idx].author : "--"}--</span>
            </div>

            <span className=' mt-4 text-fuchsia-600 text-sm font-extralight  block ml-auto'>Tags: &#91; {renderTags()} &#93;</span>
          </div>

        }




      </div>
      <div className='flex justify-between items-center'>
        <div className='flex gap-2'>
          <button onClick={()=> changeQuote(-1)}  className='btn'> <FiArrowLeft /> Prev </button>
          <button onClick={()=> changeQuote(1)}  className='btn'> Next <FiArrowRight /> </button>
        </div>
        <button onClick={() => addToFavourite()} className='btn'>Add to Favourite</button>
      </div>

    </div>
  )



  function addToFavourite() {
    if (filterQuotes[idx].body !== "--") {
      const favoriteQuotes = JSON.parse(localStorage.getItem('favoriteQuotes')) || [];
      const currentQuote = filterQuotes[idx];
      console.log('favroties from localstroage :', favoriteQuotes)
      if (!favoriteQuotes.some(quote => quote.id === currentQuote.id)) {
        const updatedFavorites = [...favoriteQuotes, currentQuote];
        localStorage.setItem('favoriteQuotes', JSON.stringify(updatedFavorites))
        console.log('updated and current favroties : ', updatedFavorites)
      }
    }

  }






  function changeQuote(val) {

    if (val == -1 && idx == 0) {
      setIdx(filterQuotes.length - 1);
      return;

    }
    if (val == +1 && idx == filterQuotes.length - 1) {
      setIdx(0);
      return;
    }


    setIdx(idx + val);

  }





  function renderTags() {
    if (filterQuotes[idx] && Array.isArray(filterQuotes[idx].tags)) {
      let pArr = filterQuotes[idx].tags;
      if (pArr.length === 0) {
        return " ! ";
      }
      return pArr.join('_');
    }
    return " No Tag ";
  }


}





