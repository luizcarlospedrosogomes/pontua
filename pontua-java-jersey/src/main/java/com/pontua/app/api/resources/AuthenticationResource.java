/**
 *
 */
package com.pontua.app.api.resources;

import java.security.Key;
import java.util.Calendar;
import java.util.Date;
import java.util.logging.Logger;

import javax.annotation.security.PermitAll;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.google.gson.Gson;
import com.pontua.app.DAO.UsuarioDAO;
import com.pontua.app.modelo.EntityNotFoundException;
import com.pontua.app.modelo.Token;
import com.pontua.app.modelo.Usuario;
import com.pontua.app.util.TokenUtil;




@PermitAll
@Path("pontua/authentication")
public class AuthenticationResource {

	  private final static Logger logger = Logger.getLogger(AuthenticationResource.class.getName());
	  
    /**
     * HK2 Injection.
     */
    @Context
    Key key;
    private UsuarioDAO usuarioDAO;
    private Usuario usuario;
    ContainerRequestContext requestContext;
    @POST
    @Produces(MediaType.APPLICATION_JSON)
   // @Consumes("application/x-www-form-urlencoded")
    public Response authenticateUser(String  login) {
    	/*
    	 * transformar o Json recebido em objeto Usuario
    	 */
    	this.usuario = (Usuario) new Gson().fromJson(login, Usuario.class); 
    	/*verificar no banco se usuario existe
    	 * se existir retorna true
    	 */
    	UsuarioDAO usuarioDAO = new UsuarioDAO();
    	if(usuarioDAO.getLogin(this.usuario)){
    		System.out.println("email recebido = " + this.usuario.getEmail());
    		System.out.println("senha recebido = " + this.usuario.getSenha());
    		Token token = geraToken(this.usuario.getEmail());
    	    return Response.ok(new Gson().toJson(token)).build();
    	}
    	return Response.status(401).build();
    	//return new Gson().toJson(401);
    	
    	
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

   private Token geraToken(String email){
	   /*
	    * busca usuario no banco e gera token
	    */
	   System.out.println("Classe: AuthenticationResource - metodo: geraToken");
	   System.out.println("email" + usuario.getEmail());
	   UsuarioDAO usuarioDAO = new UsuarioDAO();
	   Usuario usuarioToken =  usuarioDAO.getUsuarioEmail(email);	   
	   Date expiry = getExpiryDate(15);
       String jwtString = TokenUtil.getJWTString(usuarioToken.getEmail(), usuarioToken.getRoles(), 0, expiry, key);
       Token token = new com.pontua.app.modelo.Token();
       token.setAuthToken(jwtString);
       //.setExpires(expiry);
       
      return token;
       
   
   }

}
