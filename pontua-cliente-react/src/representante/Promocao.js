import React, { Component } from 'react';
import $ from 'jquery';
import InputCustomizado from './componentes/InputCustomizado';
import PubSub from 'pubsub-js';
import TratadorErros from  './TratadorErros';
import { Link  } from 'react-router-dom';

class FormularioPromocao extends Component {

  constructor() {
    super();    
    this.state = {nome:'',empresa:'',data_fim:'', data_inicio:''};
    this.enviaForm = this.enviaForm.bind(this);
    this.setNome = this.setNome.bind(this);
    this.setempresa = this.setempresa.bind(this);
    this.setDataInicio = this.setDataInicio.bind(this);
    this.setDataFim = this.setDataFim.bind(this);
  }

  enviaForm(evento){
    evento.preventDefault(); 
      $.ajax({
      url:'http://127.0.0.1:8000/api-promocao-list/',
      contentType:'application/json',
      dataType:'json',
      type:'post',
      
      data: JSON.stringify({
                      nome:this.state.nome
                    , empresa:this.state.empresa
                    , data_inicio:this.state.data_inicio
                    , data_fim:this.state.data_fim
                  }),
      success: function(novaListagem){
        PubSub.publish('atualiza-lista-autores',novaListagem);        
        this.setState({nome:'',empresa:'',data_inicio:'',data_fim:''});
      }.bind(this),
      error: function(resposta){
        if(resposta.status === 400) {
          new TratadorErros().publicaErros(resposta.responseJSON);
        }
      },
      beforeSend: function(){
        PubSub.publish("limpa-erros",{});
      }      
    });
  }

  setNome(evento){
    this.setState({nome:evento.target.value});
  }
  setempresa(evento){
    this.setState({empresa:evento.target.value});
  }
  setDataFim(evento){
    this.setState({data_fim:evento.target.value});
    console.log(evento.target.value);
  }
  setDataInicio(evento){
    console.log(evento.target.value)
    this.setState({data_inicio:evento.target.value});
  }   

	render() {
		return (
          
            <div className="pure-form pure-form-aligned">
             
             <Link to="/login">login</Link>
           
              <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
                
                <InputCustomizado 
                  id="nome" 
                  type="text" 
                  name="nome" 
                  value={this.state.nome} 
                  onChange={this.setNome} 
                  label="Nome"
                />                                              
                <InputCustomizado 
                  id="empresa" 
                  type="text" 
                  name="empresa" 
                  value={this.state.empresa} 
                  onChange={this.setempresa} 
                  label="Empresa"
                />                                              
              
              
                <div className="pure-control-group">                                  
                  <label></label> 
                  <button type="submit" className="pure-button pure-button-primary">Gravar</button>                                    
                </div>
              </form>             
             </div>  

		);
	}
}

class TabelaPromocao extends Component {

	render() {
		return(<div>            
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
                          {
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
                          }
                        </tbody>
                      </table> </div>            		
		);
	}
}

export default class Promocao extends Component {

  constructor() {
    super();    
    this.state = {lista : []};  
    console.log(lista);
  }

  componentDidMount(){  
   $.ajax({
        url:"http://localhost:8000/api-promocao-list/",
        dataType: 'json',
        success:function(resposta){ 
          this.setState({lista:resposta});
        }.bind(this)
      } 
    );          

    PubSub.subscribe('atualiza-lista-autores',function(topico,novaLista){
      this.setState({lista:novaLista});
    }.bind(this));
  }   


  render(){
    return (
      <div>
        <FormularioPromocao/>
        <TabelaPromocao lista={this.state.lista}/>
      </div>
    );
  }
}