import React, { Component } from 'react';

export default  class ListaServidores extends Component{
    constructor() {
        super();  
    }
     render(){
       if(this.props.lista){
        return (
            <div className="table-responsive table-full-width">
                
                <table className="table table-hover table-striped">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Host</th>
                            <th>BaseUrl</th>
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
                                <td>{servidor.baseUrl}</td>
                                <td>{servidor.padrao}</td>
                                </tr>
                                );
                            })
                        }
                    </tbody>
                </table>

            </div>
        );
       }else{
           return( <div>Cadastre um servidor!</div>);
       }
        
        
    }
}