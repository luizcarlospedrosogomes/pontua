import React, { Component } from 'react';
import PubSub from 'pubsub-js';
//COMPONENTES
import InputDateCustomizado from '../componentes/InputDateCustomizado';
import InputCustomizado from '../componentes/InputCustomizado';
import ComboboxCustomizado from '../componentes/ComboboxCustomizado';


export default  class FormCadastroCliente extends Component{
   host  =  JSON.parse(localStorage.getItem("servidores")).map(function(servidor){return servidor.url});
   baseUrl = JSON.parse(localStorage.getItem("servidores")).map(function(servidor){return servidor.baseUrl});

   sexo = [{value: '-1' ,label: 'Selecione'},
             {value: 'H'  ,label: 'Masculino' } ,
             {value: 'F'  ,label: 'Femenino'}
            ]

    constructor(props) {
        super(props);
        this.state = {msg:'', dataNascimento:'', sexo:'', cod:''}
    }
    componentWillMount(){
        PubSub.subscribe('valor-combo',function(topico,valor){
                this.setState({sexo:valor})
            }.bind(this));
    }  

    updateState = (data)  =>{
        if(data.item === 'dataNascimento'){
            this.setState({dataNascimento: data.dataDateTime})
        }
    }

    enviaForm(evento){
        evento.preventDefault();
         const requestInfo = {
            method:'POST',
            body:JSON.stringify({ cpf:this.cpf.value 
                                , nome:this.nome.value
                                , sexo:this.state.sexo 
                                , email: this.email.value
                                , nascimento: this.state.dataNascimento
                                , status: 1
                                , senha: this.senha.value
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
                 <h3>Se Cadastrar</h3>
                 
                 <span className={this.state.cod === 200 ? "alert alert-success":"" 
                               || this.state.cod === 400 ? "alert alert-warning":""
                               || this.state.cod === 500 ? "alert alert-danger":"" }>
                     {this.state.msg}
                </span>
                        <form className="form-group" onSubmit={this.enviaForm.bind(this)}>
                            <fieldset>
                                <legend><span></span></legend>
                                
                                 <InputCustomizado 
                                    id="CPF" 
                                    type="text" 
                                    name="cpf"
                                    ref="cpf" 
                                    inputRef={el => this.cpf = el}
                                    label="CPF"
                                    required={true}
                                    placeholder="07340564942"
                                    />
                                  
                                 <InputCustomizado 
                                    id="email" 
                                    type="email" 
                                    name="email"

                                    inputRef={el => this.email = el}
                                    label="Email"
                                    required={true}
                                    placeholder="lc.pg@hotmail.com"
                                    />
                                
                                 <InputCustomizado 
                                    id="nome" 
                                    type="text" 
                                    name="nome"
                                    ref="nome" 
                                    inputRef={el => this.nome = el}
                                    label="Nome"
                                    required={true}
                                    placeholder="Luiz"
                                    />
                                <InputDateCustomizado
                                    id="dataNascimento" 
                                    label="Data Nascimento"
                                    name="dataNascimento" 
                                    updateState = {this.updateState}
                                   // value = {this.state.DataNascimento}
                                    required={false}
                                    />
                                <ComboboxCustomizado
                                    id="sexo"
                                    source = {this.sexo}
                                    label  = "Sexo"
                                    default= "-1"
                                    />
                                <InputCustomizado 
                                    id="senha" 
                                    type="password" 
                                    name="senha"
                                    ref="senha" 
                                    inputRef={el => this.senha = el}
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
                                
                                <button type="submit" className="btn btn-info btn-fill">Entrar</button>
                            </fieldset>
                        </form>
            </div>
        );
    }
}