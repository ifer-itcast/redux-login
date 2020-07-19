import * as actionTypes from './actionTypes';
import findIndex from 'lodash/findIndex';

export default (state = [], action) => {
    switch(action.type) {
        case actionTypes.ADD_FLASH:
            return [
                ...state,
                action.payload
            ];
        case actionTypes.DELETE_FLASH:
            const idx = findIndex(state, { id: action.payload });
            return [
                ...state.slice(0, idx),
                ...state.slice(idx+1)
            ];
        default:
            return state;
    }
};