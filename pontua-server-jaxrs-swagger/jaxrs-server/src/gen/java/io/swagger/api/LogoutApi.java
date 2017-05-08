package io.swagger.api;

import io.swagger.model.*;
import io.swagger.api.LogoutApiService;
import io.swagger.api.factories.LogoutApiServiceFactory;

import io.swagger.annotations.ApiParam;
import io.swagger.jaxrs.*;


import java.util.List;
import io.swagger.api.NotFoundException;

import java.io.InputStream;

import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;

import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.*;
import javax.validation.constraints.*;

@Path("/logout")


@io.swagger.annotations.Api(description = "the logout API")
@javax.annotation.Generated(value = "io.swagger.codegen.languages.JavaJerseyServerCodegen", date = "2017-05-08T17:54:13.788Z")
public class LogoutApi  {
   private final LogoutApiService delegate = LogoutApiServiceFactory.getLogoutApi();

    @GET
    @Path("/cliente")
    
    @Produces({ "application/json" })
    @io.swagger.annotations.ApiOperation(value = "", notes = "", response = void.class, tags={ "logout cliente", })
    @io.swagger.annotations.ApiResponses(value = { 
        @io.swagger.annotations.ApiResponse(code = 200, message = "logout ok", response = void.class) })
    public Response logoutCliente(@ApiParam(value = "token a ser destruido pelo servidor",required=true) @QueryParam("token") String token
,@Context SecurityContext securityContext)
    throws NotFoundException {
        return delegate.logoutCliente(token,securityContext);
    }
    @GET
    @Path("/representante")
    
    @Produces({ "application/json" })
    @io.swagger.annotations.ApiOperation(value = "", notes = "", response = void.class, tags={ "logout represante", })
    @io.swagger.annotations.ApiResponses(value = { 
        @io.swagger.annotations.ApiResponse(code = 200, message = "logout ok", response = void.class) })
    public Response logoutRepresentante(@ApiParam(value = "token a ser destruido pelo servidor",required=true) @QueryParam("token") String token
,@Context SecurityContext securityContext)
    throws NotFoundException {
        return delegate.logoutRepresentante(token,securityContext);
    }
}
