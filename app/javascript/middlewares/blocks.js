import * as Actions from '../actions';

const blocksMiddleware = ({ dispatch }) => next => action => {

  if (action.type === Actions.ADD_BLOCK_AND_ELEMENT) {
    let payload = action.payload;
    let block = payload.data;
    dispatch(Actions.editElement(null));
    dispatch(Actions.showMarkdownPreview(null));
    dispatch(Actions.setBlockForm(null));
    dispatch(Actions.addBlock(block));
    if (action.payload.included) {
      let elements = action.payload.included.filter((item) => {
        return item.type !== 'blocks';
      })
      elements.forEach((element) => {
        dispatch(Actions.addElement(element))
      })
    }
  }

  if (action.type === Actions.AUTOUPDATE_BLOCK_AND_ELEMENT) {
    let payload = action.payload;
    let block = payload.data;
    dispatch(Actions.setBlockForm(null));
    dispatch(Actions.updateBlock(block));
    if (action.payload.included) {
      let elements = action.payload.included.filter((item) => {
        return item.type !== 'blocks';
      })
      elements.forEach((element) => {
        dispatch(Actions.updateElement(element));
        dispatch(Actions.editElement(element));
      })
    }
  }

  if (action.type === Actions.UPDATE_BLOCK_AND_ELEMENT) {
    let payload = action.payload;
    let block = payload.data;
    dispatch(Actions.editElement(null));
    dispatch(Actions.showMarkdownPreview(null));
    dispatch(Actions.updateBlock(block));
    if (action.payload.included) {
      let elements = action.payload.included.filter((item) => {
        return item.type !== 'blocks';
      })
      elements.forEach((element) => {
        dispatch(Actions.updateElement(element))
      })
    }
  }

  next(action);
}

export default blocksMiddleware;
