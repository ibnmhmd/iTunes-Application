import React, { Component } from 'react';
import search from '../assets/img/search.png';
import {SearchTable} from '../searchDataTableComponent/searchTableComponent';
import 'font-awesome/css/font-awesome.min.css';
import $ from 'jquery';
import {
  Link
} from 'react-router-dom';

export class HomePage extends Component {
 
    constructor(props) {
        super(props);
        this.state = {value: '', keywordState: '', keyCode : 0};
        this.handleChange = this.handleChange.bind(this);
        this.searchArtist = this.searchArtist.bind(this);
        this.enterKey = this.enterKey.bind(this);
      }

  
    /***** Search Artist function 
     * this function sets the search keyword 
     * *******/
    searchArtist()
    {
      this.setState({keywordState: $('.input').val(), keyCode: 13})
    }
   /*****************search ends  ************/

   /******************perform search if Enter key is pressed ****/
    enterKey(event)
    {
      if(event.keyCode === 13)
      {
        this.searchArtist();
      }else
     
      {
        this.setState({keyCode: 0})
      }
    }
    /********************ends of enter key search **************/

    /******************this function handles the input text 
     * and prevent any special character or space*/
    handleChange(event) {  
     
        const regex = /^[0-9aA-zZ\b]+$/;
        if (event.target.value === '' || regex.test(event.target.value)) {
          this.setState({value: event.target.value})
        } 
      }
      /********************* handle function ends  ***********/
         componentDidMount()
        {
           $('#load').hide();
        }
    
    /*******************render function ******************/
  render() {
    return (
      <div className="container home">
           {/* header note */}
           < div className = "row">
              <div className = "col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                 <h5 className = "cl">* Please use the <span>search box</span> below to quickly look for your favorite artists *</h5>
             </div>
             <div className = "col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1">
                <Link to = "/"> <i data-toggle="tooltip" title="Go To Home" className="fa fa-home list" aria-hidden="true"></i></Link> 
             </div>
            
             <div className = "clearfix"> </div>
           </div>
             
           <br/>
          
          {/*search box and search icon starts*/}
            <div className="row moveUp">
                  <div className="col-xs-8 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <input type ="text" className="form-control input"
                     onChange ={this.handleChange} onKeyDown = {this.enterKey}
                     value={this.state.value}
                     placeholder="Enter Artist Name"/>
                 </div>
                 <div onClick={this.searchArtist} data-toggle="tooltip" title="Search" className="searchDiv col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 round">
                     <a > <img src={search}  alt="search" className ="searchImg" onClick={this.searchArtist}/></a>
                  </div>
                  <div className = "clearfix"> </div>
            </div>
            {/* artist search box end*/}

        {/* data table and search result component */}
        <SearchTable val ={this.state.keywordState} eventKey = {this.state.keyCode}/>
        {/* data table and search result component ends*/}

      </div>
    );
  }
}

