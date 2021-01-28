export async function apiGetRequiest(url) {
  return await (await fetch(url)).json()
}