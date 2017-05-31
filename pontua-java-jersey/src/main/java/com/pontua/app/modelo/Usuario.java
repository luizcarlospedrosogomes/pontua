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
	
	@ApiModelProperty(example = "cliente", required = false, value = "roles", hidden=true)
	public String getRoles() {
		return roles;
	}
	
	public void setRoles(String roles) {
		this.roles = roles;
	}
	@ApiModelProperty(example = "1", required = false, value = "id", hidden=true)
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
	  @ApiModelProperty(example = "654321", required = true, value = "senha em texto puro")
	  @NotNull
	public String getSenha() {
		return senha;
	}
	public void setSenha(String senha) {
		this.senha = senha;
	}
	@JsonProperty("email")
	@ApiModelProperty(example = "lc.pg@hotmail.com", required = true, value = "email valido")
	 @NotNull 
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	@Override
	  public String toString() {
	    StringBuilder sb = new StringBuilder();
	    sb.append("class Login {\n");
	    
	    sb.append("    email: ").append(toIndentedString(email)).append("\n");
	    sb.append("    senha: ").append(toIndentedString(senha)).append("\n");
	    sb.append("}");
	    return sb.toString();
	  }
	private String toIndentedString(java.lang.Object o) {
	    if (o == null) {
	      return "null";
	    }
	    return o.toString().replace("\n", "\n    ");
	  }
}
