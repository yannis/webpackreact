import * as Actions from '../actions';
import Rails from 'rails-ujs';
import Flash from '../utilities/flash';
import _ from 'lodash';

const apiMiddleware = ({ dispatch }) => next => action => {

  // API
  if (action.type === Actions.API) {
    let payload = action.payload;
    Rails.ajax({
      url: payload.url,
      type: payload.method,
      data: payload.data,
      success(response, message, xhr) {
        dispatch({ type: payload.success, payload: response });
        Flash.handleFlashMessagesHeader(window.flashDiv, xhr);
      },
      error(data, message, xhr) {
        if (payload.error) {
          dispatch({ type: payload.error, payload: data });
        }
        Flash.handleFlashMessagesHeader(window.flashDiv, xhr);
      }
    })
  }

  // FETCH
  if (action.type === Actions.FETCH) {
    let payload = action.payload;
    $.ajax({
      url: payload.url,
      method: payload.method,
      data: payload.data,
    }).done((response, message, xhr) => {
      payload.successCallbacks.forEach((action, index) => {
        dispatch({ type: action, payload: response });
      })
      Flash.handleFlashMessagesHeader(window.flashDiv, xhr);
      $('.modal').modal('hide');
    }).fail((data) => {
      if (payload.error) {
        dispatch({ type: payload.error, payload: data.responseJSON });
      }
      Flash.handleFlashMessagesHeader(window.flashDiv, data);
    })
  }
  next(action);

  // FETCH_UNIT
  if (action.type === Actions.FETCH_UNIT) {
    // fetchData(action.payload, response => dispatch(setUnit(response)))
    $.ajax({
      url: action.payload,
      method: 'GET',
    }).done((response) => {
      dispatch(Actions.setUnit(response.data));
      let blocks = [];
      let elements = [];
      let resources = [];
      let reviews = [];
      if (response.included) {
        blocks = response.included.filter((item) => {
          return item.type === 'blocks';
        }).sort((a, b) => {
          return a.attributes.position - b.attributes.position
        })
        elements = response.included.filter((item) => {
          return _.includes(['pages', 'videos', 'figures', 'singleChoiceQuizzs', 'multipleChoiceQuizzs', 'textQuizzs', 'feedbacks'], item.type);
        })
        resources = response.included.filter((item) => {
          return item.type === 'resources';
        })
        reviews = response.included.filter((item) => {
          return item.type === 'reviews';
        })
      }
      dispatch(Actions.setBlocks(blocks));
      dispatch(Actions.setElements(elements));
      dispatch(Actions.setResources(resources));
      dispatch(Actions.setReviews(reviews));
    }).fail((data) => {
      Flash.handleFlashMessagesHeader(window.flashDiv, data);
    })
  }

  // SORT_BLOCKS
  if (action.type === Actions.SORT_BLOCKS) {
    let url = action.payload.url;
    // couldn't make it work with Rails.ajax (data not going through)
    $.ajax({
      url,
      method: 'POST',
      data: action.payload.data
    }).done((response, message, xhr) => {
      Flash.handleFlashMessagesHeader(window.flashDiv, xhr);
      dispatch(Actions.setBlocks(response.data));
    }).fail((data) => {
      Flash.handleFlashMessagesHeader(window.flashDiv, data);
    })
  }

  // SORT_RESOURCES
  if (action.type === Actions.SORT_RESOURCES) {
    let url = action.payload.url;
    // couldn't make it work with Rails.ajax (data not going through)
    $.ajax({
      url,
      method: 'POST',
      data: action.payload.data
    }).done((response, message, xhr) => {
      Flash.handleFlashMessagesHeader(window.flashDiv, xhr);
      dispatch(Actions.setResources(response.data));
    }).fail((data) => {
      Flash.handleFlashMessagesHeader(window.flashDiv, data);
    })
  }

  // DESTROY_BLOCK
  if (action.type === Actions.DESTROY_BLOCK) {
    let url = action.payload.url;
    // couldn't make it work with Rails.ajax (data not going through)
    $.ajax({
      url,
      method: 'DELETE',
    }).done((response, message, xhr) => {
      Flash.handleFlashMessagesHeader(window.flashDiv, xhr);
      dispatch(Actions.removeBlock({id: action.payload.id}));
    }).fail((data) => {
      Flash.handleFlashMessagesHeader(window.flashDiv, data);
    })
  }

  // FETCH_TEACHERS
  if (action.type === Actions.FETCH_TEACHERS) {
    let url = action.payload;
    // couldn't make it work with Rails.ajax (data not going through)
    $.ajax({
      url,
      method: 'GET'
    }).done((response) => {
      dispatch(Actions.setTeachers(response.data));
    }).fail((data) => {
      alert('ERROR', data)
    })
  }

  next(action);
}

export default apiMiddleware;
