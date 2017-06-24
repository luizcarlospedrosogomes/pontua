import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PubSub from 'pubsub-js';

export default class MenuSuperior extends Component{
   
    constructor(props) {
        super(props);
        this.state = {titulo1:'', titulo2:''}
    }
  componentWillMount(){
      PubSub.subscribe('titulo-menu-superior',function(topico,url){
            let temp = url.split("/");
            this.setState({titulo1: temp[1], titulo2: temp[2]});
        }.bind(this));
      PubSub.subscribe('titulo-menu-superior-cadastraCliente',function(topico,url){
            let temp = url.split("/");
            this.setState({titulo1: temp[1], titulo2: temp[2]});
        }.bind(this));
     
  } 

  render(){
     return(
      <div>
            <a className="navbar-brand">{this.state.titulo2}{this.state.titulo1}</a>
      </div>
    );
  }
}
