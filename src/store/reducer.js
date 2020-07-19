import { combineReducers } from 'redux';
import { reducer as registerReducer } from '../pages/register/store';

export default combineReducers({
    register: registerReducer 
});

