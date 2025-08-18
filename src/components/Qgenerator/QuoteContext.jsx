import { createContext, useContext, useState } from 'react'

// create context   
const QuotesContext = createContext();



//  create provider component

export function QuotesProvider({ children }) {
    const [tags, setTags] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
     const [quotes, setQuotes] = useState([{ body: "--", author: "--" }]);

    return (
        <QuotesContext.Provider value={{ tags, setTags, quotes, setQuotes, showDialog, setShowDialog, isSidebarOpen,setIsSidebarOpen }} >
            {children}
        </QuotesContext.Provider>
    );
}


// use context -- custom hook
export function useQuotes() {
    return useContext(QuotesContext);
}

