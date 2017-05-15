package com.pontua.modelo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.annotations.ApiModelProperty;


@Entity
public class Promocao {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @JsonProperty("nome")
    private String nome;
    @JsonProperty("inicio_vigencia")
    private String inicio_vigencia;
    @JsonProperty("final_vigencia")
    private String final_vigencia;
    @JsonProperty("validde")
    private String validade;
    
    
    public String getValidade() {
		return validade;
	}

	public void setValidade(String validade) {
		this.validade = validade;
	}
	@JsonProperty("qtd_pontos")
    private String qtd_pontos;
    
  /*  @ManyToOne
    private Representante representante;   */ 
  
	public String getInicio_vigencia() {
		return inicio_vigencia;
	}
	
	@JsonProperty("inicio_vigencia")
	@ApiModelProperty(example = "2015-07-07T15:49:51.230+02:00", required = true, value = "Creation time")
	@NotNull
	public void setInicio_vigencia(String inicio_vigencia) {
		this.inicio_vigencia = inicio_vigencia;
	}
	
	@JsonProperty("fim_vigencia")
	@ApiModelProperty(example = "2015-07-07T15:49:51.230+02:00", required = true, value = "Creation time")
	@NotNull
	public String getFinal_vigencia() {
		return final_vigencia;
	}
	public void setFinal_vigencia(String final_vigencia) {
		this.final_vigencia = final_vigencia;
	}
	
	
	@JsonProperty("qtd_pontos")
	  @ApiModelProperty(example = "20", required = true, value = "pontos por promocao")
	  @NotNull
	public String getQtd_pontos() {
		return qtd_pontos;
	}
	public void setQtd_pontos(String qtd_pontos) {
		this.qtd_pontos = qtd_pontos;
	}
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	@JsonProperty("nome")
	  @ApiModelProperty(example = "compra 3 leva 2", required = true, value = "nome da promocao")
	  @NotNull
	  @Size(min=1,max=100)
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	
}
