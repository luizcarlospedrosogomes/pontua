import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import { Link  } from 'react-router-dom';

export default  class ListarPromocao extends Component{

   constructor() {
    super();    
    this.state = {lista : []};   
    this.state = {msg: ''}; 
    }

    host(){
      var rows = JSON.parse(localStorage.getItem("servidores"));
      var host = rows.map(function(servidor){return servidor.url}); 
      return host;
    }
    
    componentDidMount(){ 
      const token= localStorage.getItem('token-representante'); 
      console.log("ENVIANDO: " + token);
      
      const requestInfo = {
            method:'GET',
            dataType: 'json',
            headers: {'apiKey': token},
            
        };
        console.log("ACESSANDO SERVIDOR: "+this.host()+"/pontua/promocao");
        fetch(this.host()+"/pontua/promocao", requestInfo)
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
        }).catch(error => {
            this.setState({msg:error.message});
        });

        PubSub.subscribe('atualiza-lista-autores',function(topico,novaLista){
            //console.log(novaLista);
            this.setState({lista:novaLista});
        })
    }

    render(){
        
        if(this.state.lista){
            return(
                <div>
                    <h3>Promoções</h3>
                    <span>{this.state.msg}</span>
                      <TabelaPromocao lista={this.state.lista} />  
                </div>
            
            );
        }else{
          return(
            <div>
                <h3>Não existem promoções</h3>
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
                                  <td>Excluir</td>

                                </tr>
                              );
                            })
                          }
                        </tbody>
                      </table>
     );
   }

}