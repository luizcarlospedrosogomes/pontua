import React, { Component } from 'react';

export default  class ListaServidores extends Component{
    constructor() {
        super();  
    }
     render(){
        return (
            <div>
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Host</th>
                            <th>Padrão</th>
                        </tr>
                    </thead>

                    <tbody>
                         {
                            this.props.lista.map(function(servidor){
                            return (
                                <tr key = {servidor.url}>
                                <td>{servidor.nome}</td>
                                <td>{servidor.url}</td>
                                <td>{servidor.padrao}</td>
                                </tr>
                                );
                            })
                        }
                    </tbody>
                </table>

            </div>
        )
        
    }
}