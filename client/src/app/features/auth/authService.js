import api from '../../../utils/api'

const signin = async ({ question, answer }) => {
  const response = await api.post('/guest/login', { question, answer }, { withCredentials: true })

  if (response.data) {
    localStorage.setItem('user_guest', JSON.stringify(response.data))
  }
  return response.data
}

const authService = {
  signin,
}

export default authService
