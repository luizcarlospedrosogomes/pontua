import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import PromocaoBox from './Promocao';

class App extends Component {

  render() {    
    return (
      <div id="layout">  
          <a href="#menu" id="menuLink" className="menu-link"><span></span></a>
          <div id="menu">
              <div className="pure-menu">
                  <a className="pure-menu-heading" href="#">Menu</a>
                  <ul className="pure-menu-list">
                      <li className="pure-menu-item"><a href="#" className="pure-menu-link">Promoção</a></li>
                      <li className="pure-menu-item"><a href="#" className="pure-menu-link">Usuarios</a></li>
                  </ul>
              </div>
          </div>
              <div id="main">
                  <div className="header">
                    <h1>Cadastro de Promoções</h1>
                  </div>
                  <div className="content" id="content">
                    <PromocaoBox/>
                  </div>
                </div>            
      </div>     
    );
  }
}

export default App;
