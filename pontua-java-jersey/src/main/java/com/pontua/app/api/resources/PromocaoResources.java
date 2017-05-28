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
import com.google.gson.JsonObject;
import com.pontua.app.DAO.PromocaoDAO;
import com.pontua.app.modelo.Promocao;


@Path("pontua/promocao")
public class PromocaoResources {
	/**
	 * 
	 * @param id recebe um inteiro 
	 * @return promocao referente ao id
	 */
	@PermitAll
	@Path("/{id}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response busca(@PathParam("ID") int id) {
		System.out.println("recebeu id = "+ id);
		if(id == (int) id){		
			PromocaoDAO promocao = new PromocaoDAO(); 
			return Response.ok(new Gson().toJson(promocao.buscaId(id))).build();
		}
		return Response.status(400).build();
    }
	/**
	 * 
	 * @return 200 se houver promocao ou 400 se nao houver
	 */
	@PermitAll
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response list() {
		System.out.println("LISTANDO PROMOCOES");
		PromocaoDAO promocao = new PromocaoDAO();
		List getPromocao =   promocao.buscaAll();
		if(!getPromocao.isEmpty()){
			return Response.ok(new Gson().toJson(getPromocao)).build();
		}
		return Response.status(404).build();
    }
	/**
	 * verificar se json esta preenchido, se estiver atribui ao objeto Promocao
	 * @param conteudo 
	 * @return
	 */
	
	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	public Response adiciona(String conteudo){
		System.out.println("DADOS RECEBIDO "+ conteudo);
		JsonObject asJsonObject = new Gson().fromJson(conteudo, JsonObject.class);

		if(asJsonObject.entrySet().size()> 0){
			Promocao promocao = (Promocao) new Gson().fromJson(conteudo, Promocao.class);
			new PromocaoDAO().adiciona(promocao);
			return Response.status(201).build();
		}
		return Response.status(400).build();
		
	}
}
