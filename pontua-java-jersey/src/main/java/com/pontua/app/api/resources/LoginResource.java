package com.pontua.app.api.resources;

import java.security.Key;
import java.util.Calendar;
import java.util.Date;

import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;

import com.google.gson.Gson;
import com.pontua.app.DAO.ClienteDAO;
import com.pontua.app.DAO.UsuarioDAO;
import com.pontua.app.modelo.Representante;
import com.pontua.app.modelo.Token;
import com.pontua.app.modelo.Usuario;
import com.pontua.app.util.TokenUtil;

import io.swagger.annotations.*;



@Path("/login")
@Api(value="/login", description = "Operations about user")
@Produces({"application/json"})
@Consumes({"application/json"})
public class LoginResource {

	 // private final static Logger logger = Logger.getLogger(LoginResource.class.getName());
	  
    /**
     * HK2 Injection.
     */
    @Context
    Key key;
    private ClienteDAO clienteDAO;
    private Usuario usuario;
    private Representante representante;
    
    @POST
    @ApiOperation(value = "Find pet by ID", 
    			  notes = "Returns a pet when 0 < ID <= 10.  ID > 10 or nonintegers will simulate API error conditions",
    			  response = Usuario.class)
    @ApiResponses(value = { @ApiResponse(code = 400, message = "Invalid ID supplied"),
    						@ApiResponse(code = 404, message = "Pet not found") })
      
    public Response loginCliente( @ApiParam(value = "" )  String  login) {
    	System.out.println("dados usuario >> " + login);
    	this.usuario = (Usuario) new Gson().fromJson(login, Usuario.class); 
    	UsuarioDAO usuarioDAO = new UsuarioDAO();
    	if(!this.usuario.getEmail().isEmpty() || !this.usuario.getSenha().isEmpty() ){
    		if(usuarioDAO.getLogin(this.usuario)){
        		Token token = geraToken(this.usuario.getEmail());
        		//String role = role(this.usuario.getEmail());
        	    return Response.ok(new Gson().toJson(token.getAuthToken())).build();
        	}
        	return Response.status(401).build();
    	}
    	
    	return Response.status(400).build();
    }
        
    /**
     * get Expire date in minutes.
     *
     * @param minutes the minutes in the future.
     * @return
     */
    private Date getExpiryDate(int minutes) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.add(Calendar.MINUTE, minutes);
        return calendar.getTime();
    }
    /**
	  * busca usuario no banco e gera token
	  * @param email para buscar no banco a role
	  * @ return
	*/   
   private Token geraToken(String email){
	   UsuarioDAO usuarioDAO = new UsuarioDAO();
	   Usuario usuario = usuarioDAO.getUsuarioEmail(email);
	   
	   Date expiry = getExpiryDate(360);
       String jwtString = TokenUtil.getJWTString(email,usuario.getRoles(), 1, expiry, key);
       Token token = new com.pontua.app.modelo.Token();
       
       token.setAuthToken(jwtString);
       token.setExpires(expiry);;
       
      return token;
     
   }

}
