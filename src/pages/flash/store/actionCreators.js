import * as actionTypes from './actionTypes';

export const flashAdd = data => {
  return {
    type: actionTypes.ADD_FLASH,
    payload: data
  }
};

export const flashDel = id => {
  return {
    type: actionTypes.DELETE_FLASH,
    payload: id
  };
};