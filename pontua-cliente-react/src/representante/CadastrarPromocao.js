import React, { Component } from 'react';
import '../assets/react-toolbox/theme.css';
import theme from '../assets/react-toolbox/theme.js';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';

//COMPONENTES
import InputCustomizado from '../componentes/InputCustomizado';
import InputDateCustomizado from '../componentes/InputDateCustomizado';

export default  class CadastrarPromocao extends Component{
    
    constructor(props) {
        super(props);
        this.state = {msg: '', fim_vigencia:'',inicio_vigencia:''}         
    }

   updateState = (data)  =>{
        let month  = String(data.date.getMonth() + 1);
        let day    = String(data.date.getDate());
        const year = String(data.date.getFullYear());

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        
        let data_formatada = `${month}/${day}/${year}`;
        console.log("data formatada"+ data_formatada)
        if(data.item == 'fim_vigencia'){
            this.setState({fim_vigencia:data_formatada})
        }
        if(data.item == 'inicio_vigencia'){
            this.setState({inicio_vigencia: data_formatada})
        }
    }

    host(){
      var rows = JSON.parse(localStorage.getItem("servidores"));
      var host = rows.map(function(servidor){return servidor.url}); 
      return host;
    }
    
    enviaForm(evento){
        evento.preventDefault(); 
          const token= localStorage.getItem('token-representante'); 
          console.log(token);
      
        const requestInfo = {
            method:'PUT',
            body:JSON.stringify({ nome:this.nome.value
                                , qtd_pontos:      parseInt(this.pontos.value)
                                , inicio_vigencia: this.state.inicio_vigencia
                                , final_vigencia: this.state.fim_vigencia
                              //  , representante_id:{id:this.representante.value}
                            }),
            headers:{'content-type'  : 'application/json'
                   , 'Authorization': token
                     }
        };
        console.log("ENVIANDO DADOS: "+requestInfo.body)
       /* fetch(this.host()+"/pontua/promocao",requestInfo)            
            .then(response =>{
            if(response.ok){
                console.log("promoção criada com sucesso");
                return response.text();
            }
            if(response.status == 401){
              this.props.history.push('/logout/representante');
            }
            if(response.status == 400){
              throw new Error('Verifique os campos');
            }
            else{
                throw new Error('nao foi possivel criar promoção');
            }
        }).catch(error => {
            this.setState({msg:error.message});
        });
        */
    }
    
    render() {
		return (
        <ThemeProvider  theme={theme}>
          <div>
           <h3>Cadastrar Promocao</h3>
           <span>{this.state.msg}</span>
            <div className="">
           
              <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm.bind(this)}>
                                
                <InputCustomizado
                  id="nome" 
                  type="text" 
                  name="nome" 
                  inputRef={el => this.nome = el}
                  label="Nome"
                  required={true}
                />                                              
                <InputCustomizado 
                  id="pontos" 
                  type="text" 
                  name="pontos"
                  ref="pontos" 
                  inputRef={el => this.pontos = el}
                  label="Pontos"
                  required={false}
                />
                
                <InputDateCustomizado
                id="inicio_vigencia" 
                label="Inicio"
                name="inicio_vigencia" 
                updateState = {this.updateState}
                value = {this.state.inicio_vigencia}
                required={false}
                />

                <InputDateCustomizado
                id="fim_vigencia" 
                label="Fim"
                name="fim_vigencia" 
                updateState = {this.updateState}
                value = {this.state.fim_vigencia}
                required={false}
                />
               
                

                <div className="pure-control-group">                                  
                  <label></label> 
                  <button type="submit" className="pure-button pure-button-primary">Cadastrar</button>                                    
                </div>
              </form>             
             </div>  
             </div>
              </ThemeProvider>
		);
    }
}