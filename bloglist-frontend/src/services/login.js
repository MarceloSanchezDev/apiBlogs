const baseUrl = 'http://localhost:3001/api/login'

 export const login = async credentials => {
    const response = await fetch(baseUrl,{
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
    })
    
    return await response.json()
}