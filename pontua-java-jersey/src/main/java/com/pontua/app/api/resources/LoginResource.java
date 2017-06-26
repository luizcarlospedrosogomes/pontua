package com.pontua.app.api.resources;

import java.security.Key;
import java.util.Calendar;
import java.util.Date;

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
import com.pontua.app.modelo.Cliente;
import com.pontua.app.modelo.Representante;
import com.pontua.app.modelo.Token;
import com.pontua.app.modelo.Usuario;
import com.pontua.app.util.TokenUtil;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.Authorization;



@Path("/login")
@Api(value="/login", description = "Login de representante ou cliente")
@Produces({"application/json"})
@Consumes(MediaType.APPLICATION_JSON)
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
  
    
    public LoginResource() {
		//this.usuarioDAO = new UsuarioDAO();
		//this.usuario = new Usuario();
		//this.clienteDAO = new ClienteDAO();
	}
    @POST
   // @Consumes({ "application/json" })
    @Produces({ "application/json" })
    @Consumes(MediaType.APPLICATION_JSON)
    @ApiOperation(value = "Return token", 
    			  notes = "", 
    			  response = String.class, authorizations = {
    			  @Authorization(value = "basic")
    					}, tags={ "Login", 
    			})
    @ApiResponses(value = { 
        @ApiResponse(code = 200, 
        			 message = "secret response", 
        			 response = String.class) 
     })
    
      
    public Response loginCliente( @ApiParam(value = "" )   Usuario  login) {
    	System.out.println("dados usuario >> " + new Gson().toJson(login));
    	UsuarioDAO usuarioDAO = new UsuarioDAO();
    	this.usuario = (Usuario) new Gson().fromJson( new Gson().toJson(login), Usuario.class); 
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
	   System.out.println("GERA TOKE -- ROLE");
	   System.out.println(usuario.getRoles());
       String jwtString = TokenUtil.getJWTString(email,usuario.getRoles(), getStatusCliente(usuario.getRoles(), email), expiry, key);
       Token token = new com.pontua.app.modelo.Token();
       
       token.setAuthToken(jwtString);
       token.setExpires(expiry);;
       
      return token;
     
   }
   private int getStatusCliente(String role, String email){
	   
	   ClienteDAO clienteDAO = new ClienteDAO();
	   if(role.equals("cliente")){
		   Cliente cliente = clienteDAO.getDadosCliente(email);
		   return Integer.parseInt(cliente.getStatus());
	   }
	   return 9999;
   }

}
