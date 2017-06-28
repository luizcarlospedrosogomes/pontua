import React, { Component } from 'react';
export default  class Pontos extends Component{
   
   token = localStorage.getItem('token-cliente');
   emailRepresentanate = localStorage.getItem('email-cliente');
   host  =  JSON.parse(localStorage.getItem("servidores")).map(function(servidor){return servidor.url}); 
   baseUrl = JSON.parse(localStorage.getItem("servidores")).map(function(servidor){return servidor.baseUrl});
  
   constructor() {
    super();    
      this.state = {msg: '', pontosCliente:'', lista:[], key: 1}; 
   }
    
    componentWillMount(){
        this.getPontos();
    }

    getPontos(){
       console.log("PEGAR PONTOS") 
      console.log("ENVIANDO: " + this.token);      
      console.log("SERVIDOR: "+this.host);
      console.log("URL: "+this.baseUrl+"/cliente/pontos");
      console.log("VERBO: GET")

      const requestInfo = {
            method:'GET',
            dataType: 'json',
            headers:{'authorization': this.token}
        };

        fetch(this.host+this.baseUrl+"/cliente/pontos", requestInfo)
        .then(response =>{
            if(response.status === 200 || response.status === 201){
              console.log("RESPOSTA DO SERVIDOR, 201, AUTOTIZADO. ACESSO EM: /pontua/representante/pontos");
              return response.json();
            }if(response.status === 401){
              console.log("NAO AUTORIZADO DIRECIONANDO PARA PAGINA DE LOGIN");
              //this.props.history.push('/logout/representante');
            }else{
              console.log("NAO FOI POSSIVEL OBTER A(S) PROMOÇÃO(ÕES)");
                throw new Error('Não foi possivel obter promoções.');
            }
        })
        .then(pontos =>{
          console.log("DADOS RECEBIDOS: PONTOS" +pontos);
          if(pontos.length > 0){
             this.setState({lista: pontos});
          }
        })
        .catch(error => {
            this.setState({msg:error.message});
        });

    }
    render(){
         return(
                <div className="content">
                     <table className="table table-hover table-striped">
                        <thead>
                          <tr>                            
                            <th>Representante</th>
                            <th>Pontos</th>                            
                          </tr>
                        </thead>
                        <tbody>
                          {
                            this.state.lista.map(function(pontos){
                              return (
                                <tr key="1++">
                                  <td>{pontos.nome_representante}</td>
                                  <td>{pontos.quantidade_pontos}</td>
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