import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import apiMiddleware from '../middlewares/api';
import blocksMiddleware from '../middlewares/blocks';
import reviewsMiddleware from '../middlewares/reviews';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(apiMiddleware, blocksMiddleware, reviewsMiddleware),
    )
  );

  if (module.hot) {
    //Enable webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    })
  }

  return store;
}
