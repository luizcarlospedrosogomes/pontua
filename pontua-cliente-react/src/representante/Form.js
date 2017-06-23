import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import '../assets/react-toolbox/theme.css';
import theme from '../assets/react-toolbox/theme.js';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import datePickerTheme from '../assets/react-toolbox/rtcustomizado.css';

//COMPONENTES
import InputCustomizado from '../componentes/InputCustomizado';
import InputDateCustomizado from '../componentes/InputDateCustomizado';
import ComboboxCustomizado from '../componentes/ComboboxCustomizado';

export default  class Form extends Component{
   
    render() {
		return (
        <ThemeProvider  theme={theme}>
          <div>           
           <span>{this.state.msg}</span>
            <div>
           
              <form className="pure-form pure-form-aligned">
               
                <InputCustomizado
                  id="nome" 
                  type="text" 
                  name="nome" 
                  inputRef={el => this.nome = el}
                  label="Nome"
                  required={true}
                  value = {this.state.nome}
                />    
                                                          
                <InputCustomizado 
                  id="pontos" 
                  type="text" 
                  name="pontos"
                  ref="pontos" 
                  inputRef={el => this.pontos = el}
                  label="Pontos"
                  required={false}
                  value = {this.state.quantidade_pontos}
                />
                
                <InputCustomizado 
                id="inicio_vigencia" 
                label="Valido até"
                name="inicio_vigencia" 
                updateState = {this.updateState}
                value = {this.state.inicio_vigencia}
                required={false}
               // value = {this.state.inicio_vigencia}
                />                  

                <ComboboxCustomizado
                 source = {this.status}
                 label  = "Status"
                 default= {this.state.status}
                 value={this.state.status}
            
                />
              </form>             
             </div>  
             </div>
              </ThemeProvider>
		);
    }
}