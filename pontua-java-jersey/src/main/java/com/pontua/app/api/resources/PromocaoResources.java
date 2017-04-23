package com.pontua.app.api.resources;

import java.util.List;

import javax.persistence.EntityManager;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.google.gson.Gson;
import com.pontua.app.DAO.PromocaoDAO;
import com.pontua.app.modelo.Promocao;
import com.pontua.app.util.JPAUtil;

@Path("promocao")
public class PromocaoResources {
	
	@Path("{id}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String busca(@PathParam("id") int id) {
		PromocaoDAO promocao = new PromocaoDAO(); 
		return new Gson().toJson(promocao.buscaId(id));
    }
	
	@Path("list")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String list() {
		PromocaoDAO promocao = new PromocaoDAO(); 
		return new Gson().toJson(promocao.buscaAll());
    }
}
