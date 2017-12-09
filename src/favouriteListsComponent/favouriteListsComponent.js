import React, { Component } from 'react';
import {
    Link
  } from 'react-router-dom'
import $ from 'jquery'
import Remove from '../removeAlbumComponent/removeAlbumComponent';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {removeAlbum} from '../actions/albumAction';

let tempRecords = [], options =[], listObject;

class FavouriteList extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {albumsListState: {}, showSection: false,
         totalNumberOfRecord: 0, albumsRecords : [], 
         showTable: false, filterState: [], selectedName: '', showReset: false, default: '0'};
         this.filterFavourite = this.filterFavourite.bind(this);
         this.resetResult = this.resetResult.bind(this);
    }

    /*************** 
     * invoke the initializeComponent function when the component is mounting 
     * and fill the data table with the albums that are added to the list 
     * ***/
    componentWillMount()
    {
       this.initializeComponent();
    }
    /*********************** end **************************/

    /*****************hide the loader after the component is mounted */
    componentDidMount()
    {
       $('#load').hide();
    }
    /****************end ***********************/

    /***************this function filters the albums by artist name if applied ****/
    filterFavourite(e)
    {
       let name = e.target.value, searchState = [];
       $('#load').show();
       if(name !== '0')
       {
        listObject.map((value) => {    
            if(name === value.artistName)
            {
               searchState.push(<tr key = {Math.random()}> 
                   <td>{value.artistName}</td>
                   <td>{value.collectionName}</td>
                   <td>{value.trackName}</td>
                   <td><img src={value.artworkUrl100}  alt="search" className ="artwork"/></td>
                   <td>{value.releaseDate.substring(0,10)}</td>
                   <td>{value.trackPrice}</td>
                   <td>{value.collectionPrice}</td>
                   <td>{value.country}</td>
                   <td>{value.collectionViewUrl ? <a className="link" href = {value.collectionViewUrl ? value.collectionViewUrl: ''} target = "_blank">
                   <i className="fa fa-eye" ></i> More..</a> : 'N/A'}  </td>
                   <td><Remove  trackId = {value.trackId} trackName = {value.trackName}/></td>
                  </tr>)
             }   
             return searchState;
          });
           this.setState({showSection: false, totalNumberOfRecord: searchState.length,
           albumsRecords: searchState, showTable: true, filterState: options, showReset: true, default: name})
       }else
       {
            this.setState({showSection: false, totalNumberOfRecord: tempRecords.length,
            albumsRecords: tempRecords, showTable: true, filterState: options, showReset: false, default: '0'})
       }
    
      $('#load').hide();
 }
 /******************** end of filter function *************8*/

        /************** this function resets the filter ******/
        resetResult()
        {
            this.setState({ albumsRecords: tempRecords, 
                showReset: false, totalNumberOfRecord: tempRecords.length, default: '0'});
        }
        /******************** end of result function **********/

        /******************this function initializes the page and fill the data table  */
        initializeComponent()
        {
            let tempNames = [];
            listObject = JSON.parse(localStorage.getItem('albumsList'));         
           if(!listObject || listObject === 'null' || listObject.length === 0)
           {
              this.setState({showSection: true, showTable: false})
           }else{
                       tempRecords = [];
                       tempNames = [];
                       options=[];
                        listObject.map((value) => {
                      
                        if(! (tempNames.indexOf(value.artistName) > -1))
                        {
                            tempNames.push(value.artistName)
                        }                 
                    tempRecords.push(<tr key = {Math.random()}> 
                    <td>{value.artistName}</td>
                    <td>{value.collectionName}</td>
                    <td>{value.trackName}</td>
                    <td><img src={value.artworkUrl100}  alt="search" className ="artwork"/></td>
                    <td>{value.releaseDate.substring(0,10)}</td>
                    <td>{value.trackPrice}</td>
                    <td>{value.collectionPrice}</td>
                    <td>{value.country}</td>
                    <td>{value.collectionViewUrl ? <a className="link" href = {value.collectionViewUrl ? value.collectionViewUrl: ''} target = "_blank">
                    <i className="fa fa-eye" ></i> More..</a> : 'N/A'}  </td>
                    <td><Remove trackId = {value.trackId} trackName = {value.trackName}/></td>
                   </tr>)

                   return tempRecords;
            });
    
            for(let i=0; i<tempNames.length; i++)
            {
                options.push(<option name={tempNames[i]} value = {tempNames[i]} key = {Math.random()}>{tempNames[i]}</option>)
            }
              this.setState({showSection: false, totalNumberOfRecord: listObject.length,
                 albumsRecords: tempRecords, showTable: true, filterState: options});
           }
        }
        /*******************end of initialize function******** */
        
        /******************this lifecycle rerender the page upon any changes in the redux store */
           componentWillReceiveProps(nextProps)
           {
                this.initializeComponent();
           }
          /*******************end *********************************/

    /************************ render function *********************/
    render()
    {
        return ( <div className="home container">
      <div className = "row">   
      <div className = "col-xs-11 col-sm-2 col-md-2 col-lg-2 col-xl-2">             
            <button style = {{ display: this.state.showTable ? 'block' : 'none' }} type="button" className="btn btn-warning count">Count <span className="badge">
            {this.state.totalNumberOfRecord}</span></button>
      </div>

      <div className = "col-xs-11 col-sm-4 col-md-4 col-lg-4 col-xl-4"> 
         <h3 style = {{ display: this.state.showTable ? 'block' : 'none' }} className = "result">Favourite Albums</h3>
      </div>

      <div className = "col-xs-11 col-sm-2 col-md-2 col-lg-2 col-xl-2"> 
          <label onClick={this.resetResult} style = {{ display: this.state.showReset ? 'block' : 'none' }} className = "btn btn-primary dng"><i className="fa fa-refresh" aria-hidden="true"></i> Reset</label>
     </div>

     <div className = "col-xs-11 col-sm-3 col-md-3 col-lg-3 col-xl-3"> 
      <select value = {this.state.default} style = {{ display: this.state.showTable ? 'block' : 'none' }}   className = "form-control filter" onChange = {(e) => this.filterFavourite(e)}>
         <option value = "0"> Filter By Name </option>
           {this.state.filterState}
      </select>
     </div>

     <div className = "col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1">
                <Link to = "/"> <i data-toggle="tooltip" title="Go To Home" className="fa fa-home listHome" aria-hidden="true"></i></Link> 
      </div>

      </div>
      <div className="table-responsive"> 
         {/***** Data table for showing the favourite lists ******/}
         <table className="table table-striped" style = {{ display: this.state.showTable ? 'inline-table' : 'none' }}>
         <thead>
           <tr>
             <th className = "th">Artist Name</th>
             <th className = "th">Name</th>
             <th className = "th">Track Name</th>
             <th className = "th">Artwork</th>
             <th className = "th"> Release Date</th>
             <th className = "th"> Track Price</th>
             <th className = "th"> Price</th>
             <th className = "th">Country</th>
             <th className = "th">Information</th>
             <th className = "th">Remove</th>
           </tr>
         </thead>
         <tbody className = "tbody">
           {this.state.albumsRecords}
         </tbody>
       </table>
       {/****************** table ends here *************/}     
    </div>

       {/* hidden by default */}
         <div style = {{ display: this.state.showSection ? 'block' : 'none' }}>
            <h4 className = 'note'>Sorry, You don't have any favourite album <Link to = "/search"><button className = "btn btn-warning"> 
            <i className="fa fa-plus" aria-hidden="true"><i>Add Now</i></i></button> </Link></h4>
        </div>

      </div>)
    }
}


function mapStateProps(state)
{
  return ({
           removeAlbum: state.removeAlbum,
           addAlbum: state.addAlbum
         });
}

function matchDispatchToProps(dispatch)
{
    return bindActionCreators({removeAlbum: removeAlbum}, dispatch)
}
export default connect(mapStateProps, matchDispatchToProps)(FavouriteList);