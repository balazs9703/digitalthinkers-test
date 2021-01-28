// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { runMiddleware } from "utils/middlewareInjection"
import { cacheMiddleware } from 'utils/cacheEndpoint'
import { apiGetRequiest } from 'utils/apiGetRequiest'

export default async function handler(req, res) {
  const search = req.query?.search || null
  let cocktailData;
  if (search) {
    await runMiddleware(req, res, cacheMiddleware(60));
    cocktailData = (await apiGetRequiest(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`)).drinks.slice(0, 10)
  } else {
    cocktailData = (await apiGetRequiest('https://www.thecocktaildb.com/api/json/v1/1/random.php')).drinks
  }
  cocktailData = mapIngredients(cocktailData)

  res.send([...cocktailData])
}

const mapIngredients = (cocktails) => {
  return cocktails.map(cocktailData => {
    let ingList = []
    Object.keys(cocktailData).map((ing) => {
      if (ing.includes('strIngredient')) {
        ingList.push(cocktailData[ing])
      }
    })
    const measureList = []
    Object.keys(cocktailData).map((measure) => {
      if (measure.includes('strMeasure')) {
        measureList.push(cocktailData[measure])
      }
    })
    ingList = ingList.map((ing, index) => {
      if (measureList[index] !== null && ing !== null) {
        return measureList[index] + ing
      }
      if (measureList[index]) {
        return ing
      }
    }).filter(e => !!e)
    return { ...cocktailData, ingList }
  })
}