import React, { Component } from 'react';
import PubSub from 'pubsub-js';
//COMPONENTES
//import InputDateCustomizado from '../componentes/InputDateCustomizado';
import InputCustomizado from '../componentes/InputCustomizado';
import ComboboxCustomizado from '../componentes/ComboboxCustomizado';


export default  class FormCadastroRepresentante extends Component{
   host  =  JSON.parse(localStorage.getItem("servidores")).map(function(servidor){return servidor.url});
   baseUrl = JSON.parse(localStorage.getItem("servidores")).map(function(servidor){return servidor.baseUrl});
   token = localStorage.getItem('token-representante');
   
   sexo = [{value: '-1' ,label: 'Selecione'},
             {value: 'H'  ,label: 'Masculino' } ,
             {value: 'F'  ,label: 'Femenino'}
            ]

    constructor(props) {
        super(props);
        this.state = {msg:''
                    , status:''
                    , nome:''
                    , cnpj:''
                    , empresa:''
                    , email:''
                }
     }

     salvaAlteracao(nomeInput,evento){
         var campoSendoAlterado = {};
         campoSendoAlterado[nomeInput] = evento.target.value;    
         this.setState(campoSendoAlterado);   
    }

    componentWillMount(){
        if(this.props.acao ==='PUT')
            this.pegarDadosRepresentante();
    } 

    pegarDadosRepresentante(){
        console.log("ENVIANDO TOKEN: " + this.token);      
        console.log("SERVIDOR: "+this.host);
        console.log("URL: "+this.baseUrl+"/representante");
        console.log("VERBO: GET")
       
        const requestInfo = {
            method:'GET',
            dataType: 'json',
            headers:{'authorization': this.token}
        };

        fetch(this.host+this.baseUrl+"/representante", requestInfo)
        .then(response =>{
            if(response.status === 200 || response.status === 201){
              console.log("RESPOSTA DO SERVIDOR: 200");
              return response.json();
            }if(response.status === 401){
              console.log("NAO AUTORIZADO DIRECIONANDO PARA PAGINA DE LOGIN");
              //this.props.history.push('/logout/representante');
            }else{
              console.log("NAO FOI POSSIVEL OBTER OS DADOS DO REPRESENTANTE");
                throw new Error('Não foi possivel obter o representante.');
            }
        })
        .then(representante =>{
          console.log("DADOS RECEBIDOS: cabecalho " +Object.keys(representante));
          console.log("DADOS RECEBIDOS: valores "   +Object.values(representante));
          this.setState({
                        id_representate: representante.id
                         , cnpj:representante.cnpj 
                         , nome:representante.nome
                         , empresa:representante.empresa 
                         , email: representante.email
                         , status: 1
          });
          PubSub.publish('dados-representante', representante)
        })
        .catch(error => {
            this.setState({msg:error.message});
        });
    }

    enviaForm(evento){
        evento.preventDefault();
         const requestInfo = {
            method:this.props.acao,
            body:JSON.stringify({ cnpj:this.state.cnpj 
                                , nome:this.state.nome
                                , empresa:this.state.empresa 
                                , email: this.state.email
                                , senha: this.state.senha
                                , status: 1
                            }),
            headers:{'content-type'  : 'application/json',
            'authorization': this.token}
        };
        console.log("SERVDOR: "+this.host);
        console.log("URL: "+this.baseUrl+"/representante");
        console.log("ENVIANDO DADOS: "+requestInfo.body);
        if(this.props.acao =="PUT")
            console.log("VERBO: PUT");
        if(this.props.acao =="POST")
            console.log("VERBO: POST");

        fetch(this.host+this.baseUrl+"/representante",requestInfo)            
            .then(response =>{
            if(response.status === 200 || response.status === 201 ){
                this.setState({msg:"Cadastro concluido com sucesso", cod:response.status});
                return response.text();
            }
            if(response.status === 401){
             this.setState({msg:"Nao foi possivel concluir seu cadastro.", cod:response.status});
              this.props.history.push('/logout/representante');
            }
            if(response.status === 400){
              this.setState({msg:"Verefique os campos.", cod:response.status});
              throw new Error('Verifique os campos');
            }
            else{
                this.setState({msg:"Entre em contato com o administrador.", cod:response.status});
                throw new Error('erro: '+ response.status+' nao foi possivel criar seu cadastro');
            }
        }).catch(error => {
            this.setState({msg:error.message});
        });
        
    }
    render(){
         return(
            <div>
                 <h4>{this.props.titulo}</h4>
                 
                 <div className={this.state.cod === 200 ? "alert alert-success":"" 
                               || this.state.cod === 201 ? "alert alert-success":""
                               || this.state.cod === 400 ? "alert alert-warning":""
                               || this.state.cod === 401 ? "alert alert-warning":""
                               || this.state.cod === 500 ? "alert alert-danger":"" 
                               }>
                     {this.state.msg}
                </div>
                        <form className="form-group" onSubmit={this.enviaForm.bind(this)}>
                            <fieldset>
                                <legend><span></span></legend>
                                
                                 <InputCustomizado 
                                    id="cnpj" 
                                    type="text" 
                                    name="cnpj"
                                    label="CNPJ"
                                    required={true}
                                    placeholder="07340564942"
                                    value={this.state.cnpj}
                                    onChange={this.salvaAlteracao.bind(this, 'cnpj')}
                                    />
                                  
                                 <InputCustomizado 
                                    id="email" 
                                    type="email" 
                                    name="email"
                                    label="Email"
                                    required={true}
                                    placeholder="lc.pg@hotmail.com"
                                    value={this.state.email}
                                    onChange={this.salvaAlteracao.bind(this, 'email')}
                                    />
                                
                                 <InputCustomizado 
                                    id="nome" 
                                    type="text" 
                                    name="nome"
                                    ref="nome" 
                                    label="Nome"
                                    required={true}
                                    placeholder="Luiz"
                                    onChange={this.salvaAlteracao.bind(this, 'nome')}
                                    value={this.state.nome}
                                    />
                                <InputCustomizado
                                    id="empresa" 
                                    label="Empresa"
                                    name="empresa" 
                                   // updateState = {this.updateState}
                                    value = {this.state.empresa}
                                    onChange={this.salvaAlteracao.bind(this, 'empresa')}
                                    required={false}
                                    />
                                
                                <InputCustomizado 
                                    id="senha" 
                                    type="password" 
                                    name="senha"
                                    ref="senha" 
                                    onChange={this.salvaAlteracao.bind(this, 'senha')}
                                    label="Senha"
                                    required={true}
                                    
                                    />
                                 <InputCustomizado 
                                    id="senha2" 
                                    type="password" 
                                    name="senha2"
                                    ref="senha2" 
                                    inputRef={el => this.senha2 = el}
                                    label="Repita a senha"
                                    required={true}
                                    
                                    />
                                
                                <button type="submit" className="btn btn-info btn-fill btn-block">
                                    {this.props.textoBotao}
                                </button>
                            </fieldset>
                        </form>
            </div>
        );
    }
}