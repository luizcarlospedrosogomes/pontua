import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import $ from 'jquery';
export default  class ListarPromocao extends Component{

   constructor() {
    super();    
    this.state = {lista : []};    
    }

    host(){
      var rows = JSON.parse(localStorage.getItem("servidores"));
      var host = rows.map(function(servidor){return servidor.url}); 
      return host;
    }
    
    componentDidMount(){ 
      const token= localStorage.getItem('token-representante'); 
      console.log(token);
      
      const requestInfo = {
            dataType: 'json',
            headers: {'Authorization': token},
            
        };
        
        fetch(this.host()+"/pontua/promocao", requestInfo)
        .then(response =>{
            if(response.status === 200 || response.status === 201){
              return response.json();
            }
        })
        .then(promocoes =>{
          console.log(promocoes);
          if(promocoes.length > 0){
             this.setState({lista:promocoes});
          }
        });

        PubSub.subscribe('atualiza-lista-autores',function(topico,novaLista){
            console.log(novaLista);
            this.setState({lista:novaLista});
        })
    }

    render(){
         return(
            <div>
                <h3>Promoções</h3>
                <TabelaPromocao lista={this.state.lista}/>
                
            </div>
        
        );
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
                                  <td>{promocao.representante.email}</td>
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