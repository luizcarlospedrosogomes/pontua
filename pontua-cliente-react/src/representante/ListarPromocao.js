import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import {Link} from 'react-router-dom';

//COMPONENTES
import DialogExcluir from '../componentes/DialogExcluir';
import Progress from '../componentes/Progress/ProgressLinear';
//CSS
import '../assets/react-toolbox/rtcustomizado.css';

export default  class ListarPromocao extends Component{

   token = localStorage.getItem('token-representante');
   emailRepresentanate = localStorage.getItem('email-represetante');
   host  =  JSON.parse(localStorage.getItem("servidores")).map(function(servidor){return servidor.url}); 
   baseUrl = JSON.parse(localStorage.getItem("servidores")).map(function(servidor){return servidor.baseUrl});
   constructor() {
    super();    
    this.state = {lista : []};   
    this.state = {msg: ''}; 
   }
  
    componentWillMount(){
     
      this.preencheLista();
       var excluir = PubSub.subscribe('excluiu',function(topico,response){
          console.log("RESULTADO EXCLUSAO: "+ response);
          if(response === 200){
            this.setState({msg:"PROMOCÃO EXCLUIDA COM SUCESSO!"}) 
            this.preencheLista();
          }
          if(response !== 200){
            this.setState({msg:"FALHA AO EXCLUIR PROMOCÃO!"})
          }
      }.bind(this));
      
      var naoExcluir = PubSub.subscribe('nao-excluiu',function(topico){
        this.setState({msg:"OPERACAO CANCELADA PELO USUARIO"})
      }.bind(this)); 

      PubSub.subscribe('atualizaLista', function(topico){
        this.preencheLista();
      }.bind(this)); 

      PubSub.publish('titulo-menu-superior',window.location.pathname);
    }

    componentDidMount(){
      //  PubSub.unsubscribe(this.naoExcluir);
       // PubSub.unsubscribe(this.excluir);
    }

    preencheLista(){ 
      console.log("ENVIANDO: " + this.token);      
      console.log("SERVIDOR: "+this.host);
      console.log("URL: "+this.baseUrl+"/representante/promo");
      console.log("VERBO: GET")

      const requestInfo = {
            method:'GET',
            dataType: 'json',
            headers:{'authorization': this.token}
        };

        fetch(this.host+this.baseUrl+"/representante/promo", requestInfo)
        .then(response =>{
            if(response.status === 200 || response.status === 201){
              console.log("RESPOSTA DO SERVIDOR, 201, AUTOTIZADO");
              return response.json();
            }if(response.status === 401){
              console.log("NAO AUTORIZADO DIRECIONANDO PARA PAGINA DE LOGIN");
              //this.props.history.push('/logout/representante');
            }else{
              console.log("NAO FOI POSSIVEL OBTER A(S) PROMOÇÃO(ÕES)");
                throw new Error('Não foi possivel obter promoções.');
            }
        })
        .then(promocoes =>{
          console.log("DADOS RECEBIDOS:" +promocoes);
          if(promocoes.length > 0){
             this.setState({lista:promocoes});        
          }
        })
        .catch(error => {
            this.setState({msg:error.message});
        });

        
    }

    render(){
        
        if(this.state.lista){
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
                    <div className="col-md-12">
                        <span className="msg-lista-promocao">{this.state.msg}</span>
                          <TabelaPromocao lista={this.state.lista} />  
                    </div>
                  </div>
              </div>
            );
        }else{
          return(
            <div>
               <Progress/>
            </div>
          
          );
        }
    }
}

class TabelaPromocao extends Component{
   render(){
     return(
       <div>
              <table className="table table-hover table-striped">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Pontos</th>
                            <th>Valido até</th>
                            <th>Status</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            this.props.lista.map(function(promocao){
                              return (
                                <tr key={promocao.id}>
                                  <td>{promocao.id}</td>
                                  <td>{promocao.nome}</td>
                                  <td>{promocao.quantidade_pontos}</td>
                                  <td>{promocao.validade}</td>
                                  <td>
                                    {promocao.status === 1 ? 'Ativo' : 'Inativo'}
                                    </td>
                                  <td>
                                   <Link to={'/promocao/editar/'+promocao.id}>
                                  Editar
                                   </Link> 
                                  
                                  </td>
                                  <td>
                                  
                                    <DialogExcluir
                                     label="Excluir"
                                     title={promocao.nome} 
                                     mensagem="Você gostaria de exclui-lo?"
                                     id = {promocao.id}
                                     url = "/representante/promo"     
                                     
                                    />
                                  
                                  
                                  </td>

                                </tr>
                              );
                            })
                          }
                        </tbody>
                      </table>
              </div>
     );
   }

}