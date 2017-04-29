package com.pontua.app.api.resources;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.google.gson.Gson;
import com.pontua.app.DAO.PromocaoDAO;
import com.pontua.app.modelo.Promocao;


@Path("pontua/promocao")
public class PromocaoResources {
	@RolesAllowed({"admin"})
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
	
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	public String adiciona(String conteudo){
		Promocao promocao = (Promocao) new Gson().fromJson(conteudo, Promocao.class);
		new PromocaoDAO().adiciona(promocao);
		return new Gson().toJson("inserido com sucesso");
	}
}
