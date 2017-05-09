import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class MenuCliente extends Component{
  render(){
     return(
        <div>
          <li className="pure-menu-item menu-item-divided pure-menu-selected">
                <a href="#" className="pure-menu-link">Cliente</a>
            </li>
            <li className="pure-menu-item">
                <Link to="/perfil" className="pure-menu-link">Perfil</Link>
            </li>
            <li className="pure-menu-item">
                <Link to="/logout/cliente" className="pure-menu-link">Logout</Link>
            </li>
            <li className="pure-menu-item menu-item-divided pure-menu-selected">
                <a href="#" className="pure-menu-link">Serviços</a>
            </li>
            <li className="pure-menu-item">
                <Link to="/promocao" className="pure-menu-link">Promoções</Link>
            </li>
            <li className="pure-menu-item">
                <Link to="/pontos" className="pure-menu-link">Pontos</Link>
            </li>
          </div>
    );
  }
}