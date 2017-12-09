import React, { Component } from 'react';
/******* import 
 * bind action creators and connect from redux library */
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

/********* import add album action ******/
import {addAlbum} from '../actions/albumAction';

/**********import popup dialog from bootstrap ***/
import Dialog from 'react-bootstrap-dialog'


class AddToListButton extends Component {

  constructor(props)
  {
    super(props)
    this.state ={disableButton: false};
    this.addTrackToStore = this.addTrackToStore.bind(this);
  }

  /**************this action adds a track to the albums store */
  addTrackToStore()
  {
     this.props.addAlbum(this.props.trackInstance);
     this.dialog.show({
      title: 'Favourite List Notification',
      body:'*'+ this.props.trackInstance.collectionName +'*  has been successfully added to your favourite list.',
      actions: [
        Dialog.OKAction()
      ],
      bsSize: 'medium',
      onHide: (dialog) => {
        dialog.hide()
      }
    });

    /*****************set time out to automatically close the popup after 2 seconds */
    setTimeout(() => {
      this.dialog.hide();
    }, 2000);
    /**************end of time out ******************************/

    /**************disable the button after adding an album to the favourite list*/
    this.setState({disableButton: true});
    /************end *********************/
  
  }
  render() {
    return (
      <div className="App">
           <button disabled ={this.state.disableButton}  onClick ={this.addTrackToStore} className = "btn btn-warning btn-normal"> <i className="fa fa-heart" aria-hidden="true"></i> Favourite This </button>
           <Dialog ref={(el) => { this.dialog = el }} />
      </div>
    );
  }
}

/*************this function maps redux state with this component props */
function mapStateProps(state)
{
  return ({addAlbum: state.addAlbum})
}
/*******************end of map *********************/

/********this function matches redux functions(actions) with this component props */
function matchDispatchToProps(dispatch)
{
    return bindActionCreators({addAlbum: addAlbum}, dispatch)
}
/************end ***********************/

/*******************the connect function makes the component smart and connects it with the redux */
export default connect(mapStateProps, matchDispatchToProps)(AddToListButton);

