import {combineReducers} from 'redux';
import AddAlbumReducer from './albumsReducer';
import RmoveAlbumReducer from './removeAlbumsReducer';

/******************main reducer which combines all reducers *****/
const  allReducers = combineReducers({
       addAlbum: AddAlbumReducer,
       removeAlbum: RmoveAlbumReducer
});

export default allReducers;