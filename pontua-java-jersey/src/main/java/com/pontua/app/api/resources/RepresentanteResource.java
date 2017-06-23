package com.pontua.app.api.resources;

import java.util.List;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
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
import com.pontua.app.util.Role;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.Authorization;


@Path("/representante")
@Api(value="/representante", description = "Representante", authorizations = {
        @Authorization(value="basic", scopes = {})
  })
@Produces({"application/json"})
public class RepresentanteResource {
	@Context
    Request request;

    @Context
    SecurityContext securityContext;
	/**
	 * 
	 * @param id recebe um inteiro 
	 * @return promocao referente ao id
	 */
   	@Path("/promo/{ID}")
    @GET
    @ApiOperation(value    = "Promoção por ID ", 
    			  notes    = "retorna promoções",
                  response = Promocao.class, tags={ "Representante"})
    @ApiResponses(value = { @ApiResponse(code = 400, message = "ID invalido"),
        @ApiResponse(code = 404, message = "Promocao not found") })
   	 
    @Produces(MediaType.APPLICATION_JSON)
    public Response busca(@ApiParam(value = "ID da promocao", required = true)
    					  @PathParam("ID") int id) {
   		String email = securityContext.getUserPrincipal().getName();
		if(id == (int) id){		
			PromocaoDAO promocao = new PromocaoDAO(); 
	   		if(!promocao.validaRepresentante(email,id)){
	   			return Response.status(401).build();
	   		}
			UsuarioDAO usuarioDAO = new UsuarioDAO();
			return Response.ok(new Gson().toJson(promocao.buscaId(id))).build();
		}
		return Response.status(400).build();
    }
   	
	/**
	 * 
	 * @return 200 se houver promocao ou 400 se nao houver
	 */
   	@Path("/promo")
    @GET
    @ApiOperation(value    = "Todas promocoes", 
	  			  notes    = "retorna promoções",
	  			  response = Promocao.class, tags={ "Representante"})
    @ApiResponses(value = { @ApiResponse(code = 404, message = "Promocao nao encontrada"),
	@ApiResponse(code = 404, message = "Promocao not found") })
    public Response list() {
    	String email = securityContext.getUserPrincipal().getName();
    	UsuarioDAO usuarioDAO = new UsuarioDAO();
		
		PromocaoDAO promocao = new PromocaoDAO();
		List getPromocao =   promocao.buscaAll(Role.getRole(securityContext), email);
		if(!getPromocao.isEmpty()){
			System.out.println("DADOS PARA O CLIENTE:");
			System.out.println(new Gson().toJson(getPromocao));
			return Response.ok(new Gson().toJson(getPromocao)).build();
		}
		if(getPromocao.isEmpty()){
			return Response.status(404).build();
		}
		
		return Response.status(401).build();
    }
	/**
	 * verificar se json esta preenchido, se estiver atribui ao objeto Promocao
	 * @param conteudo 
	 * @return
	 */
    @Path("/promo/{id}")
	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@ApiOperation(value    = "Atualiza promocoes", 
			      notes    = "retorna promoções",
	              response = String.class, authorizations = {
	            			@Authorization(value = "basic")
					}, tags={ "Representante", 
	})
	@ApiResponses(value = { 
	@ApiResponse(code = 200, 
			 message = "promocao", 
			 response = Promocao.class) 
	})
	public Response atualiza(Promocao promocao){
		System.out.println("DADOS RECEBIDO "+ promocao);
		String email = securityContext.getUserPrincipal().getName();
		UsuarioDAO usuarioDAO = new UsuarioDAO();

		JsonObject asJsonObject = new Gson().fromJson(new Gson().toJson(promocao), JsonObject.class);

		if(asJsonObject.entrySet().size()> 0){
			Promocao pro = (Promocao) new Gson().fromJson( new Gson().toJson(promocao), Promocao.class);
			PromocaoDAO promocaoDAO = new PromocaoDAO();
			if(!promocaoDAO.validaRepresentante(email,pro.getId()))
	   			return Response.status(401).build();
			promocaoDAO.atualiza(pro, email);
			return Response.status(201).build();
		}
		return Response.status(400).build();
		
	}
    @Path("/promo")
   	@POST
   	@Produces(MediaType.APPLICATION_JSON)
   	@ApiOperation(value    = "insere promocao", 
   			      notes    = "retorna promoções",
   	              response = String.class, authorizations = {
   	            			@Authorization(value = "basic")
   					}, tags={ "Representante", 
   	})
   	@ApiResponses(value = { 
   	@ApiResponse(code = 200, 
   			 message = "promocao", 
   			 response = Promocao.class) 
   	})
   	public Response adiciona(Promocao promocao){
    	System.out.println("VERBO: POST; OPERACAO: ADICIONAR");
   		System.out.println("DADOS RECEBIDOS "+ promocao);
   		UsuarioDAO usuarioDAO = new UsuarioDAO();
   		String email = securityContext.getUserPrincipal().getName();
   		JsonObject asJsonObject = new Gson().fromJson(new Gson().toJson(promocao), JsonObject.class);

   		if(asJsonObject.entrySet().size()> 0){
   			Promocao pro = (Promocao) new Gson().fromJson( new Gson().toJson(promocao), Promocao.class);
   			PromocaoDAO promo = new PromocaoDAO();
   			pro.setRepresentante_id(email);
   			promo.adiciona(pro);
   			return Response.status(201).build();
   		}
   		return Response.status(400).build();
   		
   	}
	@Path("promo/{id}")
	@DELETE
	@ApiOperation(value    = "remove promocao", 
			      notes    = "",
	              response = String.class, authorizations = {
	            			@Authorization(value = "basic")
					}, tags={ "Representante", 
	})
	@ApiResponses(value = { 
	@ApiResponse(code = 200, 
			 message = "promocao removida", 
			 response = Promocao.class) 
	})
		
	public Response remover(@PathParam("id") int id){
		System.out.println("VERBO: DELETE; OPERACAO: REMOVER");
		System.out.println("DADOS RECEBIDO: ID "+ id);
		String email = securityContext.getUserPrincipal().getName();
		UsuarioDAO usuarioDAO = new UsuarioDAO();		
		if(id == (int) id && id >0 ){		
			PromocaoDAO promocao = new PromocaoDAO(); 
			System.out.println("EMAIL "+ email);
			System.out.println("ID" + id);
	   		if(!promocao.validaRepresentante(email,id)){
	   			System.out.println("NAO VALIDOU REPRESENTANTE");
	   			return Response.status(401).build();
	   		}
			promocao.remover(id);
			return Response.ok(new Gson().toJson("promocao removida")).build();
		}
		return Response.status(400).build();
	}
}


