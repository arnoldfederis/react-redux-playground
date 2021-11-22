import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { deletePost, fetchPost } from '../../store/actions/post'

const Posts = () => {
  const { posts } = useSelector(state => state.post)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPost())
  }, [])

  const onDeletePost = (id) => {
    dispatch(deletePost(id))
  }

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h1 className='card-title'>Posts</h1>
          <Link className="btn btn-primary" to={'/posts/create'}>Create Post</Link>
        </div>
        <div className="card-body">
          {posts.length > 0 && (
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
              {posts.map(post => (
                <tr key={post.id}>
                  <td data-header="ID">{post.id}</td>
                  <td data-header="First Name">{post.title}</td>
                  <td data-header="Last Name">{post.body}</td>
                  <td data-header="Edit"><Link to={`posts/${post.id}/edit`}>Edit</Link></td>
                  <td data-header="Edit"><button className="btn btn-primary" onClick={() => onDeletePost(post.id)}>Delete</button></td>
                </tr>
              ))}
              </tbody>
            </table>
          )}
          {posts.length === 0 && <div>No records found.</div>}
        </div>
      </div>
    </>
  )
}

export default Posts
