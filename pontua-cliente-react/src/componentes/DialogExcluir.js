import React, { Component } from 'react';
import '../assets/react-toolbox/theme.css';
import theme from '../assets/react-toolbox/theme.js';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import Button from 'react-toolbox/lib/button/Button';
import PubSub from 'pubsub-js';

//CSS
import DialogTheme from '../assets/react-toolbox/rtcustomizado.css';

export default  class DialogExcluir extends Component{
  state = { active: false };
  token = localStorage.getItem('token-representante');
  host  =  JSON.parse(localStorage.getItem("servidores")).map(function(servidor){return servidor.url});
  baseUrl = JSON.parse(localStorage.getItem("servidores")).map(function(servidor){return servidor.baseUrl});

  handleToggle = () => { this.setState({active: !this.state.active}); }

  excluir = () => {
    const requestInfo = {
            method:'DELETE',
            body:JSON.stringify({token:this.token}),
            headers:{'Authorization': this.token}
        };
    console.log("VERBO: DELETE");
    console.log(this.host+this.baseUrl+this.props.url);
    fetch(this.host+this.baseUrl+this.props.url+"/"+parseInt(this.props.id,10), requestInfo)
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
    <ThemeProvider  theme={theme}> 
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
    </ThemeProvider>
    );
  }

}