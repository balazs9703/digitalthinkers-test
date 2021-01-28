import { useEffect, useState } from 'react'
import Head from 'next/head'
import { apiGetRequiest } from 'utils/apiGetRequiest'
import { config } from 'config'
import { CocktailCard } from 'components/CocktailCard'
import { CocktailSearch } from 'components/CoctailSearch'

export default function Cocktail({ cocktailData }) {
  const [drinks, setDrinks] = useState(cocktailData)
  async function onNewCocktailClick() {
    setDrinks(await getRandomCocktail())
  }
  async function onSearchClick(filters) {
    setDrinks(await getSearchedCocktail(filters))
  }
  console.log(drinks);

  return (
    <div className="bg-gray-900 min-h-screen">
      <Head>
        <title>Digitaltinkers Cocktail Listing</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <CocktailSearch onSearchClick={onSearchClick} />
        <div className="container flex mx-auto ">
          <button className="lg:w-4/6 mx-auto text-white bg-indigo-500 hover:bg-indigo-600 border-0 py-2 px-8 rounded text-lg mt-10 sm:mt-0" onClick={onNewCocktailClick} >New random cocktail</button>
        </div>
        {
          drinks.map(drink =>
            <CocktailCard {...drink} key={drink.idDrink} />
          )
        }
        {drinks.length === 0 && (<h1 className="mt-5 text-white text-center"> No drinks...</h1>)}

      </main>
    </div>
  )
}

export const getServerSideProps = async () => {
  return {
    props: {
      cocktailData: await getRandomCocktail()
    }
  }
}

async function getRandomCocktail() {
  return (await apiGetRequiest(config.baseUrl + '/api/cocktail'))
}
async function getSearchedCocktail(filters) {
  const queryStringFilters = new URLSearchParams(filters).toString();
  return (await apiGetRequiest(config.baseUrl + '/api/cocktail?' + queryStringFilters))
}