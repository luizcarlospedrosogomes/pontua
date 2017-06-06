/**
 * Created by Philip A Senger on November 10, 2015
 */
package com.pontua.app.api.filter;

import java.io.IOException;
import java.security.Key;
import java.security.Principal;
import java.util.logging.Logger;

import javax.annotation.Priority;
import javax.inject.Inject;
import javax.ws.rs.Priorities;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.ext.Provider;

import org.glassfish.jersey.server.ContainerRequest;

import com.pontua.app.DAO.UsuarioDAO;
import com.pontua.app.modelo.Usuario;
import com.pontua.app.util.TokenUtil;

/**
 * https://simplapi.wordpress.com/2013/01/24/jersey-jax-rs-implements-a-http-basic-auth-decoder/
 */
@Provider
@Priority(Priorities.AUTHENTICATION)
public class JWTSecurityFilter implements ContainerRequestFilter {

    final static Logger logger = Logger.getLogger(JWTSecurityFilter.class.getName());

    /**
     * HK2 Injection.
     */
    @Context
    UsuarioDAO usuarioDAO;

    @Context
    Key key;

    @Inject
    javax.inject.Provider<UriInfo> uriInfo;

    public static String extractJwtTokenFromAuthorizationHeader(String auth) {
        //Replacing "Bearer Token" to "Token" directly
        return auth.replaceFirst("[B|b][E|e][A|a][R|r][E|e][R|r] ", "").replace(" ", "");
    }
	private Principal convertLambda(){
		 return (Principal) "anonymous";
	}
    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {
    	
        String method = requestContext.getMethod().toLowerCase();
        String path   = ((ContainerRequest) requestContext).getPath(true).toLowerCase();
     
        System.out.println("METODO >> " + method);
        System.out.println("PATH >> " + path);

        /**
         * acesso a DOC SWAGGER
         * libera o /swagger.json
         * 
         */
        if("/swagger.json".equals(path)){
            // pass through the filter.
            requestContext.setSecurityContext(new SecurityContextAuthorizer(uriInfo, () -> "anonymous", "anonymous"));
            return;
        }

        /**
         * verifica se a url acessada é: "/login" e o methodo post
         * http://dominio/pontua/login
         */
        if ((("options".equals(method) || "post".equals(method)) && ("/login".equals(path)))) {

            // pass through the filter.
            requestContext.setSecurityContext(new SecurityContextAuthorizer(uriInfo, () -> "anonymous", "anonymous"));
            return;
        }
        /**
         * verifica se o token apiKey ou authorization esta preesente
         */
        requestContext.getUriInfo().getPathParameters();
        String authorizationHeaderApiKey = null;
        String authorizationHeaderAuth   = null;
        authorizationHeaderApiKey = ((ContainerRequest) requestContext).getHeaderString("apiKey");
        authorizationHeaderAuth   = ((ContainerRequest) requestContext).getHeaderString("authorization");
        System.out.println("apiKey :" + authorizationHeaderApiKey);
        System.out.println("auth   :" + authorizationHeaderAuth);
        
        if(authorizationHeaderApiKey == null && authorizationHeaderAuth == null) {
        	System.out.println("TOKEN NAO ESTA PRESENTE");
            throw new WebApplicationException(Response.Status.UNAUTHORIZED);
        }
        /**
         * pega o auth correto
         */
        String strToken = null;
        if(authorizationHeaderApiKey != null){
        	 strToken = extractJwtTokenFromAuthorizationHeader(authorizationHeaderApiKey);
        }
        if(authorizationHeaderAuth != null){
        	 strToken = extractJwtTokenFromAuthorizationHeader(authorizationHeaderAuth);
        }
        
        System.out.println("+++++++++++++++++++++++TOKEN+++++++++++++++++++++++");
        System.out.println(strToken.replace("\"", ""));
        strToken = strToken.replace("\"", "");
        if (TokenUtil.isValid(strToken, key)) {
            String email = TokenUtil.getEmail(strToken, key);
            //String [] roles = TokenUtil.getRoles(strToken, key);
            String role = TokenUtil.getRole(strToken, key);
            System.out.println("ROLE");
            System.out.println(role);
            System.out.println("EMAIL");
            System.out.println(email);
            int version = TokenUtil.getVersion(strToken, key);
            if (email != null && !role.equals("") && version != -1) {
                UsuarioDAO usuarioDAO = new UsuarioDAO();
                Usuario usuario = usuarioDAO.getUsuarioEmail(email);
                role = usuario.getRoles();
                if (role != null) {
                     requestContext.setSecurityContext(new SecurityContextAuthorizer(uriInfo, () -> email, role));
                      return;                    
                } else {
                    logger.info("USUARIO INVALIDO");
                }
            } else {
                logger.info("EMAIL OU ROLE NAO PRESENTE NO TOKEN");
            }
        } else {
            logger.info("TOKEN INVALIDO");
        }
        throw new WebApplicationException(Response.Status.UNAUTHORIZED);
    }
}
