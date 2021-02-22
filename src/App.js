import React from 'react';

//Router
import { ConnectedRouter } from 'connected-react-router'
import { history } from './redux/store/middleware'

//custom stylesheet
import './css/Custom.scss';

//devtools
import DevTools from './containers/DevTools.jsx'

import { Provider } from 'react-redux'

import configureStore from './redux/store/index'

// Layout components
import Header from './components/Header'
import Footer from './components/Footer'
import PageContent from './components/PageContent';
import ConnectedLoading from './containers/ConnectedLoading'
import ConnectedError from './containers/ConnectedError'

//init redux store
const store = configureStore()

console.log('initializing store: ', store.getState())

// const unsubscribe = store.subscribe(() => {
//   //console.log('state changed: ', store.getState())
// })




const App = () => (
  <Provider store={store}>
    <div className="App">
      <ConnectedRouter history={history}>
        <Header />
        <PageContent />
        <ConnectedLoading />
        <ConnectedError />
        <Footer />
      </ConnectedRouter>
      {/* exclude devtools in production */}
      {(process.env.NODE_ENV !== 'production') && <DevTools />}
    </div>
  </Provider>
);

export default App;

