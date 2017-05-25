import React, { Component } from 'react';

//COMPONENTES
import InputCustomizado from '../componentes/InputCustomizado';

export default  class CadastrarPromocao extends Component{
    
    constructor(props) {
        super(props);
        this.state = {msg: ''};
    }
    
    host(){
      var rows = JSON.parse(localStorage.getItem("servidores"));
      var host = rows.map(function(servidor){return servidor.url}); 
      return host;
    }

    enviaForm(evento){
        evento.preventDefault(); 
          const token= localStorage.getItem('token-representante'); 
          console.log(token);
      
        const requestInfo = {
            method:'PUT',
            body:JSON.stringify({ nome:            this.nome.value
                                , pontos:          parseInt(this.pontos.value)
                                , inicio_vigencia: this.inicio_vigencia.value
                                , fim_vigencia:    this.fim_vigencia.value
                                , representante:   parseInt(this.representante.value)                                
                            }),
            headers:new Headers({'content-type'  : 'application/json'
                                , 'Authorization': token
                                })
        };
        console.log("ENVIANDO DADOS: "+requestInfo.body)
        fetch(this.host()+"/pontua/promocao",requestInfo)            
            .then(response =>{
            if(response.ok){
                console.log("promocao criada com sucesso");
                return response.text();
            }else{
                throw new Error('nao foi possivel criar promocoa');
            }
        })
    }
    
    render() {
		return (
          <div>
           <h3>Cadastrar Promocao</h3>
            <div className="">
           
              <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm.bind(this)}>
                
                <InputCustomizado
                  id="nome" 
                  type="text" 
                  name="nome" 
                  inputRef={el => this.nome = el}
                  label="Nome"
                />                                              
                <InputCustomizado 
                  id="pontos" 
                  type="text" 
                  name="pontos"
                  ref="pontos" 
                  inputRef={el => this.pontos = el}
                  label="Pontos"
                />

                <InputCustomizado
                  id="inicio_vigencia" 
                  type="text" 
                  name="inicio_vigencia" 
                  ref="inicio_vigencia"
                  inputRef={el => this.inicio_vigencia = el}
                  label="Inicio"
                />

                <InputCustomizado
                  id="fim_vigencia" 
                  type="text" 
                  name="fim_vigencia"
                  ref="fim" 
                  inputRef={el => this.fim_vigencia = el}
                  label="Fim"
                />

                <InputCustomizado
                  id="representante" 
                  type="text" 
                  name="representante" 
                  inputRef={el => this.representante = el}
                  label="Representante"
                />

                <div className="pure-control-group">                                  
                  <label></label> 
                  <button type="submit" className="pure-button pure-button-primary">Cadastrar</button>                                    
                </div>
              </form>             
             </div>  
             </div>
		);
    }
}