package com.pontua.app.modelo;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Persistence;
import javax.persistence.Query;

import com.google.gson.Gson;
import com.pontua.app.util.JPAUtil;

@Entity
public class Promocao {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nome;
    private String data_inicio;
    private String data_fim;
    private String pontos;
    private Integer empresa;
   
    
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
	public String getData_inicio() {
		return data_inicio;
	}
	public void setData_inicio(String data_inicio) {
		this.data_inicio = data_inicio;
	}
	public String getData_fim() {
		return data_fim;
	}
	public void setData_fim(String data_fim) {
		this.data_fim = data_fim;
	}
	public String getPontos() {
		return pontos;
	}
	public void setPontos(String pontos) {
		this.pontos = pontos;
	}
	public Integer getEmpresa() {
		return empresa;
	}
	public void setEmpresa(Integer empresa) {
		this.empresa = empresa;
	}
}
