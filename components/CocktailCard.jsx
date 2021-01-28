import { useEffect, useState } from 'react'

export const CocktailCard = ({ ingList, strDrinkThumb, strDrink, strInstructions }) => {


  return <section className="text-gray-400 bg-gray-900 body-font">

    <div className="container p-5 mx-auto flex flex-col">
      <div className="lg:w-4/6 mx-auto">
        <div className="flex flex-col sm:flex-row mt-10">
          <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
            <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-800 text-gray-600">
              <img src={strDrinkThumb} className="rounded-full" />
            </div>
            <div className="flex flex-col items-center text-center justify-center">
              <h2 className="font-medium title-font mt-4 text-white text-lg">{strDrink}</h2>
              <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4" />
              <ul className="text-base text-gray-400">
                {ingList.map(ing => <li key={ing}>{ing}</li>)}
              </ul>
            </div>
          </div>
          <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-800 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
            <p className="leading-relaxed text-lg mb-4">{strInstructions}</p>
          </div>
        </div>
      </div>

    </div>
  </section>
}