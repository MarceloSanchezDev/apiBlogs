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

export const likedBlog = async (blog, id) => {
  const url = `${baseUrl}${id}`; 
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(blog)
  });

  if (!response.ok) {
    throw new Error('Failed to like blog');
  }

  return await response.json();
};

export const deleteBlog = async (id) => {
  const url = `${baseUrl}${id}`; 
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    }
  });

  if (!response.ok) {
    throw new Error('Failed to DELETE blog');
  }

  return await response.json();
};