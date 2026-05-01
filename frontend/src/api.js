import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001/api'
})

export const getSuperheroes = () => api.get('/superheroes')
export const getMarvel = () => api.get('/superheroes/marvel')
export const getDC = () => api.get('/superheroes/dc')
export const getSuperhero = (id) => api.get(`/superheroes/${id}`)
export const createSuperhero = (data) => api.post('/superheroes', data)
export const updateSuperhero = (id, data) => api.put(`/superheroes/${id}`, data)
export const deleteSuperhero = (id) => api.delete(`/superheroes/${id}`)