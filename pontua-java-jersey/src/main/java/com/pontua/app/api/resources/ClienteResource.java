package com.pontua.app.api.resources;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Request;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.pontua.app.DAO.ClienteDAO;
import com.pontua.app.DAO.UsuarioDAO;
import com.pontua.app.modelo.Cliente;
import com.pontua.app.modelo.Usuario;

@Path("/cliente")
public class ClienteResource {
	UsuarioDAO usuarioDAO;
	Usuario usuario;
	Cliente cliente;
	ClienteDAO clienteDAO;
	String email;
	@Context
    Request request;
    @Context
    SecurityContext securityContext;
	
	public ClienteResource(){
		this.usuario    = new Usuario();
		this.usuarioDAO = new UsuarioDAO();
		this.cliente    = new Cliente();
		this.clienteDAO = new ClienteDAO();
		//this.email      = this.securityContext.getUserPrincipal().getName();
	}
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response adicionar(String cliente){
		
		System.out.println("DADOS RECEBIDOS: " + cliente);
		System.out.println("VERBO: POST");
		System.out.println("URL: /pontua/cliente");
		
		JsonObject asJsonObject = new Gson().fromJson(cliente, JsonObject.class);
		this.usuario.setRoles("cliente");
		this.usuario.setEmail(asJsonObject.get("email").toString().replace("\"", ""));
		this.usuario.setSenha(asJsonObject.get("senha").toString().replace("\"", ""));
		
		if(this.usuarioDAO.adiciona(this.usuario)){
			System.out.println(this.usuario.getId());
			this.cliente.setEmail(asJsonObject.get("email").toString().replace("\"", ""));
			this.cliente.setCPF(asJsonObject.get("cpf").toString().replace("\"", ""));
			this.cliente.setNome(asJsonObject.get("nome").toString().replace("\"", ""));
			this.cliente.setNascimento(asJsonObject.get("nascimento").toString().replace("\"", ""));
			this.cliente.setSexo(asJsonObject.get("sexo").toString().replace("\"", ""));
			this.cliente.setStatus(asJsonObject.get("status").toString().replace("\"", ""));
			if(this.clienteDAO.adiciona(this.cliente))			
				return Response.status(201).build();
		}
		return Response.status(400).entity(new Gson().toJson("Email ja cadastrado")).build();		
	}	
	
	@PUT
	public Response atualiza(){
		return Response.status(401).build();
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getCliente(){
		System.out.println("DADOS ENVIADOS: ");
		System.out.println("VERBO: GET");
		System.out.println("URL: /pontua/cliente");
		if(!securityContext.getUserPrincipal().getName().isEmpty())
			return Response.ok(new Gson().toJson(this.clienteDAO.getDadosCliente(securityContext.getUserPrincipal().getName()))).build();	
		return Response.status(401).build();
	}
	
	@DELETE
	public Response inativa(){
		return Response.status(401).build();
	}
	
	
}
