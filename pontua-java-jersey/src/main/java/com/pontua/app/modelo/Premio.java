package com.pontua.app.modelo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Premio {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
	private String nome;
	private String descricao;
	private String quantidade_disponivel;
	private String validade;
	private String valor_pontos;
	private String representante_id;
	
	public String getRepresentante_id() {
		return representante_id;
	}
	public void setRepresentante_id(String representante_id) {
		this.representante_id = representante_id;
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
	public String getDescricao() {
		return descricao;
	}
	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
	public String getQuantidade_disponivel() {
		return quantidade_disponivel;
	}
	public void setQuantidade_disponivel(String quantidade_disponivel) {
		this.quantidade_disponivel = quantidade_disponivel;
	}
	public String getValidade() {
		return validade;
	}
	public void setValidade(String validade) {
		this.validade = validade;
	}
	public String getValor_pontos() {
		return valor_pontos;
	}
	public void setValor_pontos(String valor_pontos) {
		this.valor_pontos = valor_pontos;
	}
	
	
	
}
