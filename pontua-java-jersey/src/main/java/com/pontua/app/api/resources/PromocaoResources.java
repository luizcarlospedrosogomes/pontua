package com.pontua.app.api.resources;

import java.util.List;

import javax.annotation.security.PermitAll;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.google.gson.Gson;
import com.pontua.app.DAO.PromocaoDAO;
import com.pontua.app.modelo.Promocao;


@Path("pontua/promocao")
public class PromocaoResources {
	
	@PermitAll
	@Path("/{id}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String busca(@PathParam("id") int id) {
		PromocaoDAO promocao = new PromocaoDAO(); 
		return new Gson().toJson(promocao.buscaId(id));
    }
	@PermitAll
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response list() {
		PromocaoDAO promocao = new PromocaoDAO();
		List getPromocao =   promocao.buscaAll();
		if(!getPromocao.isEmpty()){
			return Response.ok(new Gson().toJson(getPromocao)).build();
		}
		return Response.status(404).build();
    }
	
	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	public Response adiciona(String conteudo){
		Promocao promocao = (Promocao) new Gson().fromJson(conteudo, Promocao.class);
		new PromocaoDAO().adiciona(promocao);
		return Response.status(201).build();
	}
}
