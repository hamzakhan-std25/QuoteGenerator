import React from 'react'
import Topbar from './Topbar'
import Searchbar from './Searchbar'
import Quotetext from './Quotetext'

export default function Qgenerator() {
  return (
    <main className='bg-amber-50 p-4 min-h-[200px]'>
       <Topbar/>
       <Searchbar/>
       <Quotetext/>
    </main>
  )
}
