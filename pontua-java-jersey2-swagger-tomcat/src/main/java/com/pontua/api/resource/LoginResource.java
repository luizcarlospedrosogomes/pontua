package com.pontua.api.resource;

import java.security.Key;
import java.util.Calendar;
import java.util.Date;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;

import com.google.gson.Gson;
import com.pontua.DAO.ClienteDAO;
import com.pontua.DAO.UsuarioDAO;
import com.pontua.modelo.Representante;
import com.pontua.modelo.Token;
import com.pontua.modelo.Usuario;
import com.pontua.util.TokenUtil;
import com.wordnik.swagger.annotations.Api;
import com.wordnik.swagger.annotations.ApiOperation;
import com.wordnik.swagger.annotations.ApiResponse;
import com.wordnik.swagger.annotations.ApiResponses;
import com.wordnik.swagger.annotations.Authorization;

@Path("/login")
@Consumes({ "application/json" })
@Produces({ "application/json" })
@Api(description = " login", value = "Login")

public class LoginResource {
	@Context
    Key key;
	private ClienteDAO clienteDAO;
	private Usuario usuario;
	private Representante representante;
	
	@POST
	@Consumes({ "application/json" })
    @Produces({ "application/json" })
	@ApiOperation(value = "Return token"
				, notes = ""
				, response = Usuario.class
				, authorizations = { @Authorization(value = "basic")}
				, tags= "Login"
			)
	@ApiResponses(value = {
			@ApiResponse(code = 200
					, message = "token"
					, response = String.class
					) 
			})
	public Response loginCliente(String  login) {
    	System.out.println("dados usuario >> " +login);
    	this.usuario = (Usuario) new Gson().fromJson(login, Usuario.class); 
    	UsuarioDAO usuarioDAO = new UsuarioDAO();
    	if(!this.usuario.getEmail().isEmpty() || !this.usuario.getSenha().isEmpty() ){
    		if(usuarioDAO.getLogin(this.usuario)){
        		Token token = geraToken(this.usuario.getEmail());
        		String role = role(this.usuario.getEmail());
        	    return Response.ok(new Gson().toJson(token.getAuthToken()+" role "+ role)).build();
        	}
        	return Response.status(401).build();
    	}
    	
    	return Response.status(400).build();
    }
	
	private Date getExpiryDate(int minutes) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.add(Calendar.MINUTE, minutes);
        return calendar.getTime();
    }
    /*
	    * busca usuario no banco e gera token
	*/   
	private Token geraToken(String email){
		   UsuarioDAO usuarioDAO = new UsuarioDAO();
		   Usuario usuario = usuarioDAO.getUsuarioEmail(email);
		   
		   Date expiry = getExpiryDate(15);
	       String jwtString = TokenUtil.getJWTString(email,usuario.getRoles(), 0, expiry, key);
	       Token token = new com.pontua.modelo.Token();
	       token.setAuthToken(jwtString);
	       //.setExpires(expiry);
	       
	      return token;
	     
	   }
	   
	   private String role(String email){
		   UsuarioDAO usuarioDAO = new UsuarioDAO();
		   Usuario usuario = usuarioDAO.getUsuarioEmail(email);
		   return usuario.getRoles();
	   }
}
