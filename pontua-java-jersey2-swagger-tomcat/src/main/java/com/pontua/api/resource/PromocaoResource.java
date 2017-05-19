
package com.pontua.api.resource;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import com.google.gson.Gson;
import com.pontua.DAO.PromocaoDAO;
import com.pontua.api.exception.NotFoundException;
import com.pontua.modelo.Promocao;
import com.wordnik.swagger.annotations.Api;
import com.wordnik.swagger.annotations.ApiOperation;
import com.wordnik.swagger.annotations.ApiParam;
import com.wordnik.swagger.annotations.ApiResponse;
import com.wordnik.swagger.annotations.ApiResponses;
import com.wordnik.swagger.annotations.Authorization;

@Path("/promocao")
@Api(value = "/promocao", description = "Operations about promocao")
@Produces({"application/json"})
public class PromocaoResource {
	
  static JavaRestResourceUtil ru = new JavaRestResourceUtil();

  @GET
  @Path("/{promocaoID}")
  @ApiOperation(value     = "Promocao ID"
  				, notes   = "retorna promocao"
  				,response = Promocao.class
    			)
  @ApiResponses(value = { 
		  		@ApiResponse(code     = 400
		  					, message = "ID invalido"),
		  		@ApiResponse(code = 404
		  					, message = "Promocao nao econtrada")
		  		})
  public Response getPromocaoId(
      @ApiParam(value = "ID da promocao"
      			, required = true) 
      			@PathParam("promocaoID") int promocaoID)
      throws NotFoundException {
	  		PromocaoDAO promocao = new PromocaoDAO();
	  		Promocao promocaoIDL= promocao.buscaId(promocaoID);
	  		System.out.println("resutlado  busca por id "+promocaoID );
		    if (null != promocaoIDL ) {
		      return Response.ok(new Gson().toJson(promocaoIDL)).build();
		    } else {
		      return Response.status(404).build();
		    }
  }
  
  @GET
  @Path("/")
  @ApiOperation(value            = "Promocao"
  				, notes          = "retorna todas promocao"
  				, response       = Promocao.class
  				, authorizations = {@Authorization(value = "apiKey")}
  				, tags           = "logout"
    			)
 
  @ApiResponses(value = {
		  @ApiResponse(code = 200
				  	 , message = "promocao encontrada"
				  	 , response = void.class)
		  })
  public Response getPromocao(){
	  PromocaoDAO promocao = new PromocaoDAO();
	  List pro = promocao.buscaAll();  
	  if(null != pro){
		  return Response.ok(new Gson().toJson(pro)).build();
	  }else{
		  return Response.status(404).build();
	  }
		  
  }

}
