import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PubSub from 'pubsub-js';

import FormCadastroCliente from '../Login/FormCadastroCliente';
import Progress from '../componentes/Progress/ProgressLinear';
export default  class Cliente extends Component{

    constructor(props){
        super(props);
        this.state = {status:''}
    }
    componentWillMount(){
        PubSub.subscribe('dados-cliente',function(topico, cliente){
            this.setState({status:cliente.status});          
        }.bind(this))
        
    }
    
    render(){
         return(            
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="header">
                                <h4 className="title">Suas promoçoes</h4>
                            </div>
                            <div className="content">
                               
                            </div>
                        </div>
                        <div className="card">
                            <div className="header">
                                <h4 className="title">Seus Premios</h4>
                            </div>
                            <div className="content">
                               
                            </div>
                        </div>
                        <div className="card">
                            <div className="header">                                
                                <h4 className="title">Status da conta</h4>
                            </div>
                            <div className="content">
                             <button 
                                type="submit"
                                className={`btn btn-fill btn-lg btn-block ${this.state.status === '1' ?'btn-danger': 'btn-success'}`}>
                                {this.state.status === '1' ?'Clique para inativar': 'Clique para ativar sua conta'}
                            </button>  
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        
                        <div className="card card-user">
                            {this.state.status ==='' ? <Progress/>: ""}
                            <FormCadastroCliente 
                            titulo="Editar perfil"
                            textoBotao = "Atualizar"
                            acao = "PUT"
                            />
                            
                        </div>
                    </div>

                </div>
            </div>
        
    
        );
    }
}