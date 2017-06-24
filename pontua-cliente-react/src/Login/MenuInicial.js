import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class MenuInicial extends Component{
  render(){
     return(
      <div>
            <li>
                 <i className="pe-7s-graph"></i><p>Login</p>
            </li>
            <li className="active">
                   <Link to="/login/cliente"><i className="pe-7s-user"></i><p>Cliente</p></Link>
            </li>
            <li className="active">
                   <Link to="/login/representante"><i className="pe-7s-user"></i><p>Representante</p></Link>
            </li>
            
            <li className="active">
                   <Link to="/servidores"><i className="pe-7s-user"></i><p>Servidor</p></Link>
            </li>
            
                  
      </div>
    );
  }
}