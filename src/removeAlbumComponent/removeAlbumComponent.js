import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {removeAlbum} from '../actions/albumAction';
import Dialog from 'react-bootstrap-dialog'

 class Remove extends Component
{
    constructor(props)
    {
       super(props)
       this.removeAlbum = this.removeAlbum.bind(this);
    }

    /****************this function removes an album from the list */
    removeAlbum()
    {
        this.props.removeAlbum(this.props.trackId);
        this.dialog.show({
            title: 'Favourite List Notification',
            body:'*'+ this.props.trackName +'*  has been successfully removed from your favourite list.',
            actions: [
              Dialog.OKAction()
            ],
            bsSize: 'medium',
            onHide: (dialog) => {
              dialog.hide()
            }
          });
    //   setTimeout(() => {
    //        this.dialog.hide();
    //       }, 2000);
    }
    /********************function ends  *****************/

    /**********************render ***********************8*/
    render()
    {
        return (<div> 
                  <button onClick ={this.removeAlbum} className = "btn btn-danger adjust"><i className = "fa fa-times"></i></button>
                  <Dialog ref={(el) => { this.dialog = el }} />
               </div>)
    }
}

/*************this function maps redux state with this component props */
function mapStateProps(state)
{
  return ({addAlbum: state.addAlbum, removeAlbum: state.removeAlbum})
}
/*******************end of map *********************/

/********this function matches redux functions(actions) with this component props */
function matchDispatchToProps(dispatch)
{
    return bindActionCreators({removeAlbum: removeAlbum}, dispatch)
}
/************end ***********************/

export default connect(mapStateProps, matchDispatchToProps)(Remove);
