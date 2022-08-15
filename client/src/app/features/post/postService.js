import api from '../../../utils/api'

const getPosts = async () => {
  const response = await api.get('/p', { withCredentials: true })

  return response.data
}

const createPost = async ({ advice }) => {
  const response = await api.post('/p', { advice }, { withCredentials: true })

  return response.data
}

const postService = {
  getPosts,
  createPost,
}

export default postService
