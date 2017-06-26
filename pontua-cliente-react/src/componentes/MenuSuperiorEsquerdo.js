import React, { Component } from 'react';
//import {Link} from 'react-router-dom';

export default  class MenuSuperiorEsquerdo extends Component{
    render(){
         return(
            <div>
                <ul className="nav navbar-nav navbar-right">  
                   <li>{this.props.emailRepresentante !== null ? 'Conectado como '+this.props.emailRepresentante : 'Faça login' } </li>                     
                   <li>{this.props.host !== null ? 'Servidor: '+this.props.host :'Configure um servdor'} </li>                     
                </ul>
            </div>
        );
    }
}