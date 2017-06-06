package com.pontua.app.api.resources;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.Authorization;

@Path("/logout")
@Api(value="/logout", description = "Logout de representante ou cliente", authorizations = {
        @Authorization(value="basic", scopes = {})
  })
@Produces({"application/json"})
@Consumes(MediaType.APPLICATION_JSON)
public class LogoutResource {
	@DELETE
	@Produces({ "application/json" })
    @Consumes(MediaType.APPLICATION_JSON)
    @ApiOperation(value = "Destroi token", 
    			  notes = "", 
    			  response = String.class, authorizations = {
    			  @Authorization(value = "basic")
    					}, tags={ "Logout", 
    			})
    @ApiResponses(value = { 
        @ApiResponse(code = 200, 
        			 message = "token destruido", 
        			 response = String.class) 
     })
	public Response logout(String token){
		
		return Response.ok("token destruido").build();
	}
}
