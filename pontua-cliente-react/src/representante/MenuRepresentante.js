import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class MenuRepresentante extends Component{
  render(){
     return(
      <div>
            <li className="pure-menu-item menu-item-divided pure-menu-selected">
                <a  className="pure-menu-link">Representante</a>
            </li>
            <li className="pure-menu-item">
                <Link to="/perfil" className="pure-menu-link">Perfil</Link>
            </li>
            <li className="pure-menu-item">
                <Link to="/logout/representante" className="pure-menu-link">Logout</Link>
            </li>
            <li className="pure-menu-item menu-item-divided pure-menu-selected">
                <a className="pure-menu-link">Promoçao</a>
            </li>
            <li className="pure-menu-item">
                <Link to="/promocao/cadastrar" className="pure-menu-link">Cadastrar</Link>
            </li>            
            <li className="pure-menu-item">
                <Link to="/promocao/listar" className="pure-menu-link">Listar</Link>
            </li>
            <li className="pure-menu-item menu-item-divided pure-menu-selected">
                <a  className="pure-menu-link">Cliente</a>
            </li>            
            <li className="pure-menu-item">
                <Link to="/cadastrar/cliente" className="pure-menu-link">Cadastrar</Link>
            </li>
            <li className="pure-menu-item">
                <Link to="/listar/cliente" className="pure-menu-link">Listar</Link>
            </li>
      </div>
    );
  }
}
