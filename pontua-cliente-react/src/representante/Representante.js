import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default  class Representante extends Component{
    render(){
         return(
             <div>
                <h2>Pagina Representate</h2>
                <Link to="/login/representante">Sair</Link>
            </div>
        );
    }
}