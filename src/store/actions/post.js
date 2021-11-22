import { CREATE_POST, DELETE_POST, EDIT_POST, READ_POSTS, UPDATE_POST } from '../types/post'
import client from '../../config/client'
import showAlert from '../../utils/showAlert'

export const fetchPost = () => async (dispatch) => {
  try {
    const { data } = await client.get('/posts?_sort=id&_order=desc')

    dispatch({
      type: READ_POSTS,
      payload: data
    })
  } catch (err) {
    console.log(err)
  }
}

export const fetchSinglePost = (uuid, formikRef) => async (dispatch) => {
  try {
    const { data } = await client.get(`/posts/${uuid}`)

    const fields = ['title', 'body']
    fields.forEach(field => {
      if ('setFieldValue' in formikRef.current) {
        formikRef.current.setFieldValue(field, data[field], false)
      }
    })

    dispatch({
      type: EDIT_POST,
      payload: data
    })
  } catch (err) {
    console.log(err)
  }
}

export const savePost = (forms) => async (dispatch) => {
  try {
    const payload = { ...forms, userId: 1 }
    const { data } = await client.post('/posts', payload)

    dispatch({
      type: CREATE_POST,
      payload: data
    })

    showAlert({ dispatch, message: 'Successfully Added', variant: 'success' })
  } catch (err) {
    console.log(err)
  }
}

export const updatePost = ({ id, forms }) => async (dispatch) => {
  try {
    const payload = { ...forms, userId: 1 }
    const { data } = await client.put(`/posts/${id}`, payload)

    dispatch({
      type: UPDATE_POST,
      payload: data
    })
  } catch (err) {
    console.log(err)
  }
}

export const deletePost = (id) => async (dispatch) => {
  try {
    await client.delete(`/posts/${id}`)

    dispatch({
      type: DELETE_POST,
      payload: id
    })
  } catch (err) {
    console.log(err)
  }
}

