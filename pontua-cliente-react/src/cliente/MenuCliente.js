import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class MenuCliente extends Component{
  render(){
     return(
        <div>
                <li>
                        <a href=""><i className="pe-7s-graph"></i><p>Cliente</p></a>
                    </li>
                    <li className="active">
                        <Link to="/perfil"><i className="pe-7s-user"></i><p>Perfil</p></Link>
                    </li>
                <li className="active">
                    <Link to="/logout/cliente"><i className="pe-7s-user"></i><p>Logout</p></Link>
                </li>            
               <li>
                    <a href=""><i className="pe-7s-graph"></i><p>Serviços</p></a>
                </li>            
                <li className="active">
                        <Link to="/promocao"><i className="pe-7s-user"></i><p>Promocao</p></Link>
                </li> 
                <li className="active">
                        <Link to="/premios"><i className="pe-7s-user"></i><p>Premios</p></Link>
                    </li> 
               
          </div>
    );
  }
}