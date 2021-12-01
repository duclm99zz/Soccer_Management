import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/layout/App';
import './app/layout/styles.css'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import './index.css'
import 'semantic-ui-css/semantic.min.css'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux'
import { configureStore } from './app/store/configureStore';
import ScrollToTop from './app/common/utils/ScrollToTop';
import ReduxToastr from 'react-redux-toastr';


const store = configureStore()


const rootEl = document.getElementById('root')
function render(){
  ReactDOM.render(
    <Provider store = {store} >
      <BrowserRouter>
        <ScrollToTop>
          <ReduxToastr position='bottom-right' transitionIn='fadeIn' transitionOut='fadeOut' />
          <App/>
        </ScrollToTop>
      </BrowserRouter>
    </Provider>
  , rootEl)
}

if (module.hot) {
  module.hot.accept('./app/layout/App', function() {
    setTimeout(render)
  })
}
render()
reportWebVitals();
