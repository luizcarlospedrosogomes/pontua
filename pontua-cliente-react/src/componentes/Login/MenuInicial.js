import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class MenuInicial extends Component{
  render(){
     return(
      <div>
            <li className="pure-menu-item menu-item-divided pure-menu-selected">
                  <a href="#" className="pure-menu-link">Login</a>
            </li>
            <li className="pure-menu-item">
                <Link to="/login/cliente" className="pure-menu-link">Cliente</Link>
            </li>
            <li className="pure-menu-item">
                <Link to="/login/representante" className="pure-menu-link">Representante</Link>
            </li>
            <li className="pure-menu-item">
                <Link to="/servidores" className="pure-menu-link">Servidor</Link>
            </li>
                  
      </div>
    );
  }
}