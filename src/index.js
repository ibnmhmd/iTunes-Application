import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import App from './App';
import {Provider} from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import {createStore, applyMiddleware} from 'redux';
import allReducers from './reducers/index';
import {createLogger } from 'redux-logger';

import {reactLocalStorage} from 'reactjs-localstorage';

/******** Creating a store for the application data state and combining all reducers *****/
const store = createStore(allReducers, {}, applyMiddleware(createLogger()));
/********************* end of store creation *****************************/
let object = [];

/************* subscribing to the store to listen for any changes that occur in the store */
store.subscribe(() => {
    object = [];
    if(store.getState().addAlbum.albumsList)
    {
        store.getState().addAlbum.albumsList.map((_instance) => {  
            object.push(_instance);
            return object;
        });
        /*************** setting the store content to a localstorage so that we can keep
         * track of the albums that are added to the favourite list 
         * Note: we don't want to lose the albums in the list on browser reload.
         */
        reactLocalStorage.setObject('albumsList',object ) ;
    }else
    {
        reactLocalStorage.setObject('albumsList', null) ;
    }
  
});
/************************ subscription ends ***************************/

/**************************injecting and rendering the App root component into the DOM*/
ReactDOM.render(<Provider store = {store}> 
                    <App />
                </Provider> ,document.getElementById('root'));

registerServiceWorker();
/************************* rendering ends ****************************/