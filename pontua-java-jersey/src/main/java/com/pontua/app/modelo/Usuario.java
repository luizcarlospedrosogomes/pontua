package com.pontua.app.modelo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.annotations.ApiModelProperty;

@Entity
public class Usuario {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@JsonProperty("senha")
	private String senha;
	@JsonProperty("email")
	private String email;
	private String roles;
	
	public String getRoles() {
		return roles;
	}
	public void setRoles(String roles) {
		this.roles = roles;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	 /**
	   * senha em texto puro
	   * @return senha
	  **/
	  @JsonProperty("senha")
	  @ApiModelProperty(example = "123456", required = true, value = "senha em texto puro")
	  @NotNull
	public String getSenha() {
		return senha;
	}
	public void setSenha(String senha) {
		this.senha = senha;
	}
	@JsonProperty("email")
	  @ApiModelProperty(example = "teste@teste.com", required = true, value = "email valido")
	  @NotNull
	 
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
}
