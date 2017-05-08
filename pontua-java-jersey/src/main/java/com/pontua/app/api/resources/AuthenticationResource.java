package com.pontua.app.api.resources;

import java.security.Key;
import java.util.Calendar;
import java.util.Date;
import java.util.logging.Logger;

import javax.annotation.security.PermitAll;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.google.gson.Gson;
import com.pontua.app.DAO.ClienteDAO;
import com.pontua.app.DAO.RepresentanteDAO;
import com.pontua.app.DAO.UsuarioDAO;
import com.pontua.app.modelo.Cliente;
import com.pontua.app.modelo.Representante;
import com.pontua.app.modelo.Token;
import com.pontua.app.modelo.Usuario;
import com.pontua.app.util.TokenUtil;




@PermitAll
@Path("pontua/login")
public class AuthenticationResource {

	  private final static Logger logger = Logger.getLogger(AuthenticationResource.class.getName());
	  
    /**
     * HK2 Injection.
     */
    @Context
    Key key;
    private ClienteDAO clienteDAO;
    private Cliente cliente;
    private Representante representante;

    @Path("/cliente")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
   // @Consumes("application/x-www-form-urlencoded")
    public Response loginCliente(String  login) {
    	System.out.println("dados cliente >> " +login);
    	this.cliente = (Cliente) new Gson().fromJson(login, Cliente.class); 
    	ClienteDAO clienteDAO = new ClienteDAO();
    	if(!this.cliente.getEmail().isEmpty() || !this.cliente.getSenha().isEmpty() ){
    		if(clienteDAO.getLogin(this.cliente)){
        		Token token = geraToken(this.cliente.getEmail(), "cliente");
        	    return Response.ok(new Gson().toJson(token.getAuthToken())).build();
        	}
        	return Response.status(401).build();
    	}
    	
    	return Response.status(400).build();
    }
    
    @Path("/representante")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
   // @Consumes("application/x-www-form-urlencoded")
    public Response loginRepresentante(String  login) {
    	System.out.println("dados representante >> " +login);
    	
    	this.representante = (Representante) new Gson().fromJson(login, Representante.class); 
    	RepresentanteDAO representanteDAO = new RepresentanteDAO();
    	
    	if(representanteDAO.getLogin(this.representante)){
    		Token token = geraToken(this.representante.getEmail(), "representante");
    	    return Response.ok(new Gson().toJson(token.getAuthToken())).build();
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
   private Token geraToken(String email, String role ){
	   Date expiry = getExpiryDate(15);
       String jwtString = TokenUtil.getJWTString(email,role, 0, expiry, key);
       Token token = new com.pontua.app.modelo.Token();
       token.setAuthToken(jwtString);
       //.setExpires(expiry);
       
      return token;
       
   
   }

}
