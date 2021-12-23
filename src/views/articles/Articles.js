import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/all'

const Articles = () => {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    /*client.get('/articles')
      .then(({ data }) => {
        setArticles(data)
      })*/

    fetch('http://localhost:3001/articles?_sort=id&_order=desc')
      .then(res => res.json())
      .then(data => setArticles(data))
  }, [])

  const onDeleteArticle = (id) => {
    /*client
      .delete(`/articles/${id}`)
      .then(() => {
        console.log(`Successfully Deleted ${id}`)
        setArticles(articles.filter(article => article.id !== id))
      })*/

    fetch(`http://localhost:3001/articles/${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(() => {
        console.log(`Fetch delete ${id}`)
        setArticles(articles.filter(article => article.id !== id))
        setArticles(state => {
          return state.filter(article => article.id !== id)
        })
      })
  }

  return (
    <>
      <Link to={'/'}>Home</Link>

      <div className="card">
        <div className="card-header">
          <h1 className="card-title">Articles</h1>
          <Link className="btn btn-primary" to={'/articles/create'}>Create Article</Link>
        </div>
        <div className="card-body">
          {articles.length > 0 && (
            <table className="table" border={1}>
              <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Body</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
              </thead>
              <tbody>
              {articles.map(article => (
                <tr key={article.id}>
                  <td data-header="ID">{article.id}</td>
                  <td data-header="First Name">{article.title}</td>
                  <td data-header="Last Name">{article.body}</td>
                  <td data-header="Edit"><Link to={`articles/${article.id}/edit`}>Edit</Link></td>
                  <td data-header="Edit">
                    <button className="btn btn-primary" onClick={() => onDeleteArticle(article.id)}><FaTrash /></button>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          )}
          {articles.length === 0 && <div>No records found.</div>}
        </div>
      </div>
    </>
  )
}

export default Articles
