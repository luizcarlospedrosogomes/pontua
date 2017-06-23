package com.pontua.app.modelo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.annotations.ApiModelProperty;


@Entity
public class Promocao {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("id")
    private Integer id;
    @Column(nullable = false)
    @JsonProperty("nome")
    private String nome;    
    @JsonProperty("validade")
    private String validade;
    @Column(nullable = false)
    @JsonProperty("quantidade_pontos")
    private String quantidade_pontos;
    @JsonProperty("status")
    private Integer status;
    @JsonProperty("representante")
    private String representante;
    @JsonProperty("token")
    @JsonIgnoreProperties(ignoreUnknown = true)
    private String token;
    
    public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	
    public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	public String getRepresentante() {
		return representante;
	}
	public void setRepresentante_id(String representante_id) {
		this.representante = representante_id;
	}
	public void setValidade(String validade) {
		this.validade = validade;
	}
	

	@JsonProperty("validade")
	@ApiModelProperty(example = "02/07/2017", required = true, value = "Creation time")
	@NotNull
	public String getValidade() {
		return validade;
	}
	public void setValidde(String validde) {
		this.validade = validde;
	}
	
	@JsonProperty("quantidade_pontos")
	  @ApiModelProperty(example = "20", required = true, value = "pontos por promocao")
	  @NotNull
	public String getQuantidade_pontos() {
		return quantidade_pontos;
	}
	public void setQuantidade_pontos(String quantidade_pontos) {
		this.quantidade_pontos = quantidade_pontos;
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
