import { useRef } from 'react'

export const CocktailSearch = ({ onSearchClick }) => {
  const searchInputRef = useRef(null)
  const checkboxInputRef = useRef(null)
  return <div className="container p-5 mx-auto flex flex-col">
    <div className="lg:w-4/6 mx-auto"> <div className="container px-5 py-5 mx-auto">
      <div className="lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-start mx-auto">
        <input ref={searchInputRef} type="text" className="w-full mr-10 bg-gray-100 bg-opacity-50 rounded border border-gray-300 outline-none py-1 px-3 leading-6 text-white" />
        <button onClick={() => onSearchClick({ s: searchInputRef.current.value })} className="w-full md:w-auto text-white bg-indigo-500 border-0 py-2 px-8 hover:bg-indigo-600 rounded text-lg mt-10 sm:mt-0">Search</button>
      </div>
    </div>
    </div>
  </div>
}