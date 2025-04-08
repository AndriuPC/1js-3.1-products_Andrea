const SERVER = import.meta.env.VITE_URL_API;

// window.addEventListener('load', () => async (event)=>{
//     const posts = await getData()
// })

// async function getData() {
//     const response = await fetch(SERVER + '/products')
//     if (!response.ok) {
//     throw `Error ${response.status} de la BBDD: ${response.statusText}`
//     }
//     const posts = await response.json()
//     return posts
// }