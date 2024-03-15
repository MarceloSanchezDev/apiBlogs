import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs/'

let token = null

export const setToken = newToken => {
    token = `Bearer ${newToken}`
  }

export const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}


export const createBlog = async (blog) => {

  const response = await fetch(baseUrl, {
      method: 'POST',
      body: JSON.stringify(blog),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': token
      },
    })
    return await response.json()
  
}