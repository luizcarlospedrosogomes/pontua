package com.pontua.app.api.resources;

import java.util.List;

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

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.Authorization;



@Path("/promocao")
@Api(value="/promocao", description = "Promocoes", authorizations = {
        @Authorization(value="basic", scopes = {})
  })
@Produces({"application/json"})
public class PromocaoResources {
	/**
	 * 
	 * @param id recebe um inteiro 
	 * @return promocao referente ao id
	 */
	
	@Path("/{id}")
    @GET
    @ApiOperation(value    = "Promoção por ID ", 
    			  notes    = "retorna promoções",
                  response = Promocao.class)
    @ApiResponses(value = { @ApiResponse(code = 400, message = "ID invalido"),
        @ApiResponse(code = 404, message = "Promocao not found") })
    
    @Produces(MediaType.APPLICATION_JSON)
    public Response busca(@ApiParam(value = "ID da promocao", required = true)
    @PathParam("ID") int id) {
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
	
    @GET
    @ApiOperation(value    = "Todas promocoes", 
	  			  notes    = "retorna promoções",
	  			  response = Promocao.class)
    @ApiResponses(value = { @ApiResponse(code = 404, message = "Promocao nao encontrada"),
	@ApiResponse(code = 404, message = "Promocao not found") })

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
