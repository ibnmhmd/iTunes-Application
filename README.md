## iTunes Application using React & Redux
This is a small iTunes app developed using React, Redux and iTunes APIs.  

## Functionality  
This app contains four functionalities :-  
1- It allows you to search for any artist in the iTunes store.  
2- It gives you the ability to add albums to the list of your favourites.  
3- It has the ability to filter the albums in the list of favourites using **Artist Name**.  
4- You can also remove albums from the list of favourites.  

## Features  
The app has the following features  
1- It shows the total number of records fetched by any search result.  
2- It displays the total number  of albums added to the list of favourites (right next to Favourite Albums Button).  
3- It performes live update to the count of the albums in the favourite list upon :-  
- applying filter by artist.  
- removing any album from the list.   

Please read below mentioned points to help you start using it.  

## Quick Start
1- Clone the git repo https://github.com/ibnmhmd/iTunes-App.git into your PC.  
2- Open it using any of your favourite IDEs.  
3- Open a command prompt from the project directory.  
4- Run **npm install** to download dependencies.  
5- After successful dependencies installation, run **npm start**.   

 Node will automatically launch your browser with the following address :- *localhost:3000*, now you should see the project's Home Page.   

 ## Design
 The app has been designed in a simple way by taking the following points into consideration :-  

 - Simplicity.  
 - Ease of use.  
 - Reliable navigation between pages.
 - Meaningful icons and tool tips to help users on how to use it.   
 - Counts on every screen to allow users keep track of their operations.  
 - Responsiveness.
 - Description of every album (if exists) on the iTunes official page (More link).  
 - Artifact zooming on hover over.

 ## Implemention Decision
 The app has been implemented by following *React*, *Redux*, *Frontend*, *OOP* and *OOD* programming conventions.  

 following are few points about the implementation :-  

1- it consists of groups of **components** such that every **component** performs specific task.  
      Ex:-  
- The **Home Page** is a component containing the two buttons.  
- The **Search Page** and its input text is a seperate component.  
- The **Search Result (data table)** is a seperate component.  
- The **Add To Favourite** button is a seperate component.  
- The **List of favourite albums** is a seperate component.  
- The **Remove button** is also a seperate component.

2- maintainability of the project has been taken into consideration, every component is well documented  
- functions.  
- component lifecycles.
- and so on ....  

3- the search input field is well protected against malicious input no *SPECIAL CHARACTER or SPACE* is   allowed, only **NUMBERS & ALPHABETS**.  


4- an album cannot be added to the list twice, the **Favourite This** button is automatically disabled  after an album is successfully being added to the list.

5- **REDUX** is used for softly maintaining and tracking the application **Data Store**.

6- **React Storage** is used as a backup to hold data when *Redux* loses its state.  
- E.g:-  
- on browser reload.  
- when performing new search and adding new albums to the list.  

7- the composition of the  *components* makes the application more *robust*, *resilient*, *maintainable* and easy to use.  

8- if any one wants to modify the project, he/she will directly go to the desired component only E.g: *Remove Album From List* and modifies that component only, therefore no need to touch any other components.


-------------------------
**By : Amine Mahamat Amine**
