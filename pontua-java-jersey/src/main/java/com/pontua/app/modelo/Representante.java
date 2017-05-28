package com.pontua.app.modelo;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import org.hibernate.annotations.CascadeType;

@Entity
public class Representante {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
	private String nome;
	private String fantasia;
	private String cnpj_cpf;
	private String end_logradouro;
	private String end_numero;
	private String end_complemento;
	private String end_bairro;
	private String end_cidade;
	private String end_estado;
	private String end_cep;
	private String email;
	private String senha;
	private String validade_pontos;
	
	//@OneToMany(mappedBy="representante")
	@OneToMany(mappedBy = "representante_id", targetEntity = Promocao.class, fetch = FetchType.LAZY)
    private transient List<Promocao> promocao;
	
	@OneToMany(mappedBy="representante")
    private transient  List<Premio> premio;
	

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
	public String getFantasia() {
		return fantasia;
	}
	public void setFantasia(String fantasia) {
		this.fantasia = fantasia;
	}
	public String getCnpj_cpf() {
		return cnpj_cpf;
	}
	public void setCnpj_cpf(String cnpj_cpf) {
		this.cnpj_cpf = cnpj_cpf;
	}
	public String getEnd_logradouro() {
		return end_logradouro;
	}
	public void setEnd_logradouro(String end_logradouro) {
		this.end_logradouro = end_logradouro;
	}
	public String getEnd_numero() {
		return end_numero;
	}
	public void setEnd_numero(String end_numero) {
		this.end_numero = end_numero;
	}
	public String getEnd_complemento() {
		return end_complemento;
	}
	public void setEnd_complemento(String end_complemento) {
		this.end_complemento = end_complemento;
	}
	public String getEnd_bairro() {
		return end_bairro;
	}
	public void setEnd_bairro(String end_bairro) {
		this.end_bairro = end_bairro;
	}
	public String getEnd_cidade() {
		return end_cidade;
	}
	public void setEnd_cidade(String end_cidade) {
		this.end_cidade = end_cidade;
	}
	public String getEnd_estado() {
		return end_estado;
	}
	public void setEnd_estado(String end_estado) {
		this.end_estado = end_estado;
	}
	public String getEnd_cep() {
		return end_cep;
	}
	public void setEnd_cep(String end_cep) {
		this.end_cep = end_cep;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getSenha() {
		return senha;
	}
	public void setSenha(String senha) {
		this.senha = senha;
	}
	public String getValidade_pontos() {
		return validade_pontos;
	}
	public void setValidade_pontos(String validade_pontos) {
		this.validade_pontos = validade_pontos;
	}

}
