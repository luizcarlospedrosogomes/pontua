import React, { Component } from 'react';
import PubSub from 'pubsub-js';

import FormCadastroCliente from '../cliente/FormCadastroCliente';
import Progress from '../componentes/Progress/ProgressLinear';
import Pontos from './Pontos';
export default  class Cliente extends Component{
    
    constructor(props){
        super(props);
        this.state = {status:'', token:null, baseUrl:null, host:null
                      , cod:'', msg:''}
        if(localStorage.getItem('token-cliente') == null)
            this.props.history.push('/login/cliente');
        
        
    }

    componentWillMount(){
        PubSub.subscribe('dados-cliente',function(topico, cliente){
            console.log("STATUS GET CLIENTE"+ cliente.status)
            this.setState({status:cliente.status});          
        }.bind(this))
        this.setState({token: localStorage.getItem('token-cliente')
                    , baseUrl:JSON.parse(localStorage.getItem("servidores")).map(function(servidor){return servidor.baseUrl})
                    , host: JSON.parse(localStorage.getItem("servidores")).map(function(servidor){return servidor.url})
        });
    }
    
    alteraStatus(event){
        event.preventDefault();
        const requestInfo = {
            method:'DELETE',            
           headers:{'content-type'  : 'application/json'
                   , 'Authorization': this.state.token
                     }
        }
        console.log("altera status")
        console.log("SERVDOR: "+this.state.host);
        console.log("URL: "+this.state.baseUrl+"/cliente");
        console.log("ENVIANDO DADOS: "+requestInfo.body);
        console.log("VERBO: DELETE")
        fetch(this.state.host+this.state.baseUrl+"/cliente",requestInfo)
        .then(response =>{
            if(response.status === 200 || response.status === 201 ){
                this.setState({msg:"Status atualizado com sucesso", cod:response.status});
                if (this.state.status === 1){
                    this.setState({status:0});
                    return response.text();
                }
                if (this.state.status === 0){
                    this.setState({status:1});
                    return response.text();
                }                
            }
            if(response.status === 401){
              this.props.history.push('/logout/cliente');
            }
            if(response.status === 400){
                this.setState({msg:"Status atualizado com sucesso", cod:response.status});
              throw new Error('Não foi possivel atualizar seu status');
            }
            else{
                this.setState({msg:"Status atualizado com sucesso", cod:response.status});
                throw new Error('erro: '+ response.status+' nao foi possivel atualizar seu status');
            }
        })
    }

    render(){
         return(            
            <div className="container-fluid">
                <div className="row">
                    <div className={this.state.cod === 200 ? "alert alert-success":"" 
                               || this.state.cod === 201 ? "alert alert-success":""
                               || this.state.cod === 400 ? "alert alert-warning":""
                               || this.state.cod === 401 ? "alert alert-warning":""
                               || this.state.cod === 500 ? "alert alert-danger":"" 
                               }>
                     {this.state.msg}
                </div>
                    <div className="col-md-8">
                        <div className="card">
                            <div className="header">
                                <h4 className="title">Pontos</h4>
                            </div>                            
                               <Pontos/>                            
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
                                <h4 className="title">Status da conta:  {this.state.status === 1 ?' Ativa': ' Inativa'}</h4>
                            </div>
                            <div className="content">
                             {this.state.status === 1 ?
                                <button 
                                    type="submit"
                                    className={`btn btn-fill btn-lg btn-block ${this.state.status === 1 ?'btn-danger': 'btn-success'}`}
                                    onClick={this.alteraStatus.bind(this)}
                                    >
                                    {this.state.status === 1 ?'Clique para inativar': 'Clique para ativar sua conta'}
                                </button> 
                            :
                            ' Inativa'} 
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