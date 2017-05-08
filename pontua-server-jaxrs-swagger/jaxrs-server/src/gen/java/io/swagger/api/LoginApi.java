package io.swagger.api;

import io.swagger.model.*;
import io.swagger.api.LoginApiService;
import io.swagger.api.factories.LoginApiServiceFactory;

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

@Path("/login")


@io.swagger.annotations.Api(description = "the login API")
@javax.annotation.Generated(value = "io.swagger.codegen.languages.JavaJerseyServerCodegen", date = "2017-05-08T17:54:13.788Z")
public class LoginApi  {
   private final LoginApiService delegate = LoginApiServiceFactory.getLoginApi();

    @GET
    @Path("/cliente")
    
    @Produces({ "application/json" })
    @io.swagger.annotations.ApiOperation(value = "login", notes = "", response = String.class, tags={ "cliente login", })
    @io.swagger.annotations.ApiResponses(value = { 
        @io.swagger.annotations.ApiResponse(code = 200, message = " retorna token", response = String.class),
        
        @io.swagger.annotations.ApiResponse(code = 400, message = "Email ou senha invalidos", response = String.class) })
    public Response loginCliente(@ApiParam(value = "email para login",required=true) @QueryParam("email") String email
,@ApiParam(value = "Senha em texto puro",required=true) @QueryParam("senha") String senha
,@Context SecurityContext securityContext)
    throws NotFoundException {
        return delegate.loginCliente(email,senha,securityContext);
    }
    @GET
    @Path("/representante")
    
    @Produces({ "application/json" })
    @io.swagger.annotations.ApiOperation(value = "login", notes = "", response = String.class, tags={ "cliente login", })
    @io.swagger.annotations.ApiResponses(value = { 
        @io.swagger.annotations.ApiResponse(code = 200, message = "retorna token", response = String.class),
        
        @io.swagger.annotations.ApiResponse(code = 400, message = "Email ou senha invalidos", response = String.class) })
    public Response loginRepresentante(@ApiParam(value = "email para login",required=true) @QueryParam("email") String email
,@ApiParam(value = "Senha em texto puro",required=true) @QueryParam("senha") String senha
,@Context SecurityContext securityContext)
    throws NotFoundException {
        return delegate.loginRepresentante(email,senha,securityContext);
    }
}
