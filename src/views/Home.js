import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <Link to={'/users'}>Users</Link>
      <Link to={'/posts'}>Posts</Link>
      <Link to={'/articles'}>Articles</Link>
    </>
  )
}

export default Home
