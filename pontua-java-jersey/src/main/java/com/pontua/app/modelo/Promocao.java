package com.pontua.app.modelo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.gson.annotations.SerializedName;

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
    @Column(nullable = false)
    @JsonProperty("inicio_vigencia")
    private String inicio_vigencia;
    @JsonProperty("final_vigencia")
    @Column(nullable = false)
    private String final_vigencia;
    @JsonProperty("validde")
    private String validde;
    @Column(nullable = false)
    @JsonProperty("qtd_pontos")
    private String qtd_pontos;
    
    @SerializedName("representante_id")
    @ManyToOne
    @JoinColumn(name="representante_id")
    private Representante representante_id;    
    
    @JsonProperty("representante")
    @ApiModelProperty(example = "1", required = true, value = "pontos por promocao")
    @NotNull
	public Representante getRepresentanteID() {
		return representante_id;
	}
	public void setRepresentante(Representante representante_id) {
		this.representante_id = representante_id;
	}
	
	@JsonProperty("inicio_vigencia")
	  @ApiModelProperty(example = "2015-07-07T15:49:51.230+02:00", required = true, value = "Creation time")
	  @NotNull
	public String getInicio_vigencia() {
		return inicio_vigencia;
	}
	public void setInicio_vigencia(String inicio_vigencia) {
		this.inicio_vigencia = inicio_vigencia;
	}
	@JsonProperty("final_vigencia")
	  @ApiModelProperty(example = "2015-07-07T15:49:51.230+02:00", required = true, value = "Creation time")
	  @NotNull
	public String getFinal_vigencia() {
		return final_vigencia;
	}
	public void setFinal_vigencia(String final_vigencia) {
		this.final_vigencia = final_vigencia;
	}
	public String getValidde() {
		return validde;
	}
	public void setValidde(String validde) {
		this.validde = validde;
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
