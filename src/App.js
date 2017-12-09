import React, { Component } from 'react';
import logo from './logo.svg';
import './assets/css/App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

/* ---- importing the homepage and favourite list components */
import {HomePage} from './homePageComponent/homeComponent';
import FavouriteList from './favouriteListsComponent/favouriteListsComponent';
import $ from 'jquery'
import {connect} from 'react-redux';

class App extends Component {
  /*******************component constructor *******/
  constructor(props)
  {
    super(props)
    this.state = {albumsCount: 0};
    $('#load').hide();
  }
/******************* end ***************/

  /*********************this lifecycle setting the count on any changes */
  componentWillReceiveProps(nextProps)
  {
    this.setState({albumsCount: nextProps.albumsCount});
  }
  /************************end  ***************************/

  /***************************render ************************/
  render() {

    return (<Router>
              <div className="App">
                  <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to the iTunes Application using pure <i>React & Redux</i> </h1>
                  </header>
                 <div className = "container">
                 <div className = "row nav">
                    <div className = "col-xs-12 col-sm-6 col-lg-6 col-md-6 col-xl-6">
                    <Link to ="/search"><button className = "btn btn-primary"> SEARCH FOR AN ARTIST</button></Link>
                   </div>
                   <div className = "col-xs-12 col-sm-6 col-lg-6 col-md-6 col-xl-6 album">
                    <Link to ="/favouriteAlbums"><button className = "btn btn-primary ">FAVOURITE ALBUMS &nbsp; <span className="badge badge-1">{this.props.addAlbum.albumsList.length}</span></button></Link>
                   </div>

                   <div className ="clearfix"></div>
                  </div>

                 </div>
            {/*  router starts*/}
               <Switch>
                  <Route exact path = "/favouriteAlbums" component = {FavouriteList} />
                  <Route exact path = "/search" component = {HomePage} />
               </Switch>
         {/*  router ends*/}
              </div>
          
          </Router>);
  }
}

/*****************get the store from redux ********/
function mapStateToProps(store)
{
  return  ({
             addAlbum : store.addAlbum
          })
}
/**********************end ************************/
export default connect(mapStateToProps)(App);
