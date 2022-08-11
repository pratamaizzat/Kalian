import api from '../../../utils/api'

const getQuestions = async () => {
  const response = await api.get('/q')

  return response.data
}

const questionService = {
  getQuestions,
}

export default questionService
