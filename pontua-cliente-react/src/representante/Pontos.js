import React, { Component } from 'react';
import InputCustomizado from '../componentes/InputCustomizado';
import $ from 'jquery';
import Progress from '../componentes/Progress/ProgressLinear';

export default  class Pontos extends Component{
    baseUrl = null;
    host = null;
    token = null;
   
    constructor(props){
        super(props);
        this.state = {status:''
                    ,  cod:''
                    , msg:''
                    , cpf:'' 
                    , cpfCliente: ''
                    , cpfStatus:''
                    , id_promocao:''
                    , nomeCliente:''
                    , nomePromocao:''
                    , pontosPromocao:''
                    , promocaoStatus:''
                    , pontosCliente: ''
            }
        if(localStorage.getItem('token-representante') == null)
            this.props.history.push('/login/representante');        
        this.getPromocao = this.getPromocao.bind(this);
        this.getCPF = this.getCPF.bind(this);
        this.registrarPontos = this.registrarPontos.bind(this);
    }

    componentWillMount(){
       this.baseUrl = JSON.parse(localStorage.getItem("servidores")).map(function(servidor){return servidor.baseUrl});
       this.host = JSON.parse(localStorage.getItem("servidores")).map(function(servidor){return servidor.url});
       this.token = localStorage.getItem('token-representante');  
      // this.setState({cpfStatus:'encontrado'}); 
      // this.setState({promocaoStatus:'encontrada'});
    }

    registrarPontos(){
        console.log("ENVIANDO TOKEN :"+this.token);
        console.log("SERVIDOR: "+ this.host);
        console.log("URL: "+ this.baseUrl+"/representante/pontos");
        console.log("VERBO: POST");

        if(this.state.id_promocao ==='' || this.state.cpfCliente === '')
            this.setState({msg:"Verifique os dados", cod:400, nomePromocao:''});
        $.ajax({
            url:this.host+this.baseUrl+"/representante/pontos",
            headers:{'authorization': this.token},
            contentType:'application/json',
           // dataType:'json',
            type:'POST',  
            data: JSON.stringify({
                      id_promocao: parseInt(this.state.id_promocao)
                    , cpf:this.state.cpfCliente         
                  }),                 
            success: function(resposta){
                this.setState({msg:"Pontos inseridos com sucesso", cod:200});
            }.bind(this),  
            error: function(resposta){
                if(resposta.status === 400)
                    this.setState({msg:"Verifique os dados", cod:resposta.status, nomePromocao:''});
                if(resposta.status === 401) 
                    this.setState({msg:"Não autorizado", cod:resposta.status});
                if(resposta.status === 404) 
                    this.setState({msg:"Promoção nao encontrado", cod:resposta.status, promocaoStatus:'naoEncontrada', nomePromocao:''});
                if(resposta.status === 500) 
                    this.setState({msg:"ERRO NO SERVIDOR", cod:resposta.status});            
            }.bind(this),
            beforeSend: function(){
                //PubSub.publish("limpa-erros",{});
            }      
        });
    }

    salvaAlteracao(nomeInput,evento){
         var campoSendoAlterado = {};
         campoSendoAlterado[nomeInput] = evento.target.value;    
         this.setState(campoSendoAlterado);   
    }
    
    getPromocao(){
        this.setState({nomePromocao:'procurando'});
        console.log("ENVIANDO TOKEN :"+this.token);
        console.log("SERVIDOR: "+ this.host);
        console.log("URL: "+ this.baseUrl+"/representante/promo/"+parseInt(this.state.id_promocao));
        
        $.ajax({
            url:this.host+this.baseUrl+"/representante/promo/"+parseInt(this.state.id_promocao),
            headers:{'authorization': this.token},
           // contentType:'application/json',
            dataType:'json',
            type:'GET',        
            success: function(promocao){
               this.setState({nomePromocao:promocao.nome, pontosPromocao: promocao.quantidade_pontos, validade:promocao.validade,promocaoStatus:'encontrada'});
            }.bind(this),  
            error: function(resposta){
                if(resposta.status === 400)
                    this.setState({msg:"Verifique os dados", cod:resposta.status, nomePromocao:''});
                if(resposta.status === 401) 
                    this.setState({msg:"Não autorizado", cod:resposta.status});
                if(resposta.status === 404) 
                    this.setState({msg:"Promoção nao encontrado", cod:resposta.status, promocaoStatus:'naoEncontrada', nomePromocao:''});
                if(resposta.status === 500) 
                    this.setState({msg:"ERRO NO SERVIDOR", cod:resposta.status});            
            }.bind(this),
            beforeSend: function(){
                //PubSub.publish("limpa-erros",{});
            }      
        });
    }


    getCPF(){
            this.setState({cpfCliente:'procurando'})
            console.log("ENVIANDO TOKEN: "+ this.token);
            console.log("DADOS  CPF: "+ this.state.cpf);
            console.log("HOST: "+ this.host);
            console.log("URL: "+ this.baseUrl);
            console.log("VERBO: GET");            
        var r = $.ajax({
            url:this.host+this.baseUrl+"/representante/pontos/"+this.state.cpf,
            headers:{'authorization': this.token},
           //contentType:'application/json',
            dataType:'json',
            type:'GET',        
            success: function(cliente){
                this.setState({cpfStatus:'encontrado', cpfCliente:cliente.cpf, pontosCliente:cliente.quantidade_pontos});
            }.bind(this),  
            error: function(resposta){
                if(resposta.status === 400)
                    this.setState({msg:"Verifique os dados", cod:resposta.status, cpfCliente:'', pontosCliente:''});
                if(resposta.status === 401) 
                    this.setState({msg:"Não autorizado", cod:resposta.status, cpfCliente:'' });
                if(resposta.status === 404) 
                    this.setState({msg:"CPF não encontrado", cod:resposta.status,cpfStatus:'naoEncontrado', cpfCliente:'', pontosCliente:''});
                if(resposta.status === 500) 
                    this.setState({msg:"ERRO NO SERVIDOR", cod:resposta.status, cpfCliente:''});            
            }.bind(this),
            beforeSend: function(){
                //PubSub.publish("limpa-erros",{});
            }      
        });

        r.done(function(cliente){
                this.setState({cpfStatus:'encontrado', cpfCliente:cliente.cpf});
        }.bind(this));      
        r.fail(function(cliente){
                this.setState({cpfStatus:'naoEncontrado', cpfCliente:cliente.cpf});
        }.bind(this));
    }

    render(){
         return(
            <div className="container-fluid">
                <div className="col-md-4">
                    <div className="card">
                            <div className="header">
                                <h4 className="title">Cadastrar pontos</h4>
                            </div>
                        <div className={this.state.cod === 200 ? "alert alert-success":"" 
                               || this.state.cod === 201 ? "alert alert-success":""
                               || this.state.cod === 400 ? "alert alert-warning":""
                               || this.state.cod === 404 ? "alert alert-warning":""
                               || this.state.cod === 401 ? "alert alert-warning":""
                               || this.state.cod === 500 ? "alert alert-danger":"" 
                               }>
                        {this.state.msg}
                        </div>
                   
                    <InputCustomizado 
                        id="cpf" 
                        type="text" 
                        name="cpf"
                        label="CPF cliente"
                        required={true}
                        placeholder="07340564942"
                        value={this.state.cpf}
                        onChange={this.salvaAlteracao.bind(this, 'cpf')}
                        onBlur={this.getCPF}
                   
                   />
                   <button 
                    type="submit" 
                    className={`btn btn-fill btn-lg btn-block 
                                ${this.state.cpfStatus === 'encontrado' 
                                ?'btn-info disabled'
                                : 'btn-info'}`}
                    >
                        Cadastrar cliente
                   </button>

                     <InputCustomizado 
                       id="id_promocao" 
                       type="text" 
                       name="id_promocao"
                       label="ID promocao"
                       required={true}
                       placeholder="ID promocao"
                       value={this.state.id_promocao}
                       onChange={this.salvaAlteracao.bind(this, 'id_promocao')}
                       onBlur={this.getPromocao}
                   />
                    <button 
                    type="submit" 
                    className={`btn btn-fill btn-lg btn-block ${this.state.promocaoStatus === 'encontrada' 
                                ?'btn-info disabled'
                                : 'btn-info'}`}
                    >
                        Cadastrar promoção
                   </button>
                </div>
                 <div className="card">
                    <div className="header">
                        <h4 className="title">Pontos para este CPF</h4>
                    </div>
                    <div className="content h1">
                        {this.state.pontosCliente}
                    </div>
                </div>
                </div>

                 <div className="col-md-8">
                    <div className="rows">
                        {this.state.cpfCliente === 'procurando' ? <Progress/> :''}                        
                    </div>
                    <div className="card">
                            <div className="header">
                                <h4 className="title">Dados do cliente</h4>
                            </div>
                   
                    <InputCustomizado 
                        id="cpfCliente" 
                        type="text" 
                        name="cpfCliente"
                        label="CPF cliente"
                        required={true}
                        placeholder="07340564942"
                        value={this.state.cpfCliente}
                   
                   />
                     <InputCustomizado 
                       id="nomeCliente" 
                       type="text" 
                       name="nomeCliente"
                       label="Nome Cliente"
                       required={true}
                       placeholder="nomeCliente"
                       value={this.state.nomeCliente}                                  
                   />

                </div>
                   <div className="card">
                       <div className="rows">
                        {this.state.nomePromocao === 'procurando' ? <Progress/> :''}                        
                    </div>
                            <div className="header">
                                <h4 className="title">Dados da promocao</h4>
                            </div>
                                  
                    <InputCustomizado 
                        id="nomePromocao" 
                        type="text" 
                        name="nomePromocao"
                        label="Nome promoção"
                        required={true}
                        placeholder="07340564942"
                        value={this.state.nomePromocao}
                       
                   
                   />
                     <InputCustomizado 
                       id="pontosPromocao" 
                       type="text" 
                       name="pontosPromocao"
                       label="pontosPromocao"
                       required={true}
                       placeholder="pontosPromocao"
                       value={this.state.pontosPromocao}                                                        
                   />
                   <InputCustomizado 
                       id="validade" 
                       type="text" 
                       name="validade"
                       label="Validade"
                       required={true}
                       placeholder="validade"
                       value={this.state.validade}                                                        
                   />
                </div>
                </div>
                <div className="col-md-12">
                    <button 
                    type="submit" 
                    className={`btn btn-fill btn-lg btn-block 
                             ${this.state.cpfStatus === 'encontrado' && this.state.promocaoStatus === 'encontrada' 
                              ?'btn-success'
                              : 'btn-success disabled'}`}
                    onClick={this.registrarPontos}
                    >
                        Cadastrar pontos
                   </button>
                    
                </div>
            </div>
        );
    }
}