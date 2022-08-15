import { useState, useEffect, useMemo } from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createPost, getPosts, resetPost } from '../app/features/post/postSlice'
import './Home.css'

const Home = function Home() {
  const [cookies] = useCookies()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [hide, setHide] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [advice, setAdvice] = useState('')

  const SSID = useMemo(() => cookies?.SSID, [cookies?.SSID])
  const { posts, isSuccess, isError } = useSelector((state) => state.post)

  useEffect(() => {
    if (SSID) {
      setHide(false)
    }
  }, [SSID])

  useEffect(() => {
    dispatch(getPosts())
  }, [])

  useEffect(() => {
    if (isSuccess) {
      dispatch(resetPost())
    }

    if (isSuccess && isOpen) {
      setIsOpen(false)
    }

    if (isError) {
      dispatch(resetPost())
    }
  }, [isSuccess, isError])

  const handleToggleOpen = () => {
    setIsOpen((prev) => !prev)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (advice.trim().length === 0) {
      // TODO: ERROR INDICATOR
      return
    }

    dispatch(createPost({ advice }))
  }

  return (
    <section className="home">
      <header className="home-header">
        <nav>
          <div className="home-app-name">
            <h1>&quot;KALIAN 👣&quot;</h1>
          </div>

          {hide && (
            <button onClick={() => navigate('/login')} className="btn btn-home-login" type="button">
              Sign in
            </button>
          )}
        </nav>
      </header>
      <main className="home-body">
        <p>{JSON.stringify(posts)}</p>
      </main>
      <div className="home-post">
        <button onClick={handleToggleOpen} type="button" className="btn btn-home-post">
          <i className="fa-solid fa-ghost icon" />
        </button>
      </div>

      {isOpen && (
        <div className="home-form-post">
          <form onSubmit={handleSubmit} className="home-form">
            <label htmlFor="advice" className="home-form-control">
              Best Advice That You Can Give
              <textarea
                placeholder="Type here for your best advice..."
                className="textArea"
                type="text"
                id="advice"
                rows={10}
                value={advice}
                onChange={(e) => setAdvice(e.target.value)}
              />
            </label>

            <div className="home-form-action">
              <button
                onClick={() => setIsOpen(false)}
                className="btn btn-home-form-close"
                type="button"
              >
                Close
              </button>
              <button className="btn btn-home-form-submit" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  )
}

export default Home
