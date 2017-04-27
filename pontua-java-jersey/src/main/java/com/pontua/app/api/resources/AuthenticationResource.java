/**
 * Created by Philip A Senger on November 10, 2015
 */
package com.pontua.app.api.resources;



import java.util.Calendar;
import java.util.Date;
import java.util.logging.Logger;

import javax.annotation.security.PermitAll;
import javax.ws.rs.NotAuthorizedException;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import org.slf4j.LoggerFactory;

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
    UsuarioDAO usuarioDao;

    @POST
    @Produces(MediaType.APPLICATION_JSON)
   // @Consumes("application/x-www-form-urlencoded")
    public String authenticateUser(String  login) {
    	Usuario usuario = (Usuario) new Gson().fromJson(login, Usuario.class); 	
        Date expiry = getExpiryDate(15);
       // Usuario usuario = authenticate(username, password);
        
        String jwtString = TokenUtil.getJWTString(usuario.getNome(), usuario.getRoles(), 0, expiry);
        Token token = new com.pontua.app.modelo.Token();
        token.setAuthToken(jwtString);
        token.setExpires(expiry);
        
        //return Response.ok(token).build();
        return new Gson().toJson(jwtString);
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

    private Usuario authenticate(String username, String password) throws NotAuthorizedException {
        // Validate the extracted credentials
        Usuario usuario = null;
        Long id = null;
        try {
           usuario = usuarioDao.getLogin(id);
        } catch (EntityNotFoundException e) {
            logger.info("Invalid username '" + username + "' ");
            throw new NotAuthorizedException("Invalid username '" + username + "' ");
        }
        // we need to actually test the Hash not the password, we should never store the password in the database.
        if (usuario.getSenha().equals(password)) {
            logger.info("USER AUTHENTICATED");
        } else {
            logger.info("USER NOT AUTHENTICATED");
            throw new NotAuthorizedException("Invalid username or password");
        }
        return usuario;
    }


}
