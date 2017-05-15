
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

@Path("/promocao")
@Api(value = "/promocao", description = "Operations about promocao")
@Produces({"application/json"})
public class PromocaoResource {
	
  static JavaRestResourceUtil ru = new JavaRestResourceUtil();

  @GET
  @Path("/{promocaoID}")
  @ApiOperation(value = "Promocao ID", 
    			notes = "retorna promocao",
    			response = Promocao.class
    			)
  @ApiResponses(value = { @ApiResponse(code = 400, message = "ID invalido"),
		  				  @ApiResponse(code = 404, message = "Promocao nao econtrada") })
  public Response getPromocaoId(
      @ApiParam(value = "ID da promocao"
      			, required = true) 
      			@PathParam("promocaoID") int promocaoID)
      throws NotFoundException {
	  PromocaoDAO promocao = new PromocaoDAO();
	  Promocao promocaoIDL= promocao.buscaId(promocaoID);
	  System.out.println("Lresutlado  busca por id "+promocaoID );
    if (null != promocaoIDL ) {
      return Response.ok(new Gson().toJson(promocaoIDL)).build();
    } else {
      throw new NotFoundException(404, "Promocao not found");
    }
  }
  
  @GET
  @Path("/")
  @ApiOperation(value = "Promocao", notes = "retorna todas promocao")
  public Response getPromocao(){
	  PromocaoDAO promocao = new PromocaoDAO();
	  List pro = promocao.buscaAll();   
	  return Response.ok(new Gson().toJson(pro)).build();
  }

}
