package com.pontua.app.modelo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;


@Entity
public class Promocao {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nome;
    private String inicio_vigencia;
    private String final_vigencia;
    private String validde;
    private String qtd_pontos;
    
    @ManyToOne
    private Representante representante;    
  
	public String getInicio_vigencia() {
		return inicio_vigencia;
	}
	public void setInicio_vigencia(String inicio_vigencia) {
		this.inicio_vigencia = inicio_vigencia;
	}
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
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	
}
