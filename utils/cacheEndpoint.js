import cache from 'memory-cache'
import consola from 'consola'

let memCache = new cache.Cache();

export const cacheMiddleware = (durationInSec) => {
  return (req, res, next) => {
    let key = 'api-cache-' + req.url || req.originalUrl
    let cacheContent = memCache.get(key);
    if (cacheContent) {
      consola.info(`[Cache] Loaded from cache: ${key}`)
      res.send(cacheContent);
      return
    } else {
      res.sendResponse = res.send
      res.send = (body) => {
        memCache.put(key, body, durationInSec * 1000);
        setTimeout(() => {
          memCache.del(key);
        }, durationInSec * 1000)
        consola.info(`[Cache] Saved to cache: ${key}`)
        res.sendResponse(body)
      }
      next()
    }
  }
}