import { Link, useHistory, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

const ArticleForm = ({ action }) => {
  const { id } = useParams()
  const [errors, setErrors] = useState({
    title: '',
    body: ''
  })

  const [isValid, setIsValid] = useState(false)
  const [forms, setForms] = useState({
    title: '',
    body: ''
  })

  const history = useHistory()

  useEffect(() => {
    if (action === 'edit') {
      /*client.get(`/articles/${id}`)
        .then(({ data }) => {
          setForms({
            title: data.title,
            body: data.body
          })
        })*/

      fetch(`http://localhost:3001/articles/${id}`)
        .then(res => res.json())
        .then(data => {
          setForms({
            title: data.title,
            body: data.body
          })
        })
    }
  }, [action, id])

  const handleChange = (e) => {
    const { name, value } = e.target

    validateForms(e)

    setForms({
      ...forms,
      [name]: value
    })
  }

  const validateForms = (e) => {
    const { name, value } = e.target
    const letterOnly = /^[A-Za-z]+$/

    if (!value) {
      errors[name] = `${name} is required`
    } else if (!value.match(letterOnly)) {
      errors[name] = `${name} must be a valid string`
    } else {
      delete errors[name]
    }

    setErrors(errors)
    setIsValid(Object.keys(errors).length === 0)
  }

  const onSaveArticle = (e) => {
    e.preventDefault()

    if (action === 'edit') {
      /* Axios */
      /*client.put(`/articles/${id}`, {
        title: forms.title,
        body: forms.body
      })
      .then(() => {
        console.log('Article updated')
        history.push('/articles')
      })*/

      /* Fetch */
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(forms)
      }

      fetch(`http://localhost:3001/articles/${id}`, options)
        .then(res => res.json())
        .then(() => {
          console.log('Successfully Updated')
          history.push('/articles')
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      /* Axios */
      /*client.post('/articles', forms)
        .then(() => {
          console.log('Successfully Added')
          history.push('/articles')
        })
        .catch(err => {
          console.log(err)
        })*/

      /* Fetch */
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(forms)
      }

      fetch('http://localhost:3001/articles', options)
        .then(res => res.json())
        .then(() => {
          console.log('Successfully Added')
          history.push('/articles')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h1 className="card-title">{action === 'edit' ? 'Edit Article' : 'Create Article'}</h1>
        </div>
        <div className="card-body">
          <div className="form">
            <form onSubmit={onSaveArticle}>
              <div className="form-field">
                <label className="form-label">Title</label>
                <div className="form-message form-control-invalid">{errors['title']}</div>
                <input type="text" onChange={handleChange} name="title" className="form-control" value={forms.title}
                       placeholder="Input Title" />
              </div>

              <div className="form-field">
                <label className="form-label">Body</label>
                <div className="form-message form-control-invalid">{errors['body']}</div>
                <textarea className="form-control" name="body" onChange={handleChange} placeholder="Input Body"
                          value={forms.body} />
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  disabled={!isValid}
                  className="btn btn-primary"
                  onSubmit={onSaveArticle}>
                  Save
                </button>
                <Link to="/articles" className="btn btn-light">Cancel</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ArticleForm
