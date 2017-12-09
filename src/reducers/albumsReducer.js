
let initialList = localStorage.getItem('albumsList');

/*****************this snippet sets the store with the available albums if found,
 * otherwise initializes an empty store .
 */
if(initialList === undefined || initialList === 'null' || initialList === null)
{  
    initialList = [];
}else{
      initialList = JSON.parse(initialList);
}
const initialState = {
    id: 0,
    albumsList: initialList
};
/********************end *******************************/


/********************* this is the main reducer which adds and removes albums base on the action sent*/
export default function (state = initialState, action) {
   
    switch(action.type)
    {
        case 'ADD_ALBUM':
        state = { ...state, 
                 id: state.id + 1,
                 albumsList: [ ...state.albumsList, action.payload]} ;
                 break;
              
        case 'REMOVE_ALBUM':
        const trackId = action.payload;
          let albums = state.albumsList.filter(album => album.trackId !== trackId);  
          state = {
                  ...state,
                 albumsList: albums} ;
        
          break;   
          
          default:  return state;
    }
    return state;
}
/***********************reducer ends  ****************************************/