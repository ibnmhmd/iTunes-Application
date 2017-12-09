
/******** this action adds an album to the favourite list */
export const addAlbum = (album) => {
    return ({
        type: 'ADD_ALBUM',
        payload: album
    })
}
/*********************end of add to album  *******************/


/***********this action removes an album from the favourite list */
export const removeAlbum = (trackId) => {
    return ({
         type: 'REMOVE_ALBUM',
         payload: trackId
    })
}
/*********************** end of remove album *********************/