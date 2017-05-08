import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default  class Cliente extends Component{
    render(){
         return(
            <div>
                <h2>Pagina Cliente</h2>
                <Link to="/login/cliente">Sair</Link>
            </div>
        );
    }
}