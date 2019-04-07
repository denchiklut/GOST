import { combineReducers } from "redux";
import UsersReducer from './users-reducer'
import SelectedUser from './selected-user'

const reducers = combineReducers({
    users: UsersReducer,
    user: SelectedUser
})

export default reducers
