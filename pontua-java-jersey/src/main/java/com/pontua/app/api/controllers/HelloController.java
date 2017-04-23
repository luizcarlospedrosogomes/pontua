package com.pontua.app.api.controllers;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

@Path("ola")

public class HelloController {
	
	@GET
	@Produces(MediaType.TEXT_PLAIN)
	public String getMensagem(@QueryParam("usuario")String usuario){
		return "Bem vindo coisa:" + usuario;
	}
	
	@GET
	@Produces(MediaType.TEXT_PLAIN)
	@Path("usuarios/{id}")
	public String getUsuario(@PathParam("id")long id){
		return "Recuperado usario com "+id;
	}
}
