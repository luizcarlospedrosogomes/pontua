import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PubSub from 'pubsub-js';

import ListarPromocao from './ListarPromocao';
import FormCadastroRepresentante from '../representante/FormCadastroRepresentante';
import Progress from '../componentes/Progress/ProgressLinear';

export default  class Representante extends Component{
    constructor(props){
        super(props);
        this.state = {status:'', token:null, baseUrl:null, host:null
                      , cod:'', msg:''}
        if(localStorage.getItem('token-representante') == null)
            this.props.history.push('/login/representante');        
        
    }

    componentWillMount(){
        this.setState({token: localStorage.getItem('token-representante')
                    , baseUrl:JSON.parse(localStorage.getItem("servidores")).map(function(servidor){return servidor.baseUrl})
                    , host: JSON.parse(localStorage.getItem("servidores")).map(function(servidor){return servidor.url})
        });

        PubSub.subscribe('dados-representante',function(topico, representante){
            this.setState({status:representante.status});          
        }.bind(this))
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
        console.log("URL: "+this.state.baseUrl+"/representante");
        console.log("ENVIANDO DADOS: "+requestInfo.body);
        console.log("VERBO: DELETE")
        fetch(this.state.host+this.state.baseUrl+"/representante",requestInfo)
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
            if(response.status === 401)
                    this.props.history.push('/logout/representante');
            if(response.status === 400)
                this.setState({msg:"Status atualizado com sucesso", cod:response.status});
            else
                this.setState({msg:"Status atualizado com sucesso", cod:response.status});
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
                    <div className="col-md-9">
                        <div className="card">
                            <div className="header">
                                <h4 className="title">Promoções cadastradas</h4>
                            </div>
                            <div className="content">
                               {
                               this.state.status >= 0 ?
                               <ListarPromocao/>
                               :
                               <ListarPromocao/>
                               }
                            </div>
                        </div>
                        <div className="card">
                            <div className="header">
                                <h4 className="title">Pontos para usuarios</h4>
                            </div>
                            <div className="content">
                               
                            </div>
                        </div>
                        {this.state.status === 1 ?
                        <div className="card">
                            <div className="header">                                
                                <h4 className="title">Status da conta:  {this.state.status === 1 ?' Ativa': ' Inativa'}</h4>
                            </div>
                            <div className="content">
                            
                             <button 
                                type="submit"
                                className={`btn btn-fill btn-lg btn-block ${this.state.status === 1 ?'btn-danger': 'btn-success'}`}
                                onClick={this.alteraStatus.bind(this)}
                                >
                                {this.state.status === 1 ?'Clique para inativar': 'Clique para ativar sua conta'}
                            </button> 
                             
                            </div>
                        </div>
                        :
                        ""
                        }
                    </div>
                    <div className="col-md-3">
                        
                        <div className="card card-user">
                            {this.state.status ==='' ? <Progress/>: ""}
                            <FormCadastroRepresentante 
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