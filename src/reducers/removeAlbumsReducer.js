export default function (state = {}, action) {
    
       switch(action.type)
       {
           case 'REMOVW_ALBUM':
            
          //  state = { ...state, 
          //           id: state.id + 1,
          //           albumsList: [ ...state.albumsList, action.payload]} ;
                    break;
                    default:  return state;
       }
       return state;
   }