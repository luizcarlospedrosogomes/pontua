import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class MenuRepresentante extends Component{
  render(){
     return(
      <div>
        <li>
           <i className="pe-7s-graph"></i><p>Representante</p>
        </li>
         <li className="active">
            <Link to="/representante"><i className="pe-7s-user"></i><p>Perfil</p></Link>
        </li>
         <li className="active">
            <Link to="/logout/representante"><i className="pe-7s-user"></i><p>Logout</p></Link>
        </li>
        <li>
           <i className="pe-7s-graph"></i><p>Promoçao</p>
        </li>
        <li className="active">
            <Link to="/promocao/cadastrar"><i className="pe-7s-user"></i><p>Cadastrar</p></Link>
        </li>
        <li className="active">
            <Link to="/promocao/listar"><i className="pe-7s-user"></i><p>Listar</p></Link>
        </li>
      </div>
    );
  }
}
