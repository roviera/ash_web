import * as types from './actionTypes';
import animalApi, { parseAnimal, parseFilter, parseEditAnimal } from '../api/animalApi';
import { parseImage } from '../api/imagesApi';
import * as consts from '../constants/apiConstants.js';

export const sendAnimalFormSuccess = (response) => {
  return {
    type: types.SEND_ANIMAL_FORM_SUCCESS,
    response
  };
};

export const sendAnimalFormError = (errors) => {
  return {
    type: types.SEND_ANIMAL_FORM_ERROR,
    errors
  };
};

export const loadSpeciesSuccess = (response) => {
  return {
    type: types.LOAD_SPECIES_SUCCESS,
    response
  };
};

export const loadSpeciesError = (errors) => {
  return {
    type: types.LOAD_SPECIES_ERROR,
    errors
  };
};

export const cancelAnimalForm = () => {
  return {
    type: types.CANCEL_ANIMAL_FORM
  };
};

export const showAnimalPerfil = (animal) => {
  return {
    type: types.SHOW_ANIMAL_PROFILE,
    animal
  };
};

export const showAnimalPerfilImages = (response, page) => {
  return {
    type: types.SHOW_ANIMAL_PROFILE_IMAGES_SUCCESS,
    response,
    page
  };
};

export const uploadImageAnimalSuccess = () => {
  return {
    type: types.UPLOAD_IMAGE_ANIMAL_SUCCESS
  };
};

export const uploadImageAnimalError = (errors) => {
  return {
    type: types.UPLOAD_IMAGE_ANIMAL_ERROR,
    errors
  };
};

export const loadAnimalsSuccess = (response, row, filterParam) => {
  return {
    type: types.LOAD_ANIMALS_SUCCESS,
    row,
    filterParam,
    response
  };
};

export const cleanAnimalsSuccess = () => {
  return {
    type: types.CLEAN_ANIMALS_SUCCESS
  };
};

export const serchAnimalsStart = () => {
  return {
    type: types.SEARCH_ANIMALS_START
  };
};

export const serchAnimalsSuccess = (response, filterParam) => {
  return {
    type: types.SEARCH_ANIMALS_SUCCESS,
    filterParam: filterParam,
    response
  };
};

export const serchAnimalsError = (response) => {
  return {
    type: types.SEARCH_ANIMALS_ERROR,
    response
  };
};

export const editAnimalSucces = (response) => {
  return {
    type: types.EDIT_ANIMAL_SUCCESS,
    response
  };
};

export const editAnimalError = (errors) => {
  return {
    type: types.EDIT_ANIMAL_ERROR,
    errors
  };
};

export const removeAnimalImageSucces = (response, id_image) => {
  return {
    type: types.REMOVE_IMAGE_ANIMAL_SUCCESS,
    response,
    id_image: id_image
  };
};

export const removeAnimalImageError = (response) => {
  return {
    type: types.REMOVE_IMAGE_ANIMAL_ERROR,
    response
  };
};

export const deleteAnimalSuccess = () => {
  return {
    type: types.DELETE_ANIMAL_SUCCESS
  };
};

export const deleteAnimalError = (response) => {
  return {
    type: types.DELETE_ANIMAL_ERROR,
    response
  };
};

export const sendAnimalForm = (animal) => {
  return (dispatch) => {
    let animalJson = parseAnimal(animal);
    return animalApi.sendForm(animalJson).then((response) => {
      dispatch(sendAnimalFormSuccess(response));
    }).catch(err => {
      dispatch(sendAnimalFormError(err));
    });
  };
};

export const uploadImageAnimal = (image, id) => {
  return (dispatch) => {
    let imageJson = parseImage(image);
    return animalApi.uploadImage(imageJson, id).then(() => {
      dispatch(uploadImageAnimalSuccess());
    }).catch(err => {
      dispatch(uploadImageAnimalError(err));
    });
  };
};

export const loadSpecies = () => {
  return (dispatch) => {
    return animalApi.getSpecies().then(species => {
      dispatch(loadSpeciesSuccess(species));
    }).catch(err => {
      window.location.replace("/login");
      dispatch(loadSpeciesError(err));
    });
  };
};

export const showPerfilAnimal = (id_animal) => {
  return (dispatch) => {
    return animalApi.showAnimal(id_animal).then(animal => {
      dispatch(showAnimalPerfil(animal));
    });
  };
};

export const showPerfilAnimalImages = (id_animal, page) => {
  return (dispatch) => {
    return animalApi.showAnimalImages(id_animal, page).then(animal => {
      dispatch(showAnimalPerfilImages(animal, page));
    }).catch(err => {
      throw (err);
    });
  };
};

export const removePerfilAnimalImages = (id_animal, id_image) => {
  return (dispatch) => {
    return animalApi.removeAnimalImages(id_animal, id_image).then(response => {
      dispatch(removeAnimalImageSucces(response, id_image));
    }).catch(err => {
      dispatch(removeAnimalImageError(err));
    });
  };
};

export const loadAnimals = (col, row, filterParam) => {
  return (dispatch) => {
    if (!filterParam) {
      return animalApi.getAnimals(col, row).then(animals => {
        dispatch(loadAnimalsSuccess(animals, row));
      }).catch(err => {
        throw (err);
      });
    } else {
      let parsedFilter = parseFilter(filterParam);
      return animalApi.getSerchAnimals(col, row, parsedFilter).then(animals => {
        dispatch(loadAnimalsSuccess(animals, row, filterParam));
      }).catch(err => {
        throw (err);
      });
    }
  };
};

export const cleanAnimals = () => {
  return (dispatch) => {
    dispatch(cleanAnimalsSuccess());
  };
};

export const editAnimal = (id_animal, animal) => {
  return (dispatch) => {
    let animalJson = parseEditAnimal(animal.animal);
    return animalApi.editAnimal(id_animal, animalJson).then(response => {
      dispatch(editAnimalSucces(response));
      showPerfilAnimal(id_animal)(dispatch);
    }).catch(err => {
      dispatch(editAnimalError(err));
    });
  };
};

export const searchAnimal = (filter) => {
  return (dispatch) => {
    dispatch(serchAnimalsStart());
    let filterParam = parseFilter(filter);
    return animalApi.getSerchAnimals(consts.ANIMAL_PAGE_SIZE, 1, filterParam).then(response => {
      dispatch(serchAnimalsSuccess(response, filter));
    }).catch(err => {
      dispatch(serchAnimalsError(err));
    });
  };
};

export const deleteAnimal = (animalId) => {
  return (dispatch) => {
    return animalApi.deleteAnimal(animalId).then(() => {
      dispatch(deleteAnimalSuccess());
    }).catch(err => {
      dispatch(deleteAnimalError(err));
    });
  };
};
