import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { fetchSinglePost, savePost, updatePost } from '../../store/actions/post'

const PostForm = ({ action }) => {
  const { id } = useParams()
  const formikRef = useRef()
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (action !== 'edit') {
      return
    }

    dispatch(fetchSinglePost(id, formikRef))
  }, [action, dispatch, id])

  const initialValues = {
    title: '',
    body: ''
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    body: Yup.string().required('Body is required')
  })

  const onSavePost = (forms) => {
    if (action === 'edit') {
      dispatch(updatePost({ id, forms }))
    } else {
      dispatch(savePost(forms))
    }

    history.push('/posts')
  }

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h1 className="card-title">{action === 'edit' ? 'Edit Post' : 'Create Post'}</h1>
        </div>
        <div className="card-body">
          <div className="form">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSavePost} innerRef={formikRef}>
              {({ errors, touched, isSubmitting, isValid }) => {
                return (
                  <Form>
                    <div className="form-field">
                      <label className="form-label">Title</label>
                      <ErrorMessage
                        name="title"
                        component="div"
                        className="form-message form-control-invalid" />
                      <Field
                        name="title"
                        type="text"
                        placeholder="Input Title"
                        className={'form-control' + (errors['title'] && touched['title'] ? ' is-invalid' : '')} />
                    </div>

                    <div className="form-field">
                      <label className="form-label">Body</label>
                      <ErrorMessage
                        name="body"
                        component="div"
                        className="form-message form-control-invalid" />
                      <Field
                        as="textarea"
                        name="body"
                        type="text"
                        placeholder="Input Body"
                        className={'form-control' + (errors['body'] && touched['body'] ? ' is-invalid' : '')} />
                    </div>

                    <div className="form-actions">
                      <button
                        type="submit"
                        disabled={!isValid || isSubmitting}
                        className="btn btn-primary"
                        onSubmit={onSavePost}>
                        Save
                      </button>
                      <Link to="/posts" className="btn btn-light">Cancel</Link>
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

export default PostForm
