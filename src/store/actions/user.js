import { CREATE_USER, DELETE_USER, EDIT_USER, READ_USERS, UPDATE_USER } from '../types/user'
import { v4 as uuidV4 } from 'uuid'
import firebase from '../../config/firebase'

const fireStore = firebase.collection('users')

export const fetchUser = () => (dispatch) => {
  try {
    fireStore
      .onSnapshot(snapshot => {
        let payload = []
        snapshot.forEach((doc) => payload.push(doc.data()))

        dispatch({
          type: READ_USERS,
          payload
        })
      })
  } catch (err) {
    console.log(err)
  }
}

export const fetchSingleUser = (uuid, formikRef) => async (dispatch) => {
  try {
    let payload = {}
    const snapchat = await fireStore.where('id', '==', uuid).get()

    snapchat.forEach(doc => {
      payload.user = doc.data()

      const fields = ['firstName', 'lastName', 'email']
      fields.forEach(field => {
        if ('setFieldValue' in formikRef.current) {
          formikRef.current.setFieldValue(field, payload.user[field], false)
        }
      })
    })

    dispatch({
      type: EDIT_USER,
      payload
    })
  } catch (err) {
    console.log(err)
  }
}

export const saveUser = (forms) => async (dispatch) => {
  try {
    const payload = { ...forms, id: uuidV4() }
    await fireStore.doc().set(payload)

    dispatch({
      type: CREATE_USER,
      payload
    })
  } catch (err) {
    console.log(err)
  }
}

export const updateUser = ({ uuid, forms }) => async (dispatch) => {
  try {
    const snapshot = await fireStore.where('id', '==', uuid).get()
    snapshot.forEach(doc => doc.ref.update(forms))

    dispatch({
      type: UPDATE_USER,
      forms
    })
  } catch (err) {
    console.log(err)
  }
}

export const deleteUser = (uuid) => async (dispatch) => {
  try {
    const snapshot = await fireStore.where('id', '==', uuid).get()
    snapshot.forEach(doc => doc.ref.delete())

    dispatch({
      type: DELETE_USER,
      payload: { uuid }
    })
  } catch (err) {
    console.log(err)
  }
}

