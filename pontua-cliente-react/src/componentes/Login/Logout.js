import React, { Component } from 'react';

export default  class Logout  extends Component{
    componentWillMount(){
        console.log("desconectado: "+ this.props.match.params.login)
        localStorage.removeItem('token-'+this.props.match.params.login);
        localStorage.removeItem('email-'+this.props.match.params.login);
        this.props.history.push('/login/'+this.props.match.params.login);
    }   

    render(){
         return null;
    }
}