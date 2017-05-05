import React, { Component } from 'react';
//import { Link } from 'react-router-dom'
//COMPONENTES
import ListaServidores from './ListaServidores';

export default  class Servidores extends Component{
   constructor(props) {
    super(props);
    this.state = { isChecked: true, lista : [] };
    
  }
  componentDidMount(){
     this.listarServidores ();
  }
  toggleChange = () => {
    this.setState({
      isChecked: !this.state.isChecked,
    });

  }

    adicionar(event){
        event.preventDefault();
        if(!this.nome.value == ''  && !this.url.value == ''){
            let dados_srv  = [{nome:this.nome.value,  url : this.url.value, padrao: this.state.isChecked}];
            localStorage.setItem("servidores", JSON.stringify(dados_srv));
            this.listarServidores(); 
        }        
    } 

    listarServidores(){ 
      var rows =  JSON.parse(localStorage.getItem("servidores")); 
      this.setState({lista:rows}); 
    }

    render(){
        return(
            <div>
                <form className="pure-form pure-form-stacked" onSubmit={this.adicionar.bind(this)}>
                <fieldset>
                    <legend>Adicionar servidores</legend>
                    <label htmlFor="nome">Nome</label>
                        <input 
                            id="nome" 
                            type="text" 
                            placeholder="Nome" 
                            ref={(input) => this.nome = input}
                    />
                    <label htmlFor="url">URL</label>
                        <input 
                            id="url" 
                            type="text" 
                            placeholder="URL" 
                            ref={(input) => this.url = input}
                    />
                    <label htmlFor="padrao" className="pure-checkbox">
                        <input 
                            id="padrao" 
                            type="checkbox" 
                            ref={(input) => this.padrao = input} 
                            checked={this.state.isChecked}
                            onChange={this.toggleChange}
                    />
                    Definir como padrão</label>
                    <button 
                        type="submit" 
                        className="pure-button pure-button-primary">
                        Alterar
                    </button>
                </fieldset>
                </form>
                <ListaServidores lista={this.state.lista}/>
            </div>
            
        );
    }
}