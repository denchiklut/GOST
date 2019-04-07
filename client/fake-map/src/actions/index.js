import fake from '../apis/fake'
export const FETCH_USERS = "FETCH_USERS"
export const SELECT_USER = "SELECT_USER"

export const fetchUsers = () => async dispatch => {
    const response = await fake.get('/features')

    dispatch({type: FETCH_USERS, payload: response.data.features})
}

export const selectUser = user => dispatch => {
    dispatch({type: SELECT_USER, payload: user})
}
