import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, fetchUser } from '../../store/actions/user'
import { useEffect } from 'react'

const Users = () => {
  const { users } = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  const onDeleteUser = (id) => {
    dispatch(deleteUser(id))
  }

  return (
    <>
      <Link to={'/'}>Home</Link>
      <div className="card">
        <div className="card-header">
          <h1 className='card-title'>Users</h1>
          <Link className="btn btn-primary" to={'/users/create'}>Create User</Link>
        </div>
        <div className="card-body">
          {users.length > 0 && (
            <table className="table" border={1}>
              <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
              </thead>
              <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td data-header="ID">{user.id}</td>
                  <td data-header="First Name">{user.firstName}</td>
                  <td data-header="Last Name">{user.lastName}</td>
                  <td data-header="Edit"><Link to={`users/${user.id}/edit`}>Edit</Link></td>
                  <td data-header="Edit"><button className="btn btn-primary" onClick={() => onDeleteUser(user.id)}>Delete</button></td>
                </tr>
              ))}
              </tbody>
            </table>
          )}
          {users.length === 0 && <div>No records found.</div>}
        </div>
      </div>
    </>
  )
}

export default Users
