import { SET_BLOCKS, SET_BLOCK_FORM, REMOVE_BLOCK, ADD_BLOCK, EDIT_BLOCK, UPDATE_BLOCK } from '../actions';

const initialState = {
  blocks: [],
  blockForm: null,
  editBlockForm: null,
}

export default function blocks(state = initialState, action) {
  let type = action.type;
  let payload = action.payload;
  switch (type) {
    case SET_BLOCKS:
      var blocks = payload.sort((a, b) => {
        return a.attributes.position - b.attributes.position
      })
      return { ...state, blocks }
    case ADD_BLOCK:
      var newBlocks = state.blocks.filter((block) => {
        return block.id !== payload.id
      });
      var blocks = newBlocks.concat([payload])
      return { ...state, blocks }
    case UPDATE_BLOCK:
      var newBlocks = state.blocks.filter((block) => {
        return block.id !== payload.id
      });
      var blocks = newBlocks.concat([payload])
      return { ...state, blocks }
    case REMOVE_BLOCK:
      var blocks = state.blocks.filter((block) => {
        return block.id !== payload.id
      });
      return { ...state, blocks }
    case SET_BLOCK_FORM:
      return { ...state, blockForm: payload }
    default:
      return state
  }
}
