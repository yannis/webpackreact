import * as Actions from '../actions';

const reviewsMiddleware = ({ dispatch }) => next => action => {

  if (action.type === Actions.UPDATE_REVIEW || action.type === Actions.ADD_REVIEW) {
    let payload = action.payload;
    dispatch(Actions.setBlockForm(null));
    dispatch(Actions.editElement(null));
    if (payload.included) {
      let unit = payload.included.filter((item) => {
        return item.type === 'units';
      })[0]
      dispatch(Actions.setUnit(unit));
    }
  }

  next(action);
}

export default reviewsMiddleware;
