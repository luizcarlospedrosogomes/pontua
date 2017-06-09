import React, { Component } from 'react';
import '../assets/react-toolbox/theme.css';
import theme from '../assets/react-toolbox/theme.js';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import datePickerTheme from '../assets/react-toolbox/datepicker.css';

//COMPONENTES
import InputCustomizado from '../componentes/InputCustomizado';
import InputDateCustomizado from '../componentes/InputDateCustomizado';
import ComboboxCustomizado from '../componentes/ComboboxCustomizado';

export default  class CadastrarPromocao extends Component{
   representantes = new Array();
   token = localStorage.getItem('token-representante'); 
   host  =  JSON.parse(localStorage.getItem("servidores")).map(function(servidor){return servidor.url}); 

    constructor(props) {
        super(props);
        this.state = {msg: '', fim_vigencia:'',inicio_vigencia:'', representanteLista:''}         
    }
    
     componentDidMount(){ 
       console.log(this.token);
        const requestInfo = {
            method:'GET',
            headers: {'apiKey': this.token},
            dataType: 'json',
        }
        fetch(this.host+"/pontua/representante",requestInfo)
          .then(response =>{
            if(response.status == 200 || response.status == 201){
              console.log("RESPOSTA DO SERVIDOR, AUTOTIZADO");
              return response.json();
            }if(response.status == 401){
              console.log("NAO AUTORIZADO DIRECIONANDO PARA PAGINA DE LOGIN");
              this.props.history.push('/logout/representante');
            }else{
              console.log("NAO FOI POSSIVEL OBTER A(S) PROMOÇÃO(ÕES)");
                throw new Error('Não foi possivel obter promoções.');
            }
        })
        .then(representante =>{
          var item;
          if(representante.length > 0){
                 
              for (var type in representante) {
                  item = {};
                  item.value = representante[0]['id'];
                  item.label = representante[0]['email'];
                  this.representantes.push(item);
              }

              // display result
               console.log(JSON.stringify(this.representantes));
               console.log("REPRESENTANTES: "+this.representantes);
              
            }
          });
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

    
    
    enviaForm(evento){
        evento.preventDefault(); 
        console.log(this.token);
      
        const requestInfo = {
            method:'PUT',
            body:JSON.stringify({ nome:this.nome.value
                                , qtd_pontos:      parseInt(this.pontos.value)
                                , inicio_vigencia: this.state.inicio_vigencia
                                , final_vigencia: this.state.fim_vigencia
                              //  , representante_id:{id:this.representante.value}
                            }),
            headers:{'content-type'  : 'application/json'
                   , 'Authorization': this.token
                     }
        };
        console.log("ENVIANDO DADOS: "+requestInfo.body)
       /* fetch(this.host+"/pontua/promocao",requestInfo)            
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
            <div>
           
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
                
                <InputDateCustomizado theme="datePickerTheme"
                id="inicio_vigencia" 
                label="Inicio"
                name="inicio_vigencia" 
                updateState = {this.updateState}
                value = {this.state.inicio_vigencia}
                required={false}
                />

                <InputDateCustomizado theme="datePickerTheme"
                id="fim_vigencia" 
                label="Fim"
                name="fim_vigencia" 
                updateState = {this.updateState}
                value = {this.state.fim_vigencia}
                required={false}
                />
                
                <ComboboxCustomizado
                 id="representante" 
                 label="Representante"
                 source = {this.representantes}
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