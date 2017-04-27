/**
 *
 */
package com.pontua.app.api.resources;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.logging.Logger;

import javax.annotation.security.PermitAll;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import com.google.gson.Gson;
import com.pontua.app.DAO.UsuarioDAO;
import com.pontua.app.modelo.Token;
import com.pontua.app.modelo.Usuario;
import com.pontua.app.util.TokenUtil;
import com.pontua.app.modelo.EntityNotFoundException;



@PermitAll
@Path("pontua/authentication")
public class AuthenticationResource {

	  private final static Logger logger = Logger.getLogger(AuthenticationResource.class.getName());
	  
    /**
     * HK2 Injection.
     */
    @Context
    private UsuarioDAO usuarioDAO;
    private Usuario usuario;
    @POST
    @Produces(MediaType.APPLICATION_JSON)
   // @Consumes("application/x-www-form-urlencoded")
    public String authenticateUser(String  login)throws EntityNotFoundException {
    	/*
    	 * transformar o Json recebido em objeto usuario
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
    	   return new Gson().toJson(token);
    	}
    	throw new EntityNotFoundException(new Gson().toJson("Usuario ou senha incorreto"));
    //	return new Gson().toJson("Usuario ou senha incorreto");
    	
    	
    	
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
       String jwtString = TokenUtil.getJWTString(usuarioToken.getEmail(), usuarioToken.getRoles(), 0, expiry);
       Token token = new com.pontua.app.modelo.Token();
       token.setAuthToken(jwtString);
       //.setExpires(expiry);
       
      return token;
       
   
   }

}
