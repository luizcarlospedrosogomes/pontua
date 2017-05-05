//REACT
import React, { Component } from 'react';


export default  class Login extends Component{
    render(){
        return(
             <div>
                 <form className="pure-form">
                    <fieldset>
                        <legend>Pontua - Login</legend>
                        <input type="email" placeholder="Email"/>
                        <input type="password" placeholder="Senha"/>
                        <button type="submit" className="pure-button pure-button-primary">Entrar</button>
                     </fieldset>
                </form>
        </div>
        );
    }
}