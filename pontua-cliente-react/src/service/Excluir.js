import React, { Component } from 'react';
export default  class Excluir extends Component{
     
   token = localStorage.getItem('token-representante');
   emailRepresentanate = localStorage.getItem('email-represetante');
   host  =  JSON.parse(localStorage.getItem("servidores")).map(function(servidor){return servidor.url}); 
   
    componentWillMount(){
        const requestInfo = {
            method:'DELETE',
            headers: {'apiKey': this.token},
        };

        console.log("ACESSANDO SERVIDOR: "+this.host+"/pontua/"+this.props.url+this.props.id);

        //fetch(this.host+"/pontua/"+this.props.url, requestInfo)
    }
    render(){return null;}
}