import {
  SET_RESOURCES,
  SET_RESOURCE_FORM,
  ADD_RESOURCE,
  EDIT_RESOURCE,
  REMOVE_RESOURCE,
  UPDATE_RESOURCE } from '../actions';

const initialState = {
  resources: [],
  editingResource: null,
  addingResource: false
}

export default function resources(state = initialState, action) {
  let resources;
  switch (action.type) {
    case SET_RESOURCES:
      resources = action.payload.data || action.payload;
      return { ...state, resources }
    case SET_RESOURCE_FORM:
      return { ...state, addingResource: action.payload }
    case ADD_RESOURCE:
      var newResources = state.resources.filter((resource) => {
        return resource.id !== action.payload.data.id
      }).concat(action.payload.data)
      return { ...state, resources: newResources, addingResource: false }
    case EDIT_RESOURCE:
      return { ...state, editingResource: action.payload }
    case REMOVE_RESOURCE:
      resources = state.resources.filter((resource) => {
        return resource.id !== action.payload.data.id
      });
      return { ...state, resources }
    case UPDATE_RESOURCE:
      let newResources = state.resources.filter((resource) => {
        return resource.id !== action.payload.data.id
      });
      let resources = newResources.concat(action.payload.data)
      return { ...state, resources, editingResource: null }
    default:
      return state
  }
}
