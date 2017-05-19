package com.pontua.app.api.resources;

import java.security.Key;
import java.util.Calendar;
import java.util.Date;
import java.util.logging.Logger;

import javax.annotation.security.PermitAll;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.google.gson.Gson;
import com.pontua.app.DAO.ClienteDAO;
import com.pontua.app.DAO.UsuarioDAO;
import com.pontua.app.modelo.Representante;
import com.pontua.app.modelo.Token;
import com.pontua.app.modelo.Usuario;
import com.pontua.app.util.TokenUtil;




@PermitAll
@Path("pontua")
public class LoginResource {

	  private final static Logger logger = Logger.getLogger(LoginResource.class.getName());
	  
    /**
     * HK2 Injection.
     */
    @Context
    Key key;
    private ClienteDAO clienteDAO;
    private Usuario usuario;
    private Representante representante;

    @Path("/login")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes("application/json")
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
    /*
	    * busca usuario no banco e gera token
	*/   
   private Token geraToken(String email){
	   UsuarioDAO usuarioDAO = new UsuarioDAO();
	   Usuario usuario = usuarioDAO.getUsuarioEmail(email);
	   
	   Date expiry = getExpiryDate(15);
       String jwtString = TokenUtil.getJWTString(email,usuario.getRoles(), 0, expiry, key);
       Token token = new com.pontua.app.modelo.Token();
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
