import React from 'react'
import Topbar from './Topbar'
import Searchbar from './Searchbar'
import QuotesBody from './QuotesBody'
import { QuotesProvider, useQuotes } from './QuoteContext'

// Main component for the Quote Generator

export default function Qgenerator() {


  return (
    <main className='bg-amber-50 p-4 min-h-200'>
      <QuotesProvider>
        <Topbar />
        <Searchbar />
        <QuotesBody />
      </QuotesProvider>

    </main>
  )
}
