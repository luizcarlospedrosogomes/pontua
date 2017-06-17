package com.pontua.app.api.resources;

import java.util.List;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Request;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.pontua.app.DAO.PromocaoDAO;
import com.pontua.app.DAO.UsuarioDAO;
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

    @Context
    Request request;

    @Context
    SecurityContext securityContext;
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
    					 @QueryParam("email") String email, 
    					 @PathParam("ID") int id) {
		
		UsuarioDAO usuarioDAO = new UsuarioDAO();
		if(id == (int) id && (usuarioDAO.verificaUsuarioEmail(email) || email == null)){		
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
    public Response list(@QueryParam("email") String email) {
    	
    	System.out.println("GET EMAIL USUARIO");
    	System.out.println(securityContext.getUserPrincipal().getName());
    	if(securityContext.isUserInRole("representante")){
    		System.out.println("REPRESENTANTE");
    	}
    	UsuarioDAO usuarioDAO = new UsuarioDAO();
		if(usuarioDAO.verificaUsuarioEmail(email) || email == null){
			System.out.println("LISTANDO PROMOCOES");
			
			PromocaoDAO promocao = new PromocaoDAO();
			List getPromocao =   promocao.buscaAll();
			if(!getPromocao.isEmpty()){
				return Response.ok(new Gson().toJson(getPromocao)).build();
			}
			return Response.status(404).build();
		}
		
		return Response.status(401).build();
    }
	/**
	 * verificar se json esta preenchido, se estiver atribui ao objeto Promocao
	 * @param conteudo 
	 * @return
	 */
	
	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@ApiOperation(value    = "Atualiza ou criar promocoes", 
			      notes    = "retorna promoções",
	              response = String.class, authorizations = {
	            			@Authorization(value = "basic")
					}, tags={ "Login", 
	})
	@ApiResponses(value = { 
	@ApiResponse(code = 200, 
			 message = "promocao", 
			 response = Promocao.class) 
	})
	public Response adiciona(Promocao promocao){
		System.out.println("DADOS RECEBIDO "+ promocao);
		UsuarioDAO usuarioDAO = new UsuarioDAO();

		JsonObject asJsonObject = new Gson().fromJson(new Gson().toJson(promocao), JsonObject.class);

		if(asJsonObject.entrySet().size()> 0){
			Promocao pro = (Promocao) new Gson().fromJson( new Gson().toJson(promocao), Promocao.class);
			new PromocaoDAO().adiciona(pro);
			return Response.status(201).build();
		}
		return Response.status(400).build();
		
	}
	@Path("/{id}")
	@DELETE
	@ApiOperation(value    = "remove promocao", 
			      notes    = "",
	              response = String.class, authorizations = {
	            			@Authorization(value = "basic")
					}, tags={ "Login", 
	})
	@ApiResponses(value = { 
	@ApiResponse(code = 200, 
			 message = "promocao removida", 
			 response = Promocao.class) 
	})
	public Response remover(@PathParam("id") int id){
		System.out.println("DADOS RECEBIDO: ID "+ id);
		UsuarioDAO usuarioDAO = new UsuarioDAO();
	
		if(id == (int) id && id >0 ){		
			PromocaoDAO promocao = new PromocaoDAO(); 
			promocao.remover(id);
			return Response.ok(new Gson().toJson("promocao removida")).build();
		}
		return Response.status(400).build();
	}
}
