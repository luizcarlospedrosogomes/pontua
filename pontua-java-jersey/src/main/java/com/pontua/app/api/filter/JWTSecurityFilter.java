/**
 * Created by Philip A Senger on November 10, 2015
 */
package com.pontua.app.api.filter;

import java.io.IOException;
import java.security.Key;
import java.util.Arrays;
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
import com.pontua.app.modelo.EntityNotFoundException;
import com.pontua.app.modelo.Usuario;
import com.pontua.app.util.TokenUtil;

import io.jsonwebtoken.impl.crypto.MacProvider;

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

    /*public static String extractJwtTokenFromAuthorizationHeader(String auth) {
        //Replacing "Bearer Token" to "Token" directly
        return auth.replaceFirst("[B|b][E|e][A|a][R|r][E|e][R|r] ", "").replace(" ", "");
    }
	*/
    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {

        String method = requestContext.getMethod().toLowerCase();
        String path = ((ContainerRequest) requestContext).getPath(true).toLowerCase();
               
        if (("post".equals(method) && "/pontua/authentication".equals(path))) {
            // pass through the filter.
            requestContext.setSecurityContext(new SecurityContextAuthorizer(uriInfo, () -> "anonymous", new String[]{"anonymous"}));
            return;
        }
        requestContext.getUriInfo().getPathParameters();
        String authorizationHeader = ((ContainerRequest) requestContext).getHeaderString("authorization");
        System.out.println("authorizationHeader");
        System.out.println(authorizationHeader);
        System.out.println(((ContainerRequest) requestContext));
        if (authorizationHeader == null) {
            throw new WebApplicationException(Response.Status.UNAUTHORIZED);
        }
        
        String strToken = authorizationHeader;
       // Key key = MacProvider.generateKey();
        if (TokenUtil.isValid(strToken, key)) {
            String email = TokenUtil.getEmail(strToken, key);
            String [] roles = TokenUtil.getRoles(strToken, key);
            String role = null;
            int version = TokenUtil.getVersion(strToken, key);
            if (email != null && roles.length != 0 && version != -1) {
                UsuarioDAO usuarioDAO = new UsuarioDAO();
                Usuario usuario = usuarioDAO.getUsuarioEmail(email);
                role = usuario.getRoles();
                if (role != null) {
                     requestContext.setSecurityContext(new SecurityContextAuthorizer(uriInfo, () -> email, roles));
                      return;                    
                } else {
                    logger.info("Usuario invalido");
                }
            } else {
                logger.info("email ou role não presente no token");
            }
        } else {
            logger.info("token  invalido");
        }
        throw new WebApplicationException(Response.Status.UNAUTHORIZED);
    }
}
