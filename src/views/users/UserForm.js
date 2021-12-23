import { Link, useHistory, useParams } from 'react-router-dom'

import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { fetchSingleUser, saveUser, updateUser } from '../../store/actions/user'

const UserForm = ({ action }) => {
  const { uuid } = useParams()
  const formikRef = useRef()
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (action !== 'edit') {
      return
    }

    dispatch(fetchSingleUser(uuid, formikRef))
  }, [action, dispatch, uuid])

  const userForms = [
    {
      name: 'firstName',
      type: 'text',
      label: 'First Name',
      placeholder: 'Input First Name'
    },
    {
      name: 'lastName',
      type: 'text',
      label: 'Last Name',
      placeholder: 'Input Last Name'
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      placeholder: 'Input Email'
    }
  ]

  const initialValues = {
    firstName: '',
    lastName: '',
    email: ''
  }

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Email is invalid').required('Email is required')
  })

  const onSaveUser = (forms) => {
    if (action === 'edit') {
      dispatch(updateUser({ uuid, forms }))
    } else {
      dispatch(saveUser(forms))
    }

    history.push('/users')
  }

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h1 className="card-title">{action === 'edit' ? 'Edit User' : 'Create User'}</h1>
        </div>
        <div className="card-body">
          <div className="form">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSaveUser} innerRef={formikRef}>
              {({ errors, touched, isSubmitting, isValid }) => {
                return (
                  <Form>
                    {userForms.map((userForm, index) => (
                      <div className="form-field" key={userForm.name}>
                        <label className="form-label">{userForm.label}</label>
                        <ErrorMessage
                          name={userForm.name}
                          component="div"
                          className="form-message form-control-invalid" />
                        <Field
                          name={userForm.name}
                          type={userForm.type}
                          placeholder={userForm.placeholder}
                          className={'form-control' + (errors[userForm.name] && touched[userForm.name] ? ' is-invalid' : '')} />
                      </div>
                    ))}

                    <div className="form-actions">
                      <button
                        type="submit"
                        disabled={!isValid || isSubmitting}
                        className="btn btn-primary"
                        onSubmit={onSaveUser}>
                        Save
                      </button>
                      <Link to="/users" className="btn btn-light">Cancel</Link>
                    </div>
                  </Form>
                )
              }}
            </Formik>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserForm
