//REACT
import React, { Component } from 'react';
import PubSub from 'pubsub-js';

import FormCadastroCliente from './FormCadastroCliente';
import Progress from '../componentes/Progress/ProgressLinear';

export default  class Login extends Component{
    host    =  JSON.parse(localStorage.getItem("servidores")).map(function(servidor){return servidor.url});       
    baseUrl = JSON.parse(localStorage.getItem("servidores")).map(function(servidor){return servidor.baseUrl});
   
   constructor(props) {
        super(props);
        this.state = {msg: '', status:'', cod:''};
    }

    componentWillMount(){
        PubSub.publish('titulo-menu-superior-cadastraCliente',window.location.pathname);    
    }

    login(event){
        event.preventDefault();
        this.setState({status:"carregando"});
        const requestInfo = {
            method:'POST',
            body:JSON.stringify({email: this.email.value, senha:this.senha.value}),
            headers:new Headers({'content-type' : 'application/json'})
        };
        console.log("SERVIDOR: "+ this.host);
        console.log("URL :"+this.baseUrl+"/login")
        console.log("DADOS ENVIADOS: "+requestInfo.body);
        console.log("VERBO: POST")
        
        fetch(this.host+this.baseUrl+"/login",requestInfo)            
            .then(response =>{
            if(response.status === 200 ||  response.status === 201){
                this.setState({cod:response.status});
                console.log("sucesso no login");
                return response.text();
            }else{
                this.setState({status:"", cod:response.status});
                throw new Error('Não foi possivel fazer o login. Verifique usuario e senha.');
            }
        }).then(token =>{
            console.log(token)
            if(this.props.match.params.login === 'representante'){
                localStorage.setItem('token-representante',token);
                localStorage.setItem('email-representante',this.email.value);
                this.props.history.push('/representante');
            }else if(this.props.match.params.login === 'cliente'){
                localStorage.setItem('token-cliente',token);
                localStorage.setItem('email-cliente', this.email.value);
                this.props.history.push('/cliente');
            }
        }).catch(error => {
            this.setState({msg:error.message});
        })
    }         
  
    render(){
        return(
             <div>
                 <div className="header">
                    <h1>Bem vindo ao Pontua</h1>
                </div>
                <div className="row">
                    <div className={this.props.match.params.login === 'representante' ? "col-sm-12":"col-sm-6" }>
                        <h3>Entrar como {this.props.match.params.login}</h3>
                        
                        <div className="row">
                            {this.state.status ==='carregando' ? <Progress/>: ""}
                        </div>
                        
                        <form className="form-group" onSubmit={this.login.bind(this)}>
                            <fieldset>
                                <legend>
                                      <span className={this.state.cod >= 200 && this.state.cod < 400 ? "alert alert-success":"" 
                                                        || this.state.cod >= 300 && this.state.cod < 500 ? "alert alert-warning":""
                                                        ||this.state.cod >= 500 ? "alert alert-danger":"" 
                                                        }>
                                                    {this.state.msg}
                                    </span>
                                </legend>
                               
                                <input 
                                    className="form-control"
                                    type="email" 
                                    placeholder="Email"
                                    ref={(input) => this.email = input}
                                    
                                />
                                <input 
                                    type="password" 
                                    placeholder="Senha"
                                    ref={(input) => this.senha = input}
                                    className="form-control"
                                />
                                
                                <button type="submit" className="btn btn-info btn-fill btn-block btn-lg">
                                    Entrar
                                </button>
                            </fieldset>
                        </form>
                    </div> 
                    <div className="col-sm-6">
                      {this.props.match.params.login === 'cliente' ? 
                                <FormCadastroCliente 
                                titulo="Se cadastrar"
                                textoBotao = "Cadastrar"
                                acao = "POST"
                                />:"" } 
                    </div> 
                </div>
        </div>
        );
    }
}