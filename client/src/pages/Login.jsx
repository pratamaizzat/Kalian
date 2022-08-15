import { useId, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie'
import { resetAuth, signin } from '../app/features/auth/authSlice'
import { getQuestions, resetQuestion } from '../app/features/question/questionSlice'
import './Login.css'

const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)]

const Login = function Login() {
  const formId = useId()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [cookies] = useCookies()
  const [pickedQuestion, setPickedQuestion] = useState({})
  const [chooseOption, setChooseOption] = useState('')
  const [formData, setFormData] = useState({
    question: '',
    options: [],
  })
  const { questions, isSuccess, isLoading } = useSelector((state) => state.question)
  const {
    isSuccess: isSuccessAuth,
    isLoading: isLoadingAuth,
    isError: isErrorAuth,
  } = useSelector((state) => state.auth)

  useEffect(() => {
    if (cookies?.SSID) {
      navigate('/', {
        replace: true,
      })
    }
  }, [cookies?.SSID])

  useEffect(() => {
    if (cookies?.SSID) return
    dispatch(getQuestions())
  }, [])

  useEffect(() => {
    if (isSuccess) {
      const randomQuestion = getRandomItem(questions)
      setPickedQuestion(randomQuestion)
      setFormData({
        question: randomQuestion.question,
        options: randomQuestion.options,
      })

      dispatch(resetQuestion())
    }
  }, [isSuccess])

  useEffect(() => {
    if (isSuccessAuth) {
      navigate('/', {
        replace: true,
      })
    }

    if (isErrorAuth) {
      const randomQuestion = getRandomItem(questions)
      setPickedQuestion(randomQuestion)
      setFormData({
        question: randomQuestion.question,
        options: randomQuestion.options,
      })

      dispatch(resetQuestion())
    }

    dispatch(resetAuth())
  }, [isSuccessAuth, isErrorAuth])

  const { question, options } = formData

  const handleChangeOptions = (e) => {
    setChooseOption(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(signin({ question: pickedQuestion.question, answer: chooseOption }))
  }

  return (
    <div className="login">
      <form
        id={formId}
        className={`login-form ${isLoading ? 'loading' : ''}`}
        onSubmit={handleSubmit}
      >
        <h2 className="login-form-question">
          {question}
          {isLoading ? 'Loading...' : '?'}
        </h2>
        <div className="login-form-radio-container">
          {options.map((option, idx) => (
            <div
              key={Math.random()}
              className={`login-form-radio ${chooseOption === option ? 'active' : ''}`}
            >
              <label htmlFor={`option-${idx}`} className="login-form-control">
                <input
                  type="radio"
                  id={`option-${idx}`}
                  value={option}
                  checked={chooseOption === option}
                  onChange={handleChangeOptions}
                />
                {option}
              </label>
            </div>
          ))}
        </div>

        <button
          disabled={isLoadingAuth}
          className="btn-sumbit-question"
          type="submit"
          form={formId}
        >
          {isLoadingAuth ? 'Loading' : 'Sign In'}
        </button>

        <div className="login-app-name">
          <h1>&quot;KALIAN 👣&quot;</h1>
        </div>
      </form>
    </div>
  )
}

export default Login
