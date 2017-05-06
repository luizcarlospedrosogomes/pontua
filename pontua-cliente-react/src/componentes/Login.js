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
        console.log(this.host()+"/pontua/login/cliente");
        const requestInfo = {
            method:'POST',
            Body: JSON.stringify({email: this.email.value, senha:this.senha.value}),
            headers: new Headers({
                'Content-type' : 'application/json'
            })
        };
        console.log(requestInfo);

        fetch(this.host()+"/pontua/login/cliente", requestInfo)
        .then(response =>{
            if(response.ok){
                console.log("sucesso no login");
                return response.text();
            }else{
                console.log("erro no login");
                this.setState({msg:'erro no login'});
            }
        })
    }         
  
    render(){
        return(
             <div>
                 <form className="pure-form" onSubmit={this.login.bind(this)}>
                    <fieldset>
                        <legend>Pontua - Login</legend>
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