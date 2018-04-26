import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../../reducers/learn';
import apiMiddleware from '../../middlewares/api';
// import learnApiMiddleware from '../../middlewares/learn/api';
// import blocksMiddleware from '../middlewares/blocks';
// import reviewsMiddleware from '../middlewares/reviews';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(apiMiddleware),
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  if (module.hot) {
    //Enable webpack hot module replacement for reducers
    module.hot.accept('../reducers/learn', () => {
      const nextRootReducer = require('../reducers/learn').default;
      store.replaceReducer(nextRootReducer);
    })
  }

  return store;
}
