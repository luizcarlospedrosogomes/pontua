import React, { Component } from 'react';
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import Button from 'react-toolbox/lib/button/Button';
import PubSub from 'pubsub-js';
//CSS
import DialogTheme from '../assets/react-toolbox/rtcustomizado.css';

export default  class DialogCustomizado extends Component{
  state = { active: false };
  token = localStorage.getItem('token-representante');
  emailRepresentanate = localStorage.getItem('email-represetante');
  host  =  JSON.parse(localStorage.getItem("servidores")).map(function(servidor){return servidor.url});

  handleToggle = () => {
    this.setState({active: !this.state.active});
    
  }

  excluir = () => {
    const requestInfo = {
            method:'DELETE',
            headers:{'Authorization': this.token}
        };
    fetch(this.host+"/pontua/"+this.props.url+"/"+parseInt(this.props.id), requestInfo)
    .then(response =>{
            if(response.ok){
                console.log(this.props.url+" removido(a) com sucesso");
                PubSub.publish("excluiu", response.status)
            }
     });  
     this.setState({active: !this.state.active});
  }
  
  naoExcluir = () =>{
    PubSub.publish("nao-excluiu");
    this.setState({active: !this.state.active});
  }

  actions = [
    {label: 'SIM!',  onClick: this.excluir},
    {label: 'NÃO!',  onClick: this.naoExcluir}
  ];

  render () {
    return (
      <div>      
        <Button label={this.props.label} onClick={this.handleToggle} />
        <Dialog theme={DialogTheme}
          actions={this.actions} 
          active={this.state.active} 
          title={this.props.title}
          type={this.props.type}
        >
          <p className="excluir-mensagem">{this.props.mensagem}</p>
        </Dialog>
    
      </div>
    );
  }

}