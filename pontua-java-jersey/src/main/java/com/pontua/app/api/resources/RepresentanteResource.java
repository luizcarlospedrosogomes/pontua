package com.pontua.app.api.resources;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.google.gson.Gson;
import com.pontua.app.DAO.RepresentanteDAO;
import com.pontua.app.modelo.Representante;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.Authorization;

@Path("/representante")
@Api(value="/representante", description = "representante", authorizations = {
        @Authorization(value="basic", scopes = {})
  })
@Produces({"application/json"})
public class RepresentanteResource {
	@GET
	@ApiOperation(value    = "Todos os representantes", 
	  			  notes    = "retorna nome e id de todos os representante cadastrados",
    response = Representante.class)
	@ApiResponses(value = { @ApiResponse(code = 404, message = "Representante not found") 
	})
	
	public Response getRepresentante(){
		System.out.println("BUSCANDO REPRESENTANTES");
		RepresentanteDAO  representanteDAO = new RepresentanteDAO();
		List getRepresentante = representanteDAO.getRepresentante();
		if(!getRepresentante.isEmpty()){
			System.out.println("Lista "+getRepresentante);
			System.out.println("RETORNANDO DADOS: "+new Gson().toJson(getRepresentante));
			return Response.ok(new Gson().toJson(getRepresentante)).build();
		}
		return Response.status(404).build();
	}

}
