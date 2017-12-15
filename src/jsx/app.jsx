"use strict";
import React from 'react';
import ReactDom from 'react-dom';

//componens
import Header from './components/header';
import Footer from './components/footer';
import Main from './components/main';

export default class App extends React.Component {
  constructor() {
    super();
    // this.state = {
    //   title: 'Coolest',
    //   name: 'Justin',
    //   age: 20
    // }
  }

  render() {
    return(
      <div className="l-container">
        <Header />
        <Main />
        <Footer />
      </div>
    )
  }
}

ReactDom.render(
  <App/>,
  document.getElementById('app')
)