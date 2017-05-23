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
      
      /*const requestInfo = {
            dataType: 'json',
            headers: {'Authorization': ['coisa']}

        };
        */
        
     /* fetch(this.host()+"/pontua/promocao" ,{
        headers: {'Accept': '*',
                  'authorization' : 'teste'}
      })
      .then((response) => response.json())
*/
      $.ajax({
    url:this.host()+"/pontua/promocao",
    headers: {'authorization' : token},
      
      });

      

    }

    render(){
         return(
            <div>
                <h3>Listar Promocao</h3>

                <table className="pure-table">
                        <thead>
                          <tr>
                            <th>Nome</th>
                            <th>Empresa</th>
                            <th>Data Inicio</th>
                            <th>Data Fim</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/*{
                            this.props.lista.map(function(promocao){
                              return (
                                <tr key={promocao.id}>
                                  <td>{promocao.nome}</td>
                                  <td>{promocao.empresa}</td>
                                  <td>{promocao.data_inicio}</td>
                                  <td>{promocao.data_fim}</td>
                                </tr>
                              );
                            })
                          }*/}
                        </tbody>
                      </table>
            </div>
        
        );
    }
}