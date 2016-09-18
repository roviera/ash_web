import * as types from '../actions/actionTypes';
import initialState from './initialState';

const animalReducer = (state = initialState.animal, action) => {

  switch (action.type) {
    case types.SHOW_ANIMAL_PROFILE:
      return action.animal;
    case types.SHOW_ANIMAL_PROFILE_IMAGES_SUCCES: {
      const { images } = action.response;
      return Object.assign({}, state, { images });
    }
    default:
      return state;
  }
};

export default animalReducer;