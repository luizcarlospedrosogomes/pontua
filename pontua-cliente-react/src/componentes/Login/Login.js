//REACT
import React, { Component } from 'react';

export default  class Login extends Component{
       
    constructor(props) {
        super(props);
        this.state = {msg: ''};
    }

    host(){
      var rows = JSON.parse(localStorage.getItem("servidores"));
      var host = rows.map(function(servidor){return servidor.url}); 
      return host;
    }

    login(event){
        event.preventDefault();

        const requestInfo = {
            method:'POST',
            body:JSON.stringify({email: this.email.value, senha:this.senha.value}),
            headers:new Headers({'content-type' : 'application/json'})
        };
        
        fetch(this.host()+"/pontua/login",requestInfo)            
            .then(response =>{
            if(response.ok){
                console.log("sucesso no login");
                return response.text();
            }else{
                throw new Error('nao foi possivel fazer o login');
            }
        }).then(token =>{
            console.log(token)
            if(this.props.match.params.login == 'representante'){
                localStorage.setItem('token-representante',token);
                this.props.history.push('/representante');
            }else if(this.props.match.params.login == 'cliente'){
                localStorage.setItem('token-cliente',token);
                this.props.history.push('/cliente');
            }
        }).catch(error => {
            this.setState({msg:error.message});
        })
    }         
  
    render(){
        return(
             <div>
                 <div className="header">
                    <h1>Bem vindo ao Pontua</h1>
                </div>
                 <h3>Entrar como {this.props.match.params.login}</h3>
                 <form className="pure-form" onSubmit={this.login.bind(this)}>
                    <fieldset>
                        <legend><span>{this.state.msg}</span></legend>
                        <input 
                            type="email" 
                            placeholder="Email"
                            ref={(input) => this.email = input}
                            
                        />
                        <input 
                            type="password" 
                            placeholder="Senha"
                            ref={(input) => this.senha = input}
                        />
                        <button type="submit" className="pure-button pure-button-primary">Entrar</button>
                     </fieldset>
                </form>
        </div>
        );
    }
}