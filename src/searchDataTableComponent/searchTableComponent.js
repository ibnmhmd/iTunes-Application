import React, { Component } from 'react';
import iTunesAPIEndPoints from '../iTunesAPIEndPoint';
/* ---- importing the navigation component */
import AddToListButton from '../addToFavouriteListComponent/addToListButtonComponent';
import 'font-awesome/css/font-awesome.min.css';
import $ from 'jquery'

export class SearchTable extends Component {
   /* ***** constructor ***/
   constructor(props) {
    super(props);
    this.state = {records: [], totalNumberOfRecord: 0, showSection: false, showTable: false};
  }
  
    /******************this lifecycle check the input text, 
     * if it's valid then it invokes the search function */
    componentWillReceiveProps(nextProps)
    {
       if(nextProps.val !== "" && nextProps.val !== undefined && nextProps.eventKey !== 0)
       {
          this.getDataFromiTunes(nextProps.val);
       }else
        if(nextProps.eventKey === 0)
        {
             
        }else
          {
            this.setState({totalNumberOfRecord: 0, showSection: false, showTable: false});   
          }
    }
    /********************* end of lifecycle */


    /***** Search Artist using the iTunes API*******/
    getDataFromiTunes(term)
    {  
      let rows = [], self = this;
      $('#load').show();
        fetch(iTunesAPIEndPoints.searchEndPoint+term).then(payLoad => { return payLoad.json()}).then(data => {
          self.setState({totalNumberOfRecord:data.resultCount });

          /*************** loop the result and set rows  ***************/
          if(data.resultCount !== 0)
          {
            data.results.map((value) => 
            
              rows.push(<tr key = {value.trackId}> 
                        <td>{value.artistName}</td>
                        <td>{value.collectionName}</td>
                        <td>{value.trackName}</td>
                        <td><img src={value.artworkUrl100}  alt="search" className ="artwork"
                         onClick={this.searchArtist}/></td>
                        <td>{value.releaseDate.substring(0,10)}</td>
                        <td>{value.trackPrice}</td>
                        <td>{value.collectionPrice}</td>
                        <td>{value.country}</td>
                        <td>{value.collectionViewUrl ? <a className="link" href = {value.collectionViewUrl ? value.collectionViewUrl: ''} target = "_blank">
                        <i className="fa fa-eye" ></i> More..</a> : 'N/A'}  </td>
                        <td><AddToListButton trackInstance = {value}/></td>
                       </tr>)
            )

            /******** set state *************/
            this.setState({showSection: false, showTable: true, records: rows});   
          }else
          {
            this.setState({showSection: true, showTable: false});   
          }
         
          $('#load').hide();
        }).catch( err => console.log(err));
    }
    /**********************search ends  *****************************/
 
    /****************************render function ******************** */
  render() {
    return (
      <div className="home">
      <button style = {{ display: this.state.showTable ? 'block' : 'none' }} type="button" className="btn btn-primary count">Count <span className="badge">
      {this.state.totalNumberOfRecord}</span></button>
    
      <h3 style = {{ display: this.state.showTable ? 'block' : 'none' }} className = "result">Search Result</h3>
      <div className="table-responsive">  
         {/***** Data table for showing the search result ******/}
         <table className="table table-striped" style = {{ display: this.state.showTable ? 'initial' : 'none' }}>
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
             <th className = "th">Add To Favourite</th>
           </tr>
         </thead>
         <tbody className = "tbody">
           {this.state.records}
         </tbody>
       </table>
   </div>
       {/* hidden by default */}
         <div style = {{ display: this.state.showSection ? 'block' : 'none' }}>
            <h3 className = 'note'>Sorry, No records found </h3>
        </div>
      </div>
    );
  }
}
