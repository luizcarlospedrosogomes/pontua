import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import '../assets/react-toolbox/theme.css';
import theme from '../assets/react-toolbox/theme.js';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';


//COMPONENTES
import InputCustomizado from '../componentes/InputCustomizado';
import InputDateCustomizado from '../componentes/InputDateCustomizado';
import ComboboxCustomizado from '../componentes/ComboboxCustomizado';
import ListarPromocao from './ListarPromocao';

export default  class CadastrarPromocao extends Component{
   token = localStorage.getItem('token-representante');
   host  =  JSON.parse(localStorage.getItem("servidores")).map(function(servidor){return servidor.url});
   baseUrl = JSON.parse(localStorage.getItem("servidores")).map(function(servidor){return servidor.baseUrl});
   emailRepresentante = localStorage.getItem('email-representante');

   status = [{value: '-1' ,label: 'Selecione'},
             {value: '1'  ,label: 'Ativa' } ,
             {value: '0'  ,label: 'Inativa'}
            ]
    constructor(props) {
        super(props);
        this.state = {msg: '', inicio_vigencia:'', statusValor:'', lista:[]}         
    }
    componentWillMount(){
        PubSub.subscribe('valor-combo',function(topico,valor){
            this.setState({statusValor:valor})
        }.bind(this));
    }

    updateState = (data)  =>{

        let month  = String(data.date.getMonth() + 1);
        let day    = String(data.date.getDate());
        const year = String(data.date.getFullYear());
        let hh    = String(data.date.getHours());
        let mm    = String(data.date.getMinutes());
        let ss    = String(data.date.getSeconds());

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        if (hh.length < 2) hh = '0' + hh;
        if (mm.length < 2) mm = '0' + mm;
        if (ss.length < 2) ss = '0' + ss;

        let data_datetime  =`${year}-${month}-${day}T${hh}:${mm}:${ss}`;
        let data_formatada = `${day}/${month}/${year}`;

        console.log("data formatada"+ data_formatada)
        console.log("data datetime"+ data_datetime)
      
        if(data.item === 'inicio_vigencia'){
            this.setState({inicio_vigencia: data_datetime})
        }
    }

    
    
    enviaForm(evento){
        evento.preventDefault(); 
        console.log(this.token);
      
        const requestInfo = {
            method:'POST',
            body:JSON.stringify({ token:this.token
                                , nome:this.nome.value
                              //  , representante: this.emailRepresentante
                                , quantidade_pontos: parseInt(this.pontos.value, 10)
                                , validade: this.state.inicio_vigencia
                                , status:  this.state.statusValor
                            }),
            headers:{'content-type'  : 'application/json'
                   , 'Authorization': this.token
                     }
        };
        console.log("SERVDOR: "+this.host);
        console.log("URL: "+this.baseUrl+"/representante/promo");
        console.log("ENVIANDO DADOS: "+requestInfo.body);
        console.log("VERBO: POST")
        fetch(this.host+this.baseUrl+"/representante/promo",requestInfo)            
            .then(response =>{
            if(response.status === 200 || response.status === 201 ){
                PubSub.publish("atualizaLista")
                this.setState({msg:"PROMOCÃO INCLUIDA COM SUCESSO"});
                return response.text();
            }
            if(response.status === 401){
              this.props.history.push('/logout/representante');
            }
            if(response.status === 400){
              throw new Error('Verifique os campos');
            }
            else{
                throw new Error('erro: '+ response.status+' nao foi possivel criar promoção');
            }
        }).catch(error => {
            this.setState({msg:error.message});
        });
        
    }
    
    render() {
		return (
        <ThemeProvider  theme={theme}>
          <div>
           <span>{this.state.msg}</span>
            <div>
           
              <form className="form-group" onSubmit={this.enviaForm.bind(this)}>
               
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
                  type="number" 
                  name="pontos"
                  ref="pontos" 
                  inputRef={el => this.pontos = el}
                  label="Pontos"
                  required={false}
                />
                
                <InputDateCustomizado theme="datePickerTheme"
                id="inicio_vigencia" 
                label="Valido até"
                name="inicio_vigencia" 
                updateState = {this.updateState}
                value = {this.state.inicio_vigencia}
                required={false}
                />                  

                <ComboboxCustomizado
                 id="status"
                 source = {this.status}
                 label  = "Status"
                 default= "-1"
                />

                <div className="pure-control-group">                                  
                  <label></label> 
                  <button type="submit" className="btn btn-info btn-fill">Cadastrar</button>                                    
                </div>
              </form>             
             </div>  
                <ListarPromocao/>
             </div>
              </ThemeProvider>
              
		);
    }
}