import { useId, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getQuestions, resetQuestion } from '../app/features/question/questionSlice'
import './Login.css'

const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)]

const Login = function Login() {
  const formId = useId()
  const dispatch = useDispatch()
  const [pickedQuestion, setPickedQuestion] = useState({})
  const [chooseOption, setChooseOption] = useState('')
  const [formData, setFormData] = useState({
    question: '',
    options: [],
  })

  useEffect(() => {
    dispatch(getQuestions())
  }, [])

  const { questions, isSuccess, isLoading } = useSelector((state) => state.question)

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

  const { question, options } = formData

  const handleChangeOptions = (e) => {
    setChooseOption(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log({ chooseOption, q: pickedQuestion.question })
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

        <button className="btn-sumbit-question" type="submit" form={formId}>
          Sign In
        </button>

        <div className="login-app-name">
          <h1>&quot;KALIAN 👣&quot;</h1>
        </div>
      </form>
    </div>
  )
}

export default Login
