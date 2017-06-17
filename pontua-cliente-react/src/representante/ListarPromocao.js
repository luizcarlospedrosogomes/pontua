import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import { Link  } from 'react-router-dom';
import '../assets/react-toolbox/theme.css';
import theme from '../assets/react-toolbox/theme.js';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
//COMPONENTES
import DialogCustomizado from '../componentes/DialogCustomizado';
//CSS
import '../assets/react-toolbox/rtcustomizado.css';

export default  class ListarPromocao extends Component{

   token = localStorage.getItem('token-representante');
   emailRepresentanate = localStorage.getItem('email-represetante');
   host  =  JSON.parse(localStorage.getItem("servidores")).map(function(servidor){return servidor.url}); 

   constructor() {
    super();    
    this.state = {lista : []};   
    this.state = {msg: ''}; 
   }
  
    componentWillMount(){
      var excluiu = PubSub.subscribe('excluiu',function(topico,response){
        if(response == 200){
           this.setState({msg:"PROMOCÃO EXCLUIDA COM SUCESSO!"}) 
           this.preencheLista();
        }
        if(response != 200){
          this.setState({msg:"FALHA AO EXCLUIR PROMOCÃO!"})
        }
      }.bind(this));
      
      var naoExcuiu =PubSub.subscribe('nao-excluiu',function(topico){
        this.setState({msg:"OPERACAO CANCELADA PELO USUARIO"})
      }.bind(this));
    }
    componentWillUnmount(){
      PubSub.unsubscribe(this.naoExcuiu);
      PubSub.unsubscribe(this.excluiu);
    }
    componentDidMount(){
      this.preencheLista();
      
    }

    preencheLista(){ 
      console.log("ENVIANDO: " + this.token);      
      const requestInfo = {
            method:'GET',
            dataType: 'json',
            headers: {'authorization': this.token},
            
        };
        console.log("ACESSANDO SERVIDOR: "+this.host+"/pontua/promocao");
        fetch(this.host+"/pontua/promocao", requestInfo)
        .then(response =>{
            if(response.status == 200 || response.status == 201){
              console.log("RESPOSTA DO SERVIDOR, 201, AUTOTIZADO");
              return response.json();
            }if(response.status == 401){
              console.log("NAO AUTORIZADO DIRECIONANDO PARA PAGINA DE LOGIN");
              this.props.history.push('/logout/representante');
            }else{
              console.log("NAO FOI POSSIVEL OBTER A(S) PROMOÇÃO(ÕES)");
                throw new Error('Não foi possivel obter promoções.');
            }
        })
        .then(promocoes =>{
          console.log(promocoes);
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
                <div>
                    <h3>Promoções</h3>
                    <span className="msg-lista-promocao">{this.state.msg}</span>
                      <TabelaPromocao lista={this.state.lista} />  
                </div>
            
            );
        }else{
          return(
            <div>
                <h3>carregando....</h3>
                <Link to="/promocao/cadastrar"><button>Cadastrar Promocoa</button></Link>
            </div>
          
          );
        }
    }
}

class TabelaPromocao extends Component{
   render(){
     return(
              <table className="pure-table">
                        <thead>
                          <tr>
                            <th>Nome</th>
                            <th>Pontos</th>
                            <th>Inicio Vigencia</th>
                            <th>Fim Vigencia</th>
                            <th>Representante</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            this.props.lista.map(function(promocao){
                              return (
                                <tr key={promocao.id}>
                                  <td>{promocao.nome}</td>
                                  <td>{promocao.qtd_pontos}</td>
                                  <td>{promocao.inicio_vigencia}</td>
                                  <td>{promocao.final_vigencia}</td>
                                  <td>{promocao.representante_id.email}</td>
                                  <td>Editar</td>
                                  <td>
                                  <ThemeProvider  theme={theme}> 
                                    <DialogCustomizado
                                     label="Excluir"
                                     title={promocao.nome} 
                                     mensagem="Você gostaria de excluir?"
                                     id = {promocao.id}
                                     url = "promocao"     
                                     
                                    />
                                  </ThemeProvider>
                                  
                                  </td>

                                </tr>
                              );
                            })
                          }
                        </tbody>
                      </table>
     );
   }

}