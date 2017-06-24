import { Component } from 'react';

export default  class Logout  extends Component{
    host  =  JSON.parse(localStorage.getItem("servidores")).map(function(servidor){return servidor.url});
    componentWillMount(){
        console.log("SERVIDOR: "+ this.host);
        console.log("URL : pontua/logout")
        console.log("VERBO: DELETE")
        console.log("desconectado: "+ this.props.match.params.login)
        localStorage.removeItem('token-'+this.props.match.params.login);
        localStorage.removeItem('email-'+this.props.match.params.login);
        this.props.history.push('/login/'+this.props.match.params.login);
    }   

    render(){
         return null;
    }
}