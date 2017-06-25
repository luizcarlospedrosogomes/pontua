import React, { Component } from 'react';
import PubSub from 'pubsub-js';
//COMPONENTES
import InputDateCustomizado from '../componentes/InputDateCustomizado';
import InputCustomizado from '../componentes/InputCustomizado';
import ComboboxCustomizado from '../componentes/ComboboxCustomizado';


export default  class FormCadastroCliente extends Component{
   host  =  JSON.parse(localStorage.getItem("servidores")).map(function(servidor){return servidor.url});
   baseUrl = JSON.parse(localStorage.getItem("servidores")).map(function(servidor){return servidor.baseUrl});
   token = localStorage.getItem('token-cliente');
   
   sexo = [{value: '-1' ,label: 'Selecione'},
             {value: 'H'  ,label: 'Masculino' } ,
             {value: 'F'  ,label: 'Femenino'}
            ]

    constructor(props) {
        super(props);
        this.state = {msg:''
                    , nascimento:''
                    , sexo:''
                    , cod:''
                    , status:''
                    , nome:''
                    , cpf:''
                    , id:''
                    , email:''
                }
     }
     salvaAlteracao(nomeInput,evento){
         var campoSendoAlterado = {};
         campoSendoAlterado[nomeInput] = evento.target.value;    
         this.setState(campoSendoAlterado);   
    }

    componentWillMount(){
        PubSub.subscribe('valor-combo',function(topico,valor){
                this.setState({sexo:valor})
            }.bind(this));
        if(this.props.acao ==='PUT')
            this.pegarDadosCliente();
    } 

    pegarDadosCliente(){
        console.log("ENVIANDO: " + this.token);      
        console.log("SERVIDOR: "+this.host);
        console.log("URL: "+this.baseUrl+"/cliente");
        console.log("VERBO: GET")
       
        const requestInfo = {
            method:'GET',
            dataType: 'json',
            headers:{'authorization': this.token}
        };

        fetch(this.host+this.baseUrl+"/cliente", requestInfo)
        .then(response =>{
            if(response.status === 200 || response.status === 201){
              console.log("RESPOSTA DO SERVIDOR: 200");
              return response.json();
            }if(response.status === 401){
              console.log("NAO AUTORIZADO DIRECIONANDO PARA PAGINA DE LOGIN");
              //this.props.history.push('/logout/representante');
            }else{
              console.log("NAO FOI POSSIVEL OBTER A(S) PROMOÇÃO(ÕES)");
                throw new Error('Não foi possivel obter promoções.');
            }
        })
        .then(cliente =>{
          console.log("DADOS RECEBIDOS: cabecalho " +Object.keys(cliente)+" valores "+Object.values(cliente));
          this.setState({
                        id: cliente.id_cliente
                        , sexo: cliente.sexo
                        , nome: cliente.nome
                        , cpf: cliente.cpf
                        , nascimento: cliente.nascimento
                        , status: cliente.status
                        , email: cliente.email
          })
          PubSub.publish('dados-cliente', cliente);
        })
        .catch(error => {
            this.setState({msg:error.message});
        });
    }

    updateState = (data)  =>{
        if(data.item === 'dataNascimento'){
            this.setState({nascimento: data.dataDateTime})
        }
    }

    enviaForm(evento){
        evento.preventDefault();
         const requestInfo = {
            method:this.props.acao,
            body:JSON.stringify({ cpf:this.state.cpf 
                                , nome:this.state.nome
                                , sexo:this.state.sexo 
                                , email: this.state.email
                                , nascimento: this.state.nascimento
                                , status: 1
                                , senha: this.state.senha
                            }),
            headers:{'content-type'  : 'application/json'}
        };
        console.log("SERVDOR: "+this.host);
        console.log("URL: "+this.baseUrl+"/cliente");
        console.log("ENVIANDO DADOS: "+requestInfo.body);
        console.log("VERBO: POST");

        fetch(this.host+this.baseUrl+"/cliente",requestInfo)            
            .then(response =>{
            if(response.status === 200 || response.status === 201 ){
                this.setState({msg:"Cadastro concluido com sucesso", cod:response.status});
                return response.text();
            }
            if(response.status === 401){
             this.setState({msg:"Nao foi possivel concluir seu cadastro.", cod:response.status});
              this.props.history.push('/logout/cliente');
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
                 
                 <span className={this.state.cod === 200 ? "alert alert-success":"" 
                               || this.state.cod === 201 ? "alert alert-success":""
                               || this.state.cod === 400 ? "alert alert-warning":""
                               || this.state.cod === 500 ? "alert alert-danger":"" 
                               }>
                     {this.state.msg}
                </span>
                        <form className="form-group" onSubmit={this.enviaForm.bind(this)}>
                            <fieldset>
                                <legend><span></span></legend>
                                
                                 <InputCustomizado 
                                    id="cpf" 
                                    type="text" 
                                    name="cpf"
                                    label="CPF"
                                    required={true}
                                    placeholder="07340564942"
                                    value={this.state.cpf}
                                    onChange={this.salvaAlteracao.bind(this, 'cpf')}
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
                                    id="nascimento" 
                                    label="Data Nascimento"
                                    name="nascimento" 
                                   // updateState = {this.updateState}
                                    value = {this.state.nascimento}
                                    onChange={this.salvaAlteracao.bind(this, 'nascimento')}
                                    required={false}
                                    />
                                <ComboboxCustomizado
                                    id="sexo"
                                    source = {this.sexo}
                                    label  = "Sexo"
                                    default= "-1"
                                    value= {this.state.sexo}
                                    onChange={this.salvaAlteracao.bind(this, 'sexo')}
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